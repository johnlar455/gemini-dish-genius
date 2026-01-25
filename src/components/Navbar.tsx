import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { ChefHat, Heart, Search, User, BookOpen, ShoppingCart, Menu, Sparkles, Notebook, Globe, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useLanguage, SUPPORTED_LANGUAGES } from "@/contexts/LanguageContext";
import { usePageTranslation } from "@/hooks/usePageTranslation";

const NAV_TEXTS = [
  "Home",
  "Search",
  "Categories",
  "Generate",
  "Shop",
  "Recipes",
  "Favorites",
  "Select Language",
  "Add Recipe",
  "Profile",
  "Sign In",
  "Language",
];

export const Navbar = () => {
  const location = useLocation();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { currentLanguage, setLanguage, isTranslating, isRTL } = useLanguage();
  const { t } = usePageTranslation(NAV_TEXTS);

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
    { path: "/", label: t("Home"), icon: ChefHat },
    { path: "/search", label: t("Search"), icon: Search },
    { path: "/categories", label: t("Categories"), icon: BookOpen },
    { path: "/generate", label: t("Generate"), icon: Sparkles },
    { path: "/shop", label: t("Shop"), icon: ShoppingCart },
    ...(user ? [
      { path: "/recipes", label: t("Recipes"), icon: Notebook },
      { path: "/favorites", label: t("Favorites"), icon: Heart }
    ] : [])
  ];

  const currentLangInfo = SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className={`flex items-center gap-2 font-bold text-xl ${isRTL ? 'flex-row-reverse' : ''}`}>
          <ChefHat className="w-8 h-8 text-primary" />
          <span className="bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
            FlavorAI
          </span>
        </Link>

        <div className={`hidden md:flex items-center gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${isRTL ? 'flex-row-reverse' : ''} ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                {isTranslating ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Globe className="w-4 h-4" />
                )}
                <span className="hidden sm:inline">{currentLangInfo.nativeName.split(' ')[0]}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>{t("Select Language")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {SUPPORTED_LANGUAGES.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={currentLanguage === lang.code ? "bg-accent" : ""}
                >
                  {lang.nativeName}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {user && (
            <Button variant="hero" size="sm" asChild className={`hidden md:flex ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Link to="/generate">
                <Sparkles className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {t("Add Recipe")}
              </Link>
            </Button>
          )}
          {user ? (
            <Button variant="ghost" size="sm" asChild className={`hidden md:flex ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Link to="/profile">
                <User className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {t("Profile")}
              </Link>
            </Button>
          ) : (
            <Button variant="default" size="sm" asChild className="hidden md:flex">
              <Link to="/auth">{t("Sign In")}</Link>
            </Button>
          )}

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side={isRTL ? "left" : "right"}>
              <div className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 text-base font-medium transition-colors hover:text-primary ${isRTL ? 'flex-row-reverse' : ''} ${
                        isActive ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {link.label}
                    </Link>
                  );
                })}
                
                {/* Mobile Language Selector */}
                <div className="border-t border-border pt-4 mt-2">
                  <p className={`text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Globe className="w-4 h-4" />
                    {t("Language")}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {SUPPORTED_LANGUAGES.map((lang) => (
                      <Button
                        key={lang.code}
                        variant={currentLanguage === lang.code ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsOpen(false);
                        }}
                        className="text-xs"
                      >
                        {lang.nativeName.split(' ')[0]}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border pt-4 mt-2 space-y-2">
                  {user && (
                    <Button variant="hero" size="sm" asChild className="w-full">
                      <Link to="/generate" onClick={() => setIsOpen(false)} className={`flex items-center justify-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <Sparkles className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                        {t("Add Recipe")}
                      </Link>
                    </Button>
                  )}
                  {user ? (
                    <Button variant="ghost" size="sm" asChild className={`w-full ${isRTL ? 'justify-end' : 'justify-start'}`}>
                      <Link to="/profile" onClick={() => setIsOpen(false)} className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <User className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                        {t("Profile")}
                      </Link>
                    </Button>
                  ) : (
                    <Button variant="default" size="sm" asChild className="w-full">
                      <Link to="/auth" onClick={() => setIsOpen(false)}>{t("Sign In")}</Link>
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