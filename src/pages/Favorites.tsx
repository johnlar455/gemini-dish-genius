import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RecipeCard } from "@/components/RecipeCard";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Heart } from "lucide-react";
import { useStaticTranslation } from "@/hooks/useStaticTranslation";
import { useLanguage } from "@/contexts/LanguageContext";

const PAGE_TEXTS = [
  "My Favorite Recipes",
  "Loading your favorites...",
  "No favorite recipes yet",
  "Start exploring recipes and save your favorites!",
  "Please sign in to view favorites",
];

export default function Favorites() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useStaticTranslation(PAGE_TEXTS);
  const { isRTL } = useLanguage();

  useEffect(() => {
    checkAuthAndLoadFavorites();
  }, []);

  const checkAuthAndLoadFavorites = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error(t("Please sign in to view favorites"));
      navigate("/auth");
      return;
    }
    loadFavorites(user.id);
  };

  const loadFavorites = async (userId: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("favorites")
        .select(`
          recipe_id,
          recipes (*)
        `)
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      const favoriteRecipes = data?.map((fav: any) => fav.recipes) || [];
      setRecipes(favoriteRecipes);
    } catch (error: any) {
      console.error("Error loading favorites:", error);
      toast.error("Failed to load favorites");
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteChange = () => {
    checkAuthAndLoadFavorites();
  };

  return (
    <div className="min-h-screen bg-gradient-warm flex flex-col" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />

      <div className="container mx-auto py-12 px-4 flex-1">
        <div className={`flex items-center gap-3 mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Heart className="w-8 h-8 text-primary fill-primary" />
          <h1 className="text-4xl font-bold">{t("My Favorite Recipes")}</h1>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t("Loading your favorites...")}</p>
          </div>
        ) : recipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                {...recipe}
                isFavorite={true}
                onFavoriteChange={handleFavoriteChange}
              />
            ))}
          </div>
        ) : (
          <div className={`text-center py-12 bg-muted rounded-lg ${isRTL ? 'text-right' : ''}`}>
            <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg mb-2">{t("No favorite recipes yet")}</p>
            <p className="text-sm text-muted-foreground">
              {t("Start exploring recipes and save your favorites!")}
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
