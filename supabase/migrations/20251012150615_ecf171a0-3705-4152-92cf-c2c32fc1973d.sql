-- Create user_premium table to track premium subscriptions
CREATE TABLE public.user_premium (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  subscription_status TEXT NOT NULL DEFAULT 'inactive',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE public.user_premium ENABLE ROW LEVEL SECURITY;

-- Create policies for user_premium
CREATE POLICY "Users can view their own premium status"
ON public.user_premium
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own premium status"
ON public.user_premium
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own premium status"
ON public.user_premium
FOR UPDATE
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_user_premium_updated_at
BEFORE UPDATE ON public.user_premium
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();