import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, Utensils, ChefHat, Thermometer } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const cookingTips = [
  { title: "Mise en Place", content: "Always prepare and organize all your ingredients before cooking. This French phrase means 'everything in its place' and is key to stress-free cooking." },
  { title: "Taste as You Go", content: "The most important skill in cooking is tasting your food throughout the process. This helps you adjust seasonings before serving." },
  { title: "Sharp Knives", content: "A sharp knife is safer and more efficient than a dull one. Invest in a good quality knife and maintain its edge." },
  { title: "Room Temperature Ingredients", content: "For baking and cooking, bringing ingredients to room temperature ensures even cooking and better results." },
];

const essentialTools = ["Chef's knife and paring knife", "Cutting board (wooden or bamboo)", "Cast iron skillet", "Non-stick pan", "Large pot for pasta and soups", "Mixing bowls in various sizes", "Measuring cups and spoons", "Wooden spoons and silicone spatulas", "Meat thermometer", "Kitchen timer"];
const pantryEssentials = ["Olive oil and vegetable oil", "Salt (kosher and sea salt) and black pepper", "Garlic and onions", "All-purpose flour", "Sugar (white and brown)", "Rice and pasta", "Canned tomatoes", "Stock or broth", "Soy sauce and vinegar", "Basic spices: paprika, cumin, oregano, basil"];
const conversionGuide = [{ from: "1 cup", to: "16 tablespoons or 240ml" }, { from: "1 tablespoon", to: "3 teaspoons or 15ml" }, { from: "1 pound", to: "16 ounces or 453g" }, { from: "1 ounce", to: "28g" }, { from: "350°F", to: "175°C" }, { from: "400°F", to: "200°C" }];

export default function Resources() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-warm flex flex-col">
      <Navbar />
      <div className="container mx-auto py-12 px-4 flex-1">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 text-center">{t("res_title")}</h1>
          <p className="text-xl text-muted-foreground text-center mb-12">{t("res_subtitle")}</p>
          <Card className="shadow-card mb-8">
            <CardHeader><CardTitle className="flex items-center gap-2"><ChefHat className="w-6 h-6 text-primary" />{t("res_cooking_tips")}</CardTitle></CardHeader>
            <CardContent><Accordion type="single" collapsible className="w-full">
              {cookingTips.map((tip, i) => <AccordionItem key={i} value={`tip-${i}`}><AccordionTrigger>{tip.title}</AccordionTrigger><AccordionContent className="text-muted-foreground">{tip.content}</AccordionContent></AccordionItem>)}
            </Accordion></CardContent>
          </Card>
          <Card className="shadow-card mb-8">
            <CardHeader><CardTitle className="flex items-center gap-2"><Utensils className="w-6 h-6 text-primary" />{t("res_kitchen_tools")}</CardTitle></CardHeader>
            <CardContent><p className="text-muted-foreground mb-4">{t("res_tools_desc")}</p>
              <ul className="space-y-2">{essentialTools.map((tool, i) => <li key={i} className="flex items-start gap-3"><span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span><span className="text-muted-foreground">{tool}</span></li>)}</ul>
            </CardContent>
          </Card>
          <Card className="shadow-card mb-8">
            <CardHeader><CardTitle className="flex items-center gap-2"><BookOpen className="w-6 h-6 text-primary" />{t("res_pantry")}</CardTitle></CardHeader>
            <CardContent><p className="text-muted-foreground mb-4">{t("res_pantry_desc")}</p>
              <div className="grid md:grid-cols-2 gap-3">{pantryEssentials.map((item, i) => <div key={i} className="flex items-start gap-3"><span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span><span className="text-muted-foreground">{item}</span></div>)}</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardHeader><CardTitle className="flex items-center gap-2"><Thermometer className="w-6 h-6 text-primary" />{t("res_conversions")}</CardTitle></CardHeader>
            <CardContent><p className="text-muted-foreground mb-4">{t("res_conversions_desc")}</p>
              <div className="space-y-3">{conversionGuide.map((c, i) => <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg"><span className="font-medium">{c.from}</span><span className="text-muted-foreground">=</span><span className="text-muted-foreground">{c.to}</span></div>)}</div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
