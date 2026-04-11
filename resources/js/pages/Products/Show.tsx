import { Head, Link } from "@inertiajs/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heart, ShoppingBag, Share2, Plus, Minus, Check, ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";
import { Toaster, toast } from "@/components/ui/sonner";

interface ProductImage {
    id: number;
    image_path: string;
    is_primary: boolean;
}

interface Category {
    id: number;
    name: string;
}

interface Product {
    id: number;
    name: string;
    description: string;
    price: string | number;
    category?: Category;
    images?: ProductImage[];
    front_image_path?: string;
}

interface ShowProps {
    product: Product;
    relatedProducts: Product[];
}

const Show = ({ product, relatedProducts }: ShowProps) => {
    const allImages = product.images && product.images.length > 0 
        ? product.images 
        : [{ id: 0, image_path: product.front_image_path || '', is_primary: true }];
    
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);
    const sectionRef = useScrollFadeIn();

    const handleAddToCart = () => {
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const handleShare = async () => {
        const shareData = {
            title: `${product.name} | LOLO BRAND`,
            text: product.description || `Check out the ${product.name} at LOLO BRAND`,
            url: window.location.href,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
                toast.success("Shared successfully!");
            } else {
                await navigator.clipboard.writeText(window.location.href);
                toast.success("Link copied to clipboard!");
            }
        } catch (err) {
            if ((err as Error).name !== 'AbortError') {
                console.error('Error sharing:', err);
                // Fallback to clipboard if share failed for other reasons
                try {
                    await navigator.clipboard.writeText(window.location.href);
                    toast.success("Link copied to clipboard!");
                } catch (clipErr) {
                    toast.error("Failed to copy link.");
                }
            }
        }
    };

    // Ensure we start with white navbar but it transitions correctly
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Head title={`${product.name} | LOLO BRAND`} />
            <div className="min-h-screen bg-background">
                <Navbar />

                <main className="pt-24 pb-32">
                    <div className="max-w-7xl mx-auto px-6 md:px-12">
                        {/* Breadcrumbs */}
                        <div className="mb-12">
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem>
                                        <Link href={route('home')} className="text-muted-foreground hover:text-foreground transition-colors uppercase text-[10px] tracking-[0.2em]">
                                            Home
                                        </Link>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <span className="text-muted-foreground uppercase text-[10px] tracking-[0.2em]">Collection</span>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage className="text-foreground font-medium uppercase text-[10px] tracking-[0.2em]">
                                            {product.name}
                                        </BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24">
                            {/* Left: Image Gallery */}
                            <div className="lg:col-span-7 flex flex-col gap-6">
                                <div className="relative aspect-[4/5] bg-cream overflow-hidden group">
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={activeImageIndex}
                                            src={allImages[activeImageIndex].image_path}
                                            alt={product.name}
                                            initial={{ opacity: 0, scale: 1.05 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                            className="w-full h-full object-cover"
                                        />
                                    </AnimatePresence>

                                    {/* Navigation Arrows for Mobile Gallery */}
                                    {allImages.length > 1 && (
                                        <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <button 
                                                onClick={() => setActiveImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))}
                                                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors"
                                            >
                                                <ArrowLeft size={18} />
                                            </button>
                                            <button 
                                                onClick={() => setActiveImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))}
                                                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors"
                                            >
                                                <ArrowRight size={18} />
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Thumbnails */}
                                {allImages.length > 1 && (
                                    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
                                        {allImages.map((image, index) => (
                                            <button
                                                key={image.id || index}
                                                onClick={() => setActiveImageIndex(index)}
                                                className={`relative w-24 aspect-[4/5] bg-cream flex-shrink-0 transition-all duration-300 ${
                                                    activeImageIndex === index 
                                                        ? "ring-1 ring-primary p-0.5" 
                                                        : "opacity-60 hover:opacity-100"
                                                }`}
                                            >
                                                <img 
                                                    src={image.image_path} 
                                                    alt={`${product.name} view ${index + 1}`} 
                                                    className="w-full h-full object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Right: Product Details */}
                            <div className="lg:col-span-5 flex flex-col h-fit lg:sticky lg:top-32">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    {product.category && (
                                        <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-4">
                                            {product.category.name}
                                        </p>
                                    )}
                                    <h1 className="font-serif text-4xl lg:text-5xl tracking-wide text-foreground mb-4">
                                        {product.name}
                                    </h1>
                                    <p className="font-serif text-2xl text-foreground/80 mb-8">
                                        {product.price} JOD
                                    </p>

                                    <div className="w-10 h-px bg-primary mb-8" />

                                    <p className="font-sans text-sm leading-relaxed text-muted-foreground mb-10 whitespace-pre-line">
                                        {product.description || "The LOLO BRAND collection represents the pinnacle of luxury craftsmanship. Each piece is meticulously designed for the modern individual who values both heritage and innovation. Redefine your style with our signature handbags."}
                                    </p>

                                    {/* Action Section */}
                                    <div className="flex flex-col gap-6">
                                        <div className="flex items-center gap-6">
                                            <div className="flex items-center border border-muted/30">
                                                <button 
                                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                    className="w-12 h-12 flex items-center justify-center hover:bg-muted/5 transition-colors"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="w-12 h-12 flex items-center justify-center font-sans font-medium text-sm">
                                                    {quantity}
                                                </span>
                                                <button 
                                                    onClick={() => setQuantity(quantity + 1)}
                                                    className="w-12 h-12 flex items-center justify-center hover:bg-muted/5 transition-colors"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                            
                                            <Button 
                                                variant="outline" 
                                                size="icon" 
                                                className="w-12 h-12 rounded-none border-muted/30 hover:bg-red-50 hover:text-red-500 hover:border-red-500 transition-all duration-300"
                                            >
                                                <Heart size={18} strokeWidth={1.5} />
                                            </Button>

                                            <Button 
                                                variant="outline" 
                                                size="icon" 
                                                onClick={handleShare}
                                                className="w-12 h-12 rounded-none border-muted/30 hover:bg-primary/5 transition-all duration-300"
                                                title="Share product"
                                            >
                                                <Share2 size={18} strokeWidth={1.5} />
                                            </Button>
                                        </div>

                                        <Button 
                                            onClick={handleAddToCart}
                                            className={`h-14 rounded-none text-xs tracking-[0.3em] uppercase font-bold transition-all duration-500 ${
                                                isAdded ? "bg-green-600 hover:bg-green-700" : "bg-black hover:bg-black/90"
                                            }`}
                                        >
                                            {isAdded ? (
                                                <span className="flex items-center gap-2 text-white">
                                                    <Check size={16} /> Added to Bag
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-2 text-white">
                                                    Add to Bag – {product.price} JOD
                                                </span>
                                            )}
                                        </Button>
                                    </div>

                                </motion.div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Related Products */}
                {relatedProducts && relatedProducts.length > 0 && (
                    <section ref={sectionRef} className="py-32 bg-cream border-t border-muted/10 opacity-0 transform translate-y-8 transition-all duration-1000">
                        <div className="max-w-7xl mx-auto px-6 md:px-12">
                            <div className="text-center mb-16">
                                <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3">
                                    You Might Also Like
                                </p>
                                <h2 className="font-serif text-3xl md:text-5xl tracking-wide text-foreground">
                                    Recommended Pieces
                                </h2>
                                <div className="w-12 h-px bg-primary mx-auto mt-6" />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {relatedProducts.map((p) => (
                                    <ProductCard 
                                        key={p.id} 
                                        id={p.id}
                                        image={p.front_image_path || ''} 
                                        name={p.name} 
                                        price={typeof p.price === 'string' ? parseFloat(p.price) : p.price} 
                                        category={p.category?.name}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                )}

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
};

export default Show;
