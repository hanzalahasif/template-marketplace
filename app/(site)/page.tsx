import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import TemplateCard from '@/components/TemplateCard';
import BlogCard from '@/components/BlogCard';
import {
  getLatestBlogPosts,
  getSiteSettings,
  getCategories,
  getAllTemplates,
} from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/client';
import styles from './page.module.css';

export const revalidate = 60;

const trustPoints = [
  {
    icon: (<svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>),
    title: 'Fully Responsive',
    description: 'Every template is tested across all devices and screen sizes.',
  },
  {
    icon: (<svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>),
    title: 'Lightning Fast',
    description: 'Optimized code, minimal dependencies, and blazing-fast load times.',
  },
  {
    icon: (<svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /><path d="M8 11h6" /><path d="M11 8v6" /></svg>),
    title: 'SEO Optimized',
    description: 'Built with semantic HTML, meta tags, and fast performance for search engines.',
  },
  {
    icon: (<svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>),
    title: 'Clean Code',
    description: 'Well-structured, documented, and easy to customize for your needs.',
  },
];

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings().catch(() => null);
  const siteName = settings?.siteName || 'TemplateLayer';
  const siteUrl = 'https://templatelayer.com';

  const title = `${siteName} — Free HTML Website Templates Download`;
  const description =
    settings?.siteDescription ||
    'Download free responsive HTML5/CSS3 website templates for AI startups, SaaS, agencies, portfolios, restaurants, crypto, and more. Built with Bootstrap, Tailwind CSS & JavaScript. Instant ZIP download, no login required.';

  const keywords = [
    'free website templates',
    'free HTML templates download',
    'free HTML5 templates',
    'free CSS3 templates',
    'free responsive templates',
    'Bootstrap templates free',
    'Tailwind CSS templates free',
    'landing page templates free',
    'free SaaS templates',
    'free AI startup templates',
    'free agency website templates',
    'free portfolio templates',
    'free download HTML templates',
    'website template download',
  ].join(', ');

  return {
    title,
    description,
    keywords,
    alternates: { canonical: siteUrl },
    openGraph: {
      title,
      description,
      type: 'website',
      url: siteUrl,
      siteName,
      images: [{ url: `${siteUrl}/og-home.png`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

function mapTemplate(t: Record<string, unknown>) {
  return {
    title: t.title as string,
    slug: t.slug as string,
    description: t.description as string,
    thumbnail: t.thumbnail ? urlFor(t.thumbnail).width(1000).height(625).quality(90).auto('format').url() : '',
    gallery: (t.gallery as string[]) || [],
    category: t.category as string,
    demoUrl: (t.demoUrl as string) || '#',
    price: t.pricingType === 'free' ? 'free' : (t.price as string) || 'premium',
  };
}

function mapPost(p: Record<string, unknown>) {
  return {
    title: p.title as string,
    slug: p.slug as string,
    excerpt: p.excerpt as string,
    thumbnail: p.thumbnail ? urlFor(p.thumbnail).width(1000).height(625).quality(90).auto('format').url() : '',
    category: p.category as string,
    publishedAt: p.publishedAt as string,
    readTime: (p.readTime as string) || '5 min read',
  };
}

interface Category {
  title: string;
  slug: string;
}

export default async function HomePage() {
  let allTemplates: ReturnType<typeof mapTemplate>[] = [];
  let latestPosts: ReturnType<typeof mapPost>[] = [];
  let sanityCategories: Category[] = [];

  try {
    const [sanityAll, sanityPosts, categoriesData] = await Promise.all([
      getAllTemplates(12),
      getLatestBlogPosts(3),
      getCategories('template'),
    ]);

    allTemplates = (sanityAll || []).map(mapTemplate);
    latestPosts = sanityPosts?.length > 0 ? sanityPosts.map(mapPost) : [];
    sanityCategories = categoriesData || [];
  } catch {
    allTemplates = [];
    latestPosts = [];
    sanityCategories = [];
  }

  // JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'TemplateLayer',
    url: 'https://templatelayer.com',
    description: 'Download free and premium responsive HTML5/CSS3 website templates.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://templatelayer.com/templates?search={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  const totalCount = allTemplates.length;

  return (
    <>
      {/* JSON-LD Structured Data */}
      <Script id="json-ld-home" type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </Script>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <h1>Free HTML Website Templates</h1>
            <p>
              Download 100% free responsive HTML5/CSS3 website templates.
              Built with Bootstrap 5, Tailwind CSS, and modern JavaScript — ready to launch.
            </p>
            <div className={styles.heroActions}>
              <Link href="/templates" className="btn btn-primary">
                Browse Free Templates
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills */}
      {sanityCategories.length > 0 && (
        <section className={styles.categories}>
          <div className="container">
            <div className={styles.categoryList}>
              <Link href="/templates" className={`${styles.categoryItem} ${styles.categoryAll}`}>
                All Templates
              </Link>
              {sanityCategories.map((cat: Category) => (
                <Link
                  key={cat.title}
                  href={`/templates?category=${cat.title.toLowerCase()}`}
                  className={styles.categoryItem}
                >
                  {cat.title}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── ALL TEMPLATES (100% Free) ── */}
      <section className={`section ${styles.templates}`}>
        <div className="container">
          <div className="section-header">
            <h2>Free Website Templates</h2>
            <p>
              {totalCount > 0 ? `${totalCount} templates` : 'Free templates'} for AI startups,
              SaaS, agencies, portfolios and more — 100% free download.
            </p>
          </div>

          {allTemplates.length > 0 ? (
            <div className="grid grid-3">
              {allTemplates.map((template) => (
                <TemplateCard key={template.slug} {...template} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              <p>No templates available yet. Check back soon!</p>
            </div>
          )}

          <div className={styles.viewAll}>
            <Link href="/templates" className="btn btn-primary">
              View All Free Templates
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Our Templates */}
      <section className={`section ${styles.trust}`}>
        <div className="container">
          <div className="section-header">
            <h2>Why Choose Our Templates</h2>
            <p>Every template is crafted to the highest standards.</p>
          </div>

          <div className={styles.trustGrid}>
            {trustPoints.map((point) => (
              <div key={point.title} className={styles.trustCard}>
                <div className={styles.trustIcon}>{point.icon}</div>
                <h3>{point.title}</h3>
                <p>{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      {latestPosts.length > 0 && (
        <section className={`section ${styles.blog}`}>
          <div className="container">
            <div className="section-header">
              <h2>Latest from Our Blog</h2>
              <p>Web design tips, tutorials, and industry insights.</p>
            </div>

            <div className="grid grid-3">
              {latestPosts.map((post) => (
                <BlogCard key={post.slug} {...post} />
              ))}
            </div>

            <div className={styles.viewAll}>
              <Link href="/blog" className="btn btn-secondary">
                Read More Articles
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
