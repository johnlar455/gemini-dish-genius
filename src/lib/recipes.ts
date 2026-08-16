import { supabase } from "@/integrations/supabase/client";
import { normalizeRecipe, normalizeRecipes, sanitizeSearchTerm } from "@/lib/recipeUtils";
import type { Category, Recipe } from "@/types/recipe";

/**
 * Data-access layer for recipes. Pages should call these helpers instead of
 * building Supabase queries inline, so column selection, normalization and
 * error handling stay consistent.
 *
 * NOTE: `user_id` is intentionally never selected — the column is revoked for
 * the `anon` / `authenticated` roles to avoid leaking recipe authorship.
 */
const RECIPE_COLUMNS =
  "id,title,description,image_url,image_data,cuisine_type,difficulty,prep_time,cook_time,servings,dietary_preferences,ingredients,instructions,category_id,is_ai_generated,created_at";

export async function fetchRecipes(options: { limit?: number; categoryId?: string } = {}): Promise<Recipe[]> {
  let query = supabase
    .from("recipes")
    .select(RECIPE_COLUMNS)
    .order("created_at", { ascending: false });

  if (options.categoryId) query = query.eq("category_id", options.categoryId);
  if (options.limit) query = query.limit(options.limit);

  const { data, error } = await query;
  if (error) throw error;
  return normalizeRecipes(data);
}

export async function fetchRecipeById(id: string): Promise<Recipe | null> {
  const { data, error } = await supabase
    .from("recipes")
    .select(RECIPE_COLUMNS)
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data ? normalizeRecipe(data) : null;
}

export async function fetchRelatedRecipes(excludeId: string, limit = 6): Promise<Recipe[]> {
  const { data, error } = await supabase
    .from("recipes")
    .select(RECIPE_COLUMNS)
    .neq("id", excludeId)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return normalizeRecipes(data);
}

export async function searchRecipes(term: string): Promise<Recipe[]> {
  const safe = sanitizeSearchTerm(term);
  if (!safe) return [];
  const { data, error } = await supabase
    .from("recipes")
    .select(RECIPE_COLUMNS)
    .or(`title.ilike.%${safe}%,description.ilike.%${safe}%,cuisine_type.ilike.%${safe}%`)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return normalizeRecipes(data);
}

/**
 * Recipes owned by the signed-in user. RLS scopes the rows to `auth.uid()`, so
 * no client-side `user_id` filter is needed (and the column is not readable).
 */
export async function fetchMyRecipes(): Promise<Recipe[]> {
  const { data, error } = await supabase
    .from("recipes")
    .select(RECIPE_COLUMNS)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return normalizeRecipes(data);
}

export async function deleteRecipe(id: string): Promise<void> {
  const { error } = await supabase.from("recipes").delete().eq("id", id);
  if (error) throw error;
}

export async function fetchCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("id,name,description,icon_name")
    .order("name");
  if (error) throw error;
  return (data ?? []) as Category[];
}

export async function findCategoryIdByName(name: string): Promise<string | null> {
  if (!name) return null;
  const { data, error } = await supabase.from("categories").select("id").eq("name", name).maybeSingle();
  if (error) throw error;
  return data?.id ?? null;
}

export async function fetchFavoriteRecipes(userId: string): Promise<Recipe[]> {
  const { data, error } = await supabase
    .from("favorites")
    .select(`recipe_id, recipes (${RECIPE_COLUMNS})`)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return normalizeRecipes((data ?? []).map((row: any) => row.recipes));
}

export async function isFavorite(userId: string, recipeId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("favorites")
    .select("id")
    .eq("user_id", userId)
    .eq("recipe_id", recipeId)
    .maybeSingle();
  if (error) throw error;
  return !!data;
}

export async function addFavorite(userId: string, recipeId: string): Promise<void> {
  const { error } = await supabase.from("favorites").insert({ user_id: userId, recipe_id: recipeId });
  if (error) throw error;
}

export async function removeFavorite(userId: string, recipeId: string): Promise<void> {
  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("user_id", userId)
    .eq("recipe_id", recipeId);
  if (error) throw error;
}
