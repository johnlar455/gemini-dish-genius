import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, ShoppingCart, Sparkles } from "lucide-react";

interface Product {
  id: number;
  name: string;
  description: string;
  affiliateLink: string;
  hashtags: string[];
}

const products: Product[] = [
  {
    id: 1,
    name: "Ninja Air Fryer Max XL",
    description: "Rapid meals with advanced hot air technology for healthier results and crispy textures. Large 5.5-quart capacity ideal for families and batch cooking. Simple digital controls with multiple presets for convenience. Nonstick, dishwasher-safe basket guarantees easy cleanup. Perfect for air frying, roasting, reheating, or dehydrating—one versatile appliance.",
    affiliateLink: "https://amzn.to/3WyomUr",
    hashtags: ["AirFryer", "HealthyCooking", "QuickMeals"]
  },
  {
    id: 2,
    name: "Instant Pot Duo 7-in-1 Electric Pressure Cooker",
    description: "Transform your kitchen routine—pressure cook, slow cook, steam, sauté, make yogurt, and more with this all-in-one cooker. Intuitive smart programs deliver fast, consistent meals up to 70% quicker than traditional methods. Durable stainless steel pot designed for safety and easy cleaning. Trusted by families and chefs worldwide for everyday meals or batch prep.",
    affiliateLink: "https://amzn.to/4hGaiSt",
    hashtags: ["InstantPot", "MealPrep", "MultiCooker"]
  },
  {
    id: 3,
    name: "KitchenAid Artisan Series Stand Mixer",
    description: "Unleash creativity with a powerful 325-watt motor—handles large batches and dense doughs with ease. Features 10 speeds, a flat beater, dough hook, wire whip, and iconic design in many colors. The professional choice for cookies, bread, cakes, and more.",
    affiliateLink: "https://amzn.to/3WxTWl9",
    hashtags: ["StandMixer", "BakingEssentials", "KitchenAid"]
  },
  {
    id: 4,
    name: "Nordic Ware Platinum Collection Bundt Pan",
    description: "Showcase your baking—premium nonstick coating for flawless cake release and effortless cleaning. Cast aluminum for even heating and beautiful design for celebration-ready cakes. Made in the USA—reliability you can trust for generations.",
    affiliateLink: "https://amzn.to/3X8qFO5",
    hashtags: ["BundtPan", "CakeBaking", "NordicWare"]
  },
  {
    id: 5,
    name: "ThermoPro TP03 Digital Instant-Read Meat Thermometer",
    description: "Get perfectly cooked meat every time—3-5 second rapid readings with a backlit LCD for any lighting. Foldable probe for safety and storage, wide temperature range for all proteins. Essential tool for grilling, roasts, BBQ, and more.",
    affiliateLink: "https://amzn.to/4nB77g7",
    hashtags: ["MeatThermometer", "Grilling", "KitchenGadgets"]
  },
  {
    id: 6,
    name: "Fullstar All-in-One Vegetable Chopper",
    description: "Prep meals in minutes—interchangeable blades for chopping, slicing, dicing, and julienne. BPA-free, dishwasher-safe parts, large catch container, and nonslip base for safety. The must-have for salads, salsas, and healthy eating.",
    affiliateLink: "https://amzn.to/4qKOgSO",
    hashtags: ["VegetableChopper", "FoodPrep", "KitchenTools"]
  },
  {
    id: 7,
    name: "Rubbermaid Brilliance Leak-Proof Food Storage Set",
    description: "Lock in freshness—airtight, leak-proof seals with stain-resistant, crystal-clear design. Microwave, freezer, and dishwasher safe. Modular containers stack easily for pantry, fridge, or on-the-go meals. BPA-free and durable for daily use.",
    affiliateLink: "https://amzn.to/490Xl3g",
    hashtags: ["FoodStorage", "MealPrep", "Rubbermaid"]
  },
  {
    id: 8,
    name: "OXO Good Grips POP Airtight Container Set",
    description: "Airtight, push-button seal preserves freshness and prevents spills. Space-saving stackable design and rounded corners for easy pouring. Instantly see contents and quantities. Perfect for flour, sugar, rice, snacks, or coffee storage.",
    affiliateLink: "https://amzn.to/3LiHEKZ",
    hashtags: ["PantryOrganization", "AirtightContainers", "OXOGoodGrips"]
  }
];

export default function Shop() {
  return (
    <div className="min-h-screen bg-gradient-warm flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/5 to-primary/5">
        <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
        <div className="container mx-auto max-w-7xl text-center relative z-10">
          <Badge className="mb-6 text-base px-6 py-2 shadow-lg">
            <Sparkles className="w-5 h-5 mr-2" />
            Premium Kitchen Collection
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            Essential Kitchen Tools
            <span className="block text-primary mt-3">For Modern Cooking</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Curated selection of top-rated kitchen essentials to elevate your cooking experience
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <Card 
                key={product.id} 
                className="shadow-elegant hover:shadow-glow transition-all duration-500 hover:-translate-y-2 overflow-hidden group border-2 hover:border-primary/20"
              >
                <CardHeader className="space-y-4 pb-4">
                  <div className="flex items-start justify-between gap-3">
                    <CardTitle className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                      {product.name}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <CardDescription className="text-base leading-relaxed min-h-[160px]">
                    {product.description}
                  </CardDescription>
                  
                  <div className="flex flex-wrap gap-2">
                    {product.hashtags.map((tag, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="text-xs font-medium"
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  <Button 
                    variant="default"
                    size="lg"
                    className="w-full gap-2 shadow-lg hover:shadow-xl transition-all group/btn"
                    onClick={() => window.open(product.affiliateLink, '_blank')}
                  >
                    <ShoppingCart className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                    Shop Now
                    <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
