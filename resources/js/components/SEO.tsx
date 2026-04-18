import { Head, usePage } from '@inertiajs/react';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
}

export default function SEO({ title, description, keywords, image, url }: SEOProps) {
    const { props } = usePage();
    const content = props.content as Record<string, string>;
    const locale = props.locale as string;
    
    // Fallback to CMS settings if not provided
    const defaultTitle = content[`seo_title_${locale}`] || content.hero_title || 'LOLO BRAND';
    const defaultDescription = content[`seo_description_${locale}`] || content.hero_description || 'Luxury Redefined';
    const defaultKeywords = content[`seo_keywords_${locale}`] || 'luxury, bags, elegance';
    
    const finalTitle = title ? `${title} | LOLO BRAND` : defaultTitle;
    const finalDescription = description || defaultDescription;
    const finalKeywords = keywords || defaultKeywords;
    const siteUrl = url || window.location.origin;
    const siteImage = image || `${window.location.origin}/logo.svg`;

    return (
        <Head>
            <title>{finalTitle}</title>
            <meta name="description" content={finalDescription} />
            <meta name="keywords" content={finalKeywords} />
            
            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={siteUrl} />
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={finalDescription} />
            <meta property="og:image" content={siteImage} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={siteUrl} />
            <meta property="twitter:title" content={finalTitle} />
            <meta property="twitter:description" content={finalDescription} />
            <meta property="twitter:image" content={siteImage} />
        </Head>
    );
}
