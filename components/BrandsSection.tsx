"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { brands } from "./constants";

export const BrandsSection = () => {
  const [showAllBrands, setShowAllBrands] = useState(false);

  return (
    <section id="brands" className="py-24 lg:py-32 px-4 bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-up">
          <span className="text-sm uppercase tracking-widest text-primary font-semibold mb-4 block">Our Partners</span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl mb-4 text-foreground">Brands We Work With</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Fabrics from the world&apos;s most respected mills and textile houses
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {(showAllBrands ? brands : brands.slice(0, 6)).map((brand, i) => (
            <button
              key={brand.slug}
              className="bg-card p-6 rounded-2xl border border-border hover:border-primary hover:shadow-primary-soft active:border-primary active:shadow-primary-soft transition-all duration-300 card-tilt animate-fade-up cursor-pointer group"
              style={{ animationDelay: `${i * 40}ms` }}>
              <div className="w-full h-20 rounded-xl bg-white flex items-center justify-center mb-4 group-hover:shadow-md transition-all overflow-hidden p-3">
                {brand.logo ? (
                  <img src={brand.logo} alt={`${brand.name} logo`} className="max-w-full max-h-full object-contain" />
                ) : (
                  <span className="font-heading text-2xl font-bold text-primary">{brand.name.charAt(0)}</span>
                )}
              </div>
              <h3 className="font-heading text-lg mb-2 text-foreground group-hover:text-primary transition-colors">
                {brand.name}
              </h3>
              <p className="text-sm text-muted-foreground">{brand.blurb}</p>
            </button>
          ))}
        </div>

        {!showAllBrands && (
          <div className="text-center mt-8 animate-fade-up">
            <Button variant="outline" size="lg" onClick={() => setShowAllBrands(true)} className="px-8">
              See More Brands
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
