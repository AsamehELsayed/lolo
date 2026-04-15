import logo from "@/assets/logo.jpeg";
import { Link } from "@inertiajs/react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface AppLogoProps {
  className?: string;
  showText?: boolean;
}

const AppLogo = ({ className, showText = true }: AppLogoProps) => {
  return (
    <Link href="/" className={cn("flex items-center gap-4 group", className)}>
      <motion.div 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-burgundy/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="relative overflow-hidden rounded-full border border-burgundy/10 p-0.5 shadow-sm transition-all duration-700 group-hover:border-burgundy/30 bg-white">
          <img 
            src={logo} 
            alt="LOLO BRAND" 
            className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover transition-transform duration-1000 group-hover:scale-110" 
          />
        </div>
      </motion.div>
      
      {showText && (
        <div className="flex flex-col -space-y-1">
          <span className="font-serif text-xl md:text-2xl tracking-[0.3em] font-bold text-burgundy transition-all duration-700 group-hover:tracking-[0.35em]">
            LOLO
          </span>
          <div className="flex items-center gap-2">
            <span className="h-px w-3 bg-burgundy/20 transition-all duration-700 group-hover:w-5 group-hover:bg-burgundy/40" />
            <span className="font-sans text-[8px] md:text-[9px] tracking-[0.5em] font-light text-burgundy/60 uppercase">
              Brand
            </span>
          </div>
        </div>
      )}
    </Link>
  );
};

export default AppLogo;
