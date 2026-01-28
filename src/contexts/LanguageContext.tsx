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

interface LanguageContextType {
  currentLanguage: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "flavorai_language";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");
  const [userId, setUserId] = useState<string | null>(null);

  // Load language preference on mount
  useEffect(() => {
    const storedLang = localStorage.getItem(STORAGE_KEY) as LanguageCode;
    if (storedLang && SUPPORTED_LANGUAGES.some(l => l.code === storedLang)) {
      setCurrentLanguage(storedLang);
    }

    // Check user preference
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUserId(session.user.id);
        supabase
          .from("profiles")
          .select("preferred_language")
          .eq("id", session.user.id)
          .single()
          .then(({ data: profile }) => {
            if (profile?.preferred_language) {
              setCurrentLanguage(profile.preferred_language as LanguageCode);
              localStorage.setItem(STORAGE_KEY, profile.preferred_language);
            }
          });
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user?.id || null);
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

    if (userId) {
      supabase
        .from("profiles")
        .update({ preferred_language: lang })
        .eq("id", userId)
        .then(() => {});
    }

    const langName = SUPPORTED_LANGUAGES.find(l => l.code === lang)?.name || lang;
    toast.success(`Language changed to ${langName}`);
  };

  const isRTL = SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage)?.dir === "rtl";

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, isRTL }}>
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
