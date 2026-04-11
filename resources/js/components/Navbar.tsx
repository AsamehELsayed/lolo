import { useState, useEffect } from "react";
import { Heart, ShoppingBag } from "lucide-react";
import logo from "@/assets/logo.jpeg";
import { Link } from "@inertiajs/react";

const Navbar = ({ isHome = false }: { isHome?: boolean }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (isHome) {
        setScrolled(window.scrollY > 60);
      } else {
        setScrolled(true);
      }
    };
    
    // Initial check
    onScroll();
    
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const isTransparent = isHome && !scrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isTransparent
          ? "bg-transparent text-white"
          : "bg-background/95 backdrop-blur-md shadow-sm text-foreground border-b border-border/40"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-20">
        <div className="flex items-center gap-3">
          <img src={logo} alt="LOLO BRAND" className="h-10 w-10 rounded-full object-cover" />
          <span className="font-serif text-xl tracking-[0.3em] font-semibold">
            LOLO BRAND
          </span>
        </div>
        <div className={`hidden md:flex items-center gap-10 font-sans text-xs tracking-[0.2em] uppercase ${isTransparent ? 'text-white/80' : 'text-muted-foreground'}`}>
          <Link href={route('products.index')} className="hover:opacity-70 transition-opacity duration-300">Collection</Link>
          <a href="#bestsellers" className="hover:opacity-70 transition-opacity duration-300">Best Sellers</a>
          <a href="#about" className="hover:opacity-70 transition-opacity duration-300">About</a>
        </div>
        <div className="flex items-center gap-5">
          <button className="hover:opacity-70 transition-colors duration-300" aria-label="Wishlist">
            <Heart size={20} strokeWidth={1.5} />
          </button>
          <button className="hover:opacity-70 transition-colors duration-300 relative" aria-label="Cart">
            <ShoppingBag size={20} strokeWidth={1.5} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-foreground text-background text-[10px] rounded-full flex items-center justify-center">
              0
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
