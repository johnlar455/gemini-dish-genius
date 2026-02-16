import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Sparkles, Loader2, X } from "lucide-react";
import { z } from "zod";

const recipeInputSchema = z.object({
  prompt: z.string().trim().min(1, "Please describe what you'd like to cook").max(500, "Description is too long (max 500 characters)"),
  cuisineType: z.string().max(50).optional(),
  ingredients: z.array(z.string().trim().max(100, "Ingredient name is too long")).max(20, "Maximum 20 ingredients allowed"),
  dietaryPreferences: z.array(z.string()).max(10, "Maximum 10 dietary preferences allowed"),
  category: z.string().min(1, "Please select a recipe category"),
});

const cuisineOptions = ["Italian", "Chinese", "Mexican", "Indian", "Japanese", "Thai", "Mediterranean", "French"];
const categoryOptions = ["Breakfast", "Desserts", "Dinner", "Gluten-Free", "Lunch", "Snacks", "Vegan", "Vegetarian"];
const dietaryOptions = ["vegetarian", "vegan", "gluten-free", "dairy-free", "keto", "low-carb"];

export default function GenerateRecipe() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [cuisineType, setCuisineType] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [currentIngredient, setCurrentIngredient] = useState("");
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>([]);
  const [category, setCategory] = useState("");

  const addIngredient = () => {
    if (currentIngredient.trim()) {
      const newIngredients = currentIngredient
        .split(',')
        .map(item => item.trim())
        .filter(item => item.length > 0 && !ingredients.includes(item));
      
      if (newIngredients.length > 0) {
        setIngredients([...ingredients, ...newIngredients]);
        setCurrentIngredient("");
      } else if (currentIngredient.includes(',')) {
        setCurrentIngredient("");
      }
    }
  };

  const removeIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter((i) => i !== ingredient));
  };

  const toggleDietary = (option: string) => {
    setDietaryPreferences((prev) =>
      prev.includes(option) ? prev.filter((p) => p !== option) : [...prev, option]
    );
  };

  const handleGenerate = async () => {
    const validationResult = recipeInputSchema.safeParse({
      prompt,
      cuisineType,
      ingredients,
      dietaryPreferences,
      category,
    });

    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0];
      toast.error(firstError.message);
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error("Please sign in to generate recipes");
      navigate("/auth");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("generate-recipe", {
        body: { ...validationResult.data, language: "auto" },
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      const { recipe, imageData } = data;

      // Normalize difficulty to English for DB constraint
      const difficultyMap: Record<string, string> = {
        easy: 'easy', medium: 'medium', hard: 'hard',
        'سهل': 'easy', 'متوسط': 'medium', 'صعب': 'hard',
        'fácil': 'easy', 'medio': 'medium', 'difícil': 'hard',
        'facile': 'easy', 'moyen': 'medium', 'difficile': 'hard',
        'leicht': 'easy', 'mittel': 'medium', 'schwer': 'hard',
        '簡単': 'easy', '普通': 'medium', '難しい': 'hard',
        '简单': 'easy', '中等': 'medium', '困难': 'hard',
        'лёгкий': 'easy', 'средний': 'medium', 'сложный': 'hard',
        'makkelijk': 'easy', 'gemiddeld': 'medium', 'moeilijk': 'hard',
      };
      const normalizedDifficulty = difficultyMap[recipe.difficulty?.toLowerCase()] || 'medium';

      let categoryId = null;
      if (category) {
        const { data: categoryData } = await supabase
          .from("categories")
          .select("id")
          .eq("name", category)
          .maybeSingle();

        if (categoryData) categoryId = categoryData.id;
      }

      const { data: savedRecipe, error: saveError } = await supabase
        .from("recipes")
        .insert({
          title: recipe.title,
          description: recipe.description,
          cuisine_type: recipe.cuisineType,
          dietary_preferences: recipe.dietaryPreferences,
          prep_time: recipe.prepTime,
          cook_time: recipe.cookTime,
          servings: recipe.servings,
          difficulty: normalizedDifficulty,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
          image_data: imageData,
          category_id: categoryId,
          user_id: user.id,
          is_ai_generated: true,
        })
        .select()
        .single();

      if (saveError) throw saveError;

      toast.success("Recipe generated successfully!");
      navigate(`/recipe/${savedRecipe.id}`);
    } catch (error: any) {
      console.error("Error generating recipe:", error);
      toast.error(error.message || "Failed to generate recipe");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-warm flex flex-col">
      <Navbar />

      <div className="container mx-auto py-12 px-4 flex-1">
        <Card className="max-w-3xl mx-auto shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-3xl">
              <Sparkles className="w-8 h-8 text-primary" />
              Generate AI Recipe
            </CardTitle>
            <CardDescription>
              Describe what you want to cook and let AI create a custom recipe
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="prompt">What would you like to cook?</Label>
              <Textarea
                id="prompt"
                placeholder="E.g., A spicy pasta dish, Healthy breakfast bowl, Chocolate dessert..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cuisine">Cuisine Type (Optional)</Label>
              <Select value={cuisineType} onValueChange={setCuisineType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select cuisine" />
                </SelectTrigger>
                <SelectContent>
                  {cuisineOptions.map((cuisine) => (
                    <SelectItem key={cuisine} value={cuisine}>{cuisine}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ingredients">Available Ingredients (Optional)</Label>
              <div className="flex gap-2">
                <Input
                  id="ingredients"
                  placeholder="Add an ingredient..."
                  value={currentIngredient}
                  onChange={(e) => setCurrentIngredient(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addIngredient()}
                />
                <Button type="button" onClick={addIngredient} variant="secondary">Add</Button>
              </div>
              {ingredients.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {ingredients.map((ingredient) => (
                    <Badge key={ingredient} variant="secondary" className="px-3 py-1">
                      {ingredient}
                      <button onClick={() => removeIngredient(ingredient)} className="ml-2 hover:text-destructive">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Dietary Preferences (Optional)</Label>
              <div className="flex flex-wrap gap-2">
                {dietaryOptions.map((option) => (
                  <Badge
                    key={option}
                    variant={dietaryPreferences.includes(option) ? "default" : "outline"}
                    className="cursor-pointer capitalize"
                    onClick={() => toggleDietary(option)}
                  >
                    {option}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Recipe Category *</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={loading || !prompt.trim() || !category}
              className="w-full"
              variant="hero"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Generating Recipe...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate Recipe
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
