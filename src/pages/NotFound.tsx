import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-warm">
      <div className="text-center px-4">
        <h1 className="mb-4 text-8xl font-bold text-primary">404</h1>
        <p className="mb-2 text-2xl font-semibold text-foreground">{t("notfound_title")}</p>
        <p className="mb-8 text-muted-foreground">{t("notfound_desc")}</p>
        <Button asChild variant="hero" size="lg">
          <Link to="/" className="flex items-center gap-2">
            <Home className="w-5 h-5" />{t("notfound_home")}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
