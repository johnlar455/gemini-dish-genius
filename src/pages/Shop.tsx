import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, Star, ShoppingCart, Sparkles } from "lucide-react";

interface Product {
  id: number;
  name: string;
  category: "cooking" | "baking" | "gadgets" | "storage";
  image: string;
  description: string;
  benefits: string[];
  price: string;
  rating: number;
  affiliateLink: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Professional Blender Pro 3000",
    category: "cooking",
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=500&h=500&fit=crop",
    description: "High-performance blender for smoothies, soups, and sauces with variable speed control",
    benefits: [
      "2200W powerful motor for tough ingredients",
      "Self-cleaning feature saves time",
      "BPA-free 64oz container",
      "10-year warranty included",
      "Variable speed + pulse function"
    ],
    price: "$149.99",
    rating: 4.8,
    affiliateLink: "#"
  },
  {
    id: 2,
    name: "Smart Air Fryer XXL",
    category: "cooking",
    image: "https://images.unsplash.com/photo-1624895431364-b50e4b6388e4?w=500&h=500&fit=crop",
    description: "Top-rated cooking gadget with app control and pre-programmed settings for healthier meals",
    benefits: [
      "Uses 85% less oil than traditional frying",
      "Smart app with 200+ recipes",
      "7.5-quart family-size capacity",
      "Easy-clean non-stick basket",
      "Even heat distribution technology"
    ],
    price: "$129.99",
    rating: 4.9,
    affiliateLink: "#"
  },
  {
    id: 3,
    name: "Premium Non-Stick Cookware Set",
    category: "cooking",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500&h=500&fit=crop",
    description: "Best kitchen tools for everyday cooking - 12-piece professional-grade cookware collection",
    benefits: [
      "Scratch-resistant ceramic coating",
      "Oven-safe up to 500°F",
      "Dishwasher safe for easy cleanup",
      "Compatible with all cooktops",
      "Ergonomic stay-cool handles"
    ],
    price: "$199.99",
    rating: 4.7,
    affiliateLink: "#"
  },
  {
    id: 4,
    name: "Stainless Steel Utensil Set",
    category: "cooking",
    image: "https://images.unsplash.com/photo-1599912027806-962fc8e4b6b7?w=500&h=500&fit=crop",
    description: "Must-have kitchen products - 15-piece essential cooking tools with storage caddy",
    benefits: [
      "Durable 304 stainless steel",
      "Heat-resistant silicone handles",
      "Includes rotating storage stand",
      "Rust and corrosion resistant",
      "Professional-grade quality"
    ],
    price: "$44.99",
    rating: 4.6,
    affiliateLink: "#"
  },
  {
    id: 5,
    name: "Digital Kitchen Scale",
    category: "gadgets",
    image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=500&h=500&fit=crop",
    description: "Top kitchen gadgets for precise measurements - perfect for baking and meal prep",
    benefits: [
      "Accurate to 0.1oz/1g precision",
      "Built-in nutritional calculator",
      "Tare function for easy measuring",
      "Tempered glass platform",
      "Auto-off feature saves battery"
    ],
    price: "$24.99",
    rating: 4.8,
    affiliateLink: "#"
  },
  {
    id: 6,
    name: "Smart Instant Pot",
    category: "gadgets",
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=500&h=500&fit=crop",
    description: "Best-rated cooking gadgets - 10-in-1 programmable multi-cooker with WiFi connectivity",
    benefits: [
      "Pressure cook, slow cook, sauté & more",
      "WiFi enabled with app control",
      "6-quart capacity feeds 6+ people",
      "Stainless steel inner pot",
      "Energy-efficient cooking"
    ],
    price: "$119.99",
    rating: 4.9,
    affiliateLink: "#"
  },
  {
    id: 7,
    name: "Stand Mixer Deluxe",
    category: "baking",
    image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=500&h=500&fit=crop",
    description: "Top-rated kitchen essentials for serious bakers - 6-speed professional mixer",
    benefits: [
      "500W powerful motor",
      "6-quart stainless steel bowl",
      "Includes whisk, beater & dough hook",
      "Tilt-head design for easy access",
      "10 speed settings + pulse"
    ],
    price: "$279.99",
    rating: 4.9,
    affiliateLink: "#"
  },
  {
    id: 8,
    name: "Silicone Baking Mat Set",
    category: "baking",
    image: "https://images.unsplash.com/photo-1556910110-a5a63dfd393c?w=500&h=500&fit=crop",
    description: "Must-have baking accessories - reusable non-stick mats for perfect results every time",
    benefits: [
      "Replaces parchment paper",
      "Heat resistant up to 480°F",
      "Non-slip textured surface",
      "Easy to clean & dishwasher safe",
      "Set of 3 different sizes"
    ],
    price: "$19.99",
    rating: 4.7,
    affiliateLink: "#"
  },
  {
    id: 9,
    name: "Glass Food Storage Containers",
    category: "storage",
    image: "https://images.unsplash.com/photo-1584990347449-3d6f497d2f82?w=500&h=500&fit=crop",
    description: "Best kitchen storage solutions - 18-piece airtight meal prep container set",
    benefits: [
      "BPA-free borosilicate glass",
      "Microwave, oven & freezer safe",
      "Leak-proof locking lids",
      "Space-saving stackable design",
      "Perfect for meal prepping"
    ],
    price: "$54.99",
    rating: 4.8,
    affiliateLink: "#"
  },
  {
    id: 10,
    name: "Spice Rack Organizer",
    category: "storage",
    image: "https://images.unsplash.com/photo-1596040033229-a0b44e8c8c66?w=500&h=500&fit=crop",
    description: "Top-rated kitchen organization - 30-jar countertop or wall-mounted spice storage",
    benefits: [
      "Includes 30 glass jars with labels",
      "Airtight stainless steel lids",
      "Wall-mount or countertop use",
      "Space-efficient 3-tier design",
      "Easy-access rotating base"
    ],
    price: "$39.99",
    rating: 4.6,
    affiliateLink: "#"
  },
  {
    id: 11,
    name: "Chef's Knife Professional",
    category: "cooking",
    image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=500&h=500&fit=crop",
    description: "Best kitchen knife for home chefs - 8-inch German stainless steel blade",
    benefits: [
      "High-carbon German steel blade",
      "Ergonomic pakkawood handle",
      "Razor-sharp precision cutting",
      "Full tang construction",
      "Lifetime manufacturer warranty"
    ],
    price: "$79.99",
    rating: 4.9,
    affiliateLink: "#"
  },
  {
    id: 12,
    name: "Electric Kettle with Temperature Control",
    category: "gadgets",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&h=500&fit=crop",
    description: "Smart kitchen gadget - variable temperature kettle for coffee, tea, and more",
    benefits: [
      "6 preset temperature settings",
      "Fast boiling in 3-5 minutes",
      "Keep-warm function for 30 minutes",
      "BPA-free stainless steel interior",
      "Auto shut-off safety feature"
    ],
    price: "$64.99",
    rating: 4.7,
    affiliateLink: "#"
  }
];

const testimonials = [
  {
    name: "Sarah M.",
    role: "Home Chef & Food Blogger",
    content: "The air fryer has completely transformed how I cook! Healthier meals in half the time, and my family loves everything I make.",
    rating: 5
  },
  {
    name: "Mike R.",
    role: "Baking Enthusiast",
    content: "I've tried many stand mixers, but this one is unbeatable. The power and precision make professional-quality baking accessible at home.",
    rating: 5
  },
  {
    name: "Jennifer L.",
    role: "Meal Prep Expert",
    content: "These glass containers have been a game-changer for my weekly meal prep. They keep food fresh and make portioning so easy!",
    rating: 5
  }
];

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-warm flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-16 px-4 overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <Badge className="mb-4 text-base px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            Curated Kitchen Collection
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            Trending Kitchen Essentials
            <span className="block text-primary mt-2">for Food Lovers</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the best kitchen tools, top-rated cooking gadgets, and must-have kitchen products 
            to elevate your culinary experience. Handpicked by cooking enthusiasts.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4 bg-background/50 sticky top-16 z-10 backdrop-blur-sm border-b">
        <div className="container mx-auto max-w-6xl">
          <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-5 h-auto">
              <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                All Products
              </TabsTrigger>
              <TabsTrigger value="cooking" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Cooking
              </TabsTrigger>
              <TabsTrigger value="baking" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Baking
              </TabsTrigger>
              <TabsTrigger value="gadgets" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Gadgets
              </TabsTrigger>
              <TabsTrigger value="storage" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Storage
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="shadow-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span className="font-semibold text-sm">{product.rating}</span>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl mb-2">{product.name}</CardTitle>
                  <CardDescription className="text-base">{product.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-semibold mb-2 text-sm text-muted-foreground">Key Benefits:</p>
                    <ul className="space-y-1.5">
                      {product.benefits.slice(0, 4).map((benefit, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <span className="text-primary mt-0.5">✓</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="text-2xl font-bold text-primary">{product.price}</span>
                    <Button 
                      variant="hero" 
                      size="lg"
                      className="gap-2"
                      onClick={() => window.open(product.affiliateLink, '_blank')}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Buy Now
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-secondary/5 to-primary/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">What Our Community Says</h2>
            <p className="text-muted-foreground text-lg">
              Real reviews from food lovers and home chefs
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-card">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription>{testimonial.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Tips Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Kitchen Pro Tips</h2>
            <p className="text-muted-foreground text-lg">
              Expert advice for getting the most from your kitchen tools
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="shadow-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Care for Your Knives</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Hand wash and dry immediately, use a honing steel regularly, and store in a knife block 
                  to maintain sharpness and extend lifespan.
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Air Fryer Success</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Don't overcrowd the basket! Leave space for air circulation. Shake or flip food halfway 
                  through for even crisping and perfect results.
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Organize Your Spices</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Label everything clearly with purchase dates. Store in a cool, dark place away from heat. 
                  Replace ground spices every 2-3 years for best flavor.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
