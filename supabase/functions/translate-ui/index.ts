import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SUPPORTED_LANGUAGES: Record<string, { name: string; native: string }> = {
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

// Retry helper with exponential backoff
async function fetchWithRetry(
  url: string,
  options: RequestInit,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<Response> {
  let lastError: Error | null = null;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);
      
      // If rate limited, wait and retry
      if (response.status === 429) {
        const delay = baseDelay * Math.pow(2, attempt) + Math.random() * 500;
        console.log(`Rate limited, retrying in ${delay}ms (attempt ${attempt + 1}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      
      return response;
    } catch (error) {
      lastError = error as Error;
      if (attempt < maxRetries - 1) {
        const delay = baseDelay * Math.pow(2, attempt);
        console.log(`Request failed, retrying in ${delay}ms (attempt ${attempt + 1}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError || new Error("Max retries exceeded");
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse request body
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON body' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { texts, targetLanguage } = body as { texts: string[]; targetLanguage: string };

    // Validate inputs
    if (!texts || !Array.isArray(texts) || texts.length === 0) {
      return new Response(
        JSON.stringify({ error: 'texts must be a non-empty array of strings' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (texts.length > 100) {
      return new Response(
        JSON.stringify({ error: 'Maximum 100 texts per request' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!targetLanguage || !(targetLanguage in SUPPORTED_LANGUAGES)) {
      return new Response(
        JSON.stringify({ error: 'Invalid target language' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // If target is English, return as-is
    if (targetLanguage === 'en') {
      const translations = texts.reduce((acc, text) => ({ ...acc, [text]: text }), {});
      return new Response(
        JSON.stringify({ translations }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const langInfo = SUPPORTED_LANGUAGES[targetLanguage];
    console.log(`Translating ${texts.length} texts to ${langInfo.name}`);

    // Create numbered list for translation
    const numberedTexts = texts.map((text, i) => `${i + 1}. ${text}`).join('\n');

    const systemPrompt = `You are a professional translator. Translate the following UI texts to ${langInfo.name} (${langInfo.native}).

RULES:
- Keep translations natural and appropriate for UI/buttons/headings
- Maintain the same tone and formality
- Keep any technical terms that are commonly used in English
- Return ONLY a JSON object mapping each original text to its translation
- Do not add numbering to the translations`;

    const userPrompt = `Translate these UI texts to ${langInfo.name}:

${numberedTexts}

Return as JSON object like: {"original text": "translated text", ...}`;

    const response = await fetchWithRetry(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
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
      },
      3, // max retries
      1500 // base delay ms
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      // If still rate limited after retries, return original texts as fallback
      if (response.status === 429) {
        console.log("Rate limit exceeded, returning original texts");
        const translations = texts.reduce((acc, text) => ({ ...acc, [text]: text }), {});
        return new Response(
          JSON.stringify({ translations, rateLimited: true }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No response from AI");
    }

    // Parse JSON response
    let translations: Record<string, string>;
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        translations = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Could not parse translation response");
      }
    } catch (parseError) {
      console.error("Parse error:", parseError);
      // Fallback: return original texts
      translations = texts.reduce((acc, text) => ({ ...acc, [text]: text }), {});
    }

    console.log(`Successfully translated ${Object.keys(translations).length} texts`);

    return new Response(
      JSON.stringify({ translations }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error("Translation error:", error);
    // Return original texts on error instead of failing
    try {
      const body = await req.clone().json();
      const { texts } = body as { texts: string[] };
      if (texts && Array.isArray(texts)) {
        const translations = texts.reduce((acc, text) => ({ ...acc, [text]: text }), {});
        return new Response(
          JSON.stringify({ translations, error: true }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    } catch {
      // Ignore parsing error
    }
    
    return new Response(
      JSON.stringify({ error: "Translation failed. Please try again." }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});