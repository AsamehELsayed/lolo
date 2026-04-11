import ProductCard from "./ProductCard";
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

interface FeaturedCollectionProps {
    products: Product[];
}

const FeaturedCollection = ({ products }: FeaturedCollectionProps) => {
    const ref = useScrollFadeIn();

    return (
        <section className="bg-cream py-24 md:py-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div ref={ref} className="text-center mb-16 opacity-0 transition-all duration-1000 translate-y-8">
                    <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3">
                        Curated Selection
                    </p>
                    <h2 className="font-serif text-3xl md:text-5xl tracking-wide text-foreground">
                        Featured Pieces
                    </h2>
                    <div className="w-12 h-px bg-primary mx-auto mt-6" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
                        <div className="col-span-full py-12 text-center text-muted-foreground italic opacity-50">
                            Our seasonal favorites are coming soon.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default FeaturedCollection;
