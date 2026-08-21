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
import { useLanguage } from "@/i18n/LanguageContext";
import { SEO } from "@/components/SEO";
import { normalizeIngredients, normalizeInstructions } from "@/lib/recipeUtils";
import { findCategoryIdByName } from "@/lib/recipes";
import type { Ingredient, Instruction } from "@/types/recipe";
import type { Json } from "@/integrations/supabase/types";

const cuisineOptions = ["Italian", "Chinese", "Mexican", "Indian", "Japanese", "Thai", "Mediterranean", "French"];
const difficultyOptions = [{ value: "easy", label: "Easy" }, { value: "medium", label: "Medium" }, { value: "hard", label: "Hard" }];
const dietaryOptions = ["vegetarian", "vegan", "gluten-free", "dairy-free", "keto", "low-carb"];
const categoryOptions = ["Breakfast", "Desserts", "Dinner", "Gluten-Free", "Lunch", "Snacks", "Vegan", "Vegetarian"];

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
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [instructions, setInstructions] = useState<Instruction[]>([]);
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const { t } = useLanguage();

  useEffect(() => { loadRecipe(); }, [id]);

  const loadRecipe = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { toast.error("Please sign in"); navigate("/auth"); return; }
      // user_id is revoked for clients; ownership is enforced by RLS on UPDATE.
      const { data, error } = await supabase
        .from("recipes")
        .select("title,description,cuisine_type,difficulty,prep_time,cook_time,servings,ingredients,instructions,dietary_preferences,categories(name)")
        .eq("id", id)
        .maybeSingle();
      if (error) throw error;
      if (!data) { toast.error("No permission"); navigate("/recipes"); return; }
      setTitle(data.title || ""); setDescription(data.description || ""); setCuisineType(data.cuisine_type || "");
      setDifficulty(data.difficulty || ""); setPrepTime(data.prep_time?.toString() || ""); setCookTime(data.cook_time?.toString() || "");
      setServings(data.servings?.toString() || ""); setIngredients(normalizeIngredients(data.ingredients));
      setInstructions(normalizeInstructions(data.instructions));
      setDietaryPreferences(Array.isArray(data.dietary_preferences) ? data.dietary_preferences : []);
      if (data.categories && typeof data.categories === 'object' && 'name' in data.categories) setCategory(data.categories.name || "");
    } catch (error: any) { console.error("Error:", error); toast.error("Failed to load recipe"); navigate("/recipes"); }
    finally { setLoading(false); }
  };

  const handleSave = async () => {
    if (!title.trim()) { toast.error("Please enter a title"); return; }
    setSaving(true);
    try {
      const categoryId = await findCategoryIdByName(category);
      const { error } = await supabase.from("recipes").update({
        title, description, cuisine_type: cuisineType || null, difficulty: difficulty || null,
        prep_time: prepTime ? parseInt(prepTime) : null, cook_time: cookTime ? parseInt(cookTime) : null,
        servings: servings ? parseInt(servings) : null,
        // JSON columns: cast the typed arrays to plain JSON for the generated types
        ingredients: ingredients as unknown as Json,
        instructions: instructions as unknown as Json,
        dietary_preferences: dietaryPreferences, category_id: categoryId,
      }).eq("id", id).select("id");
      if (error) throw error;
      toast.success("Recipe updated!"); navigate(`/recipe/${id}`);
    } catch (error: any) { console.error("Error:", error); toast.error("Failed to update recipe"); }
    finally { setSaving(false); }
  };

  const updateIngredient = (index: number, field: string, value: string) => { const u = [...ingredients]; u[index] = { ...u[index], [field]: value }; setIngredients(u); };
  const addIngredient = () => setIngredients([...ingredients, { item: "", amount: "" }]);
  const removeIngredient = (index: number) => setIngredients(ingredients.filter((_, i) => i !== index));
  // Store the same { step, instruction } shape the AI and the detail page use.
  const updateInstruction = (index: number, value: string) => { const u = [...instructions]; u[index] = { step: index + 1, instruction: value }; setInstructions(u); };
  const addInstruction = () => setInstructions([...instructions, { step: instructions.length + 1, instruction: "" }]);
  const removeInstruction = (index: number) => setInstructions(instructions.filter((_, i) => i !== index).map((inst, i) => ({ step: i + 1, instruction: inst.instruction })));
  const toggleDietary = (option: string) => setDietaryPreferences((prev) => prev.includes(option) ? prev.filter((p) => p !== option) : [...prev, option]);

  if (loading) return (<div className="min-h-screen bg-gradient-warm"><Navbar /><div className="container mx-auto py-12 px-4 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div></div>);

  return (
    <div className="min-h-screen bg-gradient-warm flex flex-col">
      <SEO title="Edit Recipe — FlavorAI" description="Edit your saved recipe on FlavorAI." path={`/recipe/${id}/edit`} noindex />
      <Navbar />
      <div className="container mx-auto py-12 px-4 flex-1">
        <Card className="max-w-4xl mx-auto">
          <CardHeader><CardTitle className="text-3xl">{t("edit_title")}</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2"><Label htmlFor="title">{t("edit_recipe_title")}</Label><Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} /></div>
            <div className="space-y-2"><Label htmlFor="description">{t("edit_description")}</Label><Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} /></div>
            <div className="space-y-2">
              <Label>{t("edit_category")}</Label>
              <Select value={category} onValueChange={setCategory}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{categoryOptions.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2"><Label>{t("edit_cuisine")}</Label><Select value={cuisineType} onValueChange={setCuisineType}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{cuisineOptions.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select></div>
              <div className="space-y-2"><Label>{t("edit_difficulty")}</Label><Select value={difficulty} onValueChange={setDifficulty}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{difficultyOptions.map((d) => <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>)}</SelectContent></Select></div>
              <div className="space-y-2"><Label>{t("edit_prep_time")}</Label><Input type="number" value={prepTime} onChange={(e) => setPrepTime(e.target.value)} /></div>
              <div className="space-y-2"><Label>{t("edit_cook_time")}</Label><Input type="number" value={cookTime} onChange={(e) => setCookTime(e.target.value)} /></div>
              <div className="space-y-2"><Label>{t("edit_servings")}</Label><Input type="number" value={servings} onChange={(e) => setServings(e.target.value)} /></div>
            </div>
            <div className="space-y-2"><Label>{t("edit_dietary")}</Label>
              <div className="flex flex-wrap gap-2">{dietaryOptions.map((opt) => <Badge key={opt} variant={dietaryPreferences.includes(opt) ? "default" : "outline"} className="cursor-pointer capitalize" onClick={() => toggleDietary(opt)}>{opt}</Badge>)}</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between"><Label>{t("edit_ingredients")}</Label><Button type="button" variant="outline" size="sm" onClick={addIngredient}>{t("edit_add_ingredient")}</Button></div>
              <div className="space-y-2">{ingredients.map((ing, i) => (
                <div key={i} className="flex gap-2"><Input placeholder={t("edit_amount")} value={ing.amount || ""} onChange={(e) => updateIngredient(i, "amount", e.target.value)} className="w-32" /><Input placeholder={t("edit_ingredient")} value={ing.item || ""} onChange={(e) => updateIngredient(i, "item", e.target.value)} className="flex-1" /><Button type="button" variant="ghost" size="icon" onClick={() => removeIngredient(i)}><X className="w-4 h-4" /></Button></div>
              ))}</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between"><Label>{t("edit_instructions")}</Label><Button type="button" variant="outline" size="sm" onClick={addInstruction}>{t("edit_add_step")}</Button></div>
              <div className="space-y-2">{instructions.map((inst, i) => (
                <div key={i} className="flex gap-2"><div className="flex items-center justify-center w-8 h-10 bg-secondary rounded text-sm font-semibold">{i + 1}</div><Textarea placeholder={t("edit_step_placeholder")} value={inst.instruction} onChange={(e) => updateInstruction(i, e.target.value)} rows={2} className="flex-1" /><Button type="button" variant="ghost" size="icon" onClick={() => removeInstruction(i)}><X className="w-4 h-4" /></Button></div>
              ))}</div>
            </div>
            <div className="flex gap-3 pt-4">
              <Button onClick={handleSave} disabled={saving || !title.trim()} className="flex-1" size="lg">
                {saving ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" />{t("edit_saving")}</> : <><Save className="w-5 h-5 mr-2" />{t("edit_save")}</>}
              </Button>
              <Button variant="outline" onClick={() => navigate(`/recipe/${id}`)} disabled={saving} size="lg">{t("edit_cancel")}</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
