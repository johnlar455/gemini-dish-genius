import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Clock, Users, ChefHat, Heart, ShoppingCart, ArrowLeft } from "lucide-react";

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (id) {
      loadRecipe();
      checkFavorite();
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
    } catch (error: any) {
      console.error("Error loading recipe:", error);
      toast.error("Failed to load recipe");
      navigate("/");
    } finally {
      setLoading(false);
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
      .single();

    setIsFavorite(!!data);
  };

  const toggleFavorite = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error("Please sign in to save favorites");
      navigate("/auth");
      return;
    }

    try {
      if (isFavorite) {
        await supabase.from("favorites").delete().eq("user_id", user.id).eq("recipe_id", id);
        setIsFavorite(false);
        toast.success("Removed from favorites");
      } else {
        await supabase.from("favorites").insert({ user_id: user.id, recipe_id: id });
        setIsFavorite(true);
        toast.success("Added to favorites");
      }
    } catch (error: any) {
      console.error("Error toggling favorite:", error);
      toast.error("Failed to update favorites");
    }
  };

  const addToShoppingList = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error("Please sign in to use shopping lists");
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
      toast.success("Added to shopping list!");
      navigate("/shopping-list");
    } catch (error: any) {
      console.error("Error adding to shopping list:", error);
      toast.error("Failed to add to shopping list");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-warm">
        <Navbar />
        <div className="container mx-auto py-12 text-center">
          <p className="text-muted-foreground">Loading recipe...</p>
        </div>
      </div>
    );
  }

  if (!recipe) return null;

  const totalTime = (recipe.prep_time || 0) + (recipe.cook_time || 0);

  return (
    <div className="min-h-screen bg-gradient-warm">
      <Navbar />

      <div className="container mx-auto py-8 px-4">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <img
              src={recipe.image_data || recipe.image_url || "/placeholder.svg"}
              alt={recipe.title}
              className="w-full aspect-square object-cover rounded-lg shadow-card"
            />
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-3">{recipe.title}</h1>
              {recipe.description && (
                <p className="text-lg text-muted-foreground">{recipe.description}</p>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {recipe.difficulty && (
                <Badge variant="secondary" className="capitalize">
                  <ChefHat className="w-3 h-3 mr-1" />
                  {recipe.difficulty}
                </Badge>
              )}
              {recipe.cuisine_type && <Badge variant="outline">{recipe.cuisine_type}</Badge>}
              {recipe.dietary_preferences?.map((pref: string) => (
                <Badge key={pref} variant="outline" className="capitalize">
                  {pref}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-6 text-muted-foreground">
              {totalTime > 0 && (
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{totalTime} mins</span>
                </div>
              )}
              {recipe.servings && (
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{recipe.servings} servings</span>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <Button variant="hero" className="flex-1" onClick={toggleFavorite}>
                <Heart className={`w-5 h-5 mr-2 ${isFavorite ? "fill-current" : ""}`} />
                {isFavorite ? "Saved" : "Save Recipe"}
              </Button>
              <Button variant="secondary" onClick={addToShoppingList}>
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Shopping List
              </Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mt-12">
          <Card className="shadow-card">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
              <ul className="space-y-3">
                {recipe.ingredients.map((ingredient: any, index: number) => (
                  <li key={index} className="flex items-start gap-3">
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
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Instructions</h2>
              <ol className="space-y-4">
                {recipe.instructions.map((instruction: any) => (
                  <li key={instruction.step} className="flex gap-4">
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
      </div>
    </div>
  );
}
