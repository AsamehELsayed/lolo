import { Link, router } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Eye } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/sonner";


interface ProductCardProps {
  id: number;
  image: string;
  name: string;
  price: number;
  discount_percentage?: number;
  discounted_price?: number;
  category?: string;
}

const ProductCard = ({ id, image, name, price, discount_percentage, discounted_price, category }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const hasDiscount = discount_percentage && discount_percentage > 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isAdding) return;
    
    setIsAdding(true);
    router.post(route('cart.store'), {
      product_id: id,
      quantity: 1,
    }, {
      preserveScroll: true,
      onSuccess: () => {
        toast.success(`${name} added to your bag`);
        setIsAdding(false);
      },
      onError: () => {
        setIsAdding(false);
        toast.error("Failed to add piece to bag.");
      }
    });
  };


  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#FBF9F7] border border-burgundy/5">
        <Link href={route('products.show', id)} className="block w-full h-full">
          <motion.img
            src={image}
            alt={name}
            loading="lazy"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
            className="w-full h-full object-cover"
          />
        </Link>

        {/* Overlays */}
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/5 flex flex-col items-center justify-center gap-3 pointer-events-none"
            >
              <div className="flex gap-2 pointer-events-auto">
                <Link href={route('products.show', id)} className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-burgundy transition-transform duration-300 hover:scale-110 active:scale-95" aria-label="View details">
                  <Eye size={16} />
                </Link>
                <button 
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className={cn(
                    "w-10 h-10 rounded-full shadow-lg flex items-center justify-center text-white transition-all duration-300 hover:scale-110 active:scale-95",
                    isAdding ? "bg-burgundy/50 cursor-not-allowed" : "bg-burgundy"
                  )} 
                  aria-label="Quick add to cart"
                >
                  <ShoppingBag size={16} />
                </button>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Labels */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {hasDiscount && (
            <span className="bg-burgundy text-white text-[9px] font-bold px-2.5 py-1 tracking-[0.1em] uppercase shadow-sm">
              -{discount_percentage}%
            </span>
          )}
          {category === 'New Arrival' && (
            <span className="bg-white text-burgundy text-[9px] font-bold px-2.5 py-1 tracking-[0.1em] uppercase shadow-sm border border-burgundy/10">
              New
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="mt-5 text-center flex flex-col items-center gap-1.5 px-2">
        {category && (
          <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-muted-foreground/60 transition-colors group-hover:text-burgundy/40">
            {category}
          </p>
        )}
        <Link href={route('products.show', id)} className="block group/title">
          <h3 className="font-serif text-lg tracking-[0.05em] text-foreground transition-all duration-500 group-hover/title:text-burgundy">
            {name}
          </h3>
        </Link>
        <div className="flex items-center justify-center gap-3 mt-1">
          {hasDiscount ? (
            <>
              <p className="font-sans text-sm tracking-[0.05em] text-burgundy font-medium">
                {discounted_price} JOD
              </p>
              <p className="font-sans text-[11px] tracking-[0.05em] text-muted-foreground/50 line-through italic">
                {price} JOD
              </p>
            </>
          ) : (
            <p className="font-sans text-sm tracking-[0.05em] text-foreground/80 font-light">
              {price} JOD
            </p>
          )}
        </div>
      </div>

      {/* Elegant hover underline */}
      <div className="mt-4 mx-auto w-0 h-px bg-burgundy/20 transition-all duration-700 group-hover:w-16" />
    </motion.div>
  );
};

export default ProductCard;
