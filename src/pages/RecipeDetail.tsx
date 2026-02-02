import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { RecipeCard } from "@/components/RecipeCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Clock, Users, ChefHat, Heart, ShoppingCart, ArrowLeft, Languages, Loader2, Globe } from "lucide-react";
import { useTranslate } from "@/hooks/useStaticTranslation";

const SUPPORTED_LANGUAGES = {
  en: { name: 'English', native: 'English', dir: 'ltr' },
  ar: { name: 'Arabic', native: 'العربية', dir: 'rtl' },
  zh: { name: 'Chinese', native: '中文', dir: 'ltr' },
  ja: { name: 'Japanese', native: '日本語', dir: 'ltr' },
  de: { name: 'German', native: 'Deutsch', dir: 'ltr' },
  nl: { name: 'Dutch', native: 'Nederlands', dir: 'ltr' },
  es: { name: 'Spanish', native: 'Español', dir: 'ltr' },
  it: { name: 'Italian', native: 'Italiano', dir: 'ltr' },
  ru: { name: 'Russian', native: 'Русский', dir: 'ltr' },
};

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [otherRecipes, setOtherRecipes] = useState<any[]>([]);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translateDialogOpen, setTranslateDialogOpen] = useState(false);
  const [selectedTargetLang, setSelectedTargetLang] = useState<string>("");
  const { t, isRTL } = useTranslate();

  const recipeLanguage = recipe?.language || 'en';
  const langConfig = SUPPORTED_LANGUAGES[recipeLanguage as keyof typeof SUPPORTED_LANGUAGES] || SUPPORTED_LANGUAGES.en;
  const isRecipeRTL = langConfig.dir === 'rtl';

  useEffect(() => {
    if (id) {
      loadRecipe();
      checkFavorite();
      loadOtherRecipes();
    }
  }, [id]);

  const loadRecipe = async () => {
    try {
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      setRecipe(data);
    } catch (error) {
      console.error("Error loading recipe:", error);
      toast.error(t("Failed to load recipe"));
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const loadOtherRecipes = async () => {
    try {
      const { data } = await supabase
        .from("recipes")
        .select("*")
        .neq("id", id)
        .order("created_at", { ascending: false })
        .limit(6);

      setOtherRecipes(data || []);
    } catch (error) {
      console.error("Error loading other recipes:", error);
    }
  };

  const checkFavorite = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from("favorites")
      .select("id")
      .eq("user_id", user.id)
      .eq("recipe_id", id)
      .maybeSingle();

    setIsFavorite(!!data);
  };

  const toggleFavorite = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error(t("Please sign in to save favorites"));
      navigate("/auth");
      return;
    }

    try {
      if (isFavorite) {
        await supabase.from("favorites").delete().eq("user_id", user.id).eq("recipe_id", id);
        setIsFavorite(false);
        toast.success(t("Removed from favorites"));
      } else {
        await supabase.from("favorites").insert({ user_id: user.id, recipe_id: id });
        setIsFavorite(true);
        toast.success(t("Added to favorites"));
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast.error(t("Failed to update favorites"));
    }
  };

  const addToShoppingList = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error(t("Please sign in to use shopping lists"));
      navigate("/auth");
      return;
    }

    try {
      const items = recipe.ingredients.map((ing: any) => ({
        item: ing.item,
        amount: ing.amount,
        checked: false,
      }));

      const { error } = await supabase.from("shopping_lists").insert({
        user_id: user.id,
        name: `Ingredients for ${recipe.title}`,
        items,
      });

      if (error) throw error;
      toast.success(t("Added to shopping list!"));
    } catch (error) {
      console.error("Error adding to shopping list:", error);
      toast.error(t("Failed to add to shopping list"));
    }
  };

  const handleTranslate = async () => {
    if (!selectedTargetLang || selectedTargetLang === recipeLanguage) {
      toast.error(t("Please select a different target language"));
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error(t("Please sign in to translate recipes"));
      navigate("/auth");
      return;
    }

    setIsTranslating(true);
    try {
      const response = await supabase.functions.invoke('translate-recipe', {
        body: { recipe, targetLanguage: selectedTargetLang }
      });

      if (response.error) throw response.error;
      
      const { translatedRecipe } = response.data;
      
      const { data: newRecipe, error: insertError } = await supabase
        .from("recipes")
        .insert({
          user_id: user.id,
          title: translatedRecipe.title,
          description: translatedRecipe.description,
          ingredients: translatedRecipe.ingredients,
          instructions: translatedRecipe.instructions,
          language: selectedTargetLang,
          image_data: recipe.image_data,
          image_url: recipe.image_url,
          prep_time: recipe.prep_time,
          cook_time: recipe.cook_time,
          servings: recipe.servings,
          difficulty: recipe.difficulty,
          cuisine_type: recipe.cuisine_type,
          dietary_preferences: recipe.dietary_preferences,
          category_id: recipe.category_id,
          is_ai_generated: true,
        })
        .select()
        .single();

      if (insertError) throw insertError;

      toast.success(`Recipe translated to ${SUPPORTED_LANGUAGES[selectedTargetLang as keyof typeof SUPPORTED_LANGUAGES]?.native || selectedTargetLang}!`);
      setTranslateDialogOpen(false);
      navigate(`/recipe/${newRecipe.id}`);
    } catch (error: any) {
      console.error("Translation error:", error);
      toast.error(error.message || "Failed to translate recipe");
    } finally {
      setIsTranslating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-warm">
        <Navbar />
        <div className="container mx-auto py-12 text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground mt-2">{t("Loading...")}</p>
        </div>
      </div>
    );
  }

  if (!recipe) return null;

  const totalTime = (recipe.prep_time || 0) + (recipe.cook_time || 0);

  return (
    <div className="min-h-screen bg-gradient-warm flex flex-col" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />

      <div className="container mx-auto py-8 px-4 flex-1">
        <div className={`flex items-center justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className={`w-4 h-4 ${isRTL ? 'ml-2 rotate-180' : 'mr-2'}`} />
            {t("Back")}
          </Button>
          
          <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Badge variant="outline" className="gap-1">
              <Globe className="w-3 h-3" />
              {langConfig.native}
            </Badge>
            <Dialog open={translateDialogOpen} onOpenChange={setTranslateDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Languages className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  {t("Translate")}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t("Translate Recipe")}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <p className="text-sm text-muted-foreground">
                    {t("Translate this recipe to another language. A new copy will be saved.")}
                  </p>
                  <Select value={selectedTargetLang} onValueChange={setSelectedTargetLang}>
                    <SelectTrigger>
                      <SelectValue placeholder={t("Select target language")} />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(SUPPORTED_LANGUAGES)
                        .filter(([code]) => code !== recipeLanguage)
                        .map(([code, lang]) => (
                          <SelectItem key={code} value={code}>
                            {lang.native} ({lang.name})
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <Button 
                    onClick={handleTranslate} 
                    disabled={isTranslating || !selectedTargetLang}
                    className="w-full"
                  >
                    {isTranslating ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {t("Translating...")}
                      </>
                    ) : (
                      <>
                        <Languages className="w-4 h-4 mr-2" />
                        {t("Translate & Save")}
                      </>
                    )}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <img
              src={recipe.image_data || recipe.image_url || "/placeholder.svg"}
              alt={recipe.title}
              loading="lazy"
              className="w-full aspect-square object-cover rounded-lg shadow-card"
            />
          </div>

          <div className={`space-y-6 ${isRecipeRTL ? 'text-right' : ''}`} dir={isRecipeRTL ? 'rtl' : 'ltr'}>
            <div>
              <h1 className="text-4xl font-bold mb-3">{recipe.title}</h1>
              {recipe.description && (
                <p className="text-lg text-muted-foreground">{recipe.description}</p>
              )}
            </div>

            <div className={`flex flex-wrap gap-2 ${isRecipeRTL ? 'justify-end' : ''}`}>
              {recipe.difficulty && (
                <Badge variant="secondary" className="capitalize">
                  <ChefHat className={`w-3 h-3 ${isRecipeRTL ? 'ml-1' : 'mr-1'}`} />
                  {t(recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1))}
                </Badge>
              )}
              {recipe.cuisine_type && <Badge variant="outline">{recipe.cuisine_type}</Badge>}
              {recipe.dietary_preferences?.map((pref: string) => (
                <Badge key={pref} variant="outline" className="capitalize">{pref}</Badge>
              ))}
            </div>

            <div className={`flex items-center gap-6 text-muted-foreground ${isRecipeRTL ? 'flex-row-reverse justify-end' : ''}`}>
              {totalTime > 0 && (
                <div className={`flex items-center gap-2 ${isRecipeRTL ? 'flex-row-reverse' : ''}`}>
                  <Clock className="w-5 h-5" />
                  <span>{totalTime} {t("min")}</span>
                </div>
              )}
              {recipe.servings && (
                <div className={`flex items-center gap-2 ${isRecipeRTL ? 'flex-row-reverse' : ''}`}>
                  <Users className="w-5 h-5" />
                  <span>{recipe.servings} {t("servings")}</span>
                </div>
              )}
            </div>

            <div className={`flex gap-3 ${isRecipeRTL ? 'flex-row-reverse' : ''}`}>
              <Button variant="hero" className="flex-1" onClick={toggleFavorite}>
                <Heart className={`w-5 h-5 ${isRecipeRTL ? 'ml-2' : 'mr-2'} ${isFavorite ? "fill-current" : ""}`} />
                {isFavorite ? t("Saved") : t("Save")}
              </Button>
              <Button variant="secondary" onClick={addToShoppingList}>
                <ShoppingCart className={`w-5 h-5 ${isRecipeRTL ? 'ml-2' : 'mr-2'}`} />
                {t("Add to List")}
              </Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mt-12">
          <Card className="shadow-card">
            <CardContent className="pt-6" dir={isRecipeRTL ? 'rtl' : 'ltr'}>
              <h2 className={`text-2xl font-bold mb-4 ${isRecipeRTL ? 'text-right' : ''}`}>{t("Ingredients")}</h2>
              <ul className="space-y-3">
                {recipe.ingredients.map((ingredient: any, index: number) => (
                  <li key={index} className={`flex items-start gap-3 ${isRecipeRTL ? 'flex-row-reverse text-right' : ''}`}>
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span>
                      <span className="font-medium">{ingredient.amount}</span> {ingredient.item}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="pt-6" dir={isRecipeRTL ? 'rtl' : 'ltr'}>
              <h2 className={`text-2xl font-bold mb-4 ${isRecipeRTL ? 'text-right' : ''}`}>{t("Instructions")}</h2>
              <ol className="space-y-4">
                {recipe.instructions.map((instruction: any) => (
                  <li key={instruction.step} className={`flex gap-4 ${isRecipeRTL ? 'flex-row-reverse text-right' : ''}`}>
                    <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                      {instruction.step}
                    </span>
                    <p className="pt-1">{instruction.instruction}</p>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>

        {otherRecipes.length > 0 && (
          <section className="mt-16">
            <h2 className="text-3xl font-bold mb-8">{t("More Recipes")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherRecipes.map((otherRecipe) => (
                <RecipeCard
                  key={otherRecipe.id}
                  id={otherRecipe.id}
                  title={otherRecipe.title}
                  description={otherRecipe.description}
                  image_url={otherRecipe.image_url}
                  image_data={otherRecipe.image_data}
                  prep_time={otherRecipe.prep_time}
                  cook_time={otherRecipe.cook_time}
                  servings={otherRecipe.servings}
                  difficulty={otherRecipe.difficulty}
                  cuisine_type={otherRecipe.cuisine_type}
                  isFavorite={false}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
}
