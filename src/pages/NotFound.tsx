import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { usePageTranslation } from "@/hooks/usePageTranslation";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const PAGE_TEXTS = [
  "404",
  "Oops! Page not found",
  "The page you're looking for doesn't exist or has been moved.",
  "Return to Home",
];

const NotFound = () => {
  const location = useLocation();
  const { t } = usePageTranslation(PAGE_TEXTS);
  const { isRTL } = useLanguage();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-warm" dir={isRTL ? "rtl" : "ltr"}>
      <div className="text-center px-4">
        <h1 className="mb-4 text-8xl font-bold text-primary">{t("404")}</h1>
        <p className="mb-2 text-2xl font-semibold text-foreground">{t("Oops! Page not found")}</p>
        <p className="mb-8 text-muted-foreground">
          {t("The page you're looking for doesn't exist or has been moved.")}
        </p>
        <Button asChild variant="hero" size="lg">
          <Link to="/" className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Home className="w-5 h-5" />
            {t("Return to Home")}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
