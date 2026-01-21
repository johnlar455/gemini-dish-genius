import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, Utensils, ChefHat, Thermometer } from "lucide-react";
import { usePageTranslation } from "@/hooks/usePageTranslation";
import { useLanguage } from "@/contexts/LanguageContext";

const PAGE_TEXTS = [
  "Cooking Resources",
  "Essential guides and tips to elevate your culinary skills",
  "Essential Cooking Tips",
  "Mise en Place",
  "Always prepare and organize all your ingredients before you start cooking. This French culinary phrase means 'everything in its place' and is key to stress-free cooking.",
  "Taste as You Go",
  "The most important skill in cooking is tasting your food throughout the process. This helps you adjust seasonings and flavors before serving.",
  "Sharp Knives",
  "A sharp knife is safer and more efficient than a dull one. Invest in a good quality knife and learn to maintain its edge.",
  "Room Temperature Ingredients",
  "For baking and cooking, bringing ingredients to room temperature (especially eggs, butter, and meat) ensures even cooking and better results.",
  "Essential Kitchen Tools",
  "These are the fundamental tools every home cook should have:",
  "Chef's knife and paring knife",
  "Cutting board (preferably wooden or bamboo)",
  "Cast iron skillet",
  "Non-stick pan",
  "Large pot for pasta and soups",
  "Mixing bowls in various sizes",
  "Measuring cups and spoons",
  "Wooden spoons and silicone spatulas",
  "Meat thermometer",
  "Kitchen timer",
  "Pantry Essentials",
  "Stock your pantry with these basics to be ready for any recipe:",
  "Olive oil and vegetable oil",
  "Salt (kosher and sea salt) and black pepper",
  "Garlic and onions",
  "All-purpose flour",
  "Sugar (white and brown)",
  "Rice and pasta",
  "Canned tomatoes",
  "Stock or broth (chicken, vegetable, or beef)",
  "Soy sauce and vinegar",
  "Basic spices: paprika, cumin, oregano, basil",
  "Quick Conversion Guide",
  "Common measurement conversions for cooking and baking:",
];

export default function Resources() {
  const { t } = usePageTranslation(PAGE_TEXTS);
  const { isRTL } = useLanguage();

  const cookingTips = [
    {
      title: t("Mise en Place"),
      content: t("Always prepare and organize all your ingredients before you start cooking. This French culinary phrase means 'everything in its place' and is key to stress-free cooking."),
    },
    {
      title: t("Taste as You Go"),
      content: t("The most important skill in cooking is tasting your food throughout the process. This helps you adjust seasonings and flavors before serving."),
    },
    {
      title: t("Sharp Knives"),
      content: t("A sharp knife is safer and more efficient than a dull one. Invest in a good quality knife and learn to maintain its edge."),
    },
    {
      title: t("Room Temperature Ingredients"),
      content: t("For baking and cooking, bringing ingredients to room temperature (especially eggs, butter, and meat) ensures even cooking and better results."),
    },
  ];

  const essentialTools = [
    t("Chef's knife and paring knife"),
    t("Cutting board (preferably wooden or bamboo)"),
    t("Cast iron skillet"),
    t("Non-stick pan"),
    t("Large pot for pasta and soups"),
    t("Mixing bowls in various sizes"),
    t("Measuring cups and spoons"),
    t("Wooden spoons and silicone spatulas"),
    t("Meat thermometer"),
    t("Kitchen timer"),
  ];

  const pantryEssentials = [
    t("Olive oil and vegetable oil"),
    t("Salt (kosher and sea salt) and black pepper"),
    t("Garlic and onions"),
    t("All-purpose flour"),
    t("Sugar (white and brown)"),
    t("Rice and pasta"),
    t("Canned tomatoes"),
    t("Stock or broth (chicken, vegetable, or beef)"),
    t("Soy sauce and vinegar"),
    t("Basic spices: paprika, cumin, oregano, basil"),
  ];

  const conversionGuide = [
    { from: "1 cup", to: "16 tablespoons or 240ml" },
    { from: "1 tablespoon", to: "3 teaspoons or 15ml" },
    { from: "1 pound", to: "16 ounces or 453g" },
    { from: "1 ounce", to: "28g" },
    { from: "350°F", to: "175°C (oven temperature)" },
    { from: "400°F", to: "200°C (oven temperature)" },
  ];

  return (
    <div className="min-h-screen bg-gradient-warm flex flex-col" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />

      <div className="container mx-auto py-12 px-4 flex-1">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 text-center">{t("Cooking Resources")}</h1>
          <p className="text-xl text-muted-foreground text-center mb-12">
            {t("Essential guides and tips to elevate your culinary skills")}
          </p>

          {/* Cooking Tips */}
          <Card className="shadow-card mb-8">
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <ChefHat className="w-6 h-6 text-primary" />
                {t("Essential Cooking Tips")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {cookingTips.map((tip, index) => (
                  <AccordionItem key={index} value={`tip-${index}`}>
                    <AccordionTrigger className={isRTL ? 'text-right' : ''}>{tip.title}</AccordionTrigger>
                    <AccordionContent className={`text-muted-foreground ${isRTL ? 'text-right' : ''}`}>
                      {tip.content}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Kitchen Tools */}
          <Card className="shadow-card mb-8">
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Utensils className="w-6 h-6 text-primary" />
                {t("Essential Kitchen Tools")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-muted-foreground mb-4 ${isRTL ? 'text-right' : ''}`}>
                {t("These are the fundamental tools every home cook should have:")}
              </p>
              <ul className="space-y-2">
                {essentialTools.map((tool, index) => (
                  <li key={index} className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-muted-foreground">{tool}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Pantry Essentials */}
          <Card className="shadow-card mb-8">
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <BookOpen className="w-6 h-6 text-primary" />
                {t("Pantry Essentials")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-muted-foreground mb-4 ${isRTL ? 'text-right' : ''}`}>
                {t("Stock your pantry with these basics to be ready for any recipe:")}
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                {pantryEssentials.map((item, index) => (
                  <div key={index} className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Measurement Conversions */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Thermometer className="w-6 h-6 text-primary" />
                {t("Quick Conversion Guide")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-muted-foreground mb-4 ${isRTL ? 'text-right' : ''}`}>
                {t("Common measurement conversions for cooking and baking:")}
              </p>
              <div className="space-y-3">
                {conversionGuide.map((conversion, index) => (
                  <div key={index} className={`flex items-center justify-between p-3 bg-muted rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="font-medium">{conversion.from}</span>
                    <span className="text-muted-foreground">=</span>
                    <span className="text-muted-foreground">{conversion.to}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
