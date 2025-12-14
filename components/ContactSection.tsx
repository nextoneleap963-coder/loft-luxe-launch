"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MapPin, Mail, Phone, MessageSquare, InstagramIcon, FacebookIcon } from "lucide-react";
import { toast } from "sonner";

export const ContactSection = () => {
  const [fittingType, setFittingType] = useState<"studio" | "home">("studio");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Invalid email", {
        description: "Please enter a valid email address.",
      });
      return;
    }

    if (fittingType === "home" && !formData.location.trim()) {
      toast.error("Location required", {
        description: "Please provide your address for home visit.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          fittingType,
          location: fittingType === "home" ? formData.location : undefined,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Unable to submit request right now.");
      }

      toast.success("Request Submitted!", {
        description: "A confirmation email has been sent to you. We'll contact you within 24 hours.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "",
        message: "",
      });
      setFittingType("studio");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", {
        description: error instanceof Error ? error.message : "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 lg:py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Booking Form */}
          <div className="animate-slide-up">
            <span className="text-sm uppercase tracking-widest text-primary font-semibold mb-4 block">Get Started</span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl mb-8 text-foreground">Book a Fitting</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="animate-fade-up delay-100">
                <label className="block text-sm font-medium mb-2 text-foreground">Name *</label>
                <Input
                  required
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-input border-border rounded-xl h-12"
                />
              </div>
              <div className="animate-fade-up delay-200">
                <label className="block text-sm font-medium mb-2 text-foreground">Email *</label>
                <Input
                  required
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-input border-border rounded-xl h-12"
                />
              </div>
              <div className="animate-fade-up delay-300">
                <label className="block text-sm font-medium mb-2 text-foreground">Phone *</label>
                <Input
                  required
                  type="tel"
                  placeholder="+91 9739849430"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-input border-border rounded-xl h-12"
                />
              </div>

              {/* Fitting Type Selection */}
              <div className="animate-fade-up delay-350">
                <label className="block text-sm font-medium mb-3 text-foreground">Fitting Type</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="fittingType"
                      value="studio"
                      checked={fittingType === "studio"}
                      onChange={() => setFittingType("studio")}
                      className="w-4 h-4 accent-primary"
                    />
                    <span className="text-foreground">Studio Visit</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="fittingType"
                      value="home"
                      checked={fittingType === "home"}
                      onChange={() => setFittingType("home")}
                      className="w-4 h-4 accent-primary"
                    />
                    <span className="text-foreground">Home Visit</span>
                  </label>
                </div>
              </div>

              {/* Location for Home Visit */}
              {fittingType === "home" && (
                <div className="animate-fade-up delay-375">
                  <label className="block text-sm font-medium mb-2 text-foreground">Your Location *</label>
                  <Textarea
                    required
                    placeholder="Enter your complete address for home visit"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="bg-input border-border min-h-[80px] rounded-xl"
                  />
                </div>
              )}

              <div className="animate-fade-up delay-400">
                <label className="block text-sm font-medium mb-2 text-foreground">Message (Optional)</label>
                <Textarea
                  placeholder="Tell us about your requirements"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-input border-border min-h-[120px] rounded-xl"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full animate-fade-up delay-500"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </Button>
            </form>
          </div>

          {/* Contact Card */}
          <div className="animate-slide-up delay-200">
            <span className="text-sm uppercase tracking-widest text-primary font-semibold mb-4 block">Reach Out</span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl mb-8 text-foreground">Get in Touch</h2>
            <div className="bg-card p-8 rounded-2xl border border-border shadow-card card-tilt">
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4 animate-fade-up delay-100">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1 text-foreground">Our Studio</p>
                    <p className="text-muted-foreground">MG Road, Bengaluru, Karnataka 560001</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 animate-fade-up delay-150">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1 text-foreground">Upcoming Store</p>
                    <p className="text-muted-foreground text-sm">
                      Bespoke Loft, BP2-01 Upper Ground Floor, BACL Business Park, Kempegowda International Airport,
                      Devanahalli, Bengaluru, Karnataka 560300
                    </p>
                    <Badge className="mt-2 bg-primary/20 text-primary border-primary/30">Coming Soon</Badge>
                  </div>
                </div>
                <div className="flex items-start gap-4 animate-fade-up delay-200">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1 text-foreground">Email Us</p>
                    <p className="text-muted-foreground">info@bespokeloft.in</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 animate-fade-up delay-300">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1 text-foreground">Call Us</p>
                    <p className="text-muted-foreground">+91 9739849430</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 animate-fade-up delay-400">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1 text-foreground">WhatsApp</p>
                    <a
                      href="https://wa.me/919739849430"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline">
                      Chat with us
                    </a>
                  </div>
                </div>
              </div>

              <Button onClick={() => window.open("https://maps.app.goo.gl/t7223xaug74uvNqUA", "_blank")} variant="secondary" className="w-full mb-6">
                View Map
              </Button>

              <div className="flex gap-4 justify-center pt-6 border-t border-border">
                <a
                  href="https://www.instagram.com/bespokeloft/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 focus-ring hover:scale-110"
                  aria-label="Instagram">
                  <InstagramIcon className="w-5 h-5" />
                </a>
                <a
                  href="https://m.facebook.com/Bespokeloft/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 focus-ring hover:scale-110"
                  aria-label="Facebook">
                  <FacebookIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
