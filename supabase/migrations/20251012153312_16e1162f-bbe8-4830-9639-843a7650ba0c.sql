-- Drop the existing INSERT and UPDATE policies that allow users to modify their premium status
DROP POLICY IF EXISTS "Users can insert their own premium status" ON public.user_premium;
DROP POLICY IF EXISTS "Users can update their own premium status" ON public.user_premium;

-- The SELECT policy remains so users can view their own subscription status
-- This is already in place: "Users can view their own premium status"

-- Now only backend services using the service role key can INSERT/UPDATE
-- This prevents users from manipulating their subscription data
-- Edge functions like check-subscription will continue to work as they use the service role key