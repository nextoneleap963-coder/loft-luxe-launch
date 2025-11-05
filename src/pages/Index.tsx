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
          <div className="backdrop-blur-xl bg-glass/60 rounded-2xl p-8 md:p-12 shadow-2xl border border-primary/20 animate-fadeIn motion-safe:hover:shadow-primary/30 transition-all duration-500">
            <h3 className="font-playfair font-bold text-3xl md:text-4xl text-foreground mb-10 text-center tracking-wide">
              Get In Touch
            </h3>
            
            <div className="space-y-8">
              {/* Address */}
              <div className="flex items-start gap-5 group p-4 rounded-xl hover:bg-foreground/5 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h4 className="text-primary font-semibold mb-2 uppercase tracking-wider text-sm">Location</h4>
                  <p className="text-foreground/90 mb-3 leading-relaxed text-base">
                    {address}
                  </p>
                  <a 
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors duration-200 font-medium text-sm"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-5 group p-4 rounded-xl hover:bg-foreground/5 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h4 className="text-primary font-semibold mb-2 uppercase tracking-wider text-sm">Email</h4>
                  <a 
                    href="mailto:info@bespokeloft.in"
                    className="text-foreground/90 hover:text-primary transition-colors duration-200 text-base"
                  >
                    info@bespokeloft.in
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-5 group p-4 rounded-xl hover:bg-foreground/5 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h4 className="text-primary font-semibold mb-2 uppercase tracking-wider text-sm">Phone</h4>
                  <a 
                    href="tel:+919739849430"
                    className="text-foreground/90 hover:text-primary transition-colors duration-200 text-base"
                  >
                    +91 9739 849 430
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Notify Form Section */}
        <section className="px-4 py-20 max-w-lg mx-auto">
          <form onSubmit={handleNotifySubmit} className="space-y-6 animate-fadeIn backdrop-blur-xl bg-glass/40 rounded-2xl p-8 md:p-10 border border-primary/20">
            <div className="text-center space-y-2">
              <h3 className="font-playfair font-bold text-2xl md:text-3xl text-foreground tracking-wide">
                Stay Updated
              </h3>
              <p className="text-muted-foreground text-sm">Be notified when we launch our exclusive collection</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-foreground/5 border-primary/30 text-foreground placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary focus:border-primary h-14 px-5 rounded-xl backdrop-blur-sm font-inter"
                aria-label="Email address"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary hover:bg-primary/90 text-dark font-semibold h-14 px-10 rounded-xl motion-safe:hover:scale-[1.02] transition-all duration-300 motion-safe:hover:shadow-2xl motion-safe:hover:shadow-primary/50 uppercase tracking-wide"
              >
                {isSubmitting ? "Sending..." : "Notify Me"}
              </Button>
            </div>
          </form>
        </section>

        {/* Footer */}
        <footer className="px-4 py-16 text-center border-t border-primary/10 mt-20">
          <p className="text-muted-foreground/80 text-sm font-inter tracking-wide">
            © {new Date().getFullYear()} Bespoke Loft. All Rights Reserved.
          </p>
          <p className="text-muted-foreground/60 text-xs mt-2">
            Custom Tailors • Bengaluru
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
