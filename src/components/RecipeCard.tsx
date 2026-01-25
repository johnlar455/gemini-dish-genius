import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, ChefHat, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePageTranslation } from "@/hooks/usePageTranslation";

interface RecipeCardProps {
  id: string;
  title: string;
  description?: string;
  image_url?: string;
  image_data?: string;
  prep_time?: number;
  cook_time?: number;
  servings?: number;
  difficulty?: string;
  cuisine_type?: string;
  language?: string;
  isFavorite?: boolean;
  onFavoriteChange?: () => void;
}

const LANGUAGE_LABELS: Record<string, string> = {
  en: 'English',
  ar: 'العربية',
  zh: '中文',
  ja: '日本語',
  de: 'Deutsch',
  nl: 'Nederlands',
  es: 'Español',
  it: 'Italiano',
  ru: 'Русский',
};

const DIFFICULTY_TRANSLATIONS: Record<string, Record<string, string>> = {
  en: { easy: 'Easy', medium: 'Medium', hard: 'Hard' },
  ar: { easy: 'سهل', medium: 'متوسط', hard: 'صعب' },
  zh: { easy: '简单', medium: '中等', hard: '困难' },
  ja: { easy: '簡単', medium: '普通', hard: '難しい' },
  de: { easy: 'Einfach', medium: 'Mittel', hard: 'Schwer' },
  nl: { easy: 'Makkelijk', medium: 'Gemiddeld', hard: 'Moeilijk' },
  es: { easy: 'Fácil', medium: 'Medio', hard: 'Difícil' },
  it: { easy: 'Facile', medium: 'Medio', hard: 'Difficile' },
  ru: { easy: 'Легко', medium: 'Средне', hard: 'Сложно' },
};

const CARD_TEXTS = [
  "Please sign in to save favorites",
  "Removed from favorites",
  "Added to favorites",
  "Failed to update favorites",
  "min",
  "servings",
];

export const RecipeCard = ({
  id,
  title,
  description,
  image_url,
  image_data,
  prep_time,
  cook_time,
  servings,
  difficulty,
  cuisine_type,
  language,
  isFavorite = false,
  onFavoriteChange,
}: RecipeCardProps) => {
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);
  const [localIsFavorite, setLocalIsFavorite] = useState(isFavorite);
  const { currentLanguage, isRTL } = useLanguage();
  const { t } = usePageTranslation(CARD_TEXTS);
  const [translatedTitle, setTranslatedTitle] = useState(title);
  const [translatedDescription, setTranslatedDescription] = useState(description || "");
  const [isTranslating, setIsTranslating] = useState(false);

  // Translate content when language changes
  useEffect(() => {
    const translateContent = async () => {
      // Skip translation if source language matches target or if English
      const sourceLanguage = language || 'en';
      if (sourceLanguage === currentLanguage || currentLanguage === 'en') {
        setTranslatedTitle(title);
        setTranslatedDescription(description || "");
        return;
      }

      // Check cache first
      const cacheKey = `recipe_card_${id}_${currentLanguage}`;
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        const { title: cachedTitle, description: cachedDesc } = JSON.parse(cached);
        setTranslatedTitle(cachedTitle);
        setTranslatedDescription(cachedDesc);
        return;
      }

      setIsTranslating(true);
      try {
        const { data, error } = await supabase.functions.invoke('translate-ui', {
          body: { 
            texts: [title, description || ""],
            targetLanguage: currentLanguage
          }
        });

        if (error) throw error;
        
        const translations = data.translations || [title, description || ""];
        setTranslatedTitle(translations[0] || title);
        setTranslatedDescription(translations[1] || description || "");

        // Cache the translations
        sessionStorage.setItem(cacheKey, JSON.stringify({
          title: translations[0] || title,
          description: translations[1] || description || ""
        }));
      } catch (error) {
        console.error("Translation error:", error);
        // Keep original on error
      } finally {
        setIsTranslating(false);
      }
    };

    translateContent();
  }, [currentLanguage, id, title, description, language]);

  const handleFavoriteToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsTogglingFavorite(true);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      toast.error(t("Please sign in to save favorites"));
      setIsTogglingFavorite(false);
      return;
    }

    try {
      if (localIsFavorite) {
        const { error } = await supabase
          .from("favorites")
          .delete()
          .eq("user_id", user.id)
          .eq("recipe_id", id);

        if (error) throw error;
        setLocalIsFavorite(false);
        toast.success(t("Removed from favorites"));
      } else {
        const { error } = await supabase
          .from("favorites")
          .insert({ user_id: user.id, recipe_id: id });

        if (error) throw error;
        setLocalIsFavorite(true);
        toast.success(t("Added to favorites"));
      }
      onFavoriteChange?.();
    } catch (error: any) {
      console.error("Error toggling favorite:", error);
      toast.error(t("Failed to update favorites"));
    } finally {
      setIsTogglingFavorite(false);
    }
  };

  const totalTime = (prep_time || 0) + (cook_time || 0);
  const displayImage = image_data || image_url || "/placeholder.svg";

  // Get translated difficulty
  const getTranslatedDifficulty = () => {
    if (!difficulty) return null;
    const diffLower = difficulty.toLowerCase();
    return DIFFICULTY_TRANSLATIONS[currentLanguage]?.[diffLower] || 
           DIFFICULTY_TRANSLATIONS.en[diffLower] || 
           difficulty;
  };

  return (
    <Link to={`/recipe/${id}`}>
      <Card className={`group overflow-hidden hover:shadow-card transition-all duration-300 h-full ${isTranslating ? 'opacity-80' : ''}`}>
        <div className="relative aspect-video overflow-hidden">
          <img
            src={displayImage}
            alt={translatedTitle}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-2 ${isRTL ? 'left-2' : 'right-2'} bg-background/80 backdrop-blur-sm hover:bg-background`}
            onClick={handleFavoriteToggle}
            disabled={isTogglingFavorite}
          >
            <Heart
              className={`w-5 h-5 ${localIsFavorite ? "fill-primary text-primary" : "text-foreground"}`}
            />
          </Button>
          {language && language !== 'en' && LANGUAGE_LABELS[language] && (
            <Badge variant="secondary" className={`absolute top-2 ${isRTL ? 'right-2' : 'left-2'} text-xs`}>
              {LANGUAGE_LABELS[language]}
            </Badge>
          )}
        </div>

        <CardHeader dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="flex items-start justify-between gap-2">
            <h3 className={`font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors ${isRTL ? 'text-right' : ''}`}>
              {translatedTitle}
            </h3>
          </div>
          {translatedDescription && (
            <p className={`text-sm text-muted-foreground line-clamp-2 mt-2 ${isRTL ? 'text-right' : ''}`}>
              {translatedDescription}
            </p>
          )}
        </CardHeader>

        <CardContent dir={isRTL ? 'rtl' : 'ltr'}>
          <div className={`flex flex-wrap gap-2 mb-3 ${isRTL ? 'justify-end' : ''}`}>
            {difficulty && (
              <Badge variant="secondary" className={`capitalize ${isRTL ? 'flex-row-reverse' : ''}`}>
                <ChefHat className={`w-3 h-3 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                {getTranslatedDifficulty()}
              </Badge>
            )}
            {cuisine_type && (
              <Badge variant="outline">{cuisine_type}</Badge>
            )}
          </div>

          <div className={`flex items-center gap-4 text-sm text-muted-foreground ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
            {totalTime > 0 && (
              <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Clock className="w-4 h-4" />
                <span>{totalTime} {t("min")}</span>
              </div>
            )}
            {servings && (
              <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Users className="w-4 h-4" />
                <span>{servings} {t("servings")}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
