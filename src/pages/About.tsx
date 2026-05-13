import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Brain, Zap, Shield } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { SEO } from "@/components/SEO";

export default function About() {
  const { t } = useLanguage();
  const features = [
    { icon: Brain, title: t("about_f1_title"), description: t("about_f1_desc") },
    { icon: Sparkles, title: t("about_f2_title"), description: t("about_f2_desc") },
    { icon: Zap, title: t("about_f3_title"), description: t("about_f3_desc") },
    { icon: Shield, title: t("about_f4_title"), description: t("about_f4_desc") },
  ];

  return (
    <div className="min-h-screen bg-gradient-warm flex flex-col">
      <SEO title="About FlavorAI — Our Mission & Technology" description="Learn how FlavorAI uses Google Gemini AI and modern web tech to help home cooks discover personalized recipes." path="/about" />
      <Navbar />
      <div className="container mx-auto py-12 px-4 flex-1">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 text-center">{t("about_title")}</h1>
          <p className="text-xl text-muted-foreground text-center mb-12">{t("about_subtitle")}</p>
          <Card className="shadow-card mb-12"><CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">{t("about_mission")}</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{t("about_mission_p1")}</p>
            <p className="text-muted-foreground leading-relaxed">{t("about_mission_p2")}</p>
          </CardContent></Card>
          <h2 className="text-3xl font-bold mb-8 text-center">{t("about_features")}</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="shadow-card"><CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0"><Icon className="w-6 h-6 text-primary" /></div>
                    <div><h3 className="font-semibold text-lg mb-2">{feature.title}</h3><p className="text-muted-foreground text-sm">{feature.description}</p></div>
                  </div>
                </CardContent></Card>
              );
            })}
          </div>
          <Card className="shadow-card"><CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">{t("about_tech")}</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{t("about_tech_desc")}</p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2"><span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span><span><strong>Google Gemini AI:</strong> {t("about_tech_gemini")}</span></li>
              <li className="flex items-start gap-2"><span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span><span><strong>Lovable Cloud:</strong> {t("about_tech_cloud")}</span></li>
              <li className="flex items-start gap-2"><span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span><span><strong>React & TypeScript:</strong> {t("about_tech_react")}</span></li>
              <li className="flex items-start gap-2"><span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span><span><strong>Tailwind CSS:</strong> {t("about_tech_tailwind")}</span></li>
            </ul>
          </CardContent></Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
