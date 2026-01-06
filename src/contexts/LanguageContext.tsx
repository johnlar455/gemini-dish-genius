import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const SUPPORTED_LANGUAGES = [
  { code: "en", name: "English", nativeName: "🇬🇧 English", dir: "ltr" },
  { code: "ar", name: "Arabic", nativeName: "🇸🇦 العربية", dir: "rtl" },
  { code: "zh", name: "Chinese", nativeName: "🇨🇳 中文", dir: "ltr" },
  { code: "ja", name: "Japanese", nativeName: "🇯🇵 日本語", dir: "ltr" },
  { code: "de", name: "German", nativeName: "🇩🇪 Deutsch", dir: "ltr" },
  { code: "nl", name: "Dutch", nativeName: "🇳🇱 Nederlands", dir: "ltr" },
  { code: "es", name: "Spanish", nativeName: "🇪🇸 Español", dir: "ltr" },
  { code: "it", name: "Italian", nativeName: "🇮🇹 Italiano", dir: "ltr" },
  { code: "ru", name: "Russian", nativeName: "🇷🇺 Русский", dir: "ltr" },
] as const;

export type LanguageCode = typeof SUPPORTED_LANGUAGES[number]["code"];

interface TranslationCache {
  [key: string]: {
    [langCode: string]: string;
  };
}

interface LanguageContextType {
  currentLanguage: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  isRTL: boolean;
  translate: (text: string, key?: string) => string;
  translateAsync: (text: string, key?: string) => Promise<string>;
  translations: TranslationCache;
  isTranslating: boolean;
  translatePage: (texts: string[]) => Promise<Record<string, string>>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "flavorai_language";
const TRANSLATIONS_CACHE_KEY = "flavorai_translations";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");
  const [translations, setTranslations] = useState<TranslationCache>({});
  const [isTranslating, setIsTranslating] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  // Load cached translations from localStorage
  useEffect(() => {
    try {
      const cached = localStorage.getItem(TRANSLATIONS_CACHE_KEY);
      if (cached) {
        setTranslations(JSON.parse(cached));
      }
    } catch (e) {
      console.error("Error loading translation cache:", e);
    }
  }, []);

  // Save translations to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(TRANSLATIONS_CACHE_KEY, JSON.stringify(translations));
    } catch (e) {
      console.error("Error saving translation cache:", e);
    }
  }, [translations]);

  // Load language preference
  useEffect(() => {
    const loadLanguage = async () => {
      // First check localStorage
      const storedLang = localStorage.getItem(STORAGE_KEY) as LanguageCode;
      if (storedLang && SUPPORTED_LANGUAGES.some(l => l.code === storedLang)) {
        setCurrentLanguage(storedLang);
      }

      // Then check if user is logged in and has a preference
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUserId(session.user.id);
        const { data: profile } = await supabase
          .from("profiles")
          .select("preferred_language")
          .eq("id", session.user.id)
          .single();
        
        if (profile?.preferred_language) {
          setCurrentLanguage(profile.preferred_language as LanguageCode);
          localStorage.setItem(STORAGE_KEY, profile.preferred_language);
        }
      }
    };

    loadLanguage();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUserId(session.user.id);
        const { data: profile } = await supabase
          .from("profiles")
          .select("preferred_language")
          .eq("id", session.user.id)
          .single();
        
        if (profile?.preferred_language) {
          setCurrentLanguage(profile.preferred_language as LanguageCode);
          localStorage.setItem(STORAGE_KEY, profile.preferred_language);
        }
      } else {
        setUserId(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Update document direction when language changes
  useEffect(() => {
    const langInfo = SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage);
    document.documentElement.dir = langInfo?.dir || "ltr";
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  const setLanguage = async (lang: LanguageCode) => {
    setCurrentLanguage(lang);
    localStorage.setItem(STORAGE_KEY, lang);

    // If user is logged in, sync to profile
    if (userId) {
      try {
        await supabase
          .from("profiles")
          .update({ preferred_language: lang })
          .eq("id", userId);
      } catch (error) {
        console.error("Error syncing language preference:", error);
      }
    }

    const langName = SUPPORTED_LANGUAGES.find(l => l.code === lang)?.name || lang;
    toast.success(`Language changed to ${langName}`);
  };

  const isRTL = SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage)?.dir === "rtl";

  // Synchronous translate - returns cached translation or original text
  const translate = (text: string, key?: string): string => {
    if (currentLanguage === "en") return text;
    const cacheKey = key || text;
    return translations[cacheKey]?.[currentLanguage] || text;
  };

  // Async translate - fetches translation if not cached
  const translateAsync = async (text: string, key?: string): Promise<string> => {
    if (currentLanguage === "en") return text;
    
    const cacheKey = key || text;
    if (translations[cacheKey]?.[currentLanguage]) {
      return translations[cacheKey][currentLanguage];
    }

    // Call translation API
    try {
      const { data, error } = await supabase.functions.invoke("translate-ui", {
        body: { texts: [text], targetLanguage: currentLanguage },
      });

      if (error) throw error;

      const translated = data.translations[text] || text;
      setTranslations(prev => ({
        ...prev,
        [cacheKey]: {
          ...prev[cacheKey],
          [currentLanguage]: translated,
        },
      }));

      return translated;
    } catch (error) {
      console.error("Translation error:", error);
      return text;
    }
  };

  // Batch translate multiple texts
  const translatePage = async (texts: string[]): Promise<Record<string, string>> => {
    if (currentLanguage === "en") {
      return texts.reduce((acc, text) => ({ ...acc, [text]: text }), {});
    }

    // Filter out already cached translations
    const uncached = texts.filter(text => !translations[text]?.[currentLanguage]);
    
    if (uncached.length === 0) {
      return texts.reduce((acc, text) => ({
        ...acc,
        [text]: translations[text]?.[currentLanguage] || text,
      }), {});
    }

    setIsTranslating(true);
    try {
      const { data, error } = await supabase.functions.invoke("translate-ui", {
        body: { texts: uncached, targetLanguage: currentLanguage },
      });

      if (error) throw error;

      // Update cache
      const newTranslations: TranslationCache = { ...translations };
      for (const [original, translated] of Object.entries(data.translations as Record<string, string>)) {
        newTranslations[original] = {
          ...newTranslations[original],
          [currentLanguage]: translated,
        };
      }
      setTranslations(newTranslations);

      // Return all translations (cached + new)
      return texts.reduce((acc, text) => ({
        ...acc,
        [text]: newTranslations[text]?.[currentLanguage] || text,
      }), {});
    } catch (error) {
      console.error("Translation error:", error);
      return texts.reduce((acc, text) => ({ ...acc, [text]: text }), {});
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setLanguage,
        isRTL,
        translate,
        translateAsync,
        translations,
        isTranslating,
        translatePage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
