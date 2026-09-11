'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from '@/app/(site)/templates/[slug]/page.module.css';

interface BuyLink {
    platform: string;
    url: string;
    price: string;
    icon?: string;
}

interface BundleItem {
    label: string;
    path: string;
    description?: string;
    icon?: string;
}

interface TemplatePreviewClientProps {
    slug: string;
    title: string;
    description: string;
    category: string;
    thumbnailUrl: string;
    galleryUrls: string[];
    bundleItems: BundleItem[];
    pricingType: string;
    price: string;
    features: string[];
    technologies: string[];
    buyLinks: BuyLink[];
    downloadUrl: string | null;
    demoUrl: string;
}

export default function TemplatePreviewClient({
    slug,
    title,
    description,
    category,
    thumbnailUrl,
    galleryUrls,
    bundleItems,
    pricingType,
    features,
    technologies,
    buyLinks,
    downloadUrl,
    demoUrl,
}: TemplatePreviewClientProps) {
    const isFree = pricingType === 'free';
    const isBundle = bundleItems && bundleItems.length > 0;

    // All images: main thumbnail + gallery
    const allImages = [thumbnailUrl, ...galleryUrls].filter(Boolean);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const activeImage = allImages[activeImageIndex] || '';

    void demoUrl;

    return (
        <div className={styles.page}>
            {/* Back Link */}
            <div className={`container ${styles.backContainer}`}>
                <Link href="/templates" className={styles.backLink}>
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Back to Templates
                </Link>
            </div>

            {/* Live Preview Hero Section */}
            <section className={styles.previewHero}>
                <div className="container">
                    <div className={styles.previewHeroContent}>
                        <div className={styles.thumbnailWrapper}>
                            {activeImage ? (
                                <img src={activeImage} alt={title} className={styles.mainThumbnail} />
                            ) : (
                                <div className={styles.placeholderThumbnail}>
                                    <span>{title}</span>
                                </div>
                            )}
                            <div className={styles.thumbnailOverlay}>
                                <Link href={`/preview/${slug}`} className={styles.launchBtn}>
                                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    {isBundle ? 'Preview Bundle' : 'Launch Live Preview'}
                                </Link>
                            </div>
                        </div>

                        {/* Gallery Thumbnail Strip */}
                        {allImages.length > 1 && (
                            <div className={styles.galleryStrip}>
                                {allImages.map((url, i) => (
                                    <button
                                        key={i}
                                        className={`${styles.galleryThumb} ${i === activeImageIndex ? styles.galleryThumbActive : ''}`}
                                        onClick={() => setActiveImageIndex(i)}
                                        aria-label={`View screenshot ${i + 1}`}
                                    >
                                        <img src={url} alt={`Screenshot ${i + 1}`} />
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Bundle notice */}
                        {isBundle && (
                            <div className={styles.bundleNotice}>
                                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" /><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
                                </svg>
                                <span>This is a bundle — contains <strong>{bundleItems.length} individual templates</strong>. Click &quot;Preview Bundle&quot; to explore each one.</span>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Template Info */}
            <section className={styles.infoSection}>
                <div className="container">
                    <div className={styles.infoGrid}>
                        {/* Main Content */}
                        <div className={styles.mainContent}>
                            <span className="badge">{category}</span>
                            <h1 className={styles.title}>{title}</h1>
                            <p className={styles.description}>{description}</p>

                            {/* Bundle Items List */}
                            {isBundle && (
                                <div className={styles.bundleList}>
                                    <h3>What&apos;s Included in This Bundle</h3>
                                    <div className={styles.bundleGrid}>
                                        {bundleItems.map((item) => (
                                            <Link
                                                key={item.path}
                                                href={`/preview/${slug}?sub=${encodeURIComponent(item.path)}`}
                                                className={styles.bundleCard}
                                            >
                                                <span className={styles.bundleIcon}>{item.icon || '📄'}</span>
                                                <div>
                                                    <strong>{item.label}</strong>
                                                    {item.description && <p>{item.description}</p>}
                                                </div>
                                                <svg className={styles.bundleArrow} width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                    <path d="M9 18l6-6-6-6" />
                                                </svg>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Features */}
                            {features.length > 0 && (
                                <div className={styles.featuresSection}>
                                    <h3>Features</h3>
                                    <ul className={styles.featuresList}>
                                        {features.map((feature) => (
                                            <li key={feature} className={styles.featureItem}>
                                                <svg width="16" height="16" fill="none" stroke="var(--accent-primary)" strokeWidth="2" viewBox="0 0 24 24">
                                                    <path d="M20 6L9 17l-5-5" />
                                                </svg>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Technologies */}
                            {technologies.length > 0 && (
                                <div className={styles.techSection}>
                                    <h3>Technologies Used</h3>
                                    <div className={styles.techList}>
                                        {technologies.map((tech) => (
                                            <span key={tech} className={styles.techBadge}>{tech}</span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Buy Links */}
                            {!isFree && buyLinks && buyLinks.length > 0 && (
                                <div className={styles.buySection}>
                                    <h3>Purchase Options</h3>
                                    <div className={styles.buyLinks}>
                                        {buyLinks.map((link) => (
                                            <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer" className={styles.buyLink}>
                                                <span>{link.platform}</span>
                                                {link.price && <span className={styles.buyPrice}>{link.price}</span>}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Free Download */}
                            {isFree && downloadUrl && (
                                <div className={styles.buySection}>
                                    <a href={downloadUrl} className="btn btn-primary">
                                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                                        </svg>
                                        Download Free
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
