import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Brain, Zap, Shield } from "lucide-react";

export default function About() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Recipe Generation",
      description: "Leveraging advanced AI to create unique, personalized recipes based on your preferences.",
    },
    {
      icon: Sparkles,
      title: "Beautiful Visual Generation",
      description: "Each recipe comes with an AI-generated image giving you a visual preview.",
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Get complete recipes with ingredients and instructions in seconds.",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is protected ensuring your recipes and preferences stay safe.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-warm flex flex-col">
      <Navbar />

      <div className="container mx-auto py-12 px-4 flex-1">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 text-center">About FlavorAI</h1>
          <p className="text-xl text-muted-foreground text-center mb-12">
            Revolutionizing home cooking with AI-powered recipe generation
          </p>

          <Card className="shadow-card mb-12">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                FlavorAI was created to make cooking more accessible, creative, and enjoyable for everyone. 
                Whether you're a seasoned chef or just starting your culinary journey, our AI-powered platform 
                helps you discover new recipes tailored to your unique preferences.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We believe that great cooking should be accessible to everyone, regardless of experience level 
                or available ingredients. That's why we've built a platform that combines the power of 
                artificial intelligence with the art of cooking.
              </p>
            </CardContent>
          </Card>

          <h2 className="text-3xl font-bold mb-8 text-center">Key Features</h2>
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
              <h2 className="text-2xl font-bold mb-4">Technology Stack</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                FlavorAI is built with cutting-edge technology to provide the best experience:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Google Gemini AI:</strong> Powers recipe and image generation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Lovable Cloud:</strong> Secure backend infrastructure</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>React & TypeScript:</strong> Fast, responsive user experience</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Tailwind CSS:</strong> Beautiful, consistent designs</span>
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
