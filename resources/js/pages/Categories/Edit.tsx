import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Loader2, Upload, X, Layers } from 'lucide-react';
import { useState } from 'react';

interface Category {
    id: number;
    name: string;
    description: string | null;
    image_path: string | null;
}

interface Props {
    category: Category;
}

export default function Edit({ category }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: category.name || '',
        description: category.description || '',
        image: null as File | null,
        _method: 'put',
    });

    const [preview, setPreview] = useState<string | null>(category.image_path);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Categories', href: '/dashboard/categories' },
        { title: `Edit ${category.name}`, href: `/dashboard/categories/${category.id}/edit` },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Laravel requires POST with _method=PUT for multipart forms (file uploads)
        post(route('dashboard.categories.update', category.id));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${category.name}`} />
            <div className="flex flex-col gap-8 p-6 md:p-8 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild className="rounded-full hover:bg-burgundy/5">
                        <Link href={route('dashboard.categories.index')}>
                            <ArrowLeft className="h-5 w-5 text-burgundy" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-serif font-semibold text-burgundy tracking-tight">Refine Collection</h1>
                        <p className="text-sm text-muted-foreground mt-1 italic font-light">Evolve the essence of your masterpieces.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="grid gap-8">
                    <div className="bg-white rounded-3xl border border-muted/40 shadow-xl overflow-hidden p-8">
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name" className="text-burgundy font-medium px-1 uppercase tracking-widest text-[10px]">Collection Name</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="e.g., Signature Totes"
                                    className="rounded-xl border-muted-foreground/20 focus-visible:ring-burgundy/20 focus-visible:border-burgundy h-12 text-base font-serif"
                                />
                                {errors.name && <p className="text-xs text-destructive mt-1 px-1 font-medium italic">{errors.name}</p>}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description" className="text-burgundy font-medium px-1 uppercase tracking-widest text-[10px]">Aesthetic Essence</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Describe the philosophy and details of this collection..."
                                    className="rounded-xl border-muted-foreground/20 focus-visible:ring-burgundy/20 focus-visible:border-burgundy min-h-[120px] resize-none text-base font-light italic leading-relaxed"
                                />
                                {errors.description && <p className="text-xs text-destructive mt-1 px-1 font-medium italic">{errors.description}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-muted/40 shadow-xl overflow-hidden p-8">
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label className="text-burgundy font-medium px-1 uppercase tracking-widest text-[10px]">Collection Visual</Label>
                                <div className="relative group">
                                    <div className={cn(
                                        "relative aspect-[2/1] rounded-2xl border-2 border-dashed transition-all duration-500 overflow-hidden",
                                        preview ? "border-burgundy/20" : "border-muted-foreground/20 hover:border-burgundy/40",
                                        "bg-[#fdfbf9]"
                                    )}>
                                        {preview ? (
                                            <>
                                                <img src={preview} alt="Preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                                <button
                                                    type="button"
                                                    onClick={() => { setPreview(null); setData('image', null); }}
                                                    className="absolute top-4 right-4 p-2 bg-black/60 backdrop-blur-md text-white rounded-full hover:bg-burgundy transition-all active:scale-90 z-20"
                                                >
                                                    <X size={16} />
                                                </button>
                                            </>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center h-full p-6 text-center group-hover:bg-burgundy/[0.02] transition-colors">
                                                <div className="mb-4 relative">
                                                    <div className="absolute inset-0 bg-burgundy/5 rounded-full scale-150 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    <Layers className="h-12 w-12 text-burgundy/20 group-hover:text-burgundy/40 transition-colors relative z-10" strokeWidth={1} />
                                                </div>
                                                <p className="text-sm font-medium text-burgundy tracking-tight">Select Collection Cover</p>
                                                <p className="text-xs text-muted-foreground/60 mt-1 italic font-light">Recommended: 1200 x 600px, premium quality</p>
                                                <input
                                                    type="file"
                                                    onChange={handleImageChange}
                                                    accept="image/*"
                                                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                                />
                                            </div>
                                        )}
                                    </div>
                                    {errors.image && <p className="text-xs text-destructive mt-2 px-1 font-medium italic">{errors.image}</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pb-12">
                        <Button
                            type="button"
                            variant="ghost"
                            className="rounded-full px-8 text-muted-foreground hover:bg-muted/10 font-medium"
                            asChild
                        >
                            <Link href={route('dashboard.categories.index')}>Cancel</Link>
                        </Button>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="rounded-full bg-burgundy hover:bg-burgundy/90 text-white px-10 h-12 shadow-xl shadow-burgundy/10 transition-all hover:scale-105 active:scale-95 disabled:opacity-70"
                        >
                            {processing ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
                                </>
                            ) : (
                                "Update Collection"
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
