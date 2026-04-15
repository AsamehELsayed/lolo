import editorial from "@/assets/luxury-editorial.jpg";
import { motion } from "framer-motion";

interface LuxuryImageSectionProps {
  content?: Record<string, string>;
}

const LuxuryImageSection = ({ content }: LuxuryImageSectionProps) => {
  const label = content?.heritage_label || "Our Heritage";
  const title = content?.heritage_title || "Crafted with Passion & Undeniable Grace";
  const description = content?.heritage_description || "LOLO BRAND was born from a desire to blend traditional craftsmanship with contemporary feminine aesthetics. Every bag is a testament to the modern woman's journey—sophisticated, resilient, and inherently elegant.";
  const stat1Value = content?.heritage_stat1_value || "100%";
  const stat1Label = content?.heritage_stat1_label || "Handmade";
  const stat2Value = content?.heritage_stat2_value || "2026";
  const stat2Label = content?.heritage_stat2_label || "Est. Jordan";
  const image = content?.heritage_image || editorial;

  const renderTitle = (text: string) => {
    // Basic attempt to keep the italic style if "Passion" is in the title
    if (text.includes("Passion")) {
      const parts = text.split("Passion");
      return (
        <>
          {parts[0]} <span className="italic">Passion</span> {parts[1]}
        </>
      );
    }
    return text;
  };

  return (
    <section
      id="about"
      className="py-24 md:py-40 bg-white overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-8 order-2 lg:order-1"
          >
            <div className="space-y-4">
              <span className="font-sans text-[10px] tracking-[0.5em] uppercase text-burgundy/40 block">
                {label}
              </span>
              <h2 className="font-serif text-4xl md:text-6xl text-foreground leading-tight tracking-tight">
                {renderTitle(title)}
              </h2>
            </div>
            
            <p className="font-sans text-sm md:text-base text-muted-foreground/80 leading-relaxed max-w-lg">
              {description}
            </p>

            <div className="pt-6">
              <div className="flex items-center gap-6">
                 <div className="flex flex-col">
                    <span className="font-serif text-3xl text-burgundy">{stat1Value}</span>
                    <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-muted-foreground">{stat1Label}</span>
                 </div>
                 <div className="w-px h-10 bg-burgundy/10" />
                 <div className="flex flex-col">
                    <span className="font-serif text-3xl text-burgundy">{stat2Value}</span>
                    <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-muted-foreground">{stat2Label}</span>
                 </div>
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative aspect-[4/5] md:aspect-[3/2] lg:aspect-[4/5] overflow-hidden order-1 lg:order-2 shadow-2xl"
          >
            <img
              src={image}
              alt="LOLO BRAND luxury editorial"
              loading="lazy"
              className="w-full h-full object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-black/5" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LuxuryImageSection;
