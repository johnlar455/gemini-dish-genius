-- Add language column to recipes table
ALTER TABLE public.recipes 
ADD COLUMN language text DEFAULT 'en';

-- Create index for language filtering
CREATE INDEX idx_recipes_language ON public.recipes(language);