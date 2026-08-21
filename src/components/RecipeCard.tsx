import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, ChefHat, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, memo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useLanguage } from "@/i18n/LanguageContext";

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
  isFavorite?: boolean;
  onFavoriteChange?: () => void;
}

export const RecipeCard = memo(function RecipeCard({
  id, title, description, image_url, image_data, prep_time, cook_time,
  servings, difficulty, cuisine_type, isFavorite = false, onFavoriteChange,
}: RecipeCardProps) {
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);
  const [localIsFavorite, setLocalIsFavorite] = useState(isFavorite);
  const { t } = useLanguage();

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
        const { error } = await supabase.from("favorites").delete().eq("user_id", user.id).eq("recipe_id", id);
        if (error) throw error;
        setLocalIsFavorite(false);
        toast.success("Removed from favorites");
      } else {
        const { error } = await supabase.from("favorites").insert({ user_id: user.id, recipe_id: id });
        if (error) throw error;
        setLocalIsFavorite(true);
        toast.success("Added to favorites");
      }
      onFavoriteChange?.();
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast.error("Failed to update favorites");
    } finally {
      setIsTogglingFavorite(false);
    }
  };

  const totalTime = (prep_time || 0) + (cook_time || 0);
  const displayImage = image_data || image_url || "/placeholder.svg";

  return (
    // The favourite button lives outside the <Link> — a <button> nested inside
    // an <a> is invalid HTML and breaks keyboard/screen-reader navigation.
    <Card className="group relative h-full overflow-hidden rounded-[2rem] border-0 bg-card p-2 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
      <Button
        variant="ghost"
        size="icon"
        aria-label={localIsFavorite ? `Remove ${title} from favorites` : `Save ${title} to favorites`}
        aria-pressed={localIsFavorite}
        className="absolute right-4 top-4 z-10 rounded-full bg-card/85 shadow-soft backdrop-blur-sm hover:bg-card"
        onClick={handleFavoriteToggle}
        disabled={isTogglingFavorite}
      >
        <Heart className={`w-5 h-5 ${localIsFavorite ? "fill-primary text-primary" : "text-foreground"}`} aria-hidden="true" />
      </Button>
      <Link to={`/recipe/${id}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg">
        <div className="arch-top relative aspect-[4/3] overflow-hidden">
          <img
            src={displayImage}
            alt={title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <CardHeader>
          <h3 className="font-display text-lg font-bold line-clamp-2 group-hover:text-primary transition-colors">{title}</h3>
          {description && <p className="text-sm text-muted-foreground line-clamp-2 mt-2">{description}</p>}
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-3">
            {difficulty && (
              <Badge variant="secondary" className="rounded-full capitalize">
                <ChefHat className="w-3 h-3 mr-1" aria-hidden="true" />{difficulty}
              </Badge>
            )}
            {cuisine_type && <Badge variant="outline" className="rounded-full">{cuisine_type}</Badge>}
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {totalTime > 0 && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" aria-hidden="true" /><span>{totalTime} {t("detail_min")}</span>
              </div>
            )}
            {servings && (
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" aria-hidden="true" /><span>{servings} {t("common_servings")}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
});
