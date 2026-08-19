import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RecipeCard } from "@/components/RecipeCard";
import { supabase } from "@/integrations/supabase/client";
import { fetchFavoriteRecipes } from "@/lib/recipes";
import type { Recipe } from "@/types/recipe";
import { toast } from "sonner";
import { Heart } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { SEO } from "@/components/SEO";

export default function Favorites() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => { checkAuthAndLoadFavorites(); }, []);

  const checkAuthAndLoadFavorites = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { toast.error("Please sign in to view favorites"); navigate("/auth"); return; }
    loadFavorites(user.id);
  };

  const loadFavorites = async (userId: string) => {
    setLoading(true);
    try {
      setRecipes(await fetchFavoriteRecipes(userId));
    } catch (error: any) {
      console.error("Error loading favorites:", error);
      toast.error("Failed to load recipes");
    } finally { setLoading(false); }
  };

  const handleFavoriteChange = () => { checkAuthAndLoadFavorites(); };

  return (
    <div className="min-h-screen bg-gradient-warm flex flex-col">
      <SEO title="My Favorite Recipes — FlavorAI" description="Your saved recipes on FlavorAI, ready whenever you're hungry for inspiration." path="/favorites" noindex />
      <Navbar />
      <div className="container mx-auto py-12 px-4 flex-1">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="w-8 h-8 text-primary fill-primary" />
          <h1 className="text-4xl font-bold">{t("fav_title")}</h1>
        </div>
        {loading ? (
          <div className="text-center py-12"><p className="text-muted-foreground">{t("fav_loading")}</p></div>
        ) : recipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} {...recipe} isFavorite={true} onFavoriteChange={handleFavoriteChange} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-muted rounded-lg">
            <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg mb-2">{t("fav_empty")}</p>
            <p className="text-sm text-muted-foreground">{t("fav_empty_desc")}</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
