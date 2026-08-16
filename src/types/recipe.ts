/**
 * Shared domain types for recipes.
 *
 * The `recipes` table stores `ingredients` / `instructions` as JSON, and the
 * shapes have drifted over time (AI generation writes `{ step, instruction }`,
 * the editor used to write `{ step, text }`). These types describe the
 * canonical in-app shape; use the normalizers in `@/lib/recipeUtils` to convert
 * raw database rows into them.
 */

export type Difficulty = "easy" | "medium" | "hard";

export interface Ingredient {
  item: string;
  amount: string;
}

export interface Instruction {
  step: number;
  instruction: string;
}

/** A recipe row as the client is allowed to read it (no `user_id`). */
export interface Recipe {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  image_data: string | null;
  cuisine_type: string | null;
  difficulty: string | null;
  prep_time: number | null;
  cook_time: number | null;
  servings: number | null;
  dietary_preferences: string[] | null;
  ingredients: Ingredient[];
  instructions: Instruction[];
  category_id: string | null;
  is_ai_generated: boolean | null;
  created_at: string | null;
}

export interface Category {
  id: string;
  name: string;
  description: string | null;
  icon_name: string | null;
}

export const DIFFICULTY_OPTIONS: Difficulty[] = ["easy", "medium", "hard"];

export const CUISINE_OPTIONS = [
  "Italian",
  "Chinese",
  "Mexican",
  "Indian",
  "Japanese",
  "Thai",
  "Mediterranean",
  "French",
] as const;

export const CATEGORY_OPTIONS = [
  "Breakfast",
  "Desserts",
  "Dinner",
  "Gluten-Free",
  "Lunch",
  "Snacks",
  "Vegan",
  "Vegetarian",
] as const;

export const DIETARY_OPTIONS = [
  "vegetarian",
  "vegan",
  "gluten-free",
  "dairy-free",
  "keto",
  "low-carb",
] as const;
