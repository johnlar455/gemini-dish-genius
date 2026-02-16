import { Link } from "react-router-dom";
import { ChefHat } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-background/80 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl">
              <ChefHat className="w-6 h-6 text-primary" />
              <span className="bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
                FlavorAI
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">{t("footer_desc")}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t("footer_explore")}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary transition-colors">{t("nav_home")}</Link></li>
              <li><Link to="/search" className="hover:text-primary transition-colors">{t("footer_search_recipes")}</Link></li>
              <li><Link to="/categories" className="hover:text-primary transition-colors">{t("nav_categories")}</Link></li>
              <li><Link to="/generate" className="hover:text-primary transition-colors">{t("gen_title")}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t("footer_resources")}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/resources" className="hover:text-primary transition-colors">{t("footer_cooking_guides")}</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">{t("footer_about")}</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">{t("footer_contact")}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t("footer_account")}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/favorites" className="hover:text-primary transition-colors">{t("footer_my_favorites")}</Link></li>
              <li><Link to="/shopping-list" className="hover:text-primary transition-colors">{t("footer_shopping_lists")}</Link></li>
              <li><Link to="/profile" className="hover:text-primary transition-colors">{t("footer_profile")}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} {t("footer_copyright")}</p>
        </div>
      </div>
    </footer>
  );
};
