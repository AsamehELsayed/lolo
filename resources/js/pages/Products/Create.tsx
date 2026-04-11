import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { UploadCloud, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface Category {
    id: number;
    name: string;
}

interface Props {
    categories: Category[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Products', href: '/dashboard/products' },
    { title: 'Add Product', href: '/dashboard/products/create' },
];

export default function Create({ categories }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        price: '',
        category_id: '' as string | number,
        front_image: null as File | null,
        back_image: null as File | null,
        images: [] as File[],
        is_featured: false,
        is_bestseller: false,
    });

    const [frontPreview, setFrontPreview] = useState<string | null>(null);
    const [backPreview, setBackPreview] = useState<string | null>(null);
    const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'front_image' | 'back_image' | 'images') => {
        if (field === 'images') {
            const files = Array.from(e.target.files || []);
            setData('images', [...data.images, ...files]);

            files.forEach((file) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setGalleryPreviews((prev) => [...prev, reader.result as string]);
                };
                reader.readAsDataURL(file);
            });
            return;
        }

        const file = e.target.files?.[0] || null;
        setData(field, file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (field === 'front_image') setFrontPreview(reader.result as string);
                else setBackPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            if (field === 'front_image') setFrontPreview(null);
            else setBackPreview(null);
        }
    };

    const removeImage = (field: 'front_image' | 'back_image') => {
        setData(field, null);
        if (field === 'front_image') setFrontPreview(null);
        else setBackPreview(null);
    };

    const removeGalleryImage = (index: number) => {
        const newImages = [...data.images];
        newImages.splice(index, 1);
        setData('images', newImages);

        const newPreviews = [...galleryPreviews];
        newPreviews.splice(index, 1);
        setGalleryPreviews(newPreviews);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // @ts-ignore - route helper is available globablly via ziggy
        post(route('dashboard.products.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Product" />
            <div className="max-w-4xl mx-auto p-6 md:p-8 animate-in fade-in duration-500">
                <div className="mb-8">
                    <h1 className="text-3xl font-serif font-semibold text-burgundy">Add New Handbag</h1>
                    <p className="text-muted-foreground mt-1">Fill in the details to add a new luxury item to your collection.</p>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-card p-6 rounded-2xl border shadow-sm space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-sm font-medium">
                                    Product Name
                                </Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="rounded-lg h-11"
                                    placeholder="e.g. Classic Burgundy Tote"
                                />
                                {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-sm font-medium">
                                    Description
                                </Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="min-h-[150px] rounded-lg resize-none"
                                    placeholder="Describe the material, craftmanship, and style..."
                                />
                                {errors.description && <p className="text-xs text-destructive">{errors.description}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="price" className="text-sm font-medium">
                                        Price ($)
                                    </Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        step="0.01"
                                        value={data.price}
                                        onChange={(e) => setData('price', e.target.value)}
                                        className="rounded-lg h-11"
                                        placeholder="0.00"
                                    />
                                    {errors.price && <p className="text-xs text-destructive">{errors.price}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="category_id" className="text-sm font-medium">
                                        Collection
                                    </Label>
                                    <div className="relative">
                                        <select
                                            id="category_id"
                                            value={data.category_id}
                                            onChange={(e) => setData('category_id', e.target.value)}
                                            className="flex h-11 w-full items-center justify-between rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 appearance-none transition-all hover:bg-muted/30"
                                        >
                                            <option value="">Select Collection</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                                    </div>
                                    {errors.category_id && <p className="text-xs text-destructive">{errors.category_id}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 pt-2">
                            <Button
                                type="submit"
                                disabled={processing}
                                className="h-11 px-8 rounded-full bg-burgundy hover:bg-burgundy/90 text-white shadow-lg transition-all active:scale-95"
                            >
                                {processing ? 'Creating...' : 'Save Handbag'}
                            </Button>
                            <Button variant="ghost" asChild className="h-11 px-6 rounded-full hover:bg-muted">
                                {/* @ts-ignore - route helper is available globablly via ziggy */}
                                <Link href={route('dashboard.products.index')}>Cancel</Link>
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-card p-6 rounded-2xl border shadow-sm space-y-6">
                            <Label className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">Product Photos</Label>

                            {/* Front Image */}
                            <div className="space-y-3">
                                <Label className="text-xs font-medium text-muted-foreground">Front View</Label>
                                <div
                                    className={cn(
                                        'relative group aspect-[4/5] rounded-xl border-2 border-dashed flex flex-col items-center justify-center transition-all overflow-hidden',
                                        frontPreview ? 'border-solid border-border' : 'border-muted-foreground/20 hover:border-burgundy/50 hover:bg-blush/5',
                                    )}
                                >
                                    {frontPreview ? (
                                        <>
                                            <img src={frontPreview} className="w-full h-full object-cover" alt="Front Preview" />
                                            <button
                                                type="button"
                                                onClick={() => removeImage('front_image')}
                                                className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-burgundy"
                                            >
                                                <X size={16} />
                                            </button>
                                        </>
                                    ) : (
                                        <div className="flex flex-col items-center gap-2 p-4 text-center cursor-pointer relative">
                                            <input
                                                type="file"
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                                onChange={(e) => handleFileChange(e, 'front_image')}
                                                accept="image/*"
                                            />
                                            <UploadCloud className="text-muted-foreground" size={24} />
                                            <span className="text-xs text-muted-foreground">Upload front photo</span>
                                        </div>
                                    )}
                                </div>
                                {errors.front_image && <p className="text-xs text-destructive">{errors.front_image}</p>}
                            </div>

                            {/* Back Image */}
                            <div className="space-y-3">
                                <Label className="text-xs font-medium text-muted-foreground">Back View</Label>
                                <div
                                    className={cn(
                                        'relative group aspect-[4/5] rounded-xl border-2 border-dashed flex flex-col items-center justify-center transition-all overflow-hidden',
                                        backPreview ? 'border-solid border-border' : 'border-muted-foreground/20 hover:border-burgundy/50 hover:bg-blush/5',
                                    )}
                                >
                                    {backPreview ? (
                                        <>
                                            <img src={backPreview} className="w-full h-full object-cover" alt="Back Preview" />
                                            <button
                                                type="button"
                                                onClick={() => removeImage('back_image')}
                                                className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-burgundy"
                                            >
                                                <X size={16} />
                                            </button>
                                        </>
                                    ) : (
                                        <div className="flex flex-col items-center gap-2 p-4 text-center cursor-pointer relative">
                                            <input
                                                type="file"
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                                onChange={(e) => handleFileChange(e, 'back_image')}
                                                accept="image/*"
                                            />
                                            <UploadCloud className="text-muted-foreground" size={24} />
                                            <span className="text-xs text-muted-foreground">Upload back photo</span>
                                        </div>
                                    )}
                                </div>
                                {errors.back_image && <p className="text-xs text-destructive">{errors.back_image}</p>}
                            </div>

                            {/* Gallery Images */}
                            <div className="space-y-3 pt-4 border-t">
                                <Label className="text-sm font-semibold">Gallery Images</Label>
                                <div className="grid grid-cols-2 gap-3">
                                    {galleryPreviews.map((preview, index) => (
                                        <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border">
                                            <img src={preview} className="w-full h-full object-cover" alt={`Gallery ${index}`} />
                                            <button
                                                type="button"
                                                onClick={() => removeGalleryImage(index)}
                                                className="absolute top-1 right-1 p-1 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive"
                                            >
                                                <X size={12} />
                                            </button>
                                        </div>
                                    ))}
                                    <div className="relative aspect-square rounded-lg border-2 border-dashed border-muted-foreground/20 flex flex-col items-center justify-center hover:bg-muted/50 transition-colors cursor-pointer">
                                        <input
                                            type="file"
                                            multiple
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            onChange={(e) => handleFileChange(e, 'images')}
                                            accept="image/*"
                                        />
                                        <UploadCloud size={20} className="text-muted-foreground" />
                                        <span className="text-[10px] text-muted-foreground mt-1 text-center px-2">Add Gallery Photos</span>
                                    </div>
                                </div>
                                {errors.images && <p className="text-xs text-destructive">{errors.images}</p>}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
