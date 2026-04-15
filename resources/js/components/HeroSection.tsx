import heroBg from "@/assets/hero-bg.png";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background with subtle zoom effect */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img
          src={heroBg}
          alt="Luxury handbag collection display"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      </motion.div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center text-white">
        <div className="space-y-4 md:space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            <span className="font-sans text-[10px] md:text-xs tracking-[0.5em] uppercase text-white/60 mb-4 block">
              The Art of Handcrafting
            </span>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl tracking-[0.1em] font-light leading-none">
              LOLO <span className="italic">BRAND</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
            className="flex flex-col items-center"
          >
            <p className="font-serif text-lg md:text-2xl tracking-[0.05em] italic text-white/90 max-w-2xl">
              "Luxury Bags, Redefined Elegance"
            </p>
            <div className="h-px w-20 bg-white/20 my-8" />
            <p className="font-sans text-xs md:text-sm tracking-[0.2em] text-white/70 max-w-lg leading-relaxed uppercase">
              Curated for the modern woman who celebrates timeless sophistication and effortless femininity.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="pt-10"
          >
            <a
              href="#collection"
              className="group relative inline-flex items-center justify-center px-12 py-5 overflow-hidden font-sans text-xs tracking-[0.4em] uppercase transition-all duration-500 bg-white/5 backdrop-blur-sm border border-white/20 hover:border-white hover:text-burgundy"
            >
              <div className="absolute inset-0 w-full h-full bg-white transition-all duration-500 origin-center scale-x-0 group-hover:scale-x-100" />
              <span className="relative z-10">Shop Collection</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <div className="font-sans text-[8px] tracking-[0.4em] uppercase text-white/30 rotate-180 [writing-mode:vertical-lr]">
          Scroll to Explore
        </div>
        <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
