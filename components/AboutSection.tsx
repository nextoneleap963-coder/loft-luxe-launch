export const AboutSection = () => {
  return (
    <section id="about" className="py-24 lg:py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-up">
          <span className="text-sm uppercase tracking-widest text-primary font-semibold mb-4 block">About Us</span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl mb-6 text-foreground">
            Four Decades of Craftsmanship
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="animate-slide-up">
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Bespoke Loft is built on more than forty years of experience in custom tailoring. Founded in 2014 by{" "}
              <span className="text-foreground font-medium">Mr. Ghouse Mohiuddin</span>, who spent thirty years
              working with leading fashion and retail brands in India, our brand was born from a passion to create
              true custom clothing with sincere service and precise workmanship.
            </p>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              As a family-owned and family-run business, his three sons Siraj, Nawaz, and Saddam Mohiuddin work
              closely with him, ensuring every decision from fabric selection to final fitting is taken with care and
              responsibility.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              All garments are crafted in our own workshop by our in-house team of master cutters and skilled tailors,
              each trained for 6-8 months before working on client fabrics. We specialise in handmade clothing with
              full and half canvas suits, fine pattern cutting, and detailed handwork.
            </p>
          </div>

          <div className="space-y-6 animate-slide-up delay-200">
            <div className="bg-card p-6 rounded-2xl border border-border shadow-card card-tilt">
              <h3 className="font-heading text-xl mb-4 text-primary">Premium Materials</h3>
              <p className="text-muted-foreground">
                Fabrics imported directly from Italy and the UK, from heritage mills with over 350 years of textile
                history. All components threads, buttons, linings, canvases sourced from leading manufacturers in
                Germany, Italy, and the UK.
              </p>
            </div>

            <div className="bg-card p-6 rounded-2xl border border-border shadow-card card-tilt">
              <h3 className="font-heading text-xl mb-4 text-primary">Our Range</h3>
              <p className="text-muted-foreground">
                Suits, jackets, shirts, trousers, bandhgalas, sherwanis, kurtas, and ceremonial outfits for men.
                Western formal wear for women. Premium fabrics for connoisseurs and carefully curated mid-segment
                options every customer treated with equal importance.
              </p>
            </div>

            <div className="bg-card p-6 rounded-2xl border border-border shadow-card card-tilt">
              <h3 className="font-heading text-xl mb-4 text-primary">10,000+ Clients Served</h3>
              <p className="text-muted-foreground">
                From politics, cinema, media, and corporate leadership to professionals and entrepreneurs we create
                warm, long-term associations, remembering your fit, preferences, and occasions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
