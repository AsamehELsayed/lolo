import editorial from "@/assets/luxury-editorial.jpg";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";

const LuxuryImageSection = () => {
  const ref = useScrollFadeIn();

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 md:py-32 opacity-0 translate-y-8 transition-all duration-1000"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="relative aspect-[21/9] overflow-hidden">
          <img
            src={editorial}
            alt="LOLO BRAND luxury editorial"
            loading="lazy"
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/30 flex items-center justify-center">
            <div className="text-center">
              <p className="font-serif text-3xl md:text-5xl tracking-[0.15em] text-primary-foreground font-light">
                Crafted with Passion
              </p>
              <p className="font-sans text-xs tracking-[0.2em] text-primary-foreground/70 mt-4 uppercase">
                Where luxury meets femininity
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LuxuryImageSection;
