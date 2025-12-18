-- Add preferred_language column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS preferred_language text DEFAULT 'en';

-- Add comment for clarity
COMMENT ON COLUMN public.profiles.preferred_language IS 'User preferred language code (en, ar, zh, ja, de, nl, es, it, ru)';