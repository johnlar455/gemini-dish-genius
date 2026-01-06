import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Mail, MessageSquare, Send } from "lucide-react";
import { usePageTranslation } from "@/hooks/usePageTranslation";
import { useLanguage } from "@/contexts/LanguageContext";

const PAGE_TEXTS = [
  "Get in Touch",
  "Have questions, feedback, or suggestions? We'd love to hear from you!",
  "Email Us",
  "For general inquiries and support",
  "Feedback",
  "Share your ideas and suggestions",
  "Send us a Message",
  "Name",
  "Your name",
  "Email",
  "Subject",
  "What's this about?",
  "Message",
  "Tell us more...",
  "Send Message",
  "Sending...",
  "Message sent! We'll get back to you soon.",
];

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = usePageTranslation(PAGE_TEXTS);
  const { isRTL } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate sending message
    setTimeout(() => {
      toast.success(t("Message sent! We'll get back to you soon."));
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-warm flex flex-col" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />

      <div className="container mx-auto py-12 px-4 flex-1">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">{t("Get in Touch")}</h1>
            <p className="text-xl text-muted-foreground">
              {t("Have questions, feedback, or suggestions? We'd love to hear from you!")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="shadow-card">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{t("Email Us")}</h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      {t("For general inquiries and support")}
                    </p>
                    <a
                      href="mailto:support@flavorai.com"
                      className="text-primary hover:underline text-sm"
                    >
                      support@flavorai.com
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{t("Feedback")}</h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      {t("Share your ideas and suggestions")}
                    </p>
                    <a
                      href="mailto:feedback@flavorai.com"
                      className="text-primary hover:underline text-sm"
                    >
                      feedback@flavorai.com
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>{t("Send us a Message")}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t("Name")}</Label>
                    <Input
                      id="name"
                      placeholder={t("Your name")}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">{t("Email")}</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">{t("Subject")}</Label>
                  <Input
                    id="subject"
                    placeholder={t("What's this about?")}
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{t("Message")}</Label>
                  <Textarea
                    id="message"
                    placeholder={t("Tell us more...")}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={6}
                  />
                </div>

                <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
                  {loading ? (
                    t("Sending...")
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      {t("Send Message")}
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
