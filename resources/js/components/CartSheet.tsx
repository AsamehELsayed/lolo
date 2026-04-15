import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { ShoppingBag, X, Plus, Minus, ArrowRight } from "lucide-react";
import { usePage, Link, router } from "@inertiajs/react";
import { SharedData, CartItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const CartSheet = () => {
  const { props } = usePage<SharedData>();
  const cart = props.cart;

  const updateQuantity = (id: number, quantity: number) => {
    router.put(
      route("cart.update", id),
      { quantity },
      {
        preserveScroll: true,
      }
    );
  };

  const removeItem = (id: number) => {
    router.delete(route("cart.destroy", id), {
      preserveScroll: true,
    });
  };

  const items = cart?.items || [];
  const total = cart?.total || 0;
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          className="relative p-2 rounded-xl text-current hover:bg-burgundy/5 transition-all active:scale-90"
          aria-label="Cart"
        >
          <ShoppingBag size={20} strokeWidth={1.5} />
          {itemCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-burgundy text-white text-[9px] rounded-full flex items-center justify-center font-bold px-1 leading-none">
              {itemCount}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent
        hideDefaultClose
        className="w-[90vw] max-w-[420px] flex flex-col p-0 border-l border-burgundy/5 bg-white shadow-2xl"
      >
        <div className="flex flex-col h-full text-burgundy">
          {/* Header */}
          <SheetHeader className="px-5 sm:px-7 py-5 sm:py-6 border-b border-burgundy/8 flex-shrink-0 bg-white">
            <div className="flex items-center justify-between">
              <SheetTitle className="font-serif text-xl sm:text-2xl tracking-[0.12em] sm:tracking-[0.18em] uppercase text-burgundy">
                Your Bag
              </SheetTitle>
              <div className="flex items-center gap-2.5">
                <span className="font-sans text-[9px] tracking-[0.2em] text-burgundy/35 uppercase">
                  {items.length} {items.length === 1 ? "item" : "items"}
                </span>
                <SheetClose asChild>
                  <button className="p-2 rounded-xl text-burgundy/40 hover:text-burgundy hover:bg-burgundy/5 transition-all active:scale-90">
                    <X size={18} strokeWidth={1.5} />
                  </button>
                </SheetClose>
              </div>
            </div>
          </SheetHeader>

          {/* Content */}
          <div className="flex-1 overflow-hidden min-h-0">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center p-6 sm:p-10 text-center">
                <div className="relative mb-7">
                  <ShoppingBag
                    size={56}
                    strokeWidth={0.5}
                    className="text-burgundy/10"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute inset-0 bg-burgundy/5 blur-3xl -z-10 rounded-full"
                  />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-burgundy mb-2.5 tracking-[0.12em] uppercase">
                  Elegance Awaits
                </h3>
                <p className="text-xs text-burgundy/40 mb-8 font-light tracking-wide max-w-[240px] leading-relaxed">
                  Your selection is currently empty. Begin your journey through
                  our curated collections.
                </p>
                <SheetClose asChild>
                  <Link href={route("products.index")}>
                    <Button
                      variant="outline"
                      className="rounded-xl px-7 sm:px-10 h-12 sm:h-14 border-burgundy/10 text-burgundy hover:bg-burgundy hover:text-white transition-all duration-500 text-[9px] tracking-[0.35em] uppercase bg-transparent"
                    >
                      Explore Collections
                    </Button>
                  </Link>
                </SheetClose>
              </div>
            ) : (
              <ScrollArea className="h-full">
                <div className="px-5 sm:px-7 py-5 sm:py-7 space-y-3 sm:space-y-4">
                  {items.map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.06 * i }}
                      className="flex gap-3.5 sm:gap-5 group/item bg-burgundy/[0.015] p-3.5 sm:p-5 border border-burgundy/5 rounded-xl transition-all duration-300 hover:bg-burgundy/[0.03] hover:border-burgundy/8"
                    >
                      {/* Product Image */}
                      <div className="relative w-20 sm:w-24 h-24 sm:h-28 bg-burgundy/[0.03] overflow-hidden flex-shrink-0 border border-burgundy/5 rounded-lg">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-burgundy/10">
                            <ShoppingBag size={20} />
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 flex flex-col justify-between py-0.5 min-w-0">
                        <div className="space-y-1">
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="font-serif text-sm sm:text-base text-burgundy leading-tight tracking-wide line-clamp-2">
                              {item.name}
                            </h4>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-burgundy/20 hover:text-red-500 transition-colors p-1 -mr-1 rounded-lg hover:bg-burgundy/5 flex-shrink-0 active:scale-90"
                              aria-label={`Remove ${item.name}`}
                            >
                              <X size={13} />
                            </button>
                          </div>
                          <p className="font-sans text-[7px] tracking-[0.25em] uppercase text-burgundy/25">
                            Boutique Selection
                          </p>
                        </div>

                        <div className="flex items-end justify-between mt-3 gap-2">
                          {/* Quantity Controls */}
                          <div className="flex items-center border border-burgundy/10 bg-white rounded-lg overflow-hidden">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-burgundy/5 transition-colors disabled:opacity-20 active:bg-burgundy/10"
                              disabled={item.quantity <= 1}
                              aria-label="Decrease quantity"
                            >
                              <Minus size={10} />
                            </button>
                            <span className="w-7 sm:w-8 h-7 sm:h-8 flex items-center justify-center font-sans text-[11px] font-medium text-burgundy/60 border-x border-burgundy/5">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-burgundy/5 transition-colors active:bg-burgundy/10"
                              aria-label="Increase quantity"
                            >
                              <Plus size={10} />
                            </button>
                          </div>
                          {/* Price */}
                          <p className="font-sans text-sm sm:text-base font-light text-burgundy italic whitespace-nowrap">
                            {item.price} JOD
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>

          {/* Footer / Checkout */}
          {items.length > 0 && (
            <div className="flex-shrink-0 px-5 sm:px-7 py-5 sm:py-6 bg-white border-t border-burgundy/8 space-y-5 sm:space-y-6">
              {/* Pricing Summary */}
              <div className="space-y-2.5">
                <div className="flex justify-between text-[10px] tracking-widest uppercase text-burgundy/40">
                  <span>Subtotal</span>
                  <span className="text-burgundy font-medium tracking-normal">
                    {total} JOD
                  </span>
                </div>
                <div className="flex justify-between text-[10px] tracking-widest uppercase text-burgundy/40">
                  <span>Shipping</span>
                  <span className="text-burgundy/60 font-medium tracking-normal">
                    Calculated later
                  </span>
                </div>
                <Separator className="my-4 bg-burgundy/5" />
                <div className="flex justify-between items-baseline font-serif">
                  <span className="text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase text-burgundy/50">
                    Total
                  </span>
                  <span className="text-xl sm:text-2xl font-bold text-burgundy tabular-nums">
                    {total} JOD
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid gap-3">
                <SheetClose asChild>
                  <Link href={route("checkout.index")} className="w-full">
                    <Button className="w-full rounded-xl h-12 sm:h-14 bg-burgundy hover:bg-burgundy/90 text-white text-[10px] tracking-[0.3em] sm:tracking-[0.35em] uppercase font-bold flex items-center justify-center gap-2.5 group/btn active:scale-[0.98] transition-all shadow-lg shadow-burgundy/15">
                      Complete Purchase
                      <ArrowRight
                        size={15}
                        className="transition-transform duration-300 group-hover/btn:translate-x-1.5"
                      />
                    </Button>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Button
                    variant="ghost"
                    className="w-full rounded-xl h-10 sm:h-11 text-[9px] tracking-[0.25em] uppercase text-burgundy/40 hover:text-burgundy hover:bg-burgundy/5 bg-transparent active:bg-burgundy/8"
                  >
                    Continue Shopping
                  </Button>
                </SheetClose>
              </div>

              {/* Security Note */}
              <div className="flex items-center justify-center gap-2.5 opacity-20">
                <div className="h-px w-5 bg-current" />
                <p className="text-[7px] text-center uppercase tracking-[0.25em] font-light">
                  Cash on Delivery
                </p>
                <div className="h-px w-5 bg-current" />
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
