import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Page Content', href: '/content' },
];

    contents: {
        hero_title: string;
        hero_subtitle: string;
        hero_description: string;
        about_title: string;
        about_subtitle: string;
        heritage_label: string;
        heritage_title: string;
        heritage_description: string;
        heritage_stat1_value: string;
        heritage_stat1_label: string;
        heritage_stat2_value: string;
        heritage_stat2_label: string;
        heritage_image: string;
        footer_description: string;
        footer_boutique_links: string;
        footer_information_links: string;
        footer_address: string;
        footer_phone: string;
        footer_email: string;
        footer_instagram: string;
        footer_facebook: string;
    };
}

export default function Edit({ contents }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'put',
        hero_title: contents.hero_title || '',
        hero_subtitle: contents.hero_subtitle || '',
        hero_description: contents.hero_description || '',
        about_title: contents.about_title || '',
        about_subtitle: contents.about_subtitle || '',
        heritage_label: contents.heritage_label || '',
        heritage_title: contents.heritage_title || '',
        heritage_description: contents.heritage_description || '',
        heritage_stat1_value: contents.heritage_stat1_value || '',
        heritage_stat1_label: contents.heritage_stat1_label || '',
        heritage_stat2_value: contents.heritage_stat2_value || '',
        heritage_stat2_label: contents.heritage_stat2_label || '',
        heritage_image: null as File | null,
        footer_description: contents.footer_description || '',
        footer_boutique_links: contents.footer_boutique_links || '',
        footer_information_links: contents.footer_information_links || '',
        footer_address: contents.footer_address || '',
        footer_phone: contents.footer_phone || '',
        footer_email: contents.footer_email || '',
        footer_instagram: contents.footer_instagram || '',
        footer_facebook: contents.footer_facebook || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('content.update'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Page Content" />
            <div className="max-w-4xl mx-auto p-6 space-y-8">
                <h1 className="text-2xl font-semibold">Manage Site Content</h1>
                
                <form onSubmit={handleSubmit} className="space-y-10 mb-20">
                    <section className="bg-card p-6 rounded-xl border space-y-6">
                        <h2 className="text-lg font-medium border-b pb-2">Hero Section</h2>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="hero_title">Hero Title</Label>
                                <Input id="hero_title" value={data.hero_title} onChange={(e) => setData('hero_title', e.target.value)} />
                                {errors.hero_title && <p className="text-sm text-destructive">{errors.hero_title}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="hero_subtitle">Hero Subtitle</Label>
                                <Input id="hero_subtitle" value={data.hero_subtitle} onChange={(e) => setData('hero_subtitle', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="hero_description">Hero Description</Label>
                                <Textarea id="hero_description" value={data.hero_description} onChange={(e) => setData('hero_description', e.target.value)} rows={3} />
                            </div>
                        </div>
                    </section>

                    <section className="bg-card p-6 rounded-xl border space-y-6">
                        <h2 className="text-lg font-medium border-b pb-2">About Section</h2>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="about_title">About Title</Label>
                                <Input id="about_title" value={data.about_title} onChange={(e) => setData('about_title', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="about_subtitle">About Subtitle</Label>
                                <Input id="about_subtitle" value={data.about_subtitle} onChange={(e) => setData('about_subtitle', e.target.value)} />
                            </div>
                        </div>
                    </section>

                    <section className="bg-card p-6 rounded-xl border space-y-6">
                        <h2 className="text-lg font-medium border-b pb-2">Heritage Section</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="heritage_label">Heritage Label</Label>
                                <Input id="heritage_label" value={data.heritage_label} onChange={(e) => setData('heritage_label', e.target.value)} placeholder="Our Heritage" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="heritage_title">Heritage Title</Label>
                                <Input id="heritage_title" value={data.heritage_title} onChange={(e) => setData('heritage_title', e.target.value)} placeholder="Crafted with Passion & Undeniable Grace" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="heritage_description">Heritage Description</Label>
                            <Textarea id="heritage_description" value={data.heritage_description} onChange={(e) => setData('heritage_description', e.target.value)} rows={4} />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="heritage_stat1_value">Stat 1 Value</Label>
                                <Input id="heritage_stat1_value" value={data.heritage_stat1_value} onChange={(e) => setData('heritage_stat1_value', e.target.value)} placeholder="100%" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="heritage_stat1_label">Stat 1 Label</Label>
                                <Input id="heritage_stat1_label" value={data.heritage_stat1_label} onChange={(e) => setData('heritage_stat1_label', e.target.value)} placeholder="Handmade" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="heritage_stat2_value">Stat 2 Value</Label>
                                <Input id="heritage_stat2_value" value={data.heritage_stat2_value} onChange={(e) => setData('heritage_stat2_value', e.target.value)} placeholder="2026" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="heritage_stat2_label">Stat 2 Label</Label>
                                <Input id="heritage_stat2_label" value={data.heritage_stat2_label} onChange={(e) => setData('heritage_stat2_label', e.target.value)} placeholder="Est. Jordan" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="heritage_image">Heritage Section Image</Label>
                            <Input id="heritage_image" type="file" onChange={(e) => setData('heritage_image', e.target.files?.[0] || null)} />
                            {contents.heritage_image && (
                                <div className="mt-2">
                                    <p className="text-xs text-muted-foreground mb-1">Current Image:</p>
                                    <img src={contents.heritage_image} alt="Heritage current" className="w-32 h-32 object-cover rounded-lg border" />
                                </div>
                            )}
                        </div>
                    </section>

                    <section className="bg-card p-6 rounded-xl border space-y-6">
                        <h2 className="text-lg font-medium border-b pb-2">Footer Settings</h2>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="footer_description">Footer Description</Label>
                                <Textarea id="footer_description" value={data.footer_description} onChange={(e) => setData('footer_description', e.target.value)} rows={3} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="footer_boutique_links">Boutique Links (Label|URL per line)</Label>
                                    <Textarea id="footer_boutique_links" value={data.footer_boutique_links} onChange={(e) => setData('footer_boutique_links', e.target.value)} rows={5} placeholder="New Arrivals|/products?category=new" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="footer_information_links">Information Links (Label|URL per line)</Label>
                                    <Textarea id="footer_information_links" value={data.footer_information_links} onChange={(e) => setData('footer_information_links', e.target.value)} rows={5} placeholder="Our Story|/about" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="footer_address">Address</Label>
                                    <Textarea id="footer_address" value={data.footer_address} onChange={(e) => setData('footer_address', e.target.value)} rows={2} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="footer_phone">Phone Number</Label>
                                    <Input id="footer_phone" value={data.footer_phone} onChange={(e) => setData('footer_phone', e.target.value)} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="footer_email">Email Address</Label>
                                    <Input id="footer_email" value={data.footer_email} onChange={(e) => setData('footer_email', e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="footer_instagram">Instagram URL</Label>
                                    <Input id="footer_instagram" value={data.footer_instagram} onChange={(e) => setData('footer_instagram', e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="footer_facebook">Facebook URL</Label>
                                    <Input id="footer_facebook" value={data.footer_facebook} onChange={(e) => setData('footer_facebook', e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="flex justify-end sticky bottom-6 bg-background/80 backdrop-blur-sm p-4 border rounded-full shadow-lg">
                        <Button type="submit" size="lg" disabled={processing}>Save All Changes</Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
