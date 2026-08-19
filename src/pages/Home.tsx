import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RecipeCard } from "@/components/RecipeCard";
import { fetchRecipes } from "@/lib/recipes";
import type { Recipe } from "@/types/recipe";
import { Search, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/i18n/LanguageContext";
import { SEO } from "@/components/SEO";

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => { loadRecipes(); }, []);

  const loadRecipes = async () => {
    setLoading(true);
    try {
      // Shared data layer: explicit columns (never user_id) + normalized JSON.
      setRecipes(await fetchRecipes({ limit: 12 }));
    } catch (error: any) {
      console.error("Error loading recipes:", error);
      toast.error("Failed to load recipes");
    } finally { setLoading(false); }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-warm flex flex-col">
      <SEO title="FlavorAI — AI-Powered Recipe Discovery" description="Discover, save, and generate personalized recipes powered by AI. Browse featured dishes or create your own from any ingredients." path="/" keywords="AI recipe generator, recipe ideas, cooking app, meal ideas, free recipes" />
      <Navbar />
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            {t("home_hero_title")}
            <span className="block text-primary mt-2">{t("home_hero_title_accent")}</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">{t("home_hero_desc")}</p>
          <div className="flex gap-3 max-w-2xl mx-auto mb-6">
            <Input placeholder={t("home_search_placeholder")} value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()} className="h-12 text-base" />
            <Button variant="hero" size="lg" onClick={handleSearch}><Search className="w-5 h-5" /></Button>
          </div>
          <Button variant="secondary" size="lg" onClick={() => navigate("/generate")} className="shadow-soft">
            <Sparkles className="w-5 h-5 mr-2" />{t("home_generate_ai")}
          </Button>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">{t("home_featured")}</h2>
              <p className="text-muted-foreground">{t("home_featured_desc")}</p>
            </div>
          </div>
          {loading ? (
            <div className="text-center py-12"><p className="text-muted-foreground">{t("home_loading")}</p></div>
          ) : recipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recipes.map((recipe) => <RecipeCard key={recipe.id} {...recipe} />)}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted rounded-lg">
              <p className="text-muted-foreground mb-4">{t("home_no_recipes")}</p>
              <Button variant="hero" onClick={() => navigate("/generate")}>
                <Sparkles className="w-5 h-5 mr-2" />{t("home_first_recipe")}
              </Button>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
