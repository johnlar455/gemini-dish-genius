import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Hook to translate an array of static texts on a page
 * Returns the translated texts as a map
 */
export function usePageTranslation(texts: string[]) {
  const { currentLanguage, translatePage, translations } = useLanguage();
  const [translatedTexts, setTranslatedTexts] = useState<Record<string, string>>(() => 
    texts.reduce((acc, text) => ({ ...acc, [text]: text }), {})
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentLanguage === "en") {
      setTranslatedTexts(texts.reduce((acc, text) => ({ ...acc, [text]: text }), {}));
      return;
    }

    // Check if all texts are already cached
    const allCached = texts.every(text => translations[text]?.[currentLanguage]);
    if (allCached) {
      setTranslatedTexts(
        texts.reduce((acc, text) => ({
          ...acc,
          [text]: translations[text][currentLanguage],
        }), {})
      );
      return;
    }

    // Fetch translations
    setIsLoading(true);
    translatePage(texts)
      .then(setTranslatedTexts)
      .finally(() => setIsLoading(false));
  }, [currentLanguage, texts.join("|")]);

  const t = (text: string) => translatedTexts[text] || text;

  return { t, isLoading };
}
