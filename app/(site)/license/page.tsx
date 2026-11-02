import { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'License - Usage Terms & Guidelines',
    description: 'Understand the licensing terms for our premium and free website templates. Learn how you can use our products for your projects.',
    alternates: {
        canonical: 'https://templatelayer.com/license',
    },
};

export default function LicensePage() {
    return (
        <div className={styles.page}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className="container">
                    <h1>License Agreement</h1>
                    <p>Clear rules for using our templates in your personal and commercial projects.</p>
                </div>
            </section>

            <div className={styles.content}>
                {/* General Usage */}
                <section className={styles.section}>
                    <h2>
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        What You Can Do
                    </h2>
                    <p>
                        Every template at TemplateLayer comes with a flexible license that allows for professional use. When you purchase a template or download a free one, you are granted a non-exclusive license to use the product.
                    </p>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>
                            <svg width="18" height="18" fill="none" stroke="#10b981" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M5 13l4 4L19 7" />
                            </svg>
                            Use the template for personal projects and portfolio websites.
                        </li>
                        <li className={styles.listItem}>
                            <svg width="18" height="18" fill="none" stroke="#10b981" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M5 13l4 4L19 7" />
                            </svg>
                            Use the template for client projects (commercial use).
                        </li>
                        <li className={styles.listItem}>
                            <svg width="18" height="18" fill="none" stroke="#10b981" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M5 13l4 4L19 7" />
                            </svg>
                            Modify color, content, layout, and code to suit your needs.
                        </li>
                    </ul>
                </section>

                {/* Restrictions */}
                <section className={styles.section}>
                    <h2>
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Strict Restrictions
                    </h2>
                    <p>
                        To protect our designers and the platform, the following actions are strictly prohibited:
                    </p>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>
                            <svg width="18" height="18" fill="none" stroke="#ef4444" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            You cannot resell, redistribute, or sub-license the source code in any form.
                        </li>
                        <li className={styles.listItem}>
                            <svg width="18" height="18" fill="none" stroke="#ef4444" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            You cannot upload our templates to other marketplaces or "free download" sites.
                        </li>
                        <li className={styles.listItem}>
                            <svg width="18" height="18" fill="none" stroke="#ef4444" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            You cannot use the brand name "TemplateLayer" to promote your own services.
                        </li>
                    </ul>
                </section>

                {/* Attribution */}
                <section className={styles.section}>
                    <h2>
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Attribution
                    </h2>
                    <p>
                        For <strong>Premium Templates</strong>, attribution is not required. You can remove all "TemplateLayer" links and branding from your final website.
                    </p>
                    <p>
                        For <strong>Free Templates</strong>, we ask that you keep the small credit link in the footer as a way to support our community.
                    </p>
                </section>

                {/* Disclaimer */}
                <section className={styles.important}>
                    <p>
                        <strong>Disclaimer:</strong> All templates are provided "as is" without warranty of any kind. TemplateLayer is not liable for any damages resulting from the use or inability to use our products.
                    </p>
                </section>
            </div>
        </div>
    );
}
