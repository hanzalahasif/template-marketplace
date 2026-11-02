import { Metadata } from 'next';
import { Suspense } from 'react';
import BlogCard from '@/components/BlogCard';
import TemplateFilters from '@/components/TemplateFilters';
import { getBlogPosts, getCategories } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/client';
import styles from './page.module.css';

export const revalidate = 60; // Revalidate every 60 seconds (Standard for SEO & Speed)

export const metadata: Metadata = {
    title: 'Blog - Web Design Tips & Tutorials',
    description: 'Learn web design tips, development tutorials, and industry insights. Stay updated with the latest trends in HTML, CSS, and JavaScript.',
    alternates: {
        canonical: 'https://templatelayer.com/blog',
    },
};


const defaultCategories = ['All', 'Templates', 'Tutorials', 'Hosting & Tools'];

function mapPost(p: Record<string, unknown>) {
    return {
        title: p.title as string,
        slug: p.slug as string,
        excerpt: p.excerpt as string,
        thumbnail: p.thumbnail && typeof p.thumbnail === 'object' ? urlFor(p.thumbnail).width(600).height(375).url() : '',
        category: p.category as string,
        publishedAt: p.publishedAt as string,
        readTime: (p.readTime as string) || '5 min read',
    };
}

export default async function BlogPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    let posts: { title: string; slug: string; excerpt: string; thumbnail: string; category: string; publishedAt: string; readTime: string }[];
    let categoryNames = defaultCategories;

    const resolvedParams = await searchParams;
    const currentCategory = (resolvedParams.category as string) || 'All';
    const searchQuery = (resolvedParams.q as string) || '';

    try {
        const [sanityPosts, sanityCategories] = await Promise.all([
            getBlogPosts(),
            getCategories('blog'),
        ]);
        posts = sanityPosts?.length > 0 ? sanityPosts.map(mapPost) : [];
        if (sanityCategories?.length > 0) {
            categoryNames = ['All', ...sanityCategories.map((c: { title: string }) => c.title)];
        }
    } catch (error) {
        console.error('[blog] Failed to fetch posts/categories from Sanity:', error);
        posts = [];
    }

    // Filter posts by category (?category=) and search (?q=) — same pattern as /templates
    const filteredPosts = posts.filter((post) => {
        const matchesCategory =
            currentCategory === 'All' ||
            post.category?.toLowerCase() === currentCategory.toLowerCase();
        const matchesSearch =
            !searchQuery ||
            post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // JSON-LD: Blog + list of posts so Google understands the listing
    const blogJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'TemplateLayer Blog',
        url: 'https://templatelayer.com/blog',
        description: 'Learn web design tips, development tutorials, and industry insights.',
        blogPost: filteredPosts.slice(0, 10).map((post, i) => ({
            '@type': 'BlogPosting',
            position: i + 1,
            headline: post.title,
            url: `https://templatelayer.com/blog/${post.slug}`,
            datePublished: post.publishedAt,
        })),
    };

    return (
        <div className={styles.page}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
            />

            {/* Hero */}
            <section className={styles.hero}>
                <div className="container">
                    <span className="badge">Our Blog</span>
                    <h1>Insights & Tutorials</h1>
                    <p>Tips, tutorials, and insights to help you build better websites.</p>
                </div>
            </section>

            {/* Filters — wired to ?category= / ?q= via the shared TemplateFilters component */}
            <section className={styles.filters}>
                <div className="container">
                    <Suspense fallback={<div>Loading filters...</div>}>
                        <TemplateFilters categories={categoryNames} baseUrl="/blog" />
                    </Suspense>
                </div>
            </section>

            {/* Blog Grid */}
            <section className={styles.blog}>
                <div className="container">
                    {filteredPosts.length > 0 ? (
                        <div className={`grid grid-3 ${styles.grid}`}>
                            {filteredPosts.map((post) => (
                                <BlogCard key={post.slug} {...post} />
                            ))}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                            <h3>No articles found</h3>
                            <p>Try a different category or search term.</p>
                        </div>
                    )}
                </div>
            </section>

        </div>
    );
}
