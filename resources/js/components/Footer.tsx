import { Heart, Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import AppLogo from "./AppLogo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#FAF9F6] border-t border-burgundy/5 pt-20 pb-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          {/* Brand Column */}
          <div className="space-y-8">
            <AppLogo showText={true} className="scale-110 origin-left" />
            <p className="font-sans text-[13px] text-muted-foreground/80 leading-relaxed max-w-xs">
              Crafting timeless elegance through curated handbag collections. Every stitch tells a story of sophistication and modern femininity.
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: Facebook, label: "Facebook" },
                { icon: Mail, label: "Email" }
              ].map((social) => (
                <a 
                  key={social.label} 
                  href="#" 
                  className="w-10 h-10 rounded-full border border-burgundy/10 flex items-center justify-center text-burgundy/60 hover:bg-burgundy hover:text-white hover:border-burgundy transition-all duration-500"
                  aria-label={social.label}
                >
                  <social.icon size={16} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Boutique Links */}
          <div className="lg:pl-10">
            <h4 className="font-sans text-[11px] tracking-[0.4em] uppercase text-burgundy/40 mb-8 font-semibold">
              The Boutique
            </h4>
            <ul className="flex flex-col gap-4">
              {["New Arrivals", "Best Sellers", "All Collections", "Care Guide"].map((link) => (
                <li key={link}>
                  <a href="#" className="font-serif text-[15px] text-foreground/70 hover:text-burgundy hover:pl-2 transition-all duration-300 block">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Information Links */}
          <div>
            <h4 className="font-sans text-[11px] tracking-[0.4em] uppercase text-burgundy/40 mb-8 font-semibold">
              Information
            </h4>
            <ul className="flex flex-col gap-4">
              {["Our Story", "Shipping & Returns", "Privacy Policy", "Terms of Service"].map((link) => (
                <li key={link}>
                  <a href="#" className="font-serif text-[15px] text-foreground/70 hover:text-burgundy hover:pl-2 transition-all duration-300 block">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-6">
            <h4 className="font-sans text-[11px] tracking-[0.4em] uppercase text-burgundy/40 mb-8 font-semibold">
              Get in Touch
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <MapPin size={16} className="text-burgundy/40 mt-1 flex-shrink-0" />
                <p className="font-sans text-[13px] text-muted-foreground/80 leading-snug">
                  Amman Boutique, 5th Circle<br />Amman, Jordan
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Phone size={16} className="text-burgundy/40 flex-shrink-0" />
                <p className="font-sans text-[13px] text-muted-foreground/80">+962 79 000 0000</p>
              </div>
              <div className="flex items-center gap-4">
                <Mail size={16} className="text-burgundy/40 flex-shrink-0" />
                <p className="font-sans text-[13px] text-muted-foreground/80">concierge@lolobrand.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-burgundy/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="font-sans text-[10px] tracking-[0.2em] text-muted-foreground/60 uppercase">
              © {currentYear} LOLO BRAND LUXURY. All rights reserved.
            </p>
            <p className="font-sans text-[9px] tracking-[0.1em] text-muted-foreground/40 flex items-center gap-1.5 italic">
              Experience Timeless Elegance
            </p>
          </div>
          
          <div className="flex items-center gap-8">
             <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500/40 animate-pulse" />
                <span className="font-sans text-[10px] tracking-[0.2em] text-muted-foreground/60 uppercase">Boutique Online</span>
             </div>
             <p className="font-sans text-[10px] tracking-[0.1em] text-muted-foreground/60 flex items-center gap-2">
              Made with <Heart size={10} className="text-burgundy/40 fill-burgundy/10" strokeWidth={1.5} /> in Jordan
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
