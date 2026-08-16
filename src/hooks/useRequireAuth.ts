import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAuthUser } from "@/hooks/useAuthUser";

/**
 * Guards a private route: redirects to /auth once we know there is no session.
 * Returns the resolved user (null while still loading).
 */
export function useRequireAuth() {
  const { user, loading } = useAuthUser();
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    if (loading || user) return;
    toast.error(t("auth_required"));
    navigate("/auth", { replace: true });
  }, [loading, user, navigate, t]);

  return { user, loading };
}
