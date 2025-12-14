"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryFilters } from "./constants";
import type { GalleryItem } from "./types";

interface GallerySectionProps {
  dbPhotos: GalleryItem[];
}

export const GallerySection = ({ dbPhotos }: GallerySectionProps) => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredGallery =
    activeFilter === "All" ? dbPhotos : dbPhotos.filter((item) => item.category === activeFilter);

  return (
    <section id="gallery" className="py-24 lg:py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-up">
          <span className="text-sm uppercase tracking-widest text-primary font-semibold mb-4 block">Our Work</span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl mb-8 text-foreground">Lookbook</h2>

          <div className="flex flex-wrap justify-center items-center gap-3 mb-12">
            {galleryFilters.map((filter, i) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "default" : "outline"}
                onClick={() => setActiveFilter(filter)}
                className="transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${i * 50}ms` }}>
                {filter}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl aspect-[4/5] bg-card shadow-card animate-scale-in cursor-pointer"
              style={{ animationDelay: `${i * 100}ms` }}
              onClick={() => {
                setLightboxIndex(i);
                setLightboxOpen(true);
              }}>
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <Badge className="mb-2 bg-primary text-primary-foreground border-0">{item.category}</Badge>
                  <h3 className="font-heading text-xl text-background">{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {lightboxOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setLightboxOpen(false)}>
            {/* Close button */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Previous button */}
            {filteredGallery.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev === 0 ? filteredGallery.length - 1 : prev - 1));
                }}
                className="absolute left-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <ChevronLeft className="w-8 h-8 text-white" />
              </button>
            )}

            {/* Image */}
            <img
              src={filteredGallery[lightboxIndex]?.image}
              alt={filteredGallery[lightboxIndex]?.title}
              className="max-w-[90vw] max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Next button */}
            {filteredGallery.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev === filteredGallery.length - 1 ? 0 : prev + 1));
                }}
                className="absolute right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <ChevronRight className="w-8 h-8 text-white" />
              </button>
            )}

            {/* Caption */}
            <div className="absolute bottom-8 left-0 right-0 text-center">
              <Badge className="mb-2 bg-primary text-primary-foreground border-0">
                {filteredGallery[lightboxIndex]?.category}
              </Badge>
              <h3 className="font-heading text-xl text-white">{filteredGallery[lightboxIndex]?.title}</h3>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
