import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { RecipeCard } from "@/components/RecipeCard";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import * as Icons from "lucide-react";

export default function Categories() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [categories, setCategories] = useState<any[]>([]);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get("category")
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      loadRecipesByCategory(selectedCategory);
    }
  }, [selectedCategory]);

  const loadCategories = async () => {
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name");

      if (error) throw error;
      setCategories(data || []);
    } catch (error: any) {
      console.error("Error loading categories:", error);
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const loadRecipesByCategory = async (categoryId: string) => {
    setLoading(true);
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
      toast.error("Failed to load recipes");
    } finally {
      setLoading(false);
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
    <div className="min-h-screen bg-gradient-warm">
      <Navbar />

      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Browse by Category</h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {categories.map((category) => (
            <Card
              key={category.id}
              className={`cursor-pointer hover:shadow-card transition-all ${
                selectedCategory === category.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => handleCategoryClick(category.id)}
            >
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <div className="text-primary mb-3">{getIcon(category.icon_name)}</div>
                <h3 className="font-semibold">{category.name}</h3>
                {category.description && (
                  <p className="text-xs text-muted-foreground mt-1">{category.description}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedCategory && (
          <div>
            <h2 className="text-2xl font-bold mb-6">
              {categories.find((c) => c.id === selectedCategory)?.name} Recipes
            </h2>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading recipes...</p>
              </div>
            ) : recipes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {recipes.map((recipe) => (
                  <RecipeCard key={recipe.id} {...recipe} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-muted rounded-lg">
                <p className="text-muted-foreground">
                  No recipes in this category yet. Be the first to create one!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
