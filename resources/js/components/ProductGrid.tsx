import ProductCard from "./ProductCard";
import { Link } from "@inertiajs/react";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";

interface Product {
    id: number;
    name: string;
    description?: string;
    price: string | number;
    discount_percentage?: number;
    discounted_price?: number;
    image_path?: string | null;
    front_image_path?: string | null;
    back_image_path?: string | null;
}

interface ProductGridProps {
    products: Product[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
    const ref = useScrollFadeIn();
    const displayProducts = products.slice(0, 6);

    return (
        <section id="collection" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
            <div ref={ref} className="text-center mb-16 opacity-0 transition-all duration-1000 translate-y-8">
                <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3">
                    New Arrivals
                </p>
                <hgroup>
                    <h2 className="font-serif text-3xl md:text-4xl tracking-wide text-foreground">
                        The Collection
                    </h2>
                </hgroup>
                <div className="w-12 h-px bg-primary mx-auto mt-6" />
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-x-8 md:gap-y-14 mb-16">
                {displayProducts && displayProducts.length > 0 ? (
                    displayProducts.map((p) => (
                        <ProductCard 
                            key={p.id} 
                            id={p.id}
                            image={p.front_image_path || p.image_path || ''} 
                            name={p.name} 
                            price={typeof p.price === 'string' ? parseFloat(p.price) : p.price} 
                            discount_percentage={p.discount_percentage}
                            discounted_price={p.discounted_price}
                            category={(p as any).category?.name}
                        />
                    ))
                ) : (
                    <div className="col-span-full text-center py-20 text-muted-foreground italic">
                        Our collection is currently undergoing a private curation. Please check back soon.
                    </div>
                )}
            </div>

            {products.length > 6 && (
                <div className="flex justify-center">
                    <Link 
                        href={route('products.index')}
                        className="group relative px-12 py-4 overflow-hidden"
                    >
                        <div className="absolute inset-x-0 bottom-0 h-px bg-foreground/20 group-hover:bg-primary transition-colors duration-500" />
                        <span className="relative font-sans text-[10px] tracking-[0.4em] uppercase text-foreground group-hover:text-primary transition-colors duration-500">
                            See More
                        </span>
                    </Link>
                </div>
            )}
        </section>
    );
};

export default ProductGrid;
