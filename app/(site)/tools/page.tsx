import { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'Free Web Tools',
    description: 'Free online tools for wedding planning, web design, and more. No signup required — instant access to our growing collection of useful calculators and generators.',
    alternates: {
        canonical: 'https://templatelayer.com/tools',
    },
    openGraph: {
        title: 'Free Web Tools | TemplateLayer',
        description: 'Free online tools — no signup required.',
        url: 'https://templatelayer.com/tools',
        type: 'website',
    },
};

const tools = [
    {
        slug: 'wedding-budget-calculator',
        title: 'Free Wedding Budget Calculator',
        description: 'Plan your wedding budget with a smart category breakdown, multi-currency support, and instant charts. Enter your total budget and guest count — done.',
        badge: 'New',
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                {/* Segment 1: Deep Blue (Major budget slice ~ 40%) */}
                <path
                    d="M 12.70 2.02 A 10 10 0 0 1 18.69 19.43 L 15.68 16.09 A 5.5 5.5 0 0 0 12.38 6.51 Z"
                    fill="#155a96"
                />
                {/* Segment 2: Primary Blue (Secondary slice ~ 25%) */}
                <path
                    d="M 17.59 20.29 A 10 10 0 0 1 4.34 18.43 L 7.79 15.54 A 5.5 5.5 0 0 0 15.08 16.56 Z"
                    fill="#1e73be"
                />
                {/* Segment 3: Medium Blue (Third slice ~ 18%) */}
                <path
                    d="M 3.52 17.30 A 10 10 0 0 1 3.17 7.31 L 7.14 9.42 A 5.5 5.5 0 0 0 7.34 14.91 Z"
                    fill="#3b95d9"
                />
                {/* Segment 4: Sky Blue (Remaining slice ~ 14%) */}
                <path
                    d="M 3.91 6.12 A 10 10 0 0 1 11.30 2.02 L 11.62 6.51 A 5.5 5.5 0 0 0 7.55 8.77 Z"
                    fill="#60a5fa"
                />
            </svg>
        ),
        tags: ['Wedding', 'Calculator', 'Finance'],
    },
];

export default function ToolsPage() {
    return (
        <div className={styles.page}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className="container">
                    <p className={styles.kicker}>Free Tools</p>
                    <h1 className={styles.heading}>Useful Free Tools — No Signup Needed</h1>
                    <p className={styles.lead}>
                        A growing collection of free, self-contained tools to help you plan, design, and build.
                        Everything runs in your browser — no account, no tracking.
                    </p>
                </div>
            </section>

            {/* Tools Grid */}
            <section className={styles.grid}>
                <div className="container">
                    <div className={styles.toolsGrid}>
                        {tools.map((tool) => (
                            <Link
                                key={tool.slug}
                                href={`/tools/${tool.slug}/`}
                                prefetch={false}
                                className={styles.card}
                            >
                                <div className={styles.cardIcon}>{tool.icon}</div>
                                {tool.badge && (
                                    <span className={styles.badge}>{tool.badge}</span>
                                )}
                                <h2 className={styles.cardTitle}>{tool.title}</h2>
                                <p className={styles.cardDesc}>{tool.description}</p>
                                <div className={styles.tags}>
                                    {tool.tags.map((tag) => (
                                        <span key={tag} className={styles.tag}>{tag}</span>
                                    ))}
                                </div>
                                <span className={styles.cta}>
                                    Open Tool →
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
