import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, Utensils, ChefHat, Thermometer } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export default function Resources() {
  const { t } = useLanguage();

  const cookingTips = [
    { title: t("res_tip1_title"), content: t("res_tip1_content") },
    { title: t("res_tip2_title"), content: t("res_tip2_content") },
    { title: t("res_tip3_title"), content: t("res_tip3_content") },
    { title: t("res_tip4_title"), content: t("res_tip4_content") },
  ];

  const essentialTools = [t("res_tool_1"), t("res_tool_2"), t("res_tool_3"), t("res_tool_4"), t("res_tool_5"), t("res_tool_6"), t("res_tool_7"), t("res_tool_8"), t("res_tool_9"), t("res_tool_10")];
  const pantryEssentials = [t("res_pantry_1"), t("res_pantry_2"), t("res_pantry_3"), t("res_pantry_4"), t("res_pantry_5"), t("res_pantry_6"), t("res_pantry_7"), t("res_pantry_8"), t("res_pantry_9"), t("res_pantry_10")];
  const conversionGuide = [
    { from: t("res_conv_1_from"), to: t("res_conv_1_to") },
    { from: t("res_conv_2_from"), to: t("res_conv_2_to") },
    { from: t("res_conv_3_from"), to: t("res_conv_3_to") },
    { from: t("res_conv_4_from"), to: t("res_conv_4_to") },
    { from: t("res_conv_5_from"), to: t("res_conv_5_to") },
    { from: t("res_conv_6_from"), to: t("res_conv_6_to") },
  ];

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
