-- Restrict user_id column visibility on recipes: only owner can read their own user_id via a dedicated policy path.
-- Approach: revoke user_id column privilege from anon/authenticated, so public browsing never exposes it.
-- Owner still writes via INSERT/UPDATE policies (WITH CHECK uses auth.uid()).

REVOKE SELECT ON public.recipes FROM anon, authenticated;

GRANT SELECT (id, title, description, cuisine_type, dietary_preferences, prep_time, cook_time, servings, difficulty, ingredients, instructions, image_url, image_data, category_id, is_ai_generated, created_at, updated_at, language) ON public.recipes TO anon, authenticated;

-- Keep full access for service_role (edge functions/admin).
GRANT ALL ON public.recipes TO service_role;