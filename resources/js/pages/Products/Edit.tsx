import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { UploadCloud, X, Save, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface Category {
    id: number;
    name: string;
}

interface ProductImage {
    id: number;
    image_path: string;
}

interface Product {
    id: number;
    name: string;
    description: string;
    price: string | number;
    image_path: string | null;
    front_image_path: string | null;
    back_image_path: string | null;
    is_featured: boolean;
    is_bestseller: boolean;
    category_id: number | null;
    images: ProductImage[];
}

interface Props {
    product: Product;
    categories: Category[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Products', href: '/dashboard/products' },
    { title: 'Edit Product', href: '#' },
];

export default function Edit({ product, categories }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'put',
        name: product.name,
        description: product.description || '',
        price: product.price,
        category_id: product.category_id || '',
        front_image: null as File | null,
        back_image: null as File | null,
        images: [] as File[],
        deleted_images: [] as number[],
        is_featured: product.is_featured,
        is_bestseller: product.is_bestseller,
    });

    const [frontPreview, setFrontPreview] = useState<string | null>(product.front_image_path || product.image_path);
    const [backPreview, setBackPreview] = useState<string | null>(product.back_image_path);
    const [newGalleryPreviews, setNewGalleryPreviews] = useState<string[]>([]);
    const [existingImages, setExistingImages] = useState(product.images || []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'front_image' | 'back_image' | 'images') => {
        if (field === 'images') {
            const files = Array.from(e.target.files || []);
            setData('images', [...data.images, ...files]);

            files.forEach((file) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setNewGalleryPreviews((prev) => [...prev, reader.result as string]);
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
        }
    };

    const removeImage = (field: 'front_image' | 'back_image') => {
        setData(field, null);
        if (field === 'front_image') setFrontPreview(null);
        else setBackPreview(null);
    };

    const removeNewGalleryImage = (index: number) => {
        const newImages = [...data.images];
        newImages.splice(index, 1);
        setData('images', newImages);

        const newPreviews = [...newGalleryPreviews];
        newPreviews.splice(index, 1);
        setNewGalleryPreviews(newPreviews);
    };

    const removeExistingImage = (imageId: number) => {
        setData('deleted_images', [...data.deleted_images, imageId]);
        setExistingImages(existingImages.filter(img => img.id !== imageId));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // @ts-ignore
        post(route('dashboard.products.update', product.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${product.name}`} />
            <div className="max-w-4xl mx-auto p-6 md:p-8 animate-in fade-in duration-500">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-serif font-semibold text-burgundy text-balance">Edit {product.name}</h1>
                        <p className="text-muted-foreground mt-1 text-sm">Update the handbag's details and photos.</p>
                    </div>
                    <Button variant="outline" asChild className="rounded-full">
                        {/* @ts-ignore */}
                        <Link href={route('dashboard.products.index')}>Back to List</Link>
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-card p-6 rounded-2xl border shadow-sm space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-sm font-medium">Product Name</Label>
                                <Input 
                                    id="name" 
                                    value={data.name} 
                                    onChange={(e) => setData('name', e.target.value)} 
                                    className="rounded-lg h-11"
                                />
                                {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-sm font-medium">Description</Label>
                                <Textarea 
                                    id="description" 
                                    value={data.description} 
                                    onChange={(e) => setData('description', e.target.value)} 
                                    className="min-h-[150px] rounded-lg resize-none"
                                />
                                {errors.description && <p className="text-xs text-destructive">{errors.description}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="price" className="text-sm font-medium">Price ($)</Label>
                                    <Input 
                                        id="price" 
                                        type="number" 
                                        step="0.01" 
                                        value={data.price} 
                                        onChange={(e) => setData('price', e.target.value)} 
                                        className="rounded-lg h-11"
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
                            <Button type="submit" disabled={processing} className="h-11 px-8 rounded-full bg-burgundy hover:bg-burgundy/90 text-white shadow-lg transition-all active:scale-95">
                                <Save className="mr-2 h-4 w-4" />
                                {processing ? 'Saving...' : 'Update Handbag'}
                            </Button>
                            <Button variant="ghost" asChild className="h-11 px-6 rounded-full hover:bg-muted">
                                {/* @ts-ignore */}
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
                                <div className={cn(
                                    "relative group aspect-[4/5] rounded-xl border-2 border-dashed flex flex-col items-center justify-center transition-all overflow-hidden",
                                    frontPreview ? "border-solid border-border" : "border-muted-foreground/20 hover:border-burgundy/50 hover:bg-blush/5"
                                )}>
                                    {frontPreview ? (
                                        <>
                                            <img src={frontPreview} className="w-full h-full object-cover" alt="Front Preview" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <Label className="cursor-pointer bg-white text-black px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-burgundy hover:text-white transition-colors">
                                                    Change Photo
                                                    <input 
                                                        type="file" 
                                                        className="hidden" 
                                                        onChange={(e) => handleFileChange(e, 'front_image')}
                                                        accept="image/*"
                                                    />
                                                </Label>
                                            </div>
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
                                <div className={cn(
                                    "relative group aspect-[4/5] rounded-xl border-2 border-dashed flex flex-col items-center justify-center transition-all overflow-hidden",
                                    backPreview ? "border-solid border-border" : "border-muted-foreground/20 hover:border-burgundy/50 hover:bg-blush/5"
                                )}>
                                    {backPreview ? (
                                        <>
                                            <img src={backPreview} className="w-full h-full object-cover" alt="Back Preview" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <Label className="cursor-pointer bg-white text-black px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-burgundy hover:text-white transition-colors">
                                                    Change Photo
                                                    <input 
                                                        type="file" 
                                                        className="hidden" 
                                                        onChange={(e) => handleFileChange(e, 'back_image')}
                                                        accept="image/*"
                                                    />
                                                </Label>
                                            </div>
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
                                    {/* Existing Images */}
                                    {existingImages.map((img) => (
                                        <div key={img.id} className="relative group aspect-square rounded-lg overflow-hidden border">
                                            <img src={img.image_path} className="w-full h-full object-cover" alt="Gallery" />
                                            <button
                                                type="button"
                                                onClick={() => removeExistingImage(img.id)}
                                                className="absolute top-1 right-1 p-1 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive"
                                            >
                                                <X size={12} />
                                            </button>
                                        </div>
                                    ))}
                                    
                                    {/* New Previews */}
                                    {newGalleryPreviews.map((preview, index) => (
                                        <div key={`new-${index}`} className="relative group aspect-square rounded-lg overflow-hidden border border-burgundy/30">
                                            <img src={preview} className="w-full h-full object-cover" alt="New Gallery" />
                                            <button
                                                type="button"
                                                onClick={() => removeNewGalleryImage(index)}
                                                className="absolute top-1 right-1 p-1 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive"
                                            >
                                                <X size={12} />
                                            </button>
                                            <div className="absolute bottom-0 left-0 right-0 bg-burgundy/80 text-[8px] text-white py-0.5 text-center">New</div>
                                        </div>
                                    ))}

                                    {/* Add More Button */}
                                    <div className="relative aspect-square rounded-lg border-2 border-dashed border-muted-foreground/20 flex flex-col items-center justify-center hover:bg-muted/50 transition-colors cursor-pointer">
                                        <input
                                            type="file"
                                            multiple
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            onChange={(e) => handleFileChange(e, 'images')}
                                            accept="image/*"
                                        />
                                        <UploadCloud size={20} className="text-muted-foreground" />
                                        <span className="text-[10px] text-muted-foreground mt-1 text-center px-2">Add Photos</span>
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
