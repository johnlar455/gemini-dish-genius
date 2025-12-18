import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { ChefHat, Heart, Search, User, BookOpen, ShoppingCart, Menu, Sparkles, Notebook, Globe } from "lucide-react";
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
import { toast } from "sonner";

const SUPPORTED_LANGUAGES = [
  { code: "en", name: "English", nativeName: "🇬🇧 English" },
  { code: "ar", name: "Arabic", nativeName: "🇸🇦 العربية" },
  { code: "zh", name: "Chinese", nativeName: "🇨🇳 中文" },
  { code: "ja", name: "Japanese", nativeName: "🇯🇵 日本語" },
  { code: "de", name: "German", nativeName: "🇩🇪 Deutsch" },
  { code: "nl", name: "Dutch", nativeName: "🇳🇱 Nederlands" },
  { code: "es", name: "Spanish", nativeName: "🇪🇸 Español" },
  { code: "it", name: "Italian", nativeName: "🇮🇹 Italiano" },
  { code: "ru", name: "Russian", nativeName: "🇷🇺 Русский" },
];

export const Navbar = () => {
  const location = useLocation();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("en");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadUserLanguage(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        setTimeout(() => loadUserLanguage(session.user.id), 0);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUserLanguage = async (userId: string) => {
    const { data: profile } = await supabase
      .from("profiles")
      .select("preferred_language")
      .eq("id", userId)
      .single();
    
    if (profile?.preferred_language) {
      setCurrentLanguage(profile.preferred_language);
    }
  };

  const handleLanguageChange = async (langCode: string) => {
    if (!user) {
      toast.error("Please sign in to change language preference");
      return;
    }

    try {
      const { error } = await supabase
        .from("profiles")
        .update({ preferred_language: langCode })
        .eq("id", user.id);

      if (error) throw error;
      
      setCurrentLanguage(langCode);
      const langName = SUPPORTED_LANGUAGES.find(l => l.code === langCode)?.name || langCode;
      toast.success(`Language changed to ${langName}`);
    } catch (error) {
      console.error("Error updating language:", error);
      toast.error("Failed to update language preference");
    }
  };

  const navLinks = [
    { path: "/", label: "Home", icon: ChefHat },
    { path: "/search", label: "Search", icon: Search },
    { path: "/categories", label: "Categories", icon: BookOpen },
    { path: "/generate", label: "Generate", icon: Sparkles },
    { path: "/shop", label: "Shop", icon: ShoppingCart },
    ...(user ? [
      { path: "/recipes", label: "Recipes", icon: Notebook },
      { path: "/favorites", label: "Favorites", icon: Heart }
    ] : [])
  ];

  const currentLangInfo = SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];

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
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">{currentLangInfo.nativeName.split(' ')[0]}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Select Language</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {SUPPORTED_LANGUAGES.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={currentLanguage === lang.code ? "bg-accent" : ""}
                >
                  {lang.nativeName}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

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
                
                {/* Mobile Language Selector */}
                <div className="border-t border-border pt-4 mt-2">
                  <p className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Language
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {SUPPORTED_LANGUAGES.map((lang) => (
                      <Button
                        key={lang.code}
                        variant={currentLanguage === lang.code ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          handleLanguageChange(lang.code);
                          setIsOpen(false);
                        }}
                        className="text-xs"
                      >
                        {lang.nativeName.split(' ')[0]} {lang.name.slice(0, 2)}
                      </Button>
                    ))}
                  </div>
                </div>

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
