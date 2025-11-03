import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.74.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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
  return { valid: true };
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

    const { prompt, dietaryPreferences, ingredients, cuisineType } = requestData;
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Build the prompt for recipe generation
    let fullPrompt = `Generate a detailed recipe`;
    
    if (prompt) fullPrompt += ` for ${prompt}`;
    if (cuisineType) fullPrompt += ` in ${cuisineType} cuisine style`;
    if (ingredients && ingredients.length > 0) fullPrompt += ` using these ingredients: ${ingredients.join(', ')}`;
    if (dietaryPreferences && dietaryPreferences.length > 0) {
      fullPrompt += `. This recipe must be ${dietaryPreferences.join(', ')} friendly`;
    }

    fullPrompt += `.

Please provide:
1. A catchy recipe title
2. A brief description (2-3 sentences)
3. Prep time in minutes
4. Cook time in minutes
5. Number of servings
6. Difficulty level (easy, medium, or hard)
7. Complete list of ingredients with measurements
8. Step-by-step cooking instructions

Format the response as JSON with this structure:
{
  "title": "Recipe Title",
  "description": "Brief description",
  "prepTime": 15,
  "cookTime": 30,
  "servings": 4,
  "difficulty": "medium",
  "ingredients": [
    { "item": "ingredient name", "amount": "measurement" }
  ],
  "instructions": [
    { "step": 1, "instruction": "First step..." },
    { "step": 2, "instruction": "Second step..." }
  ],
  "cuisineType": "${cuisineType || 'International'}",
  "dietaryPreferences": ${JSON.stringify(dietaryPreferences || [])}
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
            content: 'You are a professional chef and recipe creator. Generate detailed, delicious recipes in JSON format exactly as requested.'
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
