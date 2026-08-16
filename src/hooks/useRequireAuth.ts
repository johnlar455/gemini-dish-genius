import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuthUser } from "@/hooks/useAuthUser";

/**
 * Guards a private route: redirects to /auth once we know there is no session.
 * Returns the resolved user (null while the session is still loading).
 */
export function useRequireAuth() {
  const { user, loading } = useAuthUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading || user) return;
    toast.error("Please sign in to continue");
    navigate("/auth", { replace: true });
  }, [loading, user, navigate]);

  return { user, loading };
}
