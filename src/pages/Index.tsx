import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Mail, Phone } from "lucide-react";
import logo from "@/assets/logo.jpg";

const Index = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleNotifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call - in production, this would send to your backend
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "We'll notify you when we launch.",
      });
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  const address = "84, BARTON CENTRE, 408 4th floor, MG Road, Bengaluru 560001";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <div className="min-h-screen bg-background font-inter overflow-x-hidden">
      {/* Background texture */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-background via-background to-dark opacity-100" />
      
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
          <div className="w-full max-w-4xl mx-auto text-center space-y-8 animate-fadeIn">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <img 
                src={logo} 
                alt="Bespoke Loft logo" 
                className="h-32 md:h-48 w-auto object-contain"
              />
            </div>

            {/* Brand Name */}
            <h1 className="font-playfair font-bold text-4xl md:text-6xl lg:text-7xl text-foreground tracking-wider">
              BESPOKE LOFT
            </h1>

            {/* Animated Coming Soon */}
            <div className="py-8">
              <h2 
                className="font-playfair font-black text-5xl md:text-7xl lg:text-8xl bg-gradient-to-r from-primary via-foreground to-primary bg-[length:200%_auto] bg-clip-text text-transparent motion-safe:animate-shimmer motion-reduce:bg-gradient-to-r motion-reduce:from-primary motion-reduce:to-primary"
                aria-label="Coming Soon"
              >
                Coming Soon
              </h2>
            </div>

            {/* Subtext */}
            <p className="text-xl md:text-2xl text-muted-foreground font-light tracking-wide max-w-2xl mx-auto">
              Crafted-to-measure elegance is almost here.
            </p>
          </div>
        </section>

        {/* Gold Divider */}
        <div className="w-full flex justify-center px-4 my-16">
          <div className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
        </div>

        {/* Contact Section */}
        <section className="px-4 py-16 max-w-4xl mx-auto">
          <div className="backdrop-blur-lg bg-glass/40 rounded-2xl p-8 md:p-12 shadow-2xl border border-border/50 animate-fadeIn motion-safe:hover:shadow-primary/20 transition-shadow duration-300">
            <h3 className="font-playfair font-bold text-3xl md:text-4xl text-foreground mb-8 text-center">
              Contact
            </h3>
            
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4 group">
                <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" aria-hidden="true" />
                <div className="flex-1">
                  <p className="text-foreground/90 mb-2 leading-relaxed">
                    {address}
                  </p>
                  <a 
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors duration-200 font-medium"
                  >
                    View map
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4 group">
                <Mail className="w-6 h-6 text-primary flex-shrink-0" aria-hidden="true" />
                <a 
                  href="mailto:info@bespokeloft.in"
                  className="text-foreground/90 hover:text-primary transition-colors duration-200"
                >
                  info@bespokeloft.in
                </a>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4 group">
                <Phone className="w-6 h-6 text-primary flex-shrink-0" aria-hidden="true" />
                <a 
                  href="tel:+919739849430"
                  className="text-foreground/90 hover:text-primary transition-colors duration-200"
                >
                  +91 9739849430
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Notify Form Section */}
        <section className="px-4 py-16 max-w-md mx-auto">
          <form onSubmit={handleNotifySubmit} className="space-y-4 animate-fadeIn">
            <h3 className="font-playfair font-bold text-2xl md:text-3xl text-foreground text-center mb-6">
              Be the First to Know
            </h3>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-glass/60 border-border/50 text-foreground placeholder:text-muted-foreground focus:ring-primary focus:border-primary h-12 px-4 rounded-xl"
                aria-label="Email address"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12 px-8 rounded-xl motion-safe:hover:scale-105 transition-all duration-200 motion-safe:hover:shadow-lg motion-safe:hover:shadow-primary/50"
              >
                {isSubmitting ? "Submitting..." : "Notify Me"}
              </Button>
            </div>
          </form>
        </section>

        {/* Footer */}
        <footer className="px-4 py-12 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Bespoke Loft. All rights reserved.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
