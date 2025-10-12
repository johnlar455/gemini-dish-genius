import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const usePremiumStatus = () => {
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);
  const [subscriptionEnd, setSubscriptionEnd] = useState<string | null>(null);

  const checkSubscription = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setIsPremium(false);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase.functions.invoke("check-subscription");
      
      if (error) throw error;
      
      setIsPremium(data?.subscribed || false);
      setSubscriptionEnd(data?.subscription_end || null);
    } catch (error) {
      console.error("Error checking subscription:", error);
      setIsPremium(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSubscription();

    // Recheck every minute
    const interval = setInterval(checkSubscription, 60000);

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkSubscription();
    });

    return () => {
      interval && clearInterval(interval);
      subscription.unsubscribe();
    };
  }, []);

  return { isPremium, loading, subscriptionEnd, refreshStatus: checkSubscription };
};
