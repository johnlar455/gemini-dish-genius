import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.74.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Supported languages with their codes and names
const SUPPORTED_LANGUAGES: Record<string, { name: string; nativeName: string }> = {
  en: { name: 'English', nativeName: 'English' },
  ar: { name: 'Arabic', nativeName: 'العربية' },
  zh: { name: 'Chinese', nativeName: '中文' },
  ja: { name: 'Japanese', nativeName: '日本語' },
  de: { name: 'German', nativeName: 'Deutsch' },
  nl: { name: 'Dutch', nativeName: 'Nederlands' },
  es: { name: 'Spanish', nativeName: 'Español' },
  it: { name: 'Italian', nativeName: 'Italiano' },
  ru: { name: 'Russian', nativeName: 'Русский' },
};

// Input validation function
function validateInput(data: any): { valid: boolean; error?: string } {
  if (!data.prompt || typeof data.prompt !== 'string') {
    return { valid: false, error: 'Prompt is required and must be a string' };
  }
  if (data.prompt.trim().length === 0 || data.prompt.length > 500) {
    return { valid: false, error: 'Prompt must be between 1 and 500 characters' };
  }
  if (data.cuisineType && (typeof data.cuisineType !== 'string' || data.cuisineType.length > 50)) {
    return { valid: false, error: 'Cuisine type must be a string with max 50 characters' };
  }
  if (data.ingredients && (!Array.isArray(data.ingredients) || data.ingredients.length > 20)) {
    return { valid: false, error: 'Ingredients must be an array with max 20 items' };
  }
  if (data.ingredients && data.ingredients.some((i: any) => typeof i !== 'string' || i.length > 100)) {
    return { valid: false, error: 'Each ingredient must be a string with max 100 characters' };
  }
  if (data.dietaryPreferences && (!Array.isArray(data.dietaryPreferences) || data.dietaryPreferences.length > 10)) {
    return { valid: false, error: 'Dietary preferences must be an array with max 10 items' };
  }
  if (!data.category || typeof data.category !== 'string' || data.category.trim().length === 0) {
    return { valid: false, error: 'Category is required and must be a string' };
  }
  if (data.language && typeof data.language === 'string' && data.language !== 'auto' && !SUPPORTED_LANGUAGES[data.language]) {
    return { valid: false, error: 'Unsupported language code' };
  }
  return { valid: true };
}

// Detect language from text using AI
async function detectLanguage(text: string, apiKey: string): Promise<string> {
  try {
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash-lite',
        messages: [
          {
            role: 'system',
            content: `You are a language detection assistant. Analyze the text and return ONLY the ISO 639-1 language code (2 letters). 
Supported codes: en (English), ar (Arabic), zh (Chinese), ja (Japanese), de (German), nl (Dutch), es (Spanish), it (Italian), ru (Russian).
If unsure or the language is not in the list, return "en".
Return ONLY the 2-letter code, nothing else.`
          },
          {
            role: 'user',
            content: text
          }
        ],
      }),
    });

    if (!response.ok) {
      console.log('Language detection failed, defaulting to English');
      return 'en';
    }

    const data = await response.json();
    const detectedCode = data.choices[0].message.content.trim().toLowerCase();
    
    // Validate detected code
    if (SUPPORTED_LANGUAGES[detectedCode]) {
      console.log(`Detected language: ${detectedCode} (${SUPPORTED_LANGUAGES[detectedCode].name})`);
      return detectedCode;
    }
    
    return 'en';
  } catch (error) {
    console.error('Language detection error:', error);
    return 'en';
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get authorization header to verify JWT
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Authorization header required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verify JWT by creating authenticated Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid authentication token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const requestData = await req.json();
    
    // Validate input
    const validation = validateInput(requestData);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ error: validation.error }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { prompt, dietaryPreferences, ingredients, cuisineType, language: requestedLanguage } = requestData;
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Detect or use provided language
    let targetLanguage = requestedLanguage;
    if (!targetLanguage || targetLanguage === 'auto') {
      targetLanguage = await detectLanguage(prompt, LOVABLE_API_KEY);
    }
    
    const langInfo = SUPPORTED_LANGUAGES[targetLanguage] || SUPPORTED_LANGUAGES['en'];
    console.log(`Generating recipe in ${langInfo.name} (${targetLanguage})`);

    // Build the prompt for recipe generation with language instruction
    let fullPrompt = `Generate a detailed recipe`;
    
    if (prompt) fullPrompt += ` for ${prompt}`;
    if (cuisineType) fullPrompt += ` in ${cuisineType} cuisine style`;
    if (ingredients && ingredients.length > 0) fullPrompt += ` using these ingredients: ${ingredients.join(', ')}`;
    if (dietaryPreferences && dietaryPreferences.length > 0) {
      fullPrompt += `. This recipe must be ${dietaryPreferences.join(', ')} friendly`;
    }

    // Add language-specific instructions
    const languageInstruction = targetLanguage !== 'en' 
      ? `\n\nIMPORTANT: Generate the ENTIRE recipe in ${langInfo.name} (${langInfo.nativeName}). All text including title, description, ingredients, and instructions must be in ${langInfo.name}. Do NOT translate measurement units or use English anywhere.`
      : '';

    fullPrompt += `.${languageInstruction}

Please provide:
1. A catchy recipe title${targetLanguage !== 'en' ? ` in ${langInfo.name}` : ''}
2. A brief description (2-3 sentences)${targetLanguage !== 'en' ? ` in ${langInfo.name}` : ''}
3. Prep time in minutes
4. Cook time in minutes
5. Number of servings
6. Difficulty level (easy, medium, or hard)${targetLanguage !== 'en' ? ` - translate these terms to ${langInfo.name}` : ''}
7. Complete list of ingredients with measurements${targetLanguage !== 'en' ? ` in ${langInfo.name}` : ''}
8. Step-by-step cooking instructions${targetLanguage !== 'en' ? ` in ${langInfo.name}` : ''}

Format the response as JSON with this structure:
{
  "title": "Recipe Title${targetLanguage !== 'en' ? ` (in ${langInfo.name})` : ''}",
  "description": "Brief description${targetLanguage !== 'en' ? ` (in ${langInfo.name})` : ''}",
  "prepTime": 15,
  "cookTime": 30,
  "servings": 4,
  "difficulty": "${targetLanguage !== 'en' ? `translated difficulty level` : 'medium'}",
  "ingredients": [
    { "item": "ingredient name${targetLanguage !== 'en' ? ` (in ${langInfo.name})` : ''}", "amount": "measurement" }
  ],
  "instructions": [
    { "step": 1, "instruction": "First step...${targetLanguage !== 'en' ? ` (in ${langInfo.name})` : ''}" },
    { "step": 2, "instruction": "Second step...${targetLanguage !== 'en' ? ` (in ${langInfo.name})` : ''}" }
  ],
  "cuisineType": "${cuisineType || 'International'}",
  "dietaryPreferences": ${JSON.stringify(dietaryPreferences || [])},
  "language": "${targetLanguage}",
  "languageName": "${langInfo.name}"
}`;

    console.log('Generating recipe with prompt:', fullPrompt);

    // Call Lovable AI to generate recipe
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `You are a professional chef and recipe creator who is fluent in multiple languages. Generate detailed, delicious recipes in JSON format exactly as requested. When asked to generate in a specific language, ensure ALL text content is in that language.`
          },
          {
            role: 'user',
            content: fullPrompt
          }
        ],
        response_format: { type: 'json_object' }
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Payment required. Please add credits to your workspace.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      const errorText = await response.text();
      console.error('AI API error:', response.status, errorText);
      throw new Error('Failed to generate recipe');
    }

    const data = await response.json();
    const recipeText = data.choices[0].message.content;
    console.log('Generated recipe:', recipeText);

    let recipeData;
    try {
      recipeData = JSON.parse(recipeText);
      // Ensure language info is in the response
      recipeData.language = targetLanguage;
      recipeData.languageName = langInfo.name;
    } catch (e) {
      console.error('Failed to parse recipe JSON:', e);
      throw new Error('Failed to parse recipe data');
    }

    // Generate image prompt for the dish
    const imagePrompt = `A beautifully plated dish of ${recipeData.title}, ${cuisineType || 'gourmet'} style, professional food photography, appetizing presentation, restaurant quality, high resolution`;

    console.log('Generating image with prompt:', imagePrompt);

    // Call Lovable AI to generate image
    const imageResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash-image-preview',
        messages: [
          {
            role: 'user',
            content: imagePrompt
          }
        ],
        modalities: ['image', 'text']
      }),
    });

    if (!imageResponse.ok) {
      console.error('Image generation failed, continuing without image');
      return new Response(
        JSON.stringify({ recipe: recipeData, imageData: null }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const imageData = await imageResponse.json();
    const generatedImageUrl = imageData.choices?.[0]?.message?.images?.[0]?.image_url?.url;

    console.log('Image generated successfully');

    return new Response(
      JSON.stringify({ recipe: recipeData, imageData: generatedImageUrl }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-recipe function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
