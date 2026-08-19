import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RecipeCard } from "@/components/RecipeCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Search as SearchIcon } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/i18n/LanguageContext";
import { SEO } from "@/components/SEO";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) { setQuery(q); searchRecipes(q); }
  }, [searchParams]);

  const searchRecipes = async (searchQuery: string) => {
    setLoading(true);
    try {
      const data = await searchRecipesQuery(searchQuery);
      setRecipes(data);
    } catch (error) {
      console.error("Error searching recipes");
      toast.error("Failed to search recipes");
    } finally { setLoading(false); }
  };


  const handleSearch = () => { if (query.trim()) setSearchParams({ q: query }); };

  return (
    <div className="min-h-screen bg-gradient-warm flex flex-col">
      <SEO title="Search Recipes — FlavorAI" description="Search FlavorAI's recipe library by name, ingredient, or cuisine to find your next meal." path="/search" />
      <Navbar />
      <div className="container mx-auto py-12 px-4 flex-1">
        <div className="max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold mb-6 text-center">{t("search_title")}</h1>
          <div className="flex gap-3">
            <Input placeholder={t("search_placeholder")} value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()} className="h-12 text-base" />
            <Button variant="hero" size="lg" onClick={handleSearch}><SearchIcon className="w-5 h-5" /></Button>
          </div>
        </div>
        {loading ? (
          <div className="text-center py-12"><p className="text-muted-foreground">{t("search_searching")}</p></div>
        ) : recipes.length > 0 ? (
          <>
            <p className="text-muted-foreground mb-6">
              {t("search_found")} {recipes.length} {recipes.length !== 1 ? t("search_recipes") : t("search_recipe")}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recipes.map((recipe) => <RecipeCard key={recipe.id} {...recipe} />)}
            </div>
          </>
        ) : query ? (
          <div className="text-center py-12 bg-muted rounded-lg">
            <p className="text-muted-foreground">{t("search_no_results")} "{query}".</p>
          </div>
        ) : null}
      </div>
      <Footer />
    </div>
  );
}
