import heroBg from "@/assets/hero-bg.png";

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <img
        src={heroBg}
        alt="Luxury handbag collection display"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 text-white">
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-[0.15em] fade-in font-light">
          LOLO BRAND
        </h1>
        <p className="font-serif text-lg md:text-2xl tracking-[0.1em] mt-4 fade-in-delay italic">
          Luxury Bags, Redefined Elegance
        </p>
        <p className="font-sans text-xs md:text-sm tracking-[0.15em] text-white/90 mt-6 max-w-md fade-in-delay-2 leading-relaxed">
          Curated for the modern woman who celebrates timeless sophistication and effortless femininity.
        </p>
        <a
          href="#collection"
          className="mt-10 fade-in-delay-3 font-sans text-xs tracking-[0.3em] uppercase border border-white px-10 py-4 hover:bg-white hover:text-burgundy transition-all duration-500"
        >
          Shop Collection
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
