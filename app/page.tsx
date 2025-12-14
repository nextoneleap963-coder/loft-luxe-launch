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
    // Fetch photos from database with caching
    const fetchPhotos = async () => {
      const CACHE_KEY = "lookbook_photos_cache";
      const CACHE_TIMESTAMP_KEY = "lookbook_photos_cache_timestamp";
      const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

      // Check if we have cached data
      const cachedData = sessionStorage.getItem(CACHE_KEY);
      const cachedTimestamp = sessionStorage.getItem(CACHE_TIMESTAMP_KEY);

      if (cachedData && cachedTimestamp) {
        const now = Date.now();
        const cacheAge = now - parseInt(cachedTimestamp, 10);

        // Use cached data if it's still fresh
        if (cacheAge < CACHE_DURATION) {
          try {
            const parsedData = JSON.parse(cachedData);
            setDbPhotos(parsedData);
            return;
          } catch {
            // If parsing fails, clear cache and fetch fresh data
            sessionStorage.removeItem(CACHE_KEY);
            sessionStorage.removeItem(CACHE_TIMESTAMP_KEY);
          }
        }
      }

      // Fetch fresh data from database
      const { data, error } = await supabase
        .from("lookbook_photos")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        const mappedPhotos = data.map((photo) => ({
          image: photo.image_url,
          category: photo.category,
          title: photo.title,
          isFromDB: true,
          id: photo.id,
        }));

        setDbPhotos(mappedPhotos);

        // Cache the data
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(mappedPhotos));
        sessionStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
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
