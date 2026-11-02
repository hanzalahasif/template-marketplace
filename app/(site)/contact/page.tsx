import { Metadata } from 'next';
import { getFAQs } from '@/sanity/lib/queries';
import ContactForm from '@/components/ContactForm';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'Contact - Get in Touch',
    description: 'Have questions about our templates? Get in touch with the TemplateLayer team.',
    alternates: {
        canonical: 'https://templatelayer.com/contact',
    },
};

const fallbackFaqs = [
    { question: 'Do you offer refunds?', answer: 'Yes, we offer a 14-day money-back guarantee on all purchases through our partnered platforms.' },
    { question: 'Can I use templates for commercial projects?', answer: 'Absolutely! All our templates come with a commercial license that allows you to use them for client projects.' },
    { question: 'Do you offer customization services?', answer: 'Yes, we offer custom development services. Contact us with your requirements for a quote.' },
    { question: 'How often are templates updated?', answer: 'We regularly update our templates to ensure compatibility with the latest browsers and web standards.' },
];

export default async function ContactPage() {
    let faqs;
    try {
        const sanityFaqs = await getFAQs('contact');
        faqs = sanityFaqs?.length > 0 ? sanityFaqs : fallbackFaqs;
    } catch (error) {
        console.error('[contact] Failed to fetch FAQs from Sanity:', error);
        faqs = fallbackFaqs;
    }

    return (
        <div className={styles.page}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className="container">
                    <h1>Get in Touch</h1>
                    <p>Have questions about our templates? Reach out via the form below or email us at <a href="mailto:info@templatelayer.com">info@templatelayer.com</a>.</p>
                </div>
            </section>

            {/* Contact Form */}
            <section className={styles.formSection}>
                <div className="container">
                    <div className={styles.formWrapper}>
                        <div className={styles.formHeader}>
                            <h2>Send a Message</h2>
                            <p>Fill out the form below and we&apos;ll get back to you within 24 hours.</p>
                        </div>
                        <ContactForm />
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className={`section ${styles.faq}`}>
                <div className="container">
                    <div className="section-header">
                        <h2>Frequently Asked Questions</h2>
                        <p>Quick answers to common questions.</p>
                    </div>

                    <div className={styles.faqList}>
                        {faqs.map((faq: { question: string; answer: string }) => (
                            <div key={faq.question} className={styles.faqItem}>
                                <h3>{faq.question}</h3>
                                <p>{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
