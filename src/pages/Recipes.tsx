import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Search, Pencil, Trash2, ChefHat, Loader2, Globe, X } from "lucide-react";
import { useTranslate } from "@/hooks/useStaticTranslation";

const SUPPORTED_LANGUAGES = {
  all: { name: 'All Languages', native: 'All' },
  en: { name: 'English', native: 'English' },
  ar: { name: 'Arabic', native: 'العربية' },
  zh: { name: 'Chinese', native: '中文' },
  ja: { name: 'Japanese', native: '日本語' },
  de: { name: 'German', native: 'Deutsch' },
  nl: { name: 'Dutch', native: 'Nederlands' },
  es: { name: 'Spanish', native: 'Español' },
  it: { name: 'Italian', native: 'Italiano' },
  ru: { name: 'Russian', native: 'Русский' },
};

const PAGE_TEXTS = [
  "My Recipes",
  "Manage all your saved recipes in one place",
  "Search recipes...",
  "Filter by language",
  "Clear",
  "No recipes found",
  "No recipes yet",
  "Try adjusting your filters",
  "Start creating delicious recipes!",
  "Clear Filters",
  "Create Your First Recipe",
  "Edit",
  "Delete",
  "Delete Recipe",
  "Are you sure you want to delete this recipe? This action cannot be undone.",
  "Cancel",
  "Recipe deleted successfully",
  "Failed to delete recipe",
  "Please sign in to view your recipes",
  "Failed to load recipes",
  "All Languages",
  "Search:",
  "min",
];

interface Recipe {
  id: string;
  title: string;
  description: string;
  image_data: string | null;
  difficulty: string | null;
  cuisine_type: string | null;
  prep_time: number | null;
  cook_time: number | null;
  servings: number | null;
  user_id: string;
  language: string | null;
}

export default function Recipes() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [languageFilter, setLanguageFilter] = useState("all");
  const [deleteRecipeId, setDeleteRecipeId] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const { t, isRTL } = useTranslate();

  useEffect(() => {
    checkAuthAndLoadRecipes();
  }, []);

  useEffect(() => {
    filterRecipes();
  }, [searchQuery, languageFilter, recipes]);

  const checkAuthAndLoadRecipes = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error(t("Please sign in to view your recipes"));
      navigate("/auth");
      return;
    }
    setCurrentUserId(user.id);
    await loadRecipes(user.id);
  };

  const loadRecipes = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setRecipes(data || []);
    } catch (error: any) {
      console.error("Error loading recipes:", error);
      toast.error(t("Failed to load recipes"));
    } finally {
      setLoading(false);
    }
  };

  const filterRecipes = () => {
    let filtered = [...recipes];

    if (languageFilter !== "all") {
      filtered = filtered.filter(
        (recipe) => (recipe.language || 'en') === languageFilter
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(query) ||
          recipe.description?.toLowerCase().includes(query) ||
          recipe.cuisine_type?.toLowerCase().includes(query) ||
          recipe.difficulty?.toLowerCase().includes(query)
      );
    }

    setFilteredRecipes(filtered);
  };

  const handleDelete = async (recipeId: string) => {
    try {
      const { error } = await supabase
        .from("recipes")
        .delete()
        .eq("id", recipeId);

      if (error) throw error;

      setRecipes(recipes.filter((r) => r.id !== recipeId));
      toast.success(t("Recipe deleted successfully"));
    } catch (error: any) {
      console.error("Error deleting recipe:", error);
      toast.error(t("Failed to delete recipe"));
    } finally {
      setDeleteRecipeId(null);
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setLanguageFilter("all");
  };

  const hasActiveFilters = searchQuery.trim() || languageFilter !== "all";

  const languageCounts = recipes.reduce((acc, recipe) => {
    const lang = recipe.language || 'en';
    acc[lang] = (acc[lang] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-warm">
        <Navbar />
        <div className="container mx-auto py-12 px-4 flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-warm flex flex-col" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />
      
      <div className="container mx-auto py-12 px-4 flex-1">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col gap-6 mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">{t("My Recipes")}</h1>
              <p className="text-muted-foreground">{t("Manage all your saved recipes in one place")}</p>
            </div>
            
            <div className={`flex flex-col sm:flex-row gap-3 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <div className="relative flex-1 max-w-md">
                <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4`} />
                <Input
                  type="text"
                  placeholder={t("Search recipes...")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={isRTL ? 'pr-10' : 'pl-10'}
                />
              </div>
              
              <Select value={languageFilter} onValueChange={setLanguageFilter}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <Globe className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  <SelectValue placeholder={t("Filter by language")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {t("All Languages")} ({recipes.length})
                  </SelectItem>
                  {Object.entries(SUPPORTED_LANGUAGES)
                    .filter(([code]) => code !== 'all' && languageCounts[code])
                    .map(([code, lang]) => (
                      <SelectItem key={code} value={code}>
                        {lang.native} ({languageCounts[code] || 0})
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>

              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="self-center">
                  <X className={`w-4 h-4 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                  {t("Clear")}
                </Button>
              )}
            </div>

            {hasActiveFilters && (
              <div className={`flex flex-wrap gap-2 ${isRTL ? 'justify-end' : ''}`}>
                {languageFilter !== "all" && (
                  <Badge variant="secondary" className="gap-1">
                    <Globe className="w-3 h-3" />
                    {SUPPORTED_LANGUAGES[languageFilter as keyof typeof SUPPORTED_LANGUAGES]?.native}
                    <button onClick={() => setLanguageFilter("all")} className={`${isRTL ? 'mr-1' : 'ml-1'} hover:text-destructive`}>
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
                {searchQuery && (
                  <Badge variant="secondary" className="gap-1">
                    {t("Search:")} "{searchQuery}"
                    <button onClick={() => setSearchQuery("")} className={`${isRTL ? 'mr-1' : 'ml-1'} hover:text-destructive`}>
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
              </div>
            )}
          </div>

          {filteredRecipes.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent className="flex flex-col items-center gap-4">
                <ChefHat className="w-16 h-16 text-muted-foreground" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {hasActiveFilters ? t("No recipes found") : t("No recipes yet")}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {hasActiveFilters
                      ? t("Try adjusting your filters")
                      : t("Start creating delicious recipes!")}
                  </p>
                  {hasActiveFilters ? (
                    <Button variant="outline" onClick={clearFilters}>
                      {t("Clear Filters")}
                    </Button>
                  ) : (
                    <Button onClick={() => navigate("/generate")}>
                      {t("Create Your First Recipe")}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map((recipe) => {
                const recipeLang = recipe.language || 'en';
                const langInfo = SUPPORTED_LANGUAGES[recipeLang as keyof typeof SUPPORTED_LANGUAGES];
                
                return (
                  <Card key={recipe.id} className="overflow-hidden hover:shadow-card-hover transition-shadow">
                    <div
                      className="h-48 bg-gradient-to-br from-primary/20 to-primary-hover/20 cursor-pointer relative"
                      onClick={() => navigate(`/recipe/${recipe.id}`)}
                    >
                      {recipe.image_data && (
                        <img
                          src={recipe.image_data}
                          alt={recipe.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-white font-semibold text-lg line-clamp-2">{recipe.title}</h3>
                      </div>
                      {langInfo && recipeLang !== 'en' && (
                        <Badge 
                          variant="secondary" 
                          className="absolute top-2 right-2 text-xs"
                        >
                          {langInfo.native}
                        </Badge>
                      )}
                    </div>
                    <CardHeader className="pb-3">
                      <CardDescription className="line-clamp-2 min-h-[2.5rem]">
                        {recipe.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                        {recipe.difficulty && (
                          <span className="px-2 py-1 bg-secondary rounded-md capitalize">
                            {recipe.difficulty}
                          </span>
                        )}
                        {recipe.cuisine_type && (
                          <span className="px-2 py-1 bg-secondary rounded-md">
                            {recipe.cuisine_type}
                          </span>
                        )}
                        {recipe.prep_time && recipe.cook_time && (
                          <span className="px-2 py-1 bg-secondary rounded-md">
                            {recipe.prep_time + recipe.cook_time} {t("min")}
                          </span>
                        )}
                      </div>
                      <div className={`flex gap-3 pt-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <Button
                          size="sm"
                          className="flex-1 bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary border border-primary/20 rounded-full shadow-sm transition-all duration-200 hover:shadow-md hover:scale-105"
                          onClick={() => navigate(`/recipe/${recipe.id}/edit`)}
                        >
                          <Pencil className={`w-3.5 h-3.5 ${isRTL ? 'ml-1.5' : 'mr-1.5'}`} />
                          {t("Edit")}
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1 bg-destructive/10 hover:bg-destructive hover:text-destructive-foreground text-destructive border border-destructive/20 rounded-full shadow-sm transition-all duration-200 hover:shadow-md hover:scale-105"
                          onClick={() => setDeleteRecipeId(recipe.id)}
                        >
                          <Trash2 className={`w-3.5 h-3.5 ${isRTL ? 'ml-1.5' : 'mr-1.5'}`} />
                          {t("Delete")}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <Footer />

      <AlertDialog open={!!deleteRecipeId} onOpenChange={(open) => !open && setDeleteRecipeId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("Delete Recipe")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("Are you sure you want to delete this recipe? This action cannot be undone.")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("Cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteRecipeId && handleDelete(deleteRecipeId)}
              className="bg-destructive hover:bg-destructive/90"
            >
              {t("Delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
