import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { User, LogOut, Globe } from "lucide-react";
import { useTranslate } from "@/hooks/useStaticTranslation";
import { SUPPORTED_LANGUAGES } from "@/contexts/LanguageContext";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [displayName, setDisplayName] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState("en");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const { t, isRTL } = useTranslate();

  useEffect(() => {
    checkAuthAndLoadProfile();
  }, []);

  const checkAuthAndLoadProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error("Please sign in to view profile");
      navigate("/auth");
      return;
    }
    setUser(user);
    loadProfile(user.id);
  };

  const loadProfile = async (userId: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error && error.code !== "PGRST116") throw error;
      setDisplayName(data?.display_name || "");
      setPreferredLanguage(data?.preferred_language || "en");
    } catch (error) {
      console.error("Error loading profile:", error);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    if (!user) return;
    setUpdating(true);

    try {
      const { error } = await supabase
        .from("profiles")
        .update({ 
          display_name: displayName,
          preferred_language: preferredLanguage 
        })
        .eq("id", user.id);

      if (error) throw error;
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Signed out successfully");
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-warm">
        <Navbar />
        <div className="container mx-auto py-12 text-center">
          <p className="text-muted-foreground">{t("Loading...")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-warm flex flex-col" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />

      <div className="container mx-auto py-12 px-4 flex-1">
        <div className="max-w-2xl mx-auto">
          <div className={`flex items-center gap-3 mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <User className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold">{t("Profile")}</h1>
          </div>

          <Card className="shadow-card mb-6">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>{t("Email")}</Label>
                <Input value={user?.email || ""} disabled />
              </div>

              <div className="space-y-2">
                <Label htmlFor="displayName">{t("Display Name")}</Label>
                <Input
                  id="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Your name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferredLanguage" className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Globe className="w-4 h-4" />
                  Preferred Language
                </Label>
                <Select value={preferredLanguage} onValueChange={setPreferredLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {SUPPORTED_LANGUAGES.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.nativeName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  This language will be used for generating new recipes
                </p>
              </div>

              <Button onClick={updateProfile} disabled={updating}>
                {updating ? "Updating..." : "Update Profile"}
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Account Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="destructive" onClick={handleSignOut} className="w-full">
                <LogOut className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {t("Sign Out")}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
