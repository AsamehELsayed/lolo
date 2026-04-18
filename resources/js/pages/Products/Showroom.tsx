import SEO from "@/components/SEO";
import { Link } from "@inertiajs/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

import ProductCard from "@/components/ProductCard";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Search, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuLabel, 
    DropdownMenuRadioGroup, 
    DropdownMenuRadioItem, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface Category {
    id: number;
    name: string;
}

interface Product {
    id: number;
    name: string;
    description?: string;
    price: string | number;
    discount_percentage: number;
    discounted_price: number;
    image_path?: string | null;
    front_image_path?: string | null;
    category?: Category;
}

interface Props {
    products: Product[];
    categories: Category[];
    initialCategory?: string;
}

export default function Showroom({ products, categories, initialCategory = "all" }: Props) {
    const fadeIn = useScrollFadeIn();
    const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("newest");

    const filteredProducts = useMemo(() => {
        let result = [...products];

        if (selectedCategory !== "all") {
            result = result.filter(p => p.category?.name === selectedCategory);
        }

        if (searchQuery) {
            result = result.filter(p => 
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                p.description?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (sortBy === "price-low") {
            result.sort((a, b) => Number(a.price) - Number(b.price));
        } else if (sortBy === "price-high") {
            result.sort((a, b) => Number(b.price) - Number(a.price));
        } else if (sortBy === "name") {
            result.sort((a, b) => a.name.localeCompare(b.name));
        }

        return result;
    }, [products, selectedCategory, searchQuery, sortBy]);

    return (
        <>
            <SEO title="Showroom" />
            <div className="min-h-screen bg-background">
                <Navbar />

                <main className="pt-32 pb-32">
                    <div className="max-w-7xl mx-auto px-6 md:px-12">
                        {/* Header Section */}
                        <div ref={fadeIn} className="text-center mb-20 opacity-0 transform translate-y-8 transition-all duration-1000">
                            <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-4">
                                The Collection
                            </p>
                            <h1 className="font-serif text-4xl md:text-6xl tracking-wide text-foreground mb-6">
                                The Showroom
                            </h1>
                            <div className="w-16 h-px bg-primary mx-auto mb-8" />
                            <p className="max-w-2xl mx-auto font-sans text-sm text-muted-foreground leading-relaxed">
                                Explore our curated selection of high-end handbags. Each piece is a testament to luxury craftsmanship and timeless design, meticulously created for those who define elegance.
                            </p>
                        </div>

                        {/* Filters & Controls */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16 pb-8 border-b border-muted/20">
                            {/* Categories */}
                            <div className="flex items-center gap-3 overflow-x-auto w-full md:w-auto pb-4 md:pb-0 scrollbar-none">
                                <button
                                    onClick={() => setSelectedCategory("all")}
                                    className={`px-6 py-2 text-[10px] tracking-[0.25em] uppercase font-medium transition-all duration-300 border ${
                                        selectedCategory === "all" 
                                            ? "bg-black text-white border-black" 
                                            : "bg-transparent text-muted-foreground border-transparent hover:border-muted/30"
                                    }`}
                                >
                                    All Pieces
                                </button>
                                {categories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setSelectedCategory(cat.name)}
                                        className={`px-6 py-2 text-[10px] tracking-[0.25em] uppercase font-medium transition-all duration-300 border ${
                                            selectedCategory === cat.name 
                                                ? "bg-black text-white border-black" 
                                                : "bg-transparent text-muted-foreground border-transparent hover:border-muted/30"
                                        }`}
                                    >
                                        {cat.name}
                                    </button>
                                ))}
                            </div>

                            {/* Search & Sort */}
                            <div className="flex items-center gap-4 w-full md:w-auto">
                                <div className="relative group flex-1 md:w-64">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground group-focus-within:text-foreground transition-colors" />
                                    <input
                                        type="text"
                                        placeholder="SEARCH PIECES..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-white border border-muted/30 py-2.5 pl-10 pr-10 text-[10px] tracking-widest uppercase focus:outline-none focus:border-black transition-all"
                                    />
                                    {searchQuery && (
                                        <button 
                                            onClick={() => setSearchQuery("")}
                                            className="absolute right-3 top-1/2 -translate-y-1/2"
                                        >
                                            <X size={12} className="text-muted-foreground hover:text-foreground" />
                                        </button>
                                    )}
                                </div>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="rounded-none border-muted/30 h-[42px] text-[10px] tracking-widest uppercase px-6 gap-2">
                                            Sort By <ChevronDown size={12} />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="rounded-none min-w-[200px]" align="end">
                                        <DropdownMenuLabel className="text-[10px] tracking-widest uppercase font-bold text-muted-foreground">Ordering</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                                            <DropdownMenuRadioItem value="newest" className="text-[10px] tracking-widest uppercase">Newest Arrivals</DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="name" className="text-[10px] tracking-widest uppercase">Alphabetical</DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="price-low" className="text-[10px] tracking-widest uppercase">Price: Low to High</DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="price-high" className="text-[10px] tracking-widest uppercase">Price: High to Low</DropdownMenuRadioItem>
                                        </DropdownMenuRadioGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>

                        {/* Product Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
                            <AnimatePresence mode="popLayout">
                                {filteredProducts.map((p) => (
                                    <motion.div
                                        key={p.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                    >
                                        <ProductCard 
                                            id={p.id}
                                            image={p.front_image_path || p.image_path || ''}
                                            name={p.name}
                                            price={typeof p.price === 'string' ? parseFloat(p.price) : p.price}
                                            discount_percentage={p.discount_percentage}
                                            discounted_price={p.discounted_price}
                                            category={p.category?.name}
                                        />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {filteredProducts.length === 0 && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-40 bg-cream/30 border border-dashed border-muted/40"
                            >
                                <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-6" strokeWidth={1} />
                                <h3 className="font-serif text-2xl text-foreground mb-3">No Pieces Found</h3>
                                <p className="text-muted-foreground font-sans text-sm italic">
                                    Our collection is unique and constantly evolving. Please adjust your criteria.
                                </p>
                                <Button 
                                    variant="link" 
                                    onClick={() => {setSelectedCategory("all"); setSearchQuery("");}}
                                    className="mt-6 text-[10px] tracking-widest uppercase text-primary underline-offset-8"
                                >
                                    Clear All Filters
                                </Button>
                            </motion.div>
                        )}
                    </div>
                </main>

                <Footer />
                <Toaster position="bottom-right" />
            </div>


            <style dangerouslySetInnerHTML={{ __html: `
                .scrollbar-none::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-none {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}} />
        </>
    );
}
