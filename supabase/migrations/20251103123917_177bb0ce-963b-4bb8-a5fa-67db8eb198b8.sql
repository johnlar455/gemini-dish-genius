-- Add explicit RLS policies to prevent user manipulation of premium subscription data
-- Only backend services with service role key can modify this table

-- Block all INSERT operations from users
CREATE POLICY "Only backend can insert premium records"
ON public.user_premium
FOR INSERT
WITH CHECK (false);

-- Block all UPDATE operations from users
CREATE POLICY "Only backend can update premium records"
ON public.user_premium
FOR UPDATE
USING (false);

-- Block all DELETE operations from users
CREATE POLICY "Only backend can delete premium records"
ON public.user_premium
FOR DELETE
USING (false);