import { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'About - Premium Website Templates',
    description: 'Learn about TemplateLayer - we create premium, hand-crafted website templates for modern web projects.',
    alternates: {
        canonical: 'https://templatelayer.com/about',
    },
};

const values = [
    {
        title: 'Design Excellence',
        description: 'Every template is crafted with meticulous attention to detail, following the latest design trends.',
        icon: (
            <svg width="28" height="28" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
        ),
    },
    {
        title: 'Performance First',
        description: 'Optimized code ensures fast load times and excellent Core Web Vitals scores.',
        icon: (
            <svg width="28" height="28" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
        ),
    },
    {
        title: 'SEO Optimized',
        description: 'Built with semantic HTML and best practices for maximum search engine visibility.',
        icon: (
            <svg width="28" height="28" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
        ),
    },
    {
        title: 'Fully Responsive',
        description: 'Every template looks perfect on all devices, from mobile phones to large desktops.',
        icon: (
            <svg width="28" height="28" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5" viewBox="0 0 24 24">
                <rect x="5" y="2" width="14" height="20" rx="2" /><path d="M12 18h.01" />
            </svg>
        ),
    },
];

const stats = [
    { number: '50+', label: 'Premium Templates' },
    { number: '10,000+', label: 'Happy Customers' },
    { number: '4.9/5', label: 'Average Rating' },
    { number: '3+', label: 'Years Experience' },
];

export default function AboutPage() {
    return (
        <div className={styles.page}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className="container">
                    <h1>About TemplateLayer</h1>
                    <p>We create premium, hand-crafted website templates that help developers and businesses build beautiful websites faster.</p>
                </div>
            </section>

            {/* Story */}
            <section className={`section ${styles.story}`}>
                <div className="container">
                    <div className={styles.storyGrid}>
                        <div className={styles.storyText}>
                            <h2>Our Story</h2>
                            <p>TemplateLayer was born from a simple idea: website templates should be beautiful, fast, and accessible to everyone.</p>
                            <p>We noticed that many templates on the market were either visually outdated, poorly coded, or lacked the attention to detail that professional projects require. So we set out to change that.</p>
                            <p>Today, we create hand-crafted templates that combine stunning design with clean, well-documented code. Every template goes through rigorous testing to ensure it meets our high standards for performance, accessibility, and visual appeal.</p>
                        </div>
                        <div className={styles.storyImageBox}>
                            <svg width="64" height="64" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
                            </svg>
                            <span>Building since 2022</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className={`section ${styles.values}`}>
                <div className="container">
                    <div className="section-header">
                        <h2>What We Stand For</h2>
                        <p>The principles that guide everything we create.</p>
                    </div>
                    <div className="grid grid-4">
                        {values.map((value) => (
                            <div key={value.title} className={styles.valueCard}>
                                <div className={styles.valueIcon}>{value.icon}</div>
                                <h3>{value.title}</h3>
                                <p>{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className={styles.statsSection}>
                <div className="container">
                    <div className={styles.statsGrid}>
                        {stats.map((stat) => (
                            <div key={stat.label} className={styles.statItem}>
                                <span className={styles.statNumber}>{stat.number}</span>
                                <span className={styles.statLabel}>{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className={`section ${styles.cta}`}>
                <div className="container">
                    <div className={styles.ctaBox}>
                        <h2>Ready to Start Your Project?</h2>
                        <p>Browse our collection and find the perfect template for your next website.</p>
                        <div className={styles.ctaActions}>
                            <Link href="/templates" className="btn btn-primary">Browse Templates</Link>
                            <Link href="/contact" className="btn btn-secondary">Get in Touch</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
