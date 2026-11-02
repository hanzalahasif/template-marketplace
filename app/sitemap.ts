import type { MetadataRoute } from 'next';
import { getAllTemplateSlugs, getAllBlogSlugs } from '@/sanity/lib/queries';

const BASE_URL = 'https://templatelayer.com';

// Regenerate the sitemap on every request in production
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const now = new Date();

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        { url: BASE_URL, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
        { url: `${BASE_URL}/templates`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
        { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
        { url: `${BASE_URL}/tools`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
        { url: `${BASE_URL}/tools/wedding-budget-calculator`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
        { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
        { url: `${BASE_URL}/privacy-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
        { url: `${BASE_URL}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
        { url: `${BASE_URL}/disclaimer`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    ];

    // Dynamic template pages — fetched from Sanity
    let templatePages: MetadataRoute.Sitemap = [];
    try {
        const slugs: { slug: string }[] = await getAllTemplateSlugs();
        templatePages = (slugs || [])
            .filter((s) => s.slug)
            .map((s) => ({
                url: `${BASE_URL}/templates/${s.slug}`,
                lastModified: now,
                changeFrequency: 'weekly' as const,
                priority: 0.8,
            }));
    } catch (error) {
        console.error('[sitemap] Failed to fetch template slugs from Sanity:', error);
    }

    // Dynamic blog pages — fetched from Sanity
    let blogPages: MetadataRoute.Sitemap = [];
    try {
        const slugs: { slug: string }[] = await getAllBlogSlugs();
        blogPages = (slugs || [])
            .filter((s) => s.slug)
            .map((s) => ({
                url: `${BASE_URL}/blog/${s.slug}`,
                lastModified: now,
                changeFrequency: 'monthly' as const,
                priority: 0.7,
            }));
    } catch (error) {
        console.error('[sitemap] Failed to fetch blog slugs from Sanity:', error);
    }

    // Dedupe by URL — a duplicated slug in Sanity must never produce a duplicate <loc>.
    const seen = new Set<string>();
    return [...staticPages, ...templatePages, ...blogPages].filter((entry) => {
        if (seen.has(entry.url)) {
            console.warn(`[sitemap] Duplicate URL dropped: ${entry.url}`);
            return false;
        }
        seen.add(entry.url);
        return true;
    });
}
