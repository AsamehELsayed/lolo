import { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import { ShoppingBag, Menu, X, ChevronRight, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AppLogo from "./AppLogo";
import CartSheet from "./CartSheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const Navbar = ({ isHome = false }: { isHome?: boolean }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { url } = usePage();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { name: "Collection", href: route("products.index") },
    { name: "Best Sellers", href: "/#bestsellers" },
  ];

  const LanguageSwitcher = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 rounded-xl text-burgundy/60 hover:text-burgundy hover:bg-burgundy/5 transition-all">
          <Globe size={20} strokeWidth={1.5} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white border-burgundy/10">
        <DropdownMenuItem asChild>
          <Link href={route('set-locale', { locale: 'en' })} className="cursor-pointer">English</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={route('set-locale', { locale: 'ar' })} className="cursor-pointer text-right w-full">العربية</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-burgundy/8 py-2.5 md:py-3 shadow-[0_1px_12px_rgba(0,0,0,0.04)]"
          : "bg-white py-3 md:py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Mobile Layout */}
        <div className="flex md:hidden items-center justify-between">
          {/* Left: Hamburger */}
          <div className="w-10">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <button
                  className="p-2 -ml-2 rounded-xl transition-all active:scale-90 text-burgundy hover:bg-burgundy/5"
                  aria-label="Open menu"
                >
                  <Menu size={22} strokeWidth={1.5} />
                </button>
              </SheetTrigger>
              <SheetContent
                side="left"
                hideDefaultClose
                className="w-[85vw] max-w-[320px] p-0 flex flex-col border-none bg-white shadow-2xl"
              >
                <div className="flex flex-col h-full text-burgundy">
                  {/* Menu Header */}
                  <SheetHeader className="px-5 py-5 border-b border-burgundy/8 bg-white">
                    <div className="flex items-center justify-between">
                      <AppLogo
                        showText={true}
                        className="scale-[0.85] origin-left"
                      />
                      <SheetTitle className="sr-only">Menu</SheetTitle>
                      <SheetClose asChild>
                        <button className="p-2.5 rounded-xl text-burgundy/40 hover:text-burgundy hover:bg-burgundy/5 transition-all active:scale-90">
                          <X size={20} strokeWidth={1.5} />
                        </button>
                      </SheetClose>
                    </div>
                  </SheetHeader>

                  {/* Menu Links */}
                  <div className="flex-1 overflow-y-auto px-5 py-8 scrollbar-hide">
                    <p className="text-[9px] tracking-[0.4em] uppercase text-burgundy/30 mb-6 font-medium pl-1">
                      Navigation
                    </p>
                    <div className="space-y-1">
                      {navLinks.map((link, i) => (
                        <SheetClose asChild key={link.name}>
                          <Link
                            href={link.href}
                            className="flex items-center justify-between py-4 px-4 rounded-xl hover:bg-burgundy/[0.04] transition-all duration-300 active:bg-burgundy/[0.06] group/link"
                          >
                            <motion.span
                              initial={{ opacity: 0, x: -16 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                delay: 0.08 * i + 0.15,
                                duration: 0.4,
                                ease: "easeOut",
                              }}
                              className="font-serif text-2xl tracking-wider text-burgundy group-hover/link:translate-x-1 transition-transform duration-300"
                            >
                              {link.name}
                            </motion.span>
                            <ChevronRight
                              size={16}
                              className="opacity-0 group-hover/link:opacity-60 transition-all duration-300 text-burgundy/40 -translate-x-2 group-hover/link:translate-x-0"
                            />
                          </Link>
                        </SheetClose>
                      ))}
                    </div>

                    {/* Social Links */}
                    <div className="pt-8 mt-8 border-t border-burgundy/6">
                      <p className="text-[9px] tracking-[0.4em] uppercase text-burgundy/30 mb-5 font-medium pl-1">
                        Connect
                      </p>
                      <div className="grid grid-cols-2 gap-2.5">
                        {["Instagram", "Facebook", "WhatsApp", "Email"].map(
                          (social) => (
                            <a
                              key={social}
                              href="#"
                              className="text-[9px] tracking-[0.15em] uppercase text-burgundy/50 hover:text-burgundy transition-all py-3 px-3 rounded-xl bg-burgundy/[0.02] hover:bg-burgundy/[0.05] active:bg-burgundy/[0.08] text-center font-medium"
                            >
                              {social}
                            </a>
                          )
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Menu Footer */}
                  <div className="px-5 py-6 border-t border-burgundy/6 bg-burgundy/[0.015] mt-auto">
                    <p className="font-serif italic text-burgundy/70 text-lg tracking-wide text-center">
                      Redefined Elegance
                    </p>
                    <p className="text-[7px] tracking-[0.5em] uppercase text-burgundy/25 text-center mt-1.5">
                      © 2026 LOLO BRAND
                    </p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Center: Logo */}
          <div
            className={cn(
              "transition-transform duration-500",
              scrolled ? "scale-[0.85]" : "scale-[0.9]"
            )}
          >
            <AppLogo showText={!scrolled} />
          </div>

          {/* Right: Cart */}
          <div className="w-10 flex justify-end gap-2 items-center">
            <LanguageSwitcher />
            <CartSheet />
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between">
          {/* Left: Nav Links */}
          <div className="flex items-center gap-10 lg:gap-12">
            {navLinks.slice(0, 2).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative font-sans text-[10px] tracking-[0.3em] uppercase transition-colors group py-2 text-burgundy/60 hover:text-burgundy"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-full h-px origin-right transition-transform duration-500 scale-x-0 group-hover:scale-x-100 group-hover:origin-left bg-burgundy" />
              </Link>
            ))}
            <Link
              href="/#about"
              className="relative font-sans text-[10px] tracking-[0.3em] uppercase transition-colors group py-2 text-burgundy/60 hover:text-burgundy"
            >
              About
              <span className="absolute bottom-0 left-0 w-full h-px origin-right transition-transform duration-500 scale-x-0 group-hover:scale-x-100 group-hover:origin-left bg-burgundy" />
            </Link>
          </div>

          {/* Center: Logo */}
          <div
            className={cn(
              "transition-transform duration-500",
              scrolled ? "scale-90" : "scale-100"
            )}
          >
            <AppLogo showText={!scrolled} />
          </div>

          {/* Right: Nav Link + Cart */}
          <div className="flex items-center gap-10 lg:gap-12 pl-4">
             <LanguageSwitcher />
            <div className="text-burgundy">
              <CartSheet />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
