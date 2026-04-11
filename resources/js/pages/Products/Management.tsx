import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Plus, Edit, Trash2, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    image_path: string | null;
    front_image_path: string | null;
    back_image_path: string | null;
}

interface Props {
    products: Product[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Products', href: '/dashboard/products' },
];

export default function Management({ products }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Handbag Collection" />
            <div className="flex flex-col gap-8 p-6 md:p-8 animate-in fade-in duration-700">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-serif font-semibold text-burgundy tracking-tight">Luxury Handbags</h1>
                        <p className="text-sm text-muted-foreground mt-1 text-pretty max-w-md">
                            Curate and manage your high-end handbag catalog with multi-view perspectives.
                        </p>
                    </div>
                    <Button asChild className="rounded-full bg-burgundy hover:bg-burgundy/90 text-white px-6 shadow-md transition-all active:scale-95 self-start md:self-auto">
                        {/* @ts-ignore */}
                        <Link href={route('dashboard.products.create')}>
                            <Plus className="mr-2 h-4 w-4" /> Add New Item
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <div key={product.id} className="group relative flex flex-col bg-card rounded-2xl border border-muted/40 shadow-sm hover:shadow-2xl hover:border-burgundy/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                            {/* Modern Flip Effect Container */}
                            <div className="relative aspect-[4/5] overflow-hidden bg-[#fdfbf9]">
                                <div className="h-full w-full [perspective:1200px]">
                                    <div className={cn(
                                        "relative h-full w-full transition-all duration-700 [transform-style:preserve-3d]",
                                        product.back_image_path && "group-hover:[transform:rotateY(180deg)]"
                                    )}>
                                        {/* Front View */}
                                        <div className="absolute inset-0 h-full w-full [backface-visibility:hidden]">
                                            {product.front_image_path || product.image_path ? (
                                                <img 
                                                    src={product.front_image_path || product.image_path || ''} 
                                                    alt={product.name} 
                                                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" 
                                                />
                                            ) : (
                                                <div className="flex flex-col items-center justify-center h-full text-muted-foreground italic gap-3 bg-muted/20">
                                                    <ShoppingBag className="opacity-10" size={48} strokeWidth={1} />
                                                    <span className="text-[10px] uppercase tracking-[0.2em] font-medium opacity-40">Awaiting Visuals</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Back View (Pre-flipped) */}
                                        {product.back_image_path && (
                                            <div className="absolute inset-0 h-full w-full [transform:rotateY(180deg)] [backface-visibility:hidden]">
                                                <img 
                                                    src={product.back_image_path} 
                                                    alt={`${product.name} back`} 
                                                    className="object-cover w-full h-full" 
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                
                                {/* Status Badges */}
                                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                                    {(product as any).is_featured && (
                                        <span className="px-3 py-1 bg-burgundy text-white text-[9px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                                            Featured
                                        </span>
                                    )}
                                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[9px] font-bold uppercase tracking-widest text-burgundy rounded-full shadow-sm border border-burgundy/10">
                                        Handcrafted
                                    </span>
                                </div>
                            </div>

                            <div className="p-6 flex flex-col gap-4 flex-1 bg-white">
                                <div className="flex flex-col gap-1.5">
                                    <div className="flex justify-between items-start gap-2">
                                        <h3 className="font-serif text-xl font-medium tracking-tight text-burgundy line-clamp-1 group-hover:text-black transition-colors">{product.name}</h3>
                                    </div>
                                    <p className="text-xs text-muted-foreground/80 line-clamp-2 leading-relaxed h-8 font-light italic">{product.description || 'No description available for this exquisite piece.'}</p>
                                    <div className="mt-1">
                                        <span className="text-base font-semibold text-burgundy font-serif tracking-tight">${parseFloat(product.price).toLocaleString()}</span>
                                    </div>
                                </div>
                                
                                <div className="flex gap-3 pt-4 mt-auto border-t border-muted/30">
                                    <Button variant="outline" size="sm" className="flex-1 rounded-full border-muted-foreground/10 hover:bg-burgundy hover:text-white transition-all duration-300 text-[11px] h-9 gap-2" asChild>
                                        {/* @ts-ignore */}
                                        <Link href={route('dashboard.products.edit', product.id)}>
                                            <Edit className="h-3.5 w-3.5" /> Edit
                                        </Link>
                                    </Button>
                                    <Button variant="ghost" size="sm" className="flex-1 rounded-full text-destructive hover:bg-destructive/5 hover:text-destructive transition-all duration-300 text-[11px] h-9 gap-2" asChild>
                                        {/* @ts-ignore */}
                                        <Link href={route('dashboard.products.destroy', product.id)} method="delete" as="button">
                                            <Trash2 className="h-3.5 w-3.5" /> Remove
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {products.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-32 text-center border border-dashed rounded-[2rem] border-muted/50 bg-[#fdfbf9] transition-all hover:border-burgundy/20">
                        <div className="relative mb-8">
                            <div className="absolute inset-0 bg-burgundy/5 rounded-full scale-150 blur-2xl" />
                            <ShoppingBag size={64} className="text-burgundy/20 relative z-10" strokeWidth={1} />
                        </div>
                        <h2 className="text-3xl font-serif font-medium text-burgundy tracking-tight">The showroom is empty</h2>
                        <p className="text-sm text-muted-foreground/60 max-w-sm mx-auto mt-4 leading-relaxed italic">
                            Your luxury collection awaits its first masterpiece. Begin curating your high-end handbag catalog today.
                        </p>
                        <Button asChild className="mt-10 rounded-full bg-burgundy hover:bg-burgundy/90 text-white px-10 py-6 h-auto shadow-xl transition-all hover:scale-105 active:scale-95">
                            {/* @ts-ignore */}
                            <Link href={route('dashboard.products.create')}>
                                <Plus className="mr-2 h-5 w-5" /> Add First Item
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
