"use client";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 spotlight-container">
      {/* Background with gradient */}
      <div className="absolute inset-0 gradient-hero transition-colors duration-300" />

      {/* Elegant Gold Light Effects for Dark Theme */}
      <div className="corner-glow-tl" />
      <div className="corner-glow-br" />
      <div className="fabric-highlight" />

      {/* Floating gold particles */}
      <div className="gold-particle top-1/4 left-1/4" style={{ animationDelay: "0s" }} />
      <div className="gold-particle-lg top-1/3 right-1/4" style={{ animationDelay: "1s" }} />
      <div className="gold-particle bottom-1/3 left-1/3" style={{ animationDelay: "2s" }} />
      <div className="gold-particle-lg top-1/2 right-1/3" style={{ animationDelay: "3s" }} />
      <div className="gold-particle bottom-1/4 right-1/4" style={{ animationDelay: "4s" }} />
      <div className="gold-particle-lg top-2/3 left-1/5" style={{ animationDelay: "1.5s" }} />
      <div className="gold-particle bottom-1/2 left-1/4" style={{ animationDelay: "2.5s" }} />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Logo placeholder */}
        <div className="mb-8 animate-fade-up">
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold logo-text-dark mb-2 transition-all duration-300">
            BESPOKE LOFT
          </h1>
          <div className="h-1 w-32 mx-auto bg-primary rounded-full animate-pulse-glow" />
        </div>

        <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl text-foreground mb-6 animate-fade-up delay-100">
          Crafted-to-Measure Elegance
        </h2>

        <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-12 animate-fade-up delay-200 max-w-2xl mx-auto">
          Premium bespoke tailoring in the heart of Bengaluru
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up delay-300">
          <Button variant="default" size="lg" className="text-lg px-8" onClick={() => scrollToSection("contact")}>
            Book a Fitting
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8" onClick={() => scrollToSection("gallery")}>
            View Gallery
          </Button>
        </div>
      </div>
    </section>
  );
};
