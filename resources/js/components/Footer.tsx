import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-cream py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="font-serif text-xl tracking-[0.2em] text-foreground mb-4">
              LOLO BRAND
            </h3>
            <p className="font-sans text-xs text-muted-foreground leading-relaxed">
              Premium handbags crafted for the modern woman. Elegance in every stitch.
            </p>
          </div>
          <div>
            <h4 className="font-sans text-[10px] tracking-[0.3em] uppercase text-foreground mb-4">
              Quick Links
            </h4>
            <div className="flex flex-col gap-2">
              {["Collection", "Best Sellers", "About", "Contact"].map((link) => (
                <a key={link} href="#" className="font-sans text-xs text-muted-foreground hover:text-foreground transition-colors duration-300">
                  {link}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-sans text-[10px] tracking-[0.3em] uppercase text-foreground mb-4">
              Follow Us
            </h4>
            <div className="flex flex-col gap-2">
              {["Instagram", "Facebook", "Pinterest"].map((s) => (
                <a key={s} href="#" className="font-sans text-xs text-muted-foreground hover:text-foreground transition-colors duration-300">
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-[10px] tracking-[0.15em] text-muted-foreground">
            © 2026 LOLO BRAND. All rights reserved.
          </p>
          <p className="font-sans text-[10px] tracking-[0.1em] text-muted-foreground flex items-center gap-1">
            Made with <Heart size={10} className="text-primary" /> in Jordan
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
