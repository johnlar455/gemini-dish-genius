import { useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getStaticTranslation, getStaticTranslations } from "@/lib/translations";

/**
 * Fast translation hook using static dictionary - NO API CALLS
 * Use this for all common UI text that doesn't change
 */
export function useStaticTranslation(texts: string[]) {
  const { currentLanguage, isRTL } = useLanguage();

  const translatedTexts = useMemo(() => {
    return getStaticTranslations(texts, currentLanguage);
  }, [texts.join("|"), currentLanguage]);

  const t = (text: string) => translatedTexts[text] || getStaticTranslation(text, currentLanguage);

  return { t, isRTL, currentLanguage };
}

/**
 * Single text translation - synchronous, no API calls
 */
export function useTranslate() {
  const { currentLanguage, isRTL } = useLanguage();
  
  const t = (text: string) => getStaticTranslation(text, currentLanguage);
  
  return { t, isRTL, currentLanguage };
}
