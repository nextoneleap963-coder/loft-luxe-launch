"use client";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { ReferralModal } from "@/components/ReferralModal";
import { HeroSection } from "@/components/HeroSection";
import { BrandsSection } from "@/components/BrandsSection";
import { GallerySection } from "@/components/GallerySection";
import { AboutSection } from "@/components/AboutSection";
import { WorkWithUsSection } from "@/components/WorkWithUsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import type { GalleryItem } from "@/components/types";

const Index = () => {
  const [referralModalOpen, setReferralModalOpen] = useState(false);
  const [referralType, setReferralType] = useState<"tailor" | "master">("tailor");
  const [dbPhotos, setDbPhotos] = useState<GalleryItem[]>([]);

  const openReferralModal = (type: "tailor" | "master") => {
    setReferralType(type);
    setReferralModalOpen(true);
  };

  useEffect(() => {
    // Fetch photos from database
    const fetchPhotos = async () => {
      const { data, error } = await supabase
        .from("lookbook_photos")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setDbPhotos(
          data.map((photo) => ({
            image: photo.image_url,
            category: photo.category,
            title: photo.title,
            isFromDB: true,
            id: photo.id,
          }))
        );
      }
    };

    fetchPhotos();
  }, []);

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Navbar />
      <HeroSection />
      <BrandsSection />
      <GallerySection dbPhotos={dbPhotos} />
      <AboutSection />
      <WorkWithUsSection onOpenReferralModal={openReferralModal} />
      <ContactSection />
      <Footer />
      <ReferralModal isOpen={referralModalOpen} onClose={() => setReferralModalOpen(false)} type={referralType} />
    </div>
  );
};

export default Index;
