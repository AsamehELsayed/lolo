import ProductCard from "./ProductCard";
import bag1 from "@/assets/bag1.jpg";
import bag2 from "@/assets/bag2.jpg";
import bag3 from "@/assets/bag3.jpg";
import bag4 from "@/assets/bag4.jpg";
import bag5 from "@/assets/bag5.jpg";
import bag6 from "@/assets/bag6.jpg";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";

interface Product {
    id: number;
    name: string;
    description?: string;
    price: string | number;
    image_path?: string | null;
    front_image_path?: string | null;
    back_image_path?: string | null;
}

interface ProductGridProps {
    products: Product[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
    const ref = useScrollFadeIn();

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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
                {products && products.length > 0 ? (
                    products.map((p) => (
                        <ProductCard 
                            key={p.id} 
                            id={p.id}
                            image={p.front_image_path || p.image_path || ''} 
                            name={p.name} 
                            price={typeof p.price === 'string' ? parseFloat(p.price) : p.price} 
                            category={(p as any).category?.name}
                        />
                    ))
                ) : (
                    <div className="col-span-full text-center py-20 text-muted-foreground italic">
                        Our collection is currently undergoing a private curation. Please check back soon.
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProductGrid;
