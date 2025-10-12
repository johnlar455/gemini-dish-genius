import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { ChefHat, Heart, Search, User, BookOpen, ShoppingCart, Menu, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export const Navbar = () => {
  const location = useLocation();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const navLinks = [
    { path: "/", label: "Home", icon: ChefHat },
    { path: "/search", label: "Search", icon: Search },
    { path: "/categories", label: "Categories", icon: BookOpen },
    { path: "/generate", label: "Generate", icon: Sparkles },
    ...(user ? [
      { path: "/favorites", label: "Favorites", icon: Heart },
      { path: "/shopping-list", label: "Shopping", icon: ShoppingCart }
    ] : [])
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <ChefHat className="w-8 h-8 text-primary" />
          <span className="bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
            FlavorAI
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          {user && (
            <Button variant="hero" size="sm" asChild className="hidden md:flex">
              <Link to="/generate">
                <Sparkles className="w-4 h-4" />
                Add Recipe
              </Link>
            </Button>
          )}
          {user ? (
            <Button variant="ghost" size="sm" asChild className="hidden md:flex">
              <Link to="/profile">
                <User className="w-4 h-4" />
                Profile
              </Link>
            </Button>
          ) : (
            <Button variant="default" size="sm" asChild className="hidden md:flex">
              <Link to="/auth">Sign In</Link>
            </Button>
          )}

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 text-base font-medium transition-colors hover:text-primary ${
                        isActive ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {link.label}
                    </Link>
                  );
                })}
                <div className="border-t border-border pt-4 mt-2 space-y-2">
                  {user && (
                    <Button variant="hero" size="sm" asChild className="w-full">
                      <Link to="/generate" onClick={() => setIsOpen(false)}>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Add Recipe
                      </Link>
                    </Button>
                  )}
                  {user ? (
                    <Button variant="ghost" size="sm" asChild className="w-full justify-start">
                      <Link to="/profile" onClick={() => setIsOpen(false)}>
                        <User className="w-4 h-4 mr-2" />
                        Profile
                      </Link>
                    </Button>
                  ) : (
                    <Button variant="default" size="sm" asChild className="w-full">
                      <Link to="/auth" onClick={() => setIsOpen(false)}>Sign In</Link>
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
