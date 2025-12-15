"use client";
import { Button } from "@/components/ui/button";
import { Users, Award } from "lucide-react";

interface WorkWithUsSectionProps {
  onOpenReferralModal: (type: "tailor" | "master") => void;
}

export const WorkWithUsSection = ({ onOpenReferralModal }: WorkWithUsSectionProps) => {
  return (
    <section id="work-with-us" className="py-24 lg:py-32 px-4 bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-up">
          <span className="text-sm uppercase tracking-widest text-primary font-semibold mb-4 block">Work With Us</span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl mb-4 text-foreground">
            Join Our Family of Craftsmen
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We&apos;re always looking for talented artisans who share our passion for exceptional craftsmanship
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          <div className="bg-card p-8 rounded-2xl border border-border shadow-card animate-slide-up card-tilt">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <Users className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-heading text-2xl mb-4 text-foreground">Refer a Tailor</h3>
            <p className="text-muted-foreground mb-6">
              Know a skilled tailor looking for an opportunity? Help us grow our team.
              We value craftsmen who take pride in their work.
            </p>
            <Button className="w-full" onClick={() => onOpenReferralModal("tailor")}>
              Submit Referral
            </Button>
          </div>

          <div className="bg-card p-8 rounded-2xl border border-border shadow-card animate-slide-up delay-100 card-tilt">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <Award className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-heading text-2xl mb-4 text-foreground">Refer a Master</h3>
            <p className="text-muted-foreground mb-6">
              Do you know a master tailor with exceptional skills and years of experience? We&apos;re looking for
              artisans who can mentor the next generation of craftsmen.
            </p>
            <Button className="w-full" onClick={() => onOpenReferralModal("master")}>
              Submit Referral
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
