import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, ShoppingCart, Sparkles, TrendingUp, Award, Package } from "lucide-react";
import airFryerImg from "@/assets/air-fryer.jpg";
import instantPotImg from "@/assets/instant-pot.jpg";
import standMixerImg from "@/assets/stand-mixer.jpg";
import bundtPanImg from "@/assets/bundt-pan.jpg";
import meatThermometerImg from "@/assets/meat-thermometer.jpg";
import vegetableChopperImg from "@/assets/vegetable-chopper.jpg";
import foodStorageImg from "@/assets/food-storage.jpg";
import airtightContainersImg from "@/assets/airtight-containers.jpg";
import { useTranslate } from "@/hooks/useStaticTranslation";

interface Product {
  id: number;
  name: string;
  description: string;
  affiliateLink: string;
  hashtags: string[];
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Ninja Air Fryer Max XL",
    description: "Rapid meals with advanced hot air technology for healthier results and crispy textures. Large 5.5-quart capacity ideal for families.",
    affiliateLink: "https://amzn.to/3WyomUr",
    hashtags: ["AirFryer", "HealthyCooking"],
    image: airFryerImg
  },
  {
    id: 2,
    name: "Instant Pot Duo 7-in-1",
    description: "Transform your kitchen—pressure cook, slow cook, steam, sauté, make yogurt, and more with this all-in-one cooker.",
    affiliateLink: "https://amzn.to/4hGaiSt",
    hashtags: ["InstantPot", "MealPrep"],
    image: instantPotImg
  },
  {
    id: 3,
    name: "KitchenAid Stand Mixer",
    description: "Unleash creativity with a powerful 325-watt motor—handles large batches and dense doughs with ease.",
    affiliateLink: "https://amzn.to/3WxTWl9",
    hashtags: ["StandMixer", "Baking"],
    image: standMixerImg
  },
  {
    id: 4,
    name: "Nordic Ware Bundt Pan",
    description: "Premium nonstick coating for flawless cake release. Cast aluminum for even heating.",
    affiliateLink: "https://amzn.to/3X8qFO5",
    hashtags: ["BundtPan", "CakeBaking"],
    image: bundtPanImg
  },
  {
    id: 5,
    name: "ThermoPro Meat Thermometer",
    description: "Get perfectly cooked meat every time—3-5 second rapid readings with a backlit LCD.",
    affiliateLink: "https://amzn.to/4nB77g7",
    hashtags: ["Thermometer", "Grilling"],
    image: meatThermometerImg
  },
  {
    id: 6,
    name: "Fullstar Vegetable Chopper",
    description: "Prep meals in minutes—interchangeable blades for chopping, slicing, dicing.",
    affiliateLink: "https://amzn.to/4qKOgSO",
    hashtags: ["VegetableChopper", "FoodPrep"],
    image: vegetableChopperImg
  },
  {
    id: 7,
    name: "Rubbermaid Food Storage Set",
    description: "Lock in freshness—airtight, leak-proof seals with stain-resistant design.",
    affiliateLink: "https://amzn.to/490Xl3g",
    hashtags: ["FoodStorage", "MealPrep"],
    image: foodStorageImg
  },
  {
    id: 8,
    name: "OXO POP Container Set",
    description: "Airtight, push-button seal preserves freshness. Space-saving stackable design.",
    affiliateLink: "https://amzn.to/3LiHEKZ",
    hashtags: ["PantryOrganization", "Airtight"],
    image: airtightContainersImg
  }
];

export default function Shop() {
  const { t, isRTL } = useTranslate();

  return (
    <div className="min-h-screen bg-gradient-warm flex flex-col font-sans" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5"></div>
        
        <div className="container mx-auto max-w-7xl text-center relative z-10">
          <Badge className="mb-4 sm:mb-6 px-4 py-2 shadow-lg bg-gradient-to-r from-primary to-primary-hover border-0 text-primary-foreground">
            <Sparkles className="w-4 h-4 mr-2" />
            {t("Curated Kitchen Essentials")}
          </Badge>
          
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 leading-tight px-2">
            <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              {t("Premium Kitchen Tools")}
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent mt-2 inline-block">
              {t("For Modern Cooking")}
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 px-4">
            {t("Discover the finest selection of kitchen essentials that transform your cooking experience")}
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 px-2">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-background/80 backdrop-blur-sm rounded-full border border-border/50 shadow-sm">
              <Award className="w-4 h-4 text-primary flex-shrink-0" />
              <p className="font-semibold text-xs sm:text-sm">{t("Premium Quality")}</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 bg-background/80 backdrop-blur-sm rounded-full border border-border/50 shadow-sm">
              <TrendingUp className="w-4 h-4 text-primary flex-shrink-0" />
              <p className="font-semibold text-xs sm:text-sm">{t("Top Rated")}</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 bg-background/80 backdrop-blur-sm rounded-full border border-border/50 shadow-sm">
              <Package className="w-4 h-4 text-primary flex-shrink-0" />
              <p className="font-semibold text-xs sm:text-sm">{t("Fast Delivery")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3">{t("Shop The Collection")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("Each product is carefully selected to meet the highest standards")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {products.map((product, index) => (
              <Card key={product.id} className="group h-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border-2 border-border/50 hover:border-primary/30 bg-card/50 backdrop-blur-sm">
                <div className="relative overflow-hidden bg-gradient-to-br from-background to-muted/20">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-52 sm:h-60 object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                  />
                  {index < 3 && (
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-primary to-primary-hover text-primary-foreground px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      <span className="hidden sm:inline">{t("Trending")}</span>
                    </div>
                  )}
                </div>

                <CardHeader className="pb-3 px-4 pt-4">
                  <CardTitle className="text-lg font-display font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                    {product.name}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4 px-4 pb-4">
                  <CardDescription className="text-sm line-clamp-3 text-muted-foreground">
                    {product.description}
                  </CardDescription>
                  
                  <div className="flex flex-wrap gap-1.5">
                    {product.hashtags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="text-xs px-2.5 py-0.5 rounded-full bg-secondary/50">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  <Button 
                    className="w-full gap-2 font-semibold py-5 bg-gradient-to-r from-primary to-primary-hover hover:from-primary-hover hover:to-primary"
                    onClick={() => window.open(product.affiliateLink, '_blank')}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {t("Shop Now")}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-br from-muted/30 to-background">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl border border-border/50">
            <Sparkles className="w-10 h-10 mx-auto mb-4 text-primary" />
            <h3 className="font-display text-2xl sm:text-3xl font-bold mb-3">{t("Why Shop With Us?")}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {t("Every product is carefully tested and approved by professional chefs and cooking enthusiasts.")}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
