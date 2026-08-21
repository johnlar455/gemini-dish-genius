import type { ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { cn } from "@/lib/utils";

interface PageShellProps {
  children: ReactNode;
  /** Renders a centered spinner instead of the children. */
  loading?: boolean;
  loadingLabel?: string;
  className?: string;
}

/**
 * Consistent page chrome: navbar, a semantic <main> landmark and the footer.
 * Keeps loading states identical across routes.
 */
export const PageShell = ({ children, loading = false, loadingLabel, className }: PageShellProps) => (
  <div className="min-h-screen bg-gradient-warm flex flex-col">
    <Navbar />
    <main className={cn("container mx-auto px-4 sm:px-6 py-8 flex-1", className)}>
    <div className="canvas-surface px-4 py-10 sm:px-10">
      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <Loader2 className="w-10 h-10 animate-spin text-primary" aria-hidden="true" />
          <p className="text-muted-foreground" role="status">{loadingLabel ?? "Loading…"}</p>
        </div>
      ) : (
        children
      )}
    </div>
    </main>
    <Footer />
  </div>
);
