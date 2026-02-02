import { useLanguage } from "@/contexts/LanguageContext";
import { getStaticTranslation } from "@/lib/translations";

/**
 * Fast synchronous translation hook - NO API CALLS
 * Use this for all UI text that needs translation
 */
export function useTranslate() {
  const { currentLanguage, isRTL } = useLanguage();
  
  const t = (text: string) => getStaticTranslation(text, currentLanguage);
  
  return { t, isRTL, currentLanguage };
}

// Keep backward compatibility alias
export const useStaticTranslation = (texts?: string[]) => useTranslate();
