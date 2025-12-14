import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { toast } from "sonner";

interface ReferralModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "tailor" | "master";
}

export function ReferralModal({ isOpen, onClose, type }: ReferralModalProps) {
  const [formData, setFormData] = useState({
    referrerName: "",
    referrerPhone: "",
    referrerEmail: "",
    candidateName: "",
    candidatePhone: "",
    experience: "",
    message: "",
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.consent) {
      toast.error("Consent Required", {
        description: "Please agree to the terms before submitting.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/referral", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          type,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Unable to submit referral right now.");
      }

      toast.success("Referral Submitted!", {
        description: `Thank you for referring a ${type === "tailor" ? "tailor" : "master tailor"}. ${formData.referrerEmail ? "A confirmation email has been sent to you." : ""} We'll contact you soon.`,
      });
      
      setFormData({
        referrerName: "",
        referrerPhone: "",
        referrerEmail: "",
        candidateName: "",
        candidatePhone: "",
        experience: "",
        message: "",
        consent: false,
      });
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", {
        description: error instanceof Error ? error.message : "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const title = type === "tailor" ? "Refer a Tailor" : "Refer a Master Tailor";

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="overflow-y-auto bg-background">
        <SheetHeader className="mb-6">
          <SheetTitle className="font-heading text-2xl text-foreground">{title}</SheetTitle>
          <SheetDescription className="text-muted-foreground">
            Fill in the details below. We&apos;ll get in touch within 24 hours.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-primary uppercase tracking-wide">Your Details</h4>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Your Name *</label>
              <Input
                required
                placeholder="Enter your full name"
                value={formData.referrerName}
                onChange={(e) => setFormData({ ...formData, referrerName: e.target.value })}
                className="bg-input border-border rounded-xl h-11"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Your Phone *</label>
              <Input
                required
                type="tel"
                placeholder="+91 98765 43210"
                value={formData.referrerPhone}
                onChange={(e) => setFormData({ ...formData, referrerPhone: e.target.value })}
                className="bg-input border-border rounded-xl h-11"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Your Email</label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={formData.referrerEmail}
                onChange={(e) => setFormData({ ...formData, referrerEmail: e.target.value })}
                className="bg-input border-border rounded-xl h-11"
              />
            </div>
          </div>

          <div className="h-px bg-border my-6" />

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-primary uppercase tracking-wide">
              {type === "tailor" ? "Tailor" : "Master Tailor"} Details
            </h4>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Candidate Name *</label>
              <Input
                required
                placeholder="Candidate's full name"
                value={formData.candidateName}
                onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
                className="bg-input border-border rounded-xl h-11"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Candidate Phone *</label>
              <Input
                required
                type="tel"
                placeholder="+91 98765 43210"
                value={formData.candidatePhone}
                onChange={(e) => setFormData({ ...formData, candidatePhone: e.target.value })}
                className="bg-input border-border rounded-xl h-11"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Years of Experience *</label>
              <Input
                required
                placeholder="e.g., 5 years"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="bg-input border-border rounded-xl h-11"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Additional Notes</label>
              <Textarea
                placeholder="Any additional information about the candidate..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="bg-input border-border min-h-[100px] rounded-xl"
              />
            </div>
          </div>

          <div className="flex items-start gap-3 pt-2">
            <Checkbox
              id="consent"
              checked={formData.consent}
              onCheckedChange={(checked) => setFormData({ ...formData, consent: checked as boolean })}
              className="mt-0.5"
            />
            <label htmlFor="consent" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
              I confirm that the candidate has given consent to share their details and I agree to the terms of the referral program.
            </label>
          </div>

          <Button 
            type="submit" 
            className="w-full mt-6" 
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Referral"}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
