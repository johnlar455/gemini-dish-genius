import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RecipeCard } from "@/components/RecipeCard";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import * as Icons from "lucide-react";
import { Search, Loader2 } from "lucide-react";
import { usePageTranslation } from "@/hooks/usePageTranslation";
import { useLanguage } from "@/contexts/LanguageContext";

const PAGE_TEXTS = [
  "Browse Recipe Categories",
  "Explore our curated collection of recipes organized by category. Find the perfect dish for any occasion.",
  "Search categories...",
  "Loading categories...",
  "No categories found matching",
  "Recipes",
  "Loading recipes...",
  "No recipes in this category yet.",
  "Be the first to create one!",
  "Failed to load categories",
  "Failed to load recipes",
];

export default function Categories() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [categories, setCategories] = useState<any[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<any[]>([]);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get("category")
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [recipesLoading, setRecipesLoading] = useState(false);
  const { t } = usePageTranslation(PAGE_TEXTS);
  const { isRTL } = useLanguage();

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      loadRecipesByCategory(selectedCategory);
    }
  }, [selectedCategory]);

  useEffect(() => {
    const filtered = categories.filter((category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [searchQuery, categories]);

  const loadCategories = async () => {
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name");

      if (error) throw error;
      setCategories(data || []);
      setFilteredCategories(data || []);
    } catch (error: any) {
      console.error("Error loading categories:", error);
      toast.error(t("Failed to load categories"));
    } finally {
      setLoading(false);
    }
  };

  const loadRecipesByCategory = async (categoryId: string) => {
    setRecipesLoading(true);
    try {
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .eq("category_id", categoryId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setRecipes(data || []);
    } catch (error: any) {
      console.error("Error loading recipes:", error);
      toast.error(t("Failed to load recipes"));
    } finally {
      setRecipesLoading(false);
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    navigate(`/categories?category=${categoryId}`);
  };

  const getIcon = (iconName: string) => {
    const Icon = (Icons as any)[iconName];
    return Icon ? <Icon className="w-8 h-8" /> : <Icons.ChefHat className="w-8 h-8" />;
  };

  return (
    <div className="min-h-screen bg-gradient-warm flex flex-col" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />

      <main className="container mx-auto py-8 md:py-12 px-4 flex-1">
        {/* Page Header */}
        <header className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center text-foreground">
            {t("Browse Recipe Categories")}
          </h1>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-6">
            {t("Explore our curated collection of recipes organized by category. Find the perfect dish for any occasion.")}
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />
            <Input
              type="search"
              placeholder={t("Search categories...")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-card border-border focus-visible:ring-primary"
              aria-label={t("Search categories...")}
            />
          </div>
        </header>

        {/* Categories Grid */}
        <section aria-label="Recipe categories">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16" role="status">
              <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">{t("Loading categories...")}</p>
            </div>
          ) : filteredCategories.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 mb-12">
              {filteredCategories.map((category) => (
                <Card
                  key={category.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${category.name} recipes${category.description ? `: ${category.description}` : ''}`}
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                    selectedCategory === category.id 
                      ? "ring-2 ring-primary shadow-card scale-105" 
                      : "hover:border-primary/50"
                  }`}
                  onClick={() => handleCategoryClick(category.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleCategoryClick(category.id);
                    }
                  }}
                >
                  <CardContent className="flex flex-col items-center justify-center p-4 md:p-6 text-center min-h-[140px] md:min-h-[160px]">
                    <div 
                      className="text-primary mb-3 transition-transform duration-300 hover:scale-110" 
                      aria-hidden="true"
                    >
                      {getIcon(category.icon_name)}
                    </div>
                    <h3 className="font-semibold text-sm md:text-base text-foreground mb-1 leading-tight">
                      {category.name}
                    </h3>
                    {category.description && (
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                        {category.description}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-muted/50 rounded-lg" role="status">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">
                {t("No categories found matching")} "{searchQuery}"
              </p>
            </div>
          )}
        </section>

        {/* Selected Category Recipes */}
        {selectedCategory && (
          <section aria-label={`${categories.find((c) => c.id === selectedCategory)?.name} recipes`}>
            <header className="mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3">
                <span className="text-primary">
                  {getIcon(categories.find((c) => c.id === selectedCategory)?.icon_name || "")}
                </span>
                {categories.find((c) => c.id === selectedCategory)?.name} {t("Recipes")}
              </h2>
            </header>

            {recipesLoading ? (
              <div className="flex flex-col items-center justify-center py-16" role="status">
                <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground">{t("Loading recipes...")}</p>
              </div>
            ) : recipes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {recipes.map((recipe) => (
                  <RecipeCard key={recipe.id} {...recipe} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-muted/50 rounded-lg" role="status">
                <p className="text-muted-foreground text-lg mb-4">
                  {t("No recipes in this category yet.")}
                </p>
                <p className="text-muted-foreground">
                  {t("Be the first to create one!")}
                </p>
              </div>
            )}
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
