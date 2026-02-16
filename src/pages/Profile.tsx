import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { User, LogOut } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const { t } = useLanguage();

  useEffect(() => { checkAuthAndLoadProfile(); }, []);

  const checkAuthAndLoadProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { toast.error("Please sign in"); navigate("/auth"); return; }
    setUser(user); loadProfile(user.id);
  };

  const loadProfile = async (userId: string) => {
    setLoading(true);
    try { const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single(); if (error && error.code !== "PGRST116") throw error; setDisplayName(data?.display_name || ""); }
    catch (error) { console.error("Error:", error); toast.error("Failed to load profile"); }
    finally { setLoading(false); }
  };

  const updateProfile = async () => {
    if (!user) return;
    setUpdating(true);
    try { const { error } = await supabase.from("profiles").update({ display_name: displayName }).eq("id", user.id); if (error) throw error; toast.success("Profile updated successfully"); }
    catch (error) { console.error("Error:", error); toast.error("Failed to update profile"); }
    finally { setUpdating(false); }
  };

  const handleSignOut = async () => {
    try { await supabase.auth.signOut(); toast.success("Signed out successfully"); navigate("/"); }
    catch (error) { console.error("Error:", error); toast.error("Failed to sign out"); }
  };

  if (loading) return (<div className="min-h-screen bg-gradient-warm"><Navbar /><div className="container mx-auto py-12 text-center"><p className="text-muted-foreground">{t("profile_loading")}</p></div></div>);

  return (
    <div className="min-h-screen bg-gradient-warm flex flex-col">
      <Navbar />
      <div className="container mx-auto py-12 px-4 flex-1">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-8"><User className="w-8 h-8 text-primary" /><h1 className="text-4xl font-bold">{t("profile_title")}</h1></div>
          <Card className="shadow-card mb-6">
            <CardHeader><CardTitle>{t("profile_account_info")}</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2"><Label>{t("profile_email")}</Label><Input value={user?.email || ""} disabled /></div>
              <div className="space-y-2"><Label htmlFor="displayName">{t("profile_display_name")}</Label><Input id="displayName" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder={t("profile_name_placeholder")} /></div>
              <Button onClick={updateProfile} disabled={updating}>{updating ? t("profile_updating") : t("profile_update")}</Button>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardHeader><CardTitle>{t("profile_actions")}</CardTitle></CardHeader>
            <CardContent><Button variant="destructive" onClick={handleSignOut} className="w-full"><LogOut className="w-4 h-4 mr-2" />{t("profile_sign_out")}</Button></CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
