import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SUPPORTED_LANGUAGES = {
  en: { name: 'English', native: 'English' },
  ar: { name: 'Arabic', native: 'العربية' },
  zh: { name: 'Chinese', native: '中文' },
  ja: { name: 'Japanese', native: '日本語' },
  de: { name: 'German', native: 'Deutsch' },
  nl: { name: 'Dutch', native: 'Nederlands' },
  es: { name: 'Spanish', native: 'Español' },
  it: { name: 'Italian', native: 'Italiano' },
  ru: { name: 'Russian', native: 'Русский' },
};

// Input validation functions
function validateRecipe(recipe: unknown): { valid: boolean; error?: string } {
  if (!recipe || typeof recipe !== 'object') {
    return { valid: false, error: 'Invalid recipe object' };
  }

  const r = recipe as Record<string, unknown>;

  // Validate title
  if (!r.title || typeof r.title !== 'string' || r.title.length === 0) {
    return { valid: false, error: 'Recipe title is required' };
  }
  if (r.title.length > 200) {
    return { valid: false, error: 'Recipe title must be less than 200 characters' };
  }

  // Validate description (optional but must be string if present)
  if (r.description !== undefined && r.description !== null) {
    if (typeof r.description !== 'string') {
      return { valid: false, error: 'Recipe description must be a string' };
    }
    if (r.description.length > 2000) {
      return { valid: false, error: 'Recipe description must be less than 2000 characters' };
    }
  }

  // Validate ingredients
  if (!Array.isArray(r.ingredients)) {
    return { valid: false, error: 'Recipe ingredients must be an array' };
  }
  if (r.ingredients.length === 0) {
    return { valid: false, error: 'Recipe must have at least one ingredient' };
  }
  if (r.ingredients.length > 100) {
    return { valid: false, error: 'Recipe cannot have more than 100 ingredients' };
  }
  for (const ing of r.ingredients) {
    if (!ing || typeof ing !== 'object') {
      return { valid: false, error: 'Invalid ingredient format' };
    }
    const ingredient = ing as Record<string, unknown>;
    if (typeof ingredient.amount !== 'string' && typeof ingredient.amount !== 'number') {
      return { valid: false, error: 'Ingredient amount must be a string or number' };
    }
    if (typeof ingredient.item !== 'string' || ingredient.item.length === 0) {
      return { valid: false, error: 'Ingredient item must be a non-empty string' };
    }
  }

  // Validate instructions
  if (!Array.isArray(r.instructions)) {
    return { valid: false, error: 'Recipe instructions must be an array' };
  }
  if (r.instructions.length === 0) {
    return { valid: false, error: 'Recipe must have at least one instruction' };
  }
  if (r.instructions.length > 100) {
    return { valid: false, error: 'Recipe cannot have more than 100 instructions' };
  }
  for (const inst of r.instructions) {
    if (!inst || typeof inst !== 'object') {
      return { valid: false, error: 'Invalid instruction format' };
    }
    const instruction = inst as Record<string, unknown>;
    if (typeof instruction.step !== 'number') {
      return { valid: false, error: 'Instruction step must be a number' };
    }
    if (typeof instruction.instruction !== 'string' || instruction.instruction.length === 0) {
      return { valid: false, error: 'Instruction text must be a non-empty string' };
    }
  }

  return { valid: true };
}

function validateTargetLanguage(targetLanguage: unknown): { valid: boolean; error?: string } {
  if (!targetLanguage || typeof targetLanguage !== 'string') {
    return { valid: false, error: 'Target language is required' };
  }
  
  // Check against allowed languages only
  if (!(targetLanguage in SUPPORTED_LANGUAGES)) {
    return { valid: false, error: 'Unsupported target language' };
  }

  return { valid: true };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authentication check
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Authorization header required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    if (authError || !user) {
      console.error('Auth error:', authError);
      return new Response(
        JSON.stringify({ error: 'Invalid authentication token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Translation request from user: ${user.id}`);

    // Parse and validate input
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON body' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!body || typeof body !== 'object') {
      return new Response(
        JSON.stringify({ error: 'Request body must be an object' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { recipe, targetLanguage } = body as { recipe: unknown; targetLanguage: unknown };

    // Validate recipe
    const recipeValidation = validateRecipe(recipe);
    if (!recipeValidation.valid) {
      return new Response(
        JSON.stringify({ error: recipeValidation.error }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate target language
    const langValidation = validateTargetLanguage(targetLanguage);
    if (!langValidation.valid) {
      return new Response(
        JSON.stringify({ error: langValidation.error }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const validatedRecipe = recipe as {
      title: string;
      description?: string;
      ingredients: Array<{ amount: string | number; item: string }>;
      instructions: Array<{ step: number; instruction: string }>;
    };

    const langInfo = SUPPORTED_LANGUAGES[targetLanguage as keyof typeof SUPPORTED_LANGUAGES];

    console.log(`Translating recipe "${validatedRecipe.title}" to ${langInfo.name}`);

    const systemPrompt = `You are a professional culinary translator. Translate the recipe content to ${langInfo.name} (${langInfo.native}).
    
IMPORTANT RULES:
- Maintain the exact same structure and format
- Keep measurements accurate (convert if culturally appropriate)
- Preserve cooking techniques but use local terminology where appropriate
- Keep the recipe authentic while making it accessible to ${langInfo.name} speakers
- Return ONLY valid JSON, no markdown or extra text`;

    // Sanitize input by limiting string lengths in the prompt
    const sanitizedTitle = validatedRecipe.title.substring(0, 200);
    const sanitizedDescription = (validatedRecipe.description || '').substring(0, 2000);
    const sanitizedIngredients = validatedRecipe.ingredients.slice(0, 100).map((ing) => ({
      amount: String(ing.amount).substring(0, 100),
      item: ing.item.substring(0, 200),
    }));
    const sanitizedInstructions = validatedRecipe.instructions.slice(0, 100).map((inst) => ({
      step: inst.step,
      instruction: inst.instruction.substring(0, 2000),
    }));

    const userPrompt = `Translate this recipe to ${langInfo.name}:

Title: ${sanitizedTitle}
Description: ${sanitizedDescription}

Ingredients:
${sanitizedIngredients.map((ing) => `- ${ing.amount} ${ing.item}`).join('\n')}

Instructions:
${sanitizedInstructions.map((inst) => `${inst.step}. ${inst.instruction}`).join('\n')}

Return the translation as JSON with this exact structure:
{
  "title": "translated title",
  "description": "translated description",
  "ingredients": [{"amount": "translated amount", "item": "translated item"}],
  "instructions": [{"step": 1, "instruction": "translated instruction"}]
}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required. Please add credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No response from AI");
    }

    // Parse the JSON response
    let translatedRecipe;
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        translatedRecipe = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Could not parse translation response");
      }
    } catch (parseError) {
      console.error("Parse error:", parseError);
      throw new Error("Failed to parse translation");
    }

    console.log(`Successfully translated recipe to ${langInfo.name}`);

    return new Response(JSON.stringify({
      success: true,
      translatedRecipe: {
        ...translatedRecipe,
        language: targetLanguage,
      },
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Translation error:", error);
    return new Response(JSON.stringify({
      error: "Translation failed. Please try again."
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
