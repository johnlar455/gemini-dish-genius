import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Save, X } from "lucide-react";
import { usePageTranslation } from "@/hooks/usePageTranslation";
import { useLanguage } from "@/contexts/LanguageContext";

const PAGE_TEXTS = [
  "Edit Recipe",
  "Recipe Title",
  "Enter recipe title",
  "Description",
  "Brief description of the recipe",
  "Recipe Category",
  "Select a category",
  "Cuisine Type",
  "Select cuisine",
  "Difficulty",
  "Select difficulty",
  "Easy",
  "Medium",
  "Hard",
  "Prep Time (minutes)",
  "Cook Time (minutes)",
  "Servings",
  "Dietary Preferences",
  "Ingredients",
  "Add Ingredient",
  "Amount",
  "Ingredient",
  "Instructions",
  "Add Step",
  "Describe this step",
  "Saving...",
  "Save Changes",
  "Cancel",
  "Please enter a recipe title",
  "Recipe updated successfully!",
  "Failed to update recipe",
  "Please sign in to edit recipes",
  "You don't have permission to edit this recipe",
  "Failed to load recipe",
];

export default function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cuisineType, setCuisineType] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [servings, setServings] = useState("");
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [instructions, setInstructions] = useState<any[]>([]);
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const { t } = usePageTranslation(PAGE_TEXTS);
  const { isRTL } = useLanguage();

  const cuisineOptions = ["Italian", "Chinese", "Mexican", "Indian", "Japanese", "Thai", "Mediterranean", "French"];
  const difficultyOptions = [
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" },
  ];
  const dietaryOptions = ["vegetarian", "vegan", "gluten-free", "dairy-free", "keto", "low-carb"];
  const categoryOptions = ["Breakfast", "Desserts", "Dinner", "Gluten-Free", "Lunch", "Snacks", "Vegan", "Vegetarian"];

  useEffect(() => {
    loadRecipe();
  }, [id]);

  const loadRecipe = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error(t("Please sign in to edit recipes"));
        navigate("/auth");
        return;
      }

      const { data, error } = await supabase
        .from("recipes")
        .select("*, categories(name)")
        .eq("id", id)
        .single();

      if (error) throw error;

      if (data.user_id !== user.id) {
        toast.error(t("You don't have permission to edit this recipe"));
        navigate("/recipes");
        return;
      }

      setTitle(data.title || "");
      setDescription(data.description || "");
      setCuisineType(data.cuisine_type || "");
      setDifficulty(data.difficulty || "");
      setPrepTime(data.prep_time?.toString() || "");
      setCookTime(data.cook_time?.toString() || "");
      setServings(data.servings?.toString() || "");
      setIngredients(Array.isArray(data.ingredients) ? data.ingredients : []);
      setInstructions(Array.isArray(data.instructions) ? data.instructions : []);
      setDietaryPreferences(Array.isArray(data.dietary_preferences) ? data.dietary_preferences : []);
      
      if (data.categories && typeof data.categories === 'object' && 'name' in data.categories) {
        setCategory(data.categories.name || "");
      }
    } catch (error: any) {
      console.error("Error loading recipe:", error);
      toast.error(t("Failed to load recipe"));
      navigate("/recipes");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error(t("Please enter a recipe title"));
      return;
    }

    setSaving(true);
    try {
      let categoryId = null;
      if (category) {
        const { data: categoryData, error: categoryError } = await supabase
          .from("categories")
          .select("id")
          .eq("name", category)
          .maybeSingle();

        if (!categoryError && categoryData) {
          categoryId = categoryData.id;
        }
      }

      const { error } = await supabase
        .from("recipes")
        .update({
          title,
          description,
          cuisine_type: cuisineType || null,
          difficulty: difficulty || null,
          prep_time: prepTime ? parseInt(prepTime) : null,
          cook_time: cookTime ? parseInt(cookTime) : null,
          servings: servings ? parseInt(servings) : null,
          ingredients,
          instructions,
          dietary_preferences: dietaryPreferences,
          category_id: categoryId,
        })
        .eq("id", id);

      if (error) throw error;

      toast.success(t("Recipe updated successfully!"));
      navigate(`/recipe/${id}`);
    } catch (error: any) {
      console.error("Error updating recipe:", error);
      toast.error(t("Failed to update recipe"));
    } finally {
      setSaving(false);
    }
  };

  const updateIngredient = (index: number, field: string, value: string) => {
    const updated = [...ingredients];
    updated[index] = { ...updated[index], [field]: value };
    setIngredients(updated);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { item: "", amount: "" }]);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const updateInstruction = (index: number, value: string) => {
    const updated = [...instructions];
    updated[index] = { step: index + 1, text: value };
    setInstructions(updated);
  };

  const addInstruction = () => {
    setInstructions([...instructions, { step: instructions.length + 1, text: "" }]);
  };

  const removeInstruction = (index: number) => {
    const updated = instructions.filter((_, i) => i !== index);
    setInstructions(updated.map((inst, i) => ({ step: i + 1, text: inst.text })));
  };

  const toggleDietary = (option: string) => {
    setDietaryPreferences((prev) =>
      prev.includes(option) ? prev.filter((p) => p !== option) : [...prev, option]
    );
  };

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
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl">{t("Edit Recipe")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">{t("Recipe Title")} *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t("Enter recipe title")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">{t("Description")}</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t("Brief description of the recipe")}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">{t("Recipe Category")}</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder={t("Select a category")} />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cuisine">{t("Cuisine Type")}</Label>
                <Select value={cuisineType} onValueChange={setCuisineType}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("Select cuisine")} />
                  </SelectTrigger>
                  <SelectContent>
                    {cuisineOptions.map((cuisine) => (
                      <SelectItem key={cuisine} value={cuisine}>
                        {cuisine}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="difficulty">{t("Difficulty")}</Label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("Select difficulty")} />
                  </SelectTrigger>
                  <SelectContent>
                    {difficultyOptions.map((diff) => (
                      <SelectItem key={diff.value} value={diff.value}>
                        {t(diff.label)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="prepTime">{t("Prep Time (minutes)")}</Label>
                <Input
                  id="prepTime"
                  type="number"
                  value={prepTime}
                  onChange={(e) => setPrepTime(e.target.value)}
                  placeholder="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cookTime">{t("Cook Time (minutes)")}</Label>
                <Input
                  id="cookTime"
                  type="number"
                  value={cookTime}
                  onChange={(e) => setCookTime(e.target.value)}
                  placeholder="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="servings">{t("Servings")}</Label>
                <Input
                  id="servings"
                  type="number"
                  value={servings}
                  onChange={(e) => setServings(e.target.value)}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>{t("Dietary Preferences")}</Label>
              <div className={`flex flex-wrap gap-2 ${isRTL ? 'justify-end' : ''}`}>
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
              <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Label>{t("Ingredients")}</Label>
                <Button type="button" variant="outline" size="sm" onClick={addIngredient}>
                  {t("Add Ingredient")}
                </Button>
              </div>
              <div className="space-y-2">
                {ingredients.map((ingredient, index) => (
                  <div key={index} className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Input
                      placeholder={t("Amount")}
                      value={ingredient.amount || ""}
                      onChange={(e) => updateIngredient(index, "amount", e.target.value)}
                      className="w-32"
                    />
                    <Input
                      placeholder={t("Ingredient")}
                      value={ingredient.item || ""}
                      onChange={(e) => updateIngredient(index, "item", e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeIngredient(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Label>{t("Instructions")}</Label>
                <Button type="button" variant="outline" size="sm" onClick={addInstruction}>
                  {t("Add Step")}
                </Button>
              </div>
              <div className="space-y-2">
                {instructions.map((instruction, index) => (
                  <div key={index} className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="flex items-center justify-center w-8 h-10 bg-secondary rounded text-sm font-semibold">
                      {index + 1}
                    </div>
                    <Textarea
                      placeholder={t("Describe this step")}
                      value={instruction.text || ""}
                      onChange={(e) => updateInstruction(index, e.target.value)}
                      rows={2}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeInstruction(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className={`flex gap-3 pt-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Button
                onClick={handleSave}
                disabled={saving || !title.trim()}
                className="flex-1"
                size="lg"
              >
                {saving ? (
                  <>
                    <Loader2 className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'} animate-spin`} />
                    {t("Saving...")}
                  </>
                ) : (
                  <>
                    <Save className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    {t("Save Changes")}
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate(`/recipe/${id}`)}
                disabled={saving}
                size="lg"
              >
                {t("Cancel")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
