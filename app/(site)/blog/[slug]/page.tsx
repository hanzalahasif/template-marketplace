import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getBlogPostBySlug, getAllBlogSlugs } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/client';
import { PortableText } from 'next-sanity';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './page.module.css';

const BASE_URL = 'https://templatelayer.com';

// Pre-render all blog posts at build time
export async function generateStaticParams() {
    try {
        const slugs: { slug: string }[] = await getAllBlogSlugs();
        return (slugs || []).filter((s) => s.slug).map((s) => ({ slug: s.slug }));
    } catch {
        return [];
    }
}

// Per-post metadata — title, description, og:image
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug).catch(() => null);

    if (!post) {
        return { title: 'Article Not Found' };
    }

    const title = post.seoTitle || post.title;
    const description = post.seoDescription || post.excerpt || `Read "${post.title}" on the TemplateLayer blog.`;

    const imageUrl =
        post.metaImage
            ? urlFor(post.metaImage).width(1200).height(630).url()
            : post.thumbnail
                ? urlFor(post.thumbnail).width(1200).height(630).url()
                : `${BASE_URL}/og-default.png`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: `${BASE_URL}/blog/${slug}`,
            type: 'article',
            images: [{ url: imageUrl, width: 1200, height: 630, alt: post.title }],
            publishedTime: post.publishedAt,
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [imageUrl],
        },
        alternates: {
            canonical: `${BASE_URL}/blog/${slug}`,
        },
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug).catch(() => null);

    if (!post) notFound();

    const formattedDate = new Date(post.publishedAt || new Date()).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    const authorInitials = post.author?.name
        ? post.author.name.split(' ').map((n: string) => n[0]).join('')
        : 'TL';

    const thumbnailUrl = post.thumbnail && typeof post.thumbnail === 'object'
        ? urlFor(post.thumbnail).width(1200).height(600).url()
        : null;

    const postUrl = `${BASE_URL}/blog/${slug}`;
    const encodedUrl = encodeURIComponent(postUrl);
    const encodedTitle = encodeURIComponent(post.title || '');

    // JSON-LD: Article structured data
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt || '',
        image: thumbnailUrl || `${BASE_URL}/og-default.png`,
        url: postUrl,
        datePublished: post.publishedAt || new Date().toISOString(),
        author: {
            '@type': 'Person',
            name: post.author?.name || 'TemplateLayer',
        },
        publisher: {
            '@type': 'Organization',
            name: 'TemplateLayer',
            url: BASE_URL,
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': postUrl,
        },
    };

    return (
        <div className={styles.page}>
            {/* JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Header */}
            <header className={styles.header}>
                <div className="container">
                    <Link href="/blog" className={styles.backLink}>
                        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Back to Blog
                    </Link>

                    <div className={styles.meta}>
                        <span className="badge">{post.category || 'General'}</span>
                        <span className={styles.dot}>•</span>
                        <time dateTime={post.publishedAt}>{formattedDate}</time>
                        <span className={styles.dot}>•</span>
                        <span>{post.readTime || '5 min read'}</span>
                    </div>

                    <h1 className={styles.title}>{post.title}</h1>
                    <p className={styles.excerpt}>{post.excerpt}</p>

                    {post.author && (
                        <div className={styles.author}>
                            <div className={styles.authorAvatar}>
                                <span>{authorInitials}</span>
                            </div>
                            <div className={styles.authorInfo}>
                                <span className={styles.authorName}>{post.author.name}</span>
                                <span className={styles.authorRole}>{post.author.role}</span>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            {/* Featured Image */}
            {thumbnailUrl ? (
                <div className={styles.featuredImage}>
                    <div className={styles.imageWrapper}>
                        <img src={thumbnailUrl} alt={post.title} style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
                    </div>
                </div>
            ) : (
                <div className={styles.featuredImage}>
                    <div className={styles.imageWrapper}>
                        <div className={styles.imagePlaceholder}>
                            <span>Featured Image</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Content */}
            <article className={styles.article}>
                <div className="container">
                    <div className={styles.content}>
                        {post.contentFormat === 'markdown' && post.bodyMarkdown ? (
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {post.bodyMarkdown}
                            </ReactMarkdown>
                        ) : post.body && (!post.contentFormat || post.contentFormat === 'blocks') ? (
                            <PortableText value={post.body} />
                        ) : post.bodyMarkdown ? (
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {post.bodyMarkdown}
                            </ReactMarkdown>
                        ) : post.body ? (
                            <PortableText value={post.body} />
                        ) : null}
                    </div>
                </div>
            </article>

            {/* Share */}
            <section className={styles.share}>
                <div className="container">
                    <div className={styles.shareBox}>
                        <span>Share this article:</span>
                        <div className={styles.shareLinks}>
                            <a
                                href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.shareLink}
                            >
                                Twitter / X
                            </a>
                            <a
                                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.shareLink}
                            >
                                LinkedIn
                            </a>
                            <a
                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.shareLink}
                            >
                                Facebook
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
