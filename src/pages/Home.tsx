import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RecipeCard } from "@/components/RecipeCard";
import { supabase } from "@/integrations/supabase/client";
import { Search, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useStaticTranslation } from "@/hooks/useStaticTranslation";
import { useLanguage } from "@/contexts/LanguageContext";

const PAGE_TEXTS = [
  "Discover Your Next",
  "Culinary Adventure",
  "AI-powered recipe generation tailored to your taste, dietary preferences, and available ingredients",
  "Search recipes or describe what you want to cook...",
  "Generate AI Recipe",
  "Featured Recipes",
  "Explore our collection of AI-generated culinary delights",
  "Loading delicious recipes...",
  "No recipes yet. Be the first to create one!",
  "Generate Your First Recipe",
  "Failed to load recipes",
];

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const { t } = useStaticTranslation(PAGE_TEXTS);
  const { isRTL } = useLanguage();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(12);

      if (error) throw error;
      setRecipes(data || []);
    } catch (error: any) {
      console.error("Error loading recipes:", error);
      toast.error(t("Failed to load recipes"));
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-warm flex flex-col" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            {t("Discover Your Next")}
            <span className="block text-primary mt-2">{t("Culinary Adventure")}</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t("AI-powered recipe generation tailored to your taste, dietary preferences, and available ingredients")}
          </p>

          <div className="flex gap-3 max-w-2xl mx-auto mb-6">
            <Input
              placeholder={t("Search recipes or describe what you want to cook...")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="h-12 text-base"
            />
            <Button variant="hero" size="lg" onClick={handleSearch}>
              <Search className="w-5 h-5" />
            </Button>
          </div>

          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate("/generate")}
            className="shadow-soft"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            {t("Generate AI Recipe")}
          </Button>
        </div>
      </section>

      {/* Featured Recipes Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">{t("Featured Recipes")}</h2>
              <p className="text-muted-foreground">
                {t("Explore our collection of AI-generated culinary delights")}
              </p>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{t("Loading delicious recipes...")}</p>
            </div>
          ) : recipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} {...recipe} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted rounded-lg">
              <p className="text-muted-foreground mb-4">{t("No recipes yet. Be the first to create one!")}</p>
              <Button variant="hero" onClick={() => navigate("/generate")}>
                <Sparkles className="w-5 h-5 mr-2" />
                {t("Generate Your First Recipe")}
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
