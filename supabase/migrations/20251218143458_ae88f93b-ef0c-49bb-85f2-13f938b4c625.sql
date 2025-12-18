-- Update handle_new_user function with length validation and error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (
    new.id, 
    CASE 
      WHEN length(new.raw_user_meta_data->>'display_name') > 100 
      THEN substring(new.raw_user_meta_data->>'display_name', 1, 100)
      ELSE new.raw_user_meta_data->>'display_name'
    END
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
EXCEPTION
  WHEN OTHERS THEN
    -- Log error but don't block user registration
    RAISE WARNING 'Failed to create profile for user %: %', new.id, SQLERRM;
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;