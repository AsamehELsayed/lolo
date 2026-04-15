import { Head } from "@inertiajs/react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductGrid from "@/components/ProductGrid";
import CategorySection from "@/components/CategorySection";
import FeaturedCollection from "@/components/FeaturedCollection";
import LuxuryImageSection from "@/components/LuxuryImageSection";
import Footer from "@/components/Footer";

interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string;
    image_path?: string | null;
}

interface Product {
    id: number;
    name: string;
    description: string;
    price: string | number;
    discount_percentage: number;
    discounted_price: number;
    image_path: string | null;
    front_image_path: string | null;
    back_image_path: string | null;
    images?: { id: number; image_path: string; is_primary: boolean }[];
    is_featured?: boolean;
    is_bestseller?: boolean;
}

interface IndexProps {
    products: Product[];
    categories: Category[];
}

const Index = ({ products, categories }: IndexProps) => {
    return (
        <>
            <Head title="LOLO BRAND | Luxury Bags, Redefined Elegance" />
            <div className="min-h-screen bg-background">
                <Navbar isHome={true} />
                <HeroSection />
                <CategorySection categories={categories} />
                <ProductGrid products={products} />
                <FeaturedCollection products={products.filter((p: Product) => p.is_featured)} />
                <LuxuryImageSection />
                <Footer />
            </div>
        </>
    );
};

export default Index;
