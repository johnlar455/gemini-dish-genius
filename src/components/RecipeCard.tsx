import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Clock, Users, ChefHat, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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

  const handleFavoriteToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsTogglingFavorite(true);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      toast.error("Please sign in to save favorites");
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
        toast.success("Removed from favorites");
      } else {
        const { error } = await supabase
          .from("favorites")
          .insert({ user_id: user.id, recipe_id: id });

        if (error) throw error;
        setLocalIsFavorite(true);
        toast.success("Added to favorites");
      }
      onFavoriteChange?.();
    } catch (error: any) {
      console.error("Error toggling favorite:", error);
      toast.error("Failed to update favorites");
    } finally {
      setIsTogglingFavorite(false);
    }
  };

  const totalTime = (prep_time || 0) + (cook_time || 0);
  const displayImage = image_data || image_url || "/placeholder.svg";

  return (
    <Link to={`/recipe/${id}`}>
      <Card className="group overflow-hidden hover:shadow-card transition-all duration-300 h-full">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={displayImage}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background"
            onClick={handleFavoriteToggle}
            disabled={isTogglingFavorite}
          >
            <Heart
              className={`w-5 h-5 ${localIsFavorite ? "fill-primary text-primary" : "text-foreground"}`}
            />
          </Button>
          {language && language !== 'en' && LANGUAGE_LABELS[language] && (
            <Badge variant="secondary" className="absolute top-2 left-2 text-xs">
              {LANGUAGE_LABELS[language]}
            </Badge>
          )}
        </div>

        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
          </div>
          {description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
              {description}
            </p>
          )}
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap gap-2 mb-3">
            {difficulty && (
              <Badge variant="secondary" className="capitalize">
                <ChefHat className="w-3 h-3 mr-1" />
                {difficulty}
              </Badge>
            )}
            {cuisine_type && (
              <Badge variant="outline">{cuisine_type}</Badge>
            )}
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {totalTime > 0 && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{totalTime}min</span>
              </div>
            )}
            {servings && (
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{servings} servings</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
