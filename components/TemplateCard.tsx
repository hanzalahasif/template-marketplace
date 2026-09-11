import Link from 'next/link';
import BrowserMockup from './BrowserMockup';
import styles from './TemplateCard.module.css';

interface TemplateCardProps {
    title: string;
    slug: string;
    description: string;
    thumbnail: string;
    category: string;
    demoUrl?: string;
    price?: string;
    gallery?: string[];
}

export default function TemplateCard({
    title,
    slug,
    description,
    thumbnail,
    gallery = [],
    category,
    demoUrl = '#',
    price,
}: TemplateCardProps) {
    const isFree = !price || price === 'free' || price === 'Free';

    return (
        <article className={styles.card}>
            {/* Thumbnail with browser mockup */}
            <Link href={`/templates/${slug}`} className={styles.imageWrapper}>
                {/* FREE Badge */}
                <span className={isFree ? styles.badgeFree : styles.badgePremium}>
                    {isFree ? 'FREE' : 'PREMIUM'}
                </span>

                <BrowserMockup src={thumbnail} alt={title} title={`${slug}.com`} gallery={gallery} />
            </Link>

            {/* Content */}
            <div className={styles.content}>
                <Link href={`/templates/${slug}`} className={styles.titleLink}>
                    <h3 className={styles.title}>{title}</h3>
                </Link>

                <p className={styles.description}>{description}</p>

                <div className={styles.meta}>
                    <span className={styles.category}>{category}</span>
                </div>

                <div className={styles.actions}>
                    <Link
                        href={`/preview/${slug}`}
                        className={styles.demoBtn}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Live Demo
                    </Link>
                    <Link
                        href={`/templates/${slug}`}
                        className={styles.downloadBtn}
                    >
                        Free Download
                    </Link>
                </div>
            </div>
        </article>
    );
}
