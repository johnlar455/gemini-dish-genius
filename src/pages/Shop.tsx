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
    description: "Rapid meals with advanced hot air technology for healthier results and crispy textures. Large 5.5-quart capacity ideal for families and batch cooking. Simple digital controls with multiple presets for convenience. Nonstick, dishwasher-safe basket guarantees easy cleanup. Perfect for air frying, roasting, reheating, or dehydrating—one versatile appliance.",
    affiliateLink: "https://amzn.to/3WyomUr",
    hashtags: ["AirFryer", "HealthyCooking", "QuickMeals"],
    image: airFryerImg
  },
  {
    id: 2,
    name: "Instant Pot Duo 7-in-1 Electric Pressure Cooker",
    description: "Transform your kitchen routine—pressure cook, slow cook, steam, sauté, make yogurt, and more with this all-in-one cooker. Intuitive smart programs deliver fast, consistent meals up to 70% quicker than traditional methods. Durable stainless steel pot designed for safety and easy cleaning. Trusted by families and chefs worldwide for everyday meals or batch prep.",
    affiliateLink: "https://amzn.to/4hGaiSt",
    hashtags: ["InstantPot", "MealPrep", "MultiCooker"],
    image: instantPotImg
  },
  {
    id: 3,
    name: "KitchenAid Artisan Series Stand Mixer",
    description: "Unleash creativity with a powerful 325-watt motor—handles large batches and dense doughs with ease. Features 10 speeds, a flat beater, dough hook, wire whip, and iconic design in many colors. The professional choice for cookies, bread, cakes, and more.",
    affiliateLink: "https://amzn.to/3WxTWl9",
    hashtags: ["StandMixer", "BakingEssentials", "KitchenAid"],
    image: standMixerImg
  },
  {
    id: 4,
    name: "Nordic Ware Platinum Collection Bundt Pan",
    description: "Showcase your baking—premium nonstick coating for flawless cake release and effortless cleaning. Cast aluminum for even heating and beautiful design for celebration-ready cakes. Made in the USA—reliability you can trust for generations.",
    affiliateLink: "https://amzn.to/3X8qFO5",
    hashtags: ["BundtPan", "CakeBaking", "NordicWare"],
    image: bundtPanImg
  },
  {
    id: 5,
    name: "ThermoPro TP03 Digital Instant-Read Meat Thermometer",
    description: "Get perfectly cooked meat every time—3-5 second rapid readings with a backlit LCD for any lighting. Foldable probe for safety and storage, wide temperature range for all proteins. Essential tool for grilling, roasts, BBQ, and more.",
    affiliateLink: "https://amzn.to/4nB77g7",
    hashtags: ["MeatThermometer", "Grilling", "KitchenGadgets"],
    image: meatThermometerImg
  },
  {
    id: 6,
    name: "Fullstar All-in-One Vegetable Chopper",
    description: "Prep meals in minutes—interchangeable blades for chopping, slicing, dicing, and julienne. BPA-free, dishwasher-safe parts, large catch container, and nonslip base for safety. The must-have for salads, salsas, and healthy eating.",
    affiliateLink: "https://amzn.to/4qKOgSO",
    hashtags: ["VegetableChopper", "FoodPrep", "KitchenTools"],
    image: vegetableChopperImg
  },
  {
    id: 7,
    name: "Rubbermaid Brilliance Leak-Proof Food Storage Set",
    description: "Lock in freshness—airtight, leak-proof seals with stain-resistant, crystal-clear design. Microwave, freezer, and dishwasher safe. Modular containers stack easily for pantry, fridge, or on-the-go meals. BPA-free and durable for daily use.",
    affiliateLink: "https://amzn.to/490Xl3g",
    hashtags: ["FoodStorage", "MealPrep", "Rubbermaid"],
    image: foodStorageImg
  },
  {
    id: 8,
    name: "OXO Good Grips POP Airtight Container Set",
    description: "Airtight, push-button seal preserves freshness and prevents spills. Space-saving stackable design and rounded corners for easy pouring. Instantly see contents and quantities. Perfect for flour, sugar, rice, snacks, or coffee storage.",
    affiliateLink: "https://amzn.to/3LiHEKZ",
    hashtags: ["PantryOrganization", "AirtightContainers", "OXOGoodGrips"],
    image: airtightContainersImg
  }
];

const features = [
  {
    icon: Award,
    title: "Premium Quality",
    description: "Hand-picked essentials from trusted brands"
  },
  {
    icon: TrendingUp,
    title: "Top Rated",
    description: "Highly rated by cooking enthusiasts"
  },
  {
    icon: Package,
    title: "Fast Delivery",
    description: "Quick shipping on all products"
  }
];

export default function Shop() {
  return (
    <div className="min-h-screen bg-gradient-warm flex flex-col font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 px-4 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        <div className="container mx-auto max-w-7xl text-center relative z-10">
          <div className="animate-fade-in-up">
            <Badge className="mb-6 text-base px-6 py-2.5 shadow-lg bg-gradient-to-r from-primary to-primary-hover border-0 text-primary-foreground">
              <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
              Curated Kitchen Essentials
            </Badge>
          </div>
          
          <h1 className="font-display text-5xl md:text-7xl font-black mb-6 animate-fade-in-up leading-tight" style={{ animationDelay: '0.1s' }}>
            <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
              Premium Kitchen Tools
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary via-primary-hover to-primary bg-clip-text text-transparent mt-2 inline-block">
              For Modern Cooking
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12 animate-fade-in-up font-light" style={{ animationDelay: '0.2s' }}>
            Discover the finest selection of kitchen essentials that transform your cooking experience
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 px-6 py-3 bg-background/80 backdrop-blur-sm rounded-full border border-border/50 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
              >
                <feature.icon className="w-5 h-5 text-primary" />
                <div className="text-left">
                  <p className="font-semibold text-sm">{feature.title}</p>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-4 relative">
        <div className="container mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Shop The Collection
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Each product is carefully selected to meet the highest standards of quality and performance
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <div 
                key={product.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card className="group h-full shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden border-2 border-border/50 hover:border-primary/30 bg-card/50 backdrop-blur-sm">
                  {/* Product Image */}
                  <div className="relative overflow-hidden bg-gradient-to-br from-background to-muted/20">
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-72 object-contain p-8 group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    {/* Trending Badge */}
                    {index < 3 && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-primary to-primary-hover text-primary-foreground px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        Trending
                      </div>
                    )}
                  </div>

                  {/* Product Content */}
                  <CardHeader className="space-y-3 pb-3">
                    <CardTitle className="text-xl font-display font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                      {product.name}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-5">
                    <CardDescription className="text-sm leading-relaxed line-clamp-4 text-muted-foreground">
                      {product.description}
                    </CardDescription>
                    
                    {/* Hashtags */}
                    <div className="flex flex-wrap gap-2">
                      {product.hashtags.map((tag, tagIndex) => (
                        <Badge 
                          key={tagIndex} 
                          variant="secondary" 
                          className="text-xs font-medium px-3 py-1 rounded-full bg-secondary/50 hover:bg-secondary transition-colors"
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <Button 
                      className="w-full gap-2 shadow-lg hover:shadow-xl transition-all group/btn font-semibold text-base py-6 bg-gradient-to-r from-primary to-primary-hover hover:from-primary-hover hover:to-primary"
                      onClick={() => window.open(product.affiliateLink, '_blank')}
                    >
                      <ShoppingCart className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                      Shop Now
                      <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-muted/30 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="bg-card/50 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-border/50">
            <Sparkles className="w-12 h-12 mx-auto mb-6 text-primary" />
            <h3 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Why Shop With Us?
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Every product in our collection has been carefully tested and approved by professional chefs and cooking enthusiasts. 
              We only recommend tools that we would use in our own kitchens, ensuring you get the best value and quality.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
