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
import { useStaticTranslation } from "@/hooks/useStaticTranslation";
import { useLanguage } from "@/contexts/LanguageContext";

const PAGE_TEXTS = [
  "Search Recipes",
  "Search by name, cuisine, or ingredients...",
  "Searching recipes...",
  "Found",
  "recipe",
  "recipes",
  "No recipes found for",
  "Try a different search term.",
  "Failed to search recipes",
];

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { t } = useStaticTranslation(PAGE_TEXTS);
  const { isRTL } = useLanguage();

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      setQuery(q);
      searchRecipes(q);
    }
  }, [searchParams]);

  const searchRecipes = async (searchQuery: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%,cuisine_type.ilike.%${searchQuery}%`)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setRecipes(data || []);
    } catch (error: any) {
      console.error("Error searching recipes:", error);
      toast.error(t("Failed to search recipes"));
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      setSearchParams({ q: query });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-warm flex flex-col" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />

      <div className="container mx-auto py-12 px-4 flex-1">
        <div className="max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold mb-6 text-center">{t("Search Recipes")}</h1>
          <div className="flex gap-3">
            <Input
              placeholder={t("Search by name, cuisine, or ingredients...")}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="h-12 text-base"
            />
            <Button variant="hero" size="lg" onClick={handleSearch}>
              <SearchIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t("Searching recipes...")}</p>
          </div>
        ) : recipes.length > 0 ? (
          <>
            <p className="text-muted-foreground mb-6">
              {t("Found")} {recipes.length} {recipes.length !== 1 ? t("recipes") : t("recipe")}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} {...recipe} />
              ))}
            </div>
          </>
        ) : query ? (
          <div className="text-center py-12 bg-muted rounded-lg">
            <p className="text-muted-foreground">
              {t("No recipes found for")} "{query}". {t("Try a different search term.")}
            </p>
          </div>
        ) : null}
      </div>

      <Footer />
    </div>
  );
}
