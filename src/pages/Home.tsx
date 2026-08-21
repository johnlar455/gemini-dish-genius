import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RecipeCard } from "@/components/RecipeCard";
import { fetchRecipes } from "@/lib/recipes";
import type { Recipe } from "@/types/recipe";
import { ArrowRight, Search, Sparkles } from "lucide-react";
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

  // Collage reuses the newest recipes as hero imagery — no extra content, pure presentation.
  const collage = recipes.slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-warm flex flex-col">
      <SEO title="FlavorAI — AI-Powered Recipe Discovery" description="Discover, save, and generate personalized recipes powered by AI. Browse featured dishes or create your own from any ingredients." path="/" keywords="AI recipe generator, recipe ideas, cooking app, meal ideas, free recipes" />
      <Navbar />

      <div className="container mx-auto flex-1 px-4 py-8 sm:px-6">
        <div className="canvas-surface overflow-hidden px-5 py-10 sm:px-10 sm:py-14">
          <section className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h1 className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
                {t("home_hero_title")}
                <span className="mt-2 block">
                  <span className="rounded-full bg-primary px-4 py-1 text-primary-foreground">{t("home_hero_title_accent")}</span>
                </span>
              </h1>
              <p className="mt-6 max-w-md text-lg text-muted-foreground">{t("home_hero_desc")}</p>

              <div className="mt-8 flex max-w-lg gap-3">
                <Input placeholder={t("home_search_placeholder")} value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="h-12 rounded-full border-border bg-secondary/60 px-5 text-base" />
                <Button variant="hero" size="lg" onClick={handleSearch} aria-label={t("home_search_placeholder")}>
                  <Search className="h-5 w-5" aria-hidden="true" />
                </Button>
              </div>

              <Button variant="outline" size="lg" onClick={() => navigate("/generate")} className="mt-4 font-semibold">
                <Sparkles className="mr-2 h-5 w-5" aria-hidden="true" />{t("home_generate_ai")}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
            </div>

            {collage.length >= 3 && (
              <div className="grid grid-cols-2 gap-3 sm:gap-4" aria-hidden="true">
                <Link to={`/recipe/${collage[0].id}`} className="arch-top col-span-1 row-span-2 overflow-hidden">
                  <img src={collage[0].image_data || collage[0].image_url || "/placeholder.svg"} alt="" loading="lazy" decoding="async"
                    className="h-full min-h-[16rem] w-full object-cover transition-transform duration-500 hover:scale-105" />
                </Link>
                {collage.slice(1, 5).map((r, i) => (
                  <Link key={r.id} to={`/recipe/${r.id}`}
                    className={`overflow-hidden ${i % 2 === 0 ? "rounded-[2rem]" : "rounded-full"}`}>
                    <img src={r.image_data || r.image_url || "/placeholder.svg"} alt="" loading="lazy" decoding="async"
                      className="aspect-square w-full object-cover transition-transform duration-500 hover:scale-105" />
                  </Link>
                ))}
              </div>
            )}
          </section>

          <section className="mt-16 border-t border-border pt-12">
            <div className="mb-8">
              <h2 className="mb-2 font-display text-3xl font-extrabold">{t("home_featured")}</h2>
              <p className="text-muted-foreground">{t("home_featured_desc")}</p>
            </div>
            {loading ? (
              <div className="py-12 text-center"><p className="text-muted-foreground">{t("home_loading")}</p></div>
            ) : recipes.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {recipes.map((recipe) => <RecipeCard key={recipe.id} {...recipe} />)}
              </div>
            ) : (
              <div className="rounded-[2rem] bg-secondary py-12 text-center">
                <p className="mb-4 text-muted-foreground">{t("home_no_recipes")}</p>
                <Button variant="hero" onClick={() => navigate("/generate")}>
                  <Sparkles className="mr-2 h-5 w-5" aria-hidden="true" />{t("home_first_recipe")}
                </Button>
              </div>
            )}
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
