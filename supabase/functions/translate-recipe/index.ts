import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { recipe, targetLanguage } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    if (!recipe || !targetLanguage) {
      throw new Error("Missing recipe or target language");
    }

    const langInfo = SUPPORTED_LANGUAGES[targetLanguage as keyof typeof SUPPORTED_LANGUAGES];
    if (!langInfo) {
      throw new Error("Unsupported target language");
    }

    console.log(`Translating recipe "${recipe.title}" to ${langInfo.name}`);

    const systemPrompt = `You are a professional culinary translator. Translate the recipe content to ${langInfo.name} (${langInfo.native}).
    
IMPORTANT RULES:
- Maintain the exact same structure and format
- Keep measurements accurate (convert if culturally appropriate)
- Preserve cooking techniques but use local terminology where appropriate
- Keep the recipe authentic while making it accessible to ${langInfo.name} speakers
- Return ONLY valid JSON, no markdown or extra text`;

    const userPrompt = `Translate this recipe to ${langInfo.name}:

Title: ${recipe.title}
Description: ${recipe.description || ''}

Ingredients:
${recipe.ingredients.map((ing: any) => `- ${ing.amount} ${ing.item}`).join('\n')}

Instructions:
${recipe.instructions.map((inst: any) => `${inst.step}. ${inst.instruction}`).join('\n')}

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
      error: error instanceof Error ? error.message : "Translation failed"
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});