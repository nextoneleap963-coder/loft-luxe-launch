export const Footer = () => {
  return (
    <footer className="border-t border-border py-12 px-4 animate-fade-in bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="font-heading text-2xl text-foreground mb-2">BESPOKE LOFT</h3>
            <p className="text-muted-foreground">© {new Date().getFullYear()} Bespoke Loft. Crafted in Bengaluru.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
