import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { ChefHat, Heart, Search, User, BookOpen, Menu, Sparkles, Notebook } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage } from "@/i18n/LanguageContext";

export const Navbar = () => {
  const location = useLocation();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

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
    { path: "/", label: t("nav_home"), icon: ChefHat },
    { path: "/search", label: t("nav_search"), icon: Search },
    { path: "/categories", label: t("nav_categories"), icon: BookOpen },
    { path: "/generate", label: t("nav_generate"), icon: Sparkles },
    ...(user ? [
      { path: "/recipes", label: t("nav_recipes"), icon: Notebook },
      { path: "/favorites", label: t("nav_favorites"), icon: Heart }
    ] : [])
  ];

  return (
    <nav className="sticky top-0 z-50 w-full px-3 pt-3 sm:px-6 sm:pt-5">
      <div className="container mx-auto flex h-16 items-center justify-between rounded-full bg-card/90 px-4 shadow-soft backdrop-blur-md sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <ChefHat className="w-8 h-8 text-primary" />
          <span className="font-display text-foreground tracking-tight">FlavorAI</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary ${
                  isActive ? "bg-secondary text-foreground" : "text-muted-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          {user && (
            <Button variant="hero" size="sm" asChild className="hidden md:flex">
              <Link to="/generate">
                <Sparkles className="w-4 h-4 mr-2" />
                {t("nav_add_recipe")}
              </Link>
            </Button>
          )}
          {user ? (
            <Button variant="ghost" size="sm" asChild className="hidden md:flex">
              <Link to="/profile">
                <User className="w-4 h-4 mr-2" />
                {t("nav_profile")}
              </Link>
            </Button>
          ) : (
            <Button variant="hero" size="sm" asChild className="hidden md:flex">
              <Link to="/auth">{t("nav_sign_in")}</Link>
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
                      <Link to="/generate" onClick={() => setIsOpen(false)} className="flex items-center justify-center">
                        <Sparkles className="w-4 h-4 mr-2" />
                        {t("nav_add_recipe")}
                      </Link>
                    </Button>
                  )}
                  {user ? (
                    <Button variant="ghost" size="sm" asChild className="w-full justify-start">
                      <Link to="/profile" onClick={() => setIsOpen(false)} className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        {t("nav_profile")}
                      </Link>
                    </Button>
                  ) : (
                    <Button variant="default" size="sm" asChild className="w-full">
                      <Link to="/auth" onClick={() => setIsOpen(false)}>{t("nav_sign_in")}</Link>
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
