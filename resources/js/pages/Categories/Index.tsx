import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Plus, Edit, Trash2, Folder, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    image_path: string | null;
    products_count: number;
}

interface Props {
    categories: Category[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Categories', href: '/dashboard/categories' },
];

export default function Index({ categories }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Product Categories" />
            <div className="flex flex-col gap-8 p-6 md:p-8 animate-in fade-in duration-700">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-serif font-semibold text-burgundy tracking-tight">Product Categories</h1>
                        <p className="text-sm text-muted-foreground mt-1 text-pretty max-w-md">
                            Organize your luxury collections into distinct, manageable categories.
                        </p>
                    </div>
                    <Button asChild className="rounded-full bg-burgundy hover:bg-burgundy/90 text-white px-6 shadow-md transition-all active:scale-95 self-start md:self-auto">
                        <Link href={route('dashboard.categories.create')}>
                            <Plus className="mr-2 h-4 w-4" /> Add New Category
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {categories.map((category) => (
                        <div key={category.id} className="group relative flex flex-col bg-card rounded-2xl border border-muted/40 shadow-sm hover:shadow-2xl hover:border-burgundy/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                            <div className="relative aspect-square overflow-hidden bg-[#fdfbf9]">
                                {category.image_path ? (
                                    <img 
                                        src={category.image_path} 
                                        alt={category.name} 
                                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" 
                                    />
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground italic gap-3 bg-muted/20">
                                        <Layers className="opacity-10" size={48} strokeWidth={1} />
                                        <span className="text-[10px] uppercase tracking-[0.2em] font-medium opacity-40">No Image</span>
                                    </div>
                                )}
                                
                                <div className="absolute top-4 right-4 z-10">
                                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-burgundy rounded-full shadow-sm border border-burgundy/10">
                                        {category.products_count} Items
                                    </span>
                                </div>
                            </div>

                            <div className="p-6 flex flex-col gap-4 flex-1 bg-white">
                                <div className="flex flex-col gap-1.5">
                                    <h3 className="font-serif text-xl font-medium tracking-tight text-burgundy line-clamp-1 group-hover:text-black transition-colors">{category.name}</h3>
                                    <p className="text-xs text-muted-foreground/80 line-clamp-2 leading-relaxed h-8 font-light italic">
                                        {category.description || 'Define the essence of this collection.'}
                                    </p>
                                </div>
                                
                                <div className="flex gap-3 pt-4 mt-auto border-t border-muted/30">
                                    <Button variant="outline" size="sm" className="flex-1 rounded-full border-muted-foreground/10 hover:bg-burgundy hover:text-white transition-all duration-300 text-[11px] h-9 gap-2" asChild>
                                        <Link href={route('dashboard.categories.edit', category.id)}>
                                            <Edit className="h-3.5 w-3.5" /> Edit
                                        </Link>
                                    </Button>
                                    <Button variant="ghost" size="sm" className="flex-1 rounded-full text-destructive hover:bg-destructive/5 hover:text-destructive transition-all duration-300 text-[11px] h-9 gap-2" asChild>
                                        <Link href={route('dashboard.categories.destroy', category.id)} method="delete" as="button">
                                            <Trash2 className="h-3.5 w-3.5" /> Remove
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {categories.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-32 text-center border border-dashed rounded-[2rem] border-muted/50 bg-[#fdfbf9] transition-all hover:border-burgundy/20">
                        <div className="relative mb-8">
                            <div className="absolute inset-0 bg-burgundy/5 rounded-full scale-150 blur-2xl" />
                            <Folder size={64} className="text-burgundy/20 relative z-10" strokeWidth={1} />
                        </div>
                        <h2 className="text-3xl font-serif font-medium text-burgundy tracking-tight">No categories yet</h2>
                        <p className="text-sm text-muted-foreground/60 max-w-sm mx-auto mt-4 leading-relaxed italic">
                            Create your first category to begin organizing your exquisite handbag collection.
                        </p>
                        <Button asChild className="mt-10 rounded-full bg-burgundy hover:bg-burgundy/90 text-white px-10 py-6 h-auto shadow-xl transition-all hover:scale-105 active:scale-95">
                            <Link href={route('dashboard.categories.create')}>
                                <Plus className="mr-2 h-5 w-5" /> Add First Category
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
