import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/sonner';
import InputError from '@/components/input-error';
import LinkListEditor from '@/components/LinkListEditor';
import { Checkbox } from '@/components/ui/checkbox';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Page Content', href: '/dashboard/content' },
];

interface Props {
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
        notification_admin_email: string;
        enable_order_notifications: string;
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
        seo_title_en: contents.seo_title_en || '',
        seo_title_ar: contents.seo_title_ar || '',
        seo_description_en: contents.seo_description_en || '',
        seo_description_ar: contents.seo_description_ar || '',
        seo_keywords_en: contents.seo_keywords_en || '',
        seo_keywords_ar: contents.seo_keywords_ar || '',
        notification_admin_email: contents.notification_admin_email || 'abdelrahman2003.12.12@gmail.com',
        enable_order_notifications: contents.enable_order_notifications || '1',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('dashboard.content.update'), {
            onSuccess: () => toast.success('Page content updated successfully'),
            onError: () => toast.error('Failed to update content. Please check the form for errors.'),
        });
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
                                <InputError message={errors.hero_title} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="hero_subtitle">Hero Subtitle</Label>
                                <Input id="hero_subtitle" value={data.hero_subtitle} onChange={(e) => setData('hero_subtitle', e.target.value)} />
                                <InputError message={errors.hero_subtitle} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="hero_description">Hero Description</Label>
                                <Textarea id="hero_description" value={data.hero_description} onChange={(e) => setData('hero_description', e.target.value)} rows={3} />
                                <InputError message={errors.hero_description} />
                            </div>
                        </div>
                    </section>

                    <section className="bg-card p-6 rounded-xl border space-y-6">
                        <h2 className="text-lg font-medium border-b pb-2">About Section</h2>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="about_title">About Title</Label>
                                <Input id="about_title" value={data.about_title} onChange={(e) => setData('about_title', e.target.value)} />
                                <InputError message={errors.about_title} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="about_subtitle">About Subtitle</Label>
                                <Input id="about_subtitle" value={data.about_subtitle} onChange={(e) => setData('about_subtitle', e.target.value)} />
                                <InputError message={errors.about_subtitle} />
                            </div>
                        </div>
                    </section>

                    <section className="bg-card p-6 rounded-xl border space-y-6">
                        <h2 className="text-lg font-medium border-b pb-2">Heritage Section</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="heritage_label">Heritage Label</Label>
                                <Input id="heritage_label" value={data.heritage_label} onChange={(e) => setData('heritage_label', e.target.value)} placeholder="Our Heritage" />
                                <InputError message={errors.heritage_label} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="heritage_title">Heritage Title</Label>
                                <Input id="heritage_title" value={data.heritage_title} onChange={(e) => setData('heritage_title', e.target.value)} placeholder="Crafted with Passion & Undeniable Grace" />
                                <InputError message={errors.heritage_title} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="heritage_description">Heritage Description</Label>
                            <Textarea id="heritage_description" value={data.heritage_description} onChange={(e) => setData('heritage_description', e.target.value)} rows={4} />
                            <InputError message={errors.heritage_description} />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="heritage_stat1_value">Stat 1 Value</Label>
                                <Input id="heritage_stat1_value" value={data.heritage_stat1_value} onChange={(e) => setData('heritage_stat1_value', e.target.value)} placeholder="100%" />
                                <InputError message={errors.heritage_stat1_value} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="heritage_stat1_label">Stat 1 Label</Label>
                                <Input id="heritage_stat1_label" value={data.heritage_stat1_label} onChange={(e) => setData('heritage_stat1_label', e.target.value)} placeholder="Handmade" />
                                <InputError message={errors.heritage_stat1_label} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="heritage_stat2_value">Stat 2 Value</Label>
                                <Input id="heritage_stat2_value" value={data.heritage_stat2_value} onChange={(e) => setData('heritage_stat2_value', e.target.value)} placeholder="2026" />
                                <InputError message={errors.heritage_stat2_value} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="heritage_stat2_label">Stat 2 Label</Label>
                                <Input id="heritage_stat2_label" value={data.heritage_stat2_label} onChange={(e) => setData('heritage_stat2_label', e.target.value)} placeholder="Est. Jordan" />
                                <InputError message={errors.heritage_stat2_label} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="heritage_image">Heritage Section Image</Label>
                            <Input id="heritage_image" type="file" onChange={(e) => setData('heritage_image', e.target.files?.[0] || null)} />
                            <InputError message={errors.heritage_image} />
                            {contents.heritage_image && (
                                <div className="mt-2">
                                    <p className="text-xs text-muted-foreground mb-1">Current Image:</p>
                                    <img src={contents.heritage_image} alt="Heritage current" className="w-32 h-32 object-cover rounded-lg border" />
                                </div>
                            )}
                        </div>
                    </section>

                    <section className="bg-card p-6 rounded-xl border space-y-6">
                        <h2 className="text-lg font-medium border-b pb-2">SEO Settings (English)</h2>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="seo_title_en">Meta Title (EN)</Label>
                                <Input id="seo_title_en" value={data.seo_title_en} onChange={(e) => setData('seo_title_en', e.target.value)} />
                                <InputError message={errors.seo_title_en} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="seo_description_en">Meta Description (EN)</Label>
                                <Textarea id="seo_description_en" value={data.seo_description_en} onChange={(e) => setData('seo_description_en', e.target.value)} rows={3} />
                                <InputError message={errors.seo_description_en} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="seo_keywords_en">Meta Keywords (EN)</Label>
                                <Input id="seo_keywords_en" value={data.seo_keywords_en} onChange={(e) => setData('seo_keywords_en', e.target.value)} />
                                <InputError message={errors.seo_keywords_en} />
                            </div>
                        </div>
                    </section>

                    <section className="bg-card p-6 rounded-xl border space-y-6">
                        <h2 className="text-lg font-medium border-b pb-2">SEO Settings (Arabic)</h2>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="seo_title_ar">Meta Title (AR)</Label>
                                <Input id="seo_title_ar" value={data.seo_title_ar} onChange={(e) => setData('seo_title_ar', e.target.value)} />
                                <InputError message={errors.seo_title_ar} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="seo_description_ar">Meta Description (AR)</Label>
                                <Textarea id="seo_description_ar" value={data.seo_description_ar} onChange={(e) => setData('seo_description_ar', e.target.value)} rows={3} />
                                <InputError message={errors.seo_description_ar} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="seo_keywords_ar">Meta Keywords (AR)</Label>
                                <Input id="seo_keywords_ar" value={data.seo_keywords_ar} onChange={(e) => setData('seo_keywords_ar', e.target.value)} />
                                <InputError message={errors.seo_keywords_ar} />
                            </div>
                        </div>
                    </section>

                    <section className="bg-card p-6 rounded-xl border space-y-6">
                        <h2 className="text-lg font-medium border-b pb-2">Order Notification Settings</h2>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <Checkbox 
                                    id="enable_order_notifications" 
                                    checked={data.enable_order_notifications === '1' || data.enable_order_notifications === 'on'} 
                                    onCheckedChange={(checked) => setData('enable_order_notifications', checked ? '1' : '0')}
                                />
                                <Label htmlFor="enable_order_notifications" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Enable Order Email Notifications
                                </Label>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                When enabled, emails will be sent to both the customer and the admin upon successful checkout.
                            </p>
                            <div className="space-y-2">
                                <Label htmlFor="notification_admin_email">Admin Notification Email</Label>
                                <Input 
                                    id="notification_admin_email" 
                                    type="email" 
                                    placeholder="admin@example.com"
                                    value={data.notification_admin_email} 
                                    onChange={(e) => setData('notification_admin_email', e.target.value)} 
                                />
                                <p className="text-xs text-muted-foreground">
                                    The email address that will receive new order notifications.
                                </p>
                                <InputError message={errors.notification_admin_email} />
                            </div>
                        </div>
                    </section>

                    <section className="bg-card p-6 rounded-xl border space-y-6">
                        <h2 className="text-lg font-medium border-b pb-2">Footer Settings</h2>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="footer_description">Footer Description</Label>
                                <Textarea id="footer_description" value={data.footer_description} onChange={(e) => setData('footer_description', e.target.value)} rows={3} />
                                <InputError message={errors.footer_description} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>Boutique Links</Label>
                                    <LinkListEditor 
                                        value={data.footer_boutique_links} 
                                        onChange={(val) => setData('footer_boutique_links', val)} 
                                    />
                                    <InputError message={errors.footer_boutique_links} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Information Links</Label>
                                    <LinkListEditor 
                                        value={data.footer_information_links} 
                                        onChange={(val) => setData('footer_information_links', val)} 
                                    />
                                    <InputError message={errors.footer_information_links} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="footer_address">Address</Label>
                                    <Textarea id="footer_address" value={data.footer_address} onChange={(e) => setData('footer_address', e.target.value)} rows={2} />
                                    <InputError message={errors.footer_address} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="footer_phone">Phone Number</Label>
                                    <Input id="footer_phone" value={data.footer_phone} onChange={(e) => setData('footer_phone', e.target.value)} />
                                    <InputError message={errors.footer_phone} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="footer_email">Email Address</Label>
                                    <Input id="footer_email" value={data.footer_email} onChange={(e) => setData('footer_email', e.target.value)} />
                                    <InputError message={errors.footer_email} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="footer_instagram">Instagram URL</Label>
                                    <Input id="footer_instagram" value={data.footer_instagram} onChange={(e) => setData('footer_instagram', e.target.value)} />
                                    <InputError message={errors.footer_instagram} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="footer_facebook">Facebook URL</Label>
                                    <Input id="footer_facebook" value={data.footer_facebook} onChange={(e) => setData('footer_facebook', e.target.value)} />
                                    <InputError message={errors.footer_facebook} />
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="flex justify-end sticky bottom-6 z-50 bg-background/80 backdrop-blur-sm p-4 border rounded-full shadow-lg">
                        <Button type="submit" size="lg" disabled={processing}>
                            {processing ? 'Saving Changes...' : 'Save All Changes'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
