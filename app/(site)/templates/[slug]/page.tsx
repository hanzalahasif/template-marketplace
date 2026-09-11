import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTemplateBySlug, getAllTemplateSlugs } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/client';
import TemplatePreviewClient from '@/components/TemplatePreviewClient';

const BASE_URL = 'https://templatelayer.com';

// Pre-render all template pages at build time
export async function generateStaticParams() {
    try {
        const slugs: { slug: string }[] = await getAllTemplateSlugs();
        return (slugs || []).filter((s) => s.slug).map((s) => ({ slug: s.slug }));
    } catch {
        return [];
    }
}

// Dynamic metadata per template — what Google and social shares read
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const template = await getTemplateBySlug(slug).catch(() => null);

    if (!template) {
        return { title: 'Template Not Found' };
    }

    const title = template.seoTitle
        ? template.seoTitle.replace(/\bpremium\b/gi, 'Free').replace(/\bfree free\b/gi, 'Free')
        : `${template.title} — Free Website Template Download`;
    const description =
        template.seoDescription ||
        `Download ${template.title} for free — a professional, fully responsive HTML template. No login required. Instant ZIP download.`;

    const imageUrl =
        template.metaImage
            ? urlFor(template.metaImage).width(1200).height(630).url()
            : template.thumbnail
                ? urlFor(template.thumbnail).width(1200).height(630).url()
                : `${BASE_URL}/og-default.png`;

    // Combine tags + technologies + category as keywords
    const keywordList: string[] = [
        ...(template.tags || []),
        ...(template.technologies || []),
        template.category || '',
        'free website template',
        'free HTML template download',
        'free download',
        'website template',
        'HTML template',
    ].filter(Boolean);

    return {
        title,
        description,
        keywords: keywordList.join(', '),
        openGraph: {
            title,
            description,
            url: `${BASE_URL}/templates/${slug}`,
            type: 'website',
            images: [{ url: imageUrl, width: 1200, height: 630, alt: template.title }],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [imageUrl],
        },
        alternates: {
            canonical: `${BASE_URL}/templates/${slug}`,
        },
    };
}

export default async function TemplateDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const template = await getTemplateBySlug(slug).catch(() => null);

    if (!template) notFound();

    const thumbnailUrl =
        template.thumbnail && typeof template.thumbnail === 'object'
            ? urlFor(template.thumbnail).width(800).url()
            : '';

    const galleryUrls: string[] = template.gallery || [];

    const imageUrl = thumbnailUrl || `${BASE_URL}/og-default.png`;

    // JSON-LD: Product structured data for Google rich results
    const allKeywords = [
        ...(template.tags || []),
        ...(template.technologies || []),
    ].filter(Boolean).join(', ');

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: template.title,
        description: template.description,
        image: imageUrl,
        url: `${BASE_URL}/templates/${slug}`,
        keywords: allKeywords || undefined,
        brand: {
            '@type': 'Brand',
            name: 'TemplateLayer',
        },
        category: template.category || 'Website Template',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            url: `${BASE_URL}/templates/${slug}`,
        },
    };

    return (
        <>
            {/* Inject JSON-LD into <head> */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <TemplatePreviewClient
                slug={slug}
                title={template.title || ''}
                description={template.description || ''}
                category={template.category || ''}
                thumbnailUrl={thumbnailUrl}
                galleryUrls={galleryUrls}
                bundleItems={template.bundleItems || []}
                pricingType={template.pricingType || 'free'}
                price={String(template.price || '')}
                features={template.features || []}
                technologies={template.technologies || []}
                buyLinks={template.buyLinks || []}
                downloadUrl={template.downloadUrl || null}
                demoUrl={template.demoUrl || '#'}
            />
        </>
    );
}
