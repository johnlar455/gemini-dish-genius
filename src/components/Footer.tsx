import { Link } from "react-router-dom";
import { ChefHat } from "lucide-react";
import { useStaticTranslation } from "@/hooks/useStaticTranslation";
import { useLanguage } from "@/contexts/LanguageContext";

const FOOTER_TEXTS = [
  "AI-powered recipe discovery and generation for home cooks everywhere.",
  "Explore",
  "Home",
  "Search Recipes",
  "Categories",
  "Generate Recipe",
  "Resources",
  "Cooking Guides",
  "About Us",
  "Contact",
  "Account",
  "My Favorites",
  "Shopping Lists",
  "Profile",
  "All rights reserved. Powered by AI.",
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useStaticTranslation(FOOTER_TEXTS);
  const { isRTL } = useLanguage();

  return (
    <footer className="border-t border-border bg-background/80 backdrop-blur-sm mt-auto" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl">
              <ChefHat className="w-6 h-6 text-primary" />
              <span className="bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
                FlavorAI
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              {t("AI-powered recipe discovery and generation for home cooks everywhere.")}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t("Explore")}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  {t("Home")}
                </Link>
              </li>
              <li>
                <Link to="/search" className="hover:text-primary transition-colors">
                  {t("Search Recipes")}
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-primary transition-colors">
                  {t("Categories")}
                </Link>
              </li>
              <li>
                <Link to="/generate" className="hover:text-primary transition-colors">
                  {t("Generate Recipe")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t("Resources")}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/resources" className="hover:text-primary transition-colors">
                  {t("Cooking Guides")}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">
                  {t("About Us")}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors">
                  {t("Contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t("Account")}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/favorites" className="hover:text-primary transition-colors">
                  {t("My Favorites")}
                </Link>
              </li>
              <li>
                <Link to="/shopping-list" className="hover:text-primary transition-colors">
                  {t("Shopping Lists")}
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-primary transition-colors">
                  {t("Profile")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} FlavorAI. {t("All rights reserved. Powered by AI.")}</p>
        </div>
      </div>
    </footer>
  );
};
