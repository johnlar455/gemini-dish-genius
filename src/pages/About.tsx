import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Brain, Zap, Shield } from "lucide-react";
import { usePageTranslation } from "@/hooks/usePageTranslation";
import { useLanguage } from "@/contexts/LanguageContext";

const PAGE_TEXTS = [
  "About FlavorAI",
  "Revolutionizing home cooking with AI-powered recipe generation",
  "Our Mission",
  "FlavorAI was created to make cooking more accessible, creative, and enjoyable for everyone. Whether you're a seasoned chef or just starting your culinary journey, our AI-powered platform helps you discover new recipes tailored to your unique preferences.",
  "We believe that great cooking should be accessible to everyone, regardless of experience level or available ingredients. That's why we've built a platform that combines the power of artificial intelligence with the art of cooking.",
  "Key Features",
  "AI-Powered Recipe Generation",
  "Leveraging advanced Google Gemini AI to create unique, personalized recipes based on your preferences and available ingredients.",
  "Beautiful Visual Generation",
  "Each recipe comes with an AI-generated image of the dish, giving you a visual preview of your culinary creation.",
  "Instant Results",
  "Get complete recipes with ingredients and step-by-step instructions in seconds, not hours of research.",
  "Secure & Private",
  "Your data is protected with Lovable Cloud, ensuring your favorite recipes and preferences stay safe.",
  "Technology Stack",
  "FlavorAI is built with cutting-edge technology to provide the best experience:",
  "Google Gemini AI:",
  "Powers our recipe and image generation with state-of-the-art language models",
  "Lovable Cloud:",
  "Provides secure backend infrastructure for data storage and authentication",
  "React & TypeScript:",
  "Ensures a fast, responsive, and type-safe user experience",
  "Tailwind CSS:",
  "Creates beautiful, consistent designs that work on any device",
];

export default function About() {
  const { t } = usePageTranslation(PAGE_TEXTS);
  const { isRTL } = useLanguage();

  const features = [
    {
      icon: Brain,
      title: t("AI-Powered Recipe Generation"),
      description: t("Leveraging advanced Google Gemini AI to create unique, personalized recipes based on your preferences and available ingredients."),
    },
    {
      icon: Sparkles,
      title: t("Beautiful Visual Generation"),
      description: t("Each recipe comes with an AI-generated image of the dish, giving you a visual preview of your culinary creation."),
    },
    {
      icon: Zap,
      title: t("Instant Results"),
      description: t("Get complete recipes with ingredients and step-by-step instructions in seconds, not hours of research."),
    },
    {
      icon: Shield,
      title: t("Secure & Private"),
      description: t("Your data is protected with Lovable Cloud, ensuring your favorite recipes and preferences stay safe."),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-warm flex flex-col" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />

      <div className="container mx-auto py-12 px-4 flex-1">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 text-center">{t("About FlavorAI")}</h1>
          <p className="text-xl text-muted-foreground text-center mb-12">
            {t("Revolutionizing home cooking with AI-powered recipe generation")}
          </p>

          <Card className="shadow-card mb-12">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">{t("Our Mission")}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t("FlavorAI was created to make cooking more accessible, creative, and enjoyable for everyone. Whether you're a seasoned chef or just starting your culinary journey, our AI-powered platform helps you discover new recipes tailored to your unique preferences.")}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t("We believe that great cooking should be accessible to everyone, regardless of experience level or available ingredients. That's why we've built a platform that combines the power of artificial intelligence with the art of cooking.")}
              </p>
            </CardContent>
          </Card>

          <h2 className="text-3xl font-bold mb-8 text-center">{t("Key Features")}</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="shadow-card">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground text-sm">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="shadow-card">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">{t("Technology Stack")}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t("FlavorAI is built with cutting-edge technology to provide the best experience:")}
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span>
                    <strong>{t("Google Gemini AI:")}</strong> {t("Powers our recipe and image generation with state-of-the-art language models")}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span>
                    <strong>{t("Lovable Cloud:")}</strong> {t("Provides secure backend infrastructure for data storage and authentication")}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span>
                    <strong>{t("React & TypeScript:")}</strong> {t("Ensures a fast, responsive, and type-safe user experience")}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span>
                    <strong>{t("Tailwind CSS:")}</strong> {t("Creates beautiful, consistent designs that work on any device")}
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
