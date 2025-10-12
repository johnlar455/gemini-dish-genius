import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RecipeCard } from "@/components/RecipeCard";
import { AdBanner } from "@/components/AdBanner";
import { usePremiumStatus } from "@/hooks/usePremiumStatus";
import { supabase } from "@/integrations/supabase/client";
import { Search, Sparkles, Crown, Check } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const { isPremium, loading: premiumLoading } = usePremiumStatus();
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(12);

      if (error) throw error;
      setRecipes(data || []);
    } catch (error: any) {
      console.error("Error loading recipes:", error);
      toast.error("Failed to load recipes");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleUpgradeToPremium = async () => {
    if (!user) {
      toast.error("Please sign in to upgrade to premium");
      navigate("/auth");
      return;
    }

    setCheckoutLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout");
      
      if (error) throw error;
      
      if (data?.url) {
        window.open(data.url, "_blank");
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast.error("Failed to start checkout. Please try again.");
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-warm flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            Discover Your Next
            <span className="block text-primary mt-2">Culinary Adventure</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            AI-powered recipe generation tailored to your taste, dietary preferences, and available ingredients
          </p>

          <div className="flex gap-3 max-w-2xl mx-auto mb-6">
            <Input
              placeholder="Search recipes or describe what you want to cook..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="h-12 text-base"
            />
            <Button variant="hero" size="lg" onClick={handleSearch}>
              <Search className="w-5 h-5" />
            </Button>
          </div>

          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate("/generate")}
            className="shadow-soft"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Generate AI Recipe
          </Button>
        </div>
      </section>

      <AdBanner slot="1234567890" format="horizontal" isPremium={isPremium} />

      {/* Premium Subscription Section */}
      {!isPremium && !premiumLoading && (
        <section className="py-16 px-4 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container mx-auto max-w-4xl">
            <Card className="border-2 border-primary/20 shadow-xl">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Crown className="w-16 h-16 text-primary" />
                </div>
                <CardTitle className="text-4xl mb-2">Go Premium Ad-Free</CardTitle>
                <CardDescription className="text-lg">
                  Enjoy FlavorAI without interruptions for just $3/month
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-lg">Remove all advertisements</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-lg">Enjoy uninterrupted recipe browsing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-lg">Support FlavorAI development</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-lg">Cancel anytime, no commitment</span>
                  </div>
                </div>
                
                <div className="text-center pt-4">
                  <p className="text-3xl font-bold mb-2">
                    $3<span className="text-lg font-normal text-muted-foreground">/month</span>
                  </p>
                  <Button 
                    variant="hero" 
                    size="lg" 
                    onClick={handleUpgradeToPremium}
                    disabled={checkoutLoading}
                    className="w-full max-w-sm"
                  >
                    {checkoutLoading ? (
                      "Processing..."
                    ) : (
                      <>
                        <Crown className="w-5 h-5 mr-2" />
                        Upgrade to Premium
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Featured Recipes Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Recipes</h2>
              <p className="text-muted-foreground">
                Explore our collection of AI-generated culinary delights
              </p>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading delicious recipes...</p>
            </div>
          ) : recipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} {...recipe} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted rounded-lg">
              <p className="text-muted-foreground mb-4">No recipes yet. Be the first to create one!</p>
              <Button variant="hero" onClick={() => navigate("/generate")}>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Your First Recipe
              </Button>
            </div>
          )}
        </div>
      </section>

      <AdBanner slot="9876543210" format="horizontal" isPremium={isPremium} />

      <Footer />
    </div>
  );
}
