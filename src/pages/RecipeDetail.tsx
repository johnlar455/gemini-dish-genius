import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { RecipeCard } from "@/components/RecipeCard";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Clock, Users, ChefHat, Heart, ShoppingCart, ArrowLeft, Loader2 } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { SEO } from "@/components/SEO";

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [otherRecipes, setOtherRecipes] = useState<any[]>([]);
  const { t } = useLanguage();

  useEffect(() => { if (id) { loadRecipe(); checkFavorite(); loadOtherRecipes(); } }, [id]);

  const loadRecipe = async () => {
    try {
      const { data, error } = await supabase.from("recipes").select("*").eq("id", id).single();
      if (error) throw error;
      setRecipe(data);
    } catch (error) { console.error("Error loading recipe:", error); toast.error("Failed to load recipe"); navigate("/"); }
    finally { setLoading(false); }
  };

  const loadOtherRecipes = async () => {
    try { const { data } = await supabase.from("recipes").select("*").neq("id", id).order("created_at", { ascending: false }).limit(6); setOtherRecipes(data || []); }
    catch (error) { console.error("Error loading other recipes:", error); }
  };

  const checkFavorite = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data } = await supabase.from("favorites").select("id").eq("user_id", user.id).eq("recipe_id", id).maybeSingle();
    setIsFavorite(!!data);
  };

  const toggleFavorite = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { toast.error("Please sign in"); navigate("/auth"); return; }
    try {
      if (isFavorite) { await supabase.from("favorites").delete().eq("user_id", user.id).eq("recipe_id", id); setIsFavorite(false); toast.success("Removed from favorites"); }
      else { await supabase.from("favorites").insert({ user_id: user.id, recipe_id: id }); setIsFavorite(true); toast.success("Added to favorites"); }
    } catch (error) { console.error("Error:", error); toast.error("Failed to update favorites"); }
  };

  const addToShoppingList = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { toast.error("Please sign in"); navigate("/auth"); return; }
    try {
      const items = recipe.ingredients.map((ing: any) => ({ item: ing.item, amount: ing.amount, checked: false }));
      const { error } = await supabase.from("shopping_lists").insert({ user_id: user.id, name: `Ingredients for ${recipe.title}`, items });
      if (error) throw error;
      toast.success("Added to shopping list!");
    } catch (error) { console.error("Error:", error); toast.error("Failed to add to shopping list"); }
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-warm"><Navbar />
      <div className="container mx-auto py-12 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" /><p className="text-muted-foreground mt-2">{t("detail_loading")}</p></div>
    </div>
  );
  if (!recipe) return null;
  const totalTime = (recipe.prep_time || 0) + (recipe.cook_time || 0);

  const recipeImage = recipe.image_data || recipe.image_url;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    description: recipe.description || undefined,
    image: recipeImage ? [recipeImage] : undefined,
    recipeCuisine: recipe.cuisine_type || undefined,
    recipeCategory: recipe.difficulty || undefined,
    prepTime: recipe.prep_time ? `PT${recipe.prep_time}M` : undefined,
    cookTime: recipe.cook_time ? `PT${recipe.cook_time}M` : undefined,
    totalTime: totalTime ? `PT${totalTime}M` : undefined,
    recipeYield: recipe.servings ? `${recipe.servings} servings` : undefined,
    recipeIngredient: recipe.ingredients?.map((i: any) => `${i.amount || ""} ${i.item}`.trim()),
    recipeInstructions: recipe.instructions?.map((s: any) => ({ "@type": "HowToStep", text: s.instruction })),
  };

  return (
    <div className="min-h-screen bg-gradient-warm flex flex-col">
      <SEO
        title={`${recipe.title} — FlavorAI`}
        description={(recipe.description || `Cook ${recipe.title} with step-by-step instructions, ingredients, and timings on FlavorAI.`).slice(0, 160)}
        path={`/recipe/${recipe.id}`}
        type="article"
        image={recipeImage || undefined}
        jsonLd={jsonLd}
      />
      <Navbar />
      <div className="container mx-auto py-8 px-4 flex-1">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" onClick={() => navigate(-1)}><ArrowLeft className="w-4 h-4 mr-2" />{t("detail_back")}</Button>
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          <div><img src={recipe.image_data || recipe.image_url || "/placeholder.svg"} alt={recipe.title} loading="lazy" className="w-full aspect-square object-cover rounded-lg shadow-card" /></div>
          <div className="space-y-6">
            <div><h1 className="text-4xl font-bold mb-3">{recipe.title}</h1>{recipe.description && <p className="text-lg text-muted-foreground">{recipe.description}</p>}</div>
            <div className="flex flex-wrap gap-2">
              {recipe.difficulty && <Badge variant="secondary" className="capitalize"><ChefHat className="w-3 h-3 mr-1" />{recipe.difficulty}</Badge>}
              {recipe.cuisine_type && <Badge variant="outline">{recipe.cuisine_type}</Badge>}
              {recipe.dietary_preferences?.map((pref: string) => <Badge key={pref} variant="outline" className="capitalize">{pref}</Badge>)}
            </div>
            <div className="flex items-center gap-6 text-muted-foreground">
              {totalTime > 0 && <div className="flex items-center gap-2"><Clock className="w-5 h-5" /><span>{totalTime} {t("detail_min")}</span></div>}
              {recipe.servings && <div className="flex items-center gap-2"><Users className="w-5 h-5" /><span>{recipe.servings} {t("detail_servings")}</span></div>}
            </div>
            <div className="flex gap-3">
              <Button variant="hero" className="flex-1" onClick={toggleFavorite}>
                <Heart className={`w-5 h-5 mr-2 ${isFavorite ? "fill-current" : ""}`} />{isFavorite ? t("detail_saved") : t("detail_save")}
              </Button>
              <Button variant="secondary" onClick={addToShoppingList}><ShoppingCart className="w-5 h-5 mr-2" />{t("detail_add_to_list")}</Button>
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 mt-12">
          <Card className="shadow-card"><CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">{t("detail_ingredients")}</h2>
            <ul className="space-y-3">{recipe.ingredients.map((ingredient: any, index: number) => (
              <li key={index} className="flex items-start gap-3"><span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span><span><span className="font-medium">{ingredient.amount}</span> {ingredient.item}</span></li>
            ))}</ul>
          </CardContent></Card>
          <Card className="shadow-card"><CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">{t("detail_instructions")}</h2>
            <ol className="space-y-4">{recipe.instructions.map((instruction: any) => (
              <li key={instruction.step} className="flex gap-4"><span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">{instruction.step}</span><p className="pt-1">{instruction.instruction}</p></li>
            ))}</ol>
          </CardContent></Card>
        </div>
        {otherRecipes.length > 0 && (
          <section className="mt-16">
            <h2 className="text-3xl font-bold mb-8">{t("detail_more_recipes")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherRecipes.map((r) => <RecipeCard key={r.id} id={r.id} title={r.title} description={r.description} image_url={r.image_url} image_data={r.image_data} prep_time={r.prep_time} cook_time={r.cook_time} servings={r.servings} difficulty={r.difficulty} cuisine_type={r.cuisine_type} isFavorite={false} />)}
            </div>
          </section>
        )}
      </div>
      <Footer />
    </div>
  );
}
