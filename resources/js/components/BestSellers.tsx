import ProductCard from "./ProductCard";
import bag1 from "@/assets/bag1.jpg";
import bag3 from "@/assets/bag3.jpg";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";

interface Product {
    id: number;
    name: string;
    description?: string;
    price: string | number;
    image_path?: string | null;
    front_image_path?: string | null;
    back_image_path?: string | null;
    discount_percentage?: number;
    discounted_price?: number | string;
}

interface BestSellersProps {
    products: Product[];
}

const BestSellers = ({ products }: BestSellersProps) => {
    const ref = useScrollFadeIn();

    return (
        <section className="py-24 md:py-32 bg-background border-t border-muted/20">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div ref={ref} className="text-center mb-16 opacity-0 transition-all duration-1000 translate-y-8">
                    <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3">
                        Popular Demand
                    </p>
                    <hgroup>
                        <h2 className="font-serif text-3xl md:text-5xl tracking-wide text-foreground">
                            Best Sellers
                        </h2>
                    </hgroup>
                    <div className="w-12 h-px bg-primary mx-auto mt-6" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {products && products.length > 0 ? (
                        products.map((p) => (
                            <ProductCard 
                                key={p.id} 
                                id={p.id}
                                image={p.front_image_path || p.image_path || ''} 
                                name={p.name} 
                                price={typeof p.price === 'string' ? parseFloat(p.price) : p.price} 
                                discount_percentage={p.discount_percentage}
                                discounted_price={typeof p.discounted_price === 'string' ? parseFloat(p.discounted_price as string) : p.discounted_price}
                                category={(p as any).category?.name}
                            />
                        ))
                    ) : (
                        <div className="col-span-full py-12 text-center text-muted-foreground italic opacity-50">
                            Our best sellers are currently on their way.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default BestSellers;
