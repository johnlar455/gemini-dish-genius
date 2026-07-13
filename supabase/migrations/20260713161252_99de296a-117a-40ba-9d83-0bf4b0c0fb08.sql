
GRANT ALL ON public.recipes TO service_role;

GRANT INSERT, UPDATE, DELETE ON public.recipes TO authenticated;

GRANT SELECT (id, title, description, cuisine_type, dietary_preferences, prep_time, cook_time, servings, difficulty, ingredients, instructions, image_url, image_data, category_id, is_ai_generated, created_at, updated_at, language)
  ON public.recipes TO anon, authenticated;
