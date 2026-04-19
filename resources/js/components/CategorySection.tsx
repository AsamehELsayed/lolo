import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string;
    image_path?: string | null;
}

interface CategorySectionProps {
    categories: Category[];
}

const CategorySection = ({ categories }: CategorySectionProps) => {
    if (!categories || categories.length === 0) return null;

    // Use route function if it exists, otherwise fallback to simple string
    const getProductIndexRoute = (slug: string) => {
        try {
            return (window as any).route ? (window as any).route('products.index', { category: slug }) : `/products?category=${slug}`;
        } catch (e) {
            return `/products?category=${slug}`;
        }
    };

    const getAllProductsRoute = () => {
        try {
            return (window as any).route ? (window as any).route('products.index') : '/products';
        } catch (e) {
            return '/products';
        }
    };

    return (
        <section className="bg-background py-24 md:py-32">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
                <header className="mb-16 md:mb-24 flex flex-col md:flex-row items-end justify-between border-b border-black/5 pb-12">
                    <div className="max-w-2xl">
                        <motion.span 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="font-sans text-[10px] tracking-[0.5em] uppercase text-muted-foreground block mb-6"
                        >
                            Curated Collections
                        </motion.span>
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="font-serif text-4xl md:text-7xl leading-[1.1] tracking-tight text-foreground"
                        >
                            Refining the <span className="italic font-light lowercase">Art of Choice</span>
                        </motion.h2>
                    </div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="mt-8 md:mt-0"
                    >
                        <Link 
                            href={getAllProductsRoute()}
                            className="group flex items-center gap-4 text-xs tracking-widest uppercase font-semibold text-foreground/70 hover:text-foreground transition-colors"
                        >
                            Browse All
                            <span className="w-12 h-[1px] bg-foreground/20 group-hover:w-20 transition-all duration-500" />
                        </Link>
                    </motion.div>
                </header>

                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-4">
                    {categories.map((category, idx) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="group relative aspect-[3/4] overflow-hidden"
                        >
                            <Link href={getProductIndexRoute(category.slug)} className="block w-full h-full">
                                <motion.img
                                    src={category.image_path || 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=1200'}
                                    alt={category.name}
                                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-105"
                                />
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-700" />
                                
                                {/* Content */}
                                <div className="absolute inset-x-8 bottom-12 z-10 transition-transform duration-700 translate-y-4 group-hover:translate-y-0">
                                    <h3 className="font-serif text-3xl md:text-4xl text-white mb-2 leading-none">
                                        {category.name}
                                    </h3>
                                    <p className="text-white/60 text-sm font-light max-w-[240px] mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2">
                                        {category.description}
                                    </p>
                                    <div className="flex items-center text-white/90 text-[10px] tracking-widest uppercase font-bold gap-3 group-hover:gap-5 transition-all duration-500">
                                        Discover
                                        <div className="w-20 h-[1px] bg-white/20 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-100" />
                                    </div>
                                </div>

                                {/* Shine Effect */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-1000 pointer-events-none bg-gradient-to-tr from-transparent via-white to-transparent -translate-x-full group-hover:translate-x-full duration-1500 ease-in-out" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategorySection;
