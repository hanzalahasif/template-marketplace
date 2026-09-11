import { Metadata } from 'next';
import { Suspense } from 'react';
import TemplateCard from '@/components/TemplateCard';
import { getFreeTemplates, getCategories } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/client';
import styles from './page.module.css';

export const revalidate = 60; // Revalidate every 60 seconds

export const metadata: Metadata = {
    title: 'Free Website Templates | TemplateLayer - Download HTML, CSS & JS Templates',
    description: 'Download 100% free responsive website templates. Hand-crafted, modern HTML5, CSS3, Bootstrap 5 and Tailwind templates ready to launch your next project.',
};


function mapTemplate(t: Record<string, unknown>) {
    return {
        title: t.title as string,
        slug: t.slug as string,
        description: t.description as string,
        thumbnail: t.thumbnail ? urlFor(t.thumbnail).width(1000).height(625).quality(90).auto('format').url() : '',
        gallery: (t.gallery as string[]) || [],
        category: t.category as string,
        demoUrl: (t.demoUrl as string) || '#',
        price: 'free',
    };
}

const defaultCategories = ['All', 'Crypto', 'Restaurant', 'Agency', 'Education', 'Real Estate', 'SaaS', 'E-Commerce', 'Portfolio'];

import TemplateFilters from '@/components/TemplateFilters';

export default async function TemplatesPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    let allTemplates: { title: string; slug: string; description: string; thumbnail: string; gallery?: string[]; category: string; demoUrl: string; price: string }[];
    let categoryNames = defaultCategories;

    const resolvedParams = await searchParams;
    const currentCategory = (resolvedParams.category as string) || 'All';
    const searchQuery = (resolvedParams.q as string) || '';

    try {
        const [sanityTemplates, sanityCategories] = await Promise.all([
            getFreeTemplates(),
            getCategories('template'),
        ]);
        allTemplates = sanityTemplates?.length > 0 ? sanityTemplates.map(mapTemplate) : [];
        if (sanityCategories?.length > 0) {
            categoryNames = ['All', ...sanityCategories.map((c: { title: string }) => c.title)];
        }
    } catch {
        allTemplates = [];
    }

    // Filter templates based on category and search query
    const filteredTemplates = allTemplates.filter((template) => {
        const matchesCategory =
            currentCategory === 'All' ||
            template.category?.toLowerCase() === currentCategory.toLowerCase();

        const matchesSearch =
            !searchQuery ||
            template.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            template.description?.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    return (
        <div className={styles.page}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className="container">
                    <span className="badge">Free Collection</span>
                    <h1>Free Website Templates</h1>
                    <p>Hand-crafted, pixel-perfect website templates. 100% free to download and launch your next project.</p>
                </div>
            </section>

            {/* Filters */}
            <section className={styles.filters}>
                <div className="container">
                    <Suspense fallback={<div className={styles.filterPlaceholder}>Loading filters...</div>}>
                        <TemplateFilters categories={categoryNames} baseUrl="/templates" />
                    </Suspense>
                </div>
            </section>

            {/* Templates Grid */}
            <section className={styles.templates}>
                <div className="container">
                    {filteredTemplates.length > 0 ? (
                        <div className={`grid grid-3 ${styles.grid}`}>
                            {filteredTemplates.map((template) => (
                                <TemplateCard key={template.slug} {...template} />
                            ))}
                        </div>
                    ) : (
                        <div className={styles.noResults}>
                            <h3>No templates found</h3>
                            <p>Try adjusting your search or filters to find what you&apos;re looking for.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
