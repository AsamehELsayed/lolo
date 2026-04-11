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

interface Props {
    contents: {
        hero_title: string;
        hero_subtitle: string;
        hero_description: string;
        about_title: string;
        about_subtitle: string;
    };
}

export default function Edit({ contents }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        hero_title: contents.hero_title || '',
        hero_subtitle: contents.hero_subtitle || '',
        hero_description: contents.hero_description || '',
        about_title: contents.about_title || '',
        about_subtitle: contents.about_subtitle || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('content.update'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Page Content" />
            <div className="max-w-4xl mx-auto p-6 space-y-8">
                <h1 className="text-2xl font-semibold">Manage Site Content</h1>
                
                <form onSubmit={handleSubmit} className="space-y-10">
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

                    <div className="flex justify-end">
                        <Button type="submit" size="lg" disabled={processing}>Save All Changes</Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
