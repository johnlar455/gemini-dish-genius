import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { RecipeCard } from "@/components/RecipeCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Search as SearchIcon } from "lucide-react";
import { toast } from "sonner";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      setQuery(q);
      searchRecipes(q);
    }
  }, [searchParams]);

  const searchRecipes = async (searchQuery: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%,cuisine_type.ilike.%${searchQuery}%`)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setRecipes(data || []);
    } catch (error: any) {
      console.error("Error searching recipes:", error);
      toast.error("Failed to search recipes");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      setSearchParams({ q: query });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-warm">
      <Navbar />

      <div className="container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold mb-6 text-center">Search Recipes</h1>
          <div className="flex gap-3">
            <Input
              placeholder="Search by name, cuisine, or ingredients..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="h-12 text-base"
            />
            <Button variant="hero" size="lg" onClick={handleSearch}>
              <SearchIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Searching recipes...</p>
          </div>
        ) : recipes.length > 0 ? (
          <>
            <p className="text-muted-foreground mb-6">
              Found {recipes.length} recipe{recipes.length !== 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} {...recipe} />
              ))}
            </div>
          </>
        ) : query ? (
          <div className="text-center py-12 bg-muted rounded-lg">
            <p className="text-muted-foreground">
              No recipes found for "{query}". Try a different search term.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
