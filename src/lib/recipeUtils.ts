import type { Ingredient, Instruction, Recipe } from "@/types/recipe";

/**
 * Difficulty labels returned by the AI in any supported language, mapped back
 * to the canonical English values stored in the database.
 */
const DIFFICULTY_MAP: Record<string, string> = {
  easy: "easy", medium: "medium", hard: "hard",
  "سهل": "easy", "متوسط": "medium", "صعب": "hard",
  "fácil": "easy", medio: "medium", "difícil": "hard",
  facile: "easy", moyen: "medium", difficile: "hard",
  leicht: "easy", mittel: "medium", schwer: "hard",
  "簡単": "easy", "普通": "medium", "難しい": "hard",
  "简单": "easy", "中等": "medium", "困难": "hard",
  "лёгкий": "easy", "средний": "medium", "сложный": "hard",
  makkelijk: "easy", gemiddeld: "medium", moeilijk: "hard",
};

export function normalizeDifficulty(value: unknown): string {
  if (typeof value !== "string") return "medium";
  return DIFFICULTY_MAP[value.trim().toLowerCase()] ?? "medium";
}

/** Accepts `{item, amount}`, `{name, quantity}` or a plain string. */
export function normalizeIngredients(raw: unknown): Ingredient[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((entry): Ingredient => {
      if (typeof entry === "string") return { item: entry, amount: "" };
      if (entry && typeof entry === "object") {
        const e = entry as Record<string, unknown>;
        return {
          item: String(e.item ?? e.name ?? e.ingredient ?? "").trim(),
          amount: String(e.amount ?? e.quantity ?? "").trim(),
        };
      }
      return { item: "", amount: "" };
    })
    .filter((i) => i.item.length > 0 || i.amount.length > 0);
}

/**
 * Accepts `{step, instruction}` (AI output), `{step, text}` (legacy editor
 * output) or a plain string, and always renumbers steps sequentially.
 */
export function normalizeInstructions(raw: unknown): Instruction[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((entry): string => {
      if (typeof entry === "string") return entry;
      if (entry && typeof entry === "object") {
        const e = entry as Record<string, unknown>;
        return String(e.instruction ?? e.text ?? e.description ?? "");
      }
      return "";
    })
    .map((instruction) => instruction.trim())
    .filter((instruction) => instruction.length > 0)
    .map((instruction, index) => ({ step: index + 1, instruction }));
}

/** Converts an arbitrary database row into the canonical `Recipe` shape. */
export function normalizeRecipe(row: Record<string, any>): Recipe {
  return {
    id: row.id,
    title: row.title ?? "",
    description: row.description ?? null,
    image_url: row.image_url ?? null,
    image_data: row.image_data ?? null,
    cuisine_type: row.cuisine_type ?? null,
    difficulty: row.difficulty ?? null,
    prep_time: row.prep_time ?? null,
    cook_time: row.cook_time ?? null,
    servings: row.servings ?? null,
    dietary_preferences: Array.isArray(row.dietary_preferences) ? row.dietary_preferences : [],
    ingredients: normalizeIngredients(row.ingredients),
    instructions: normalizeInstructions(row.instructions),
    category_id: row.category_id ?? null,
    is_ai_generated: row.is_ai_generated ?? null,
    created_at: row.created_at ?? null,
  };
}

export function normalizeRecipes(rows: unknown): Recipe[] {
  if (!Array.isArray(rows)) return [];
  return rows.filter(Boolean).map((row) => normalizeRecipe(row));
}

/**
 * PostgREST `or()` filters are parsed as a comma-separated expression list, so
 * user input containing `,`, `(`, `)`, `"` or `\` can break out of the intended
 * filter. Strip those characters and cap the length before interpolating.
 */
export function sanitizeSearchTerm(term: string): string {
  return term.replace(/[,()"'\\%*]/g, " ").replace(/\s+/g, " ").trim().slice(0, 100);
}

export function totalTime(recipe: Pick<Recipe, "prep_time" | "cook_time">): number {
  return (recipe.prep_time ?? 0) + (recipe.cook_time ?? 0);
}

export function recipeImage(recipe: Pick<Recipe, "image_data" | "image_url">): string {
  return recipe.image_data || recipe.image_url || "/placeholder.svg";
}
