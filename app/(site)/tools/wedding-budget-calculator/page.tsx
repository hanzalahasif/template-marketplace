import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Free Wedding Budget Calculator (2026) | TemplateLayer',
    description: 'Free wedding budget calculator: enter your budget and guests, get an instant category breakdown with charts. Multi-currency, save & share. No signup.',
    alternates: {
        canonical: 'https://templatelayer.com/tools/wedding-budget-calculator/',
    },
    openGraph: {
        title: 'Free Wedding Budget Calculator (2026) | TemplateLayer',
        description: 'Plan your wedding budget instantly — no signup required. Multi-currency, charts, save & share.',
        url: 'https://templatelayer.com/tools/wedding-budget-calculator/',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Free Wedding Budget Calculator (2026)',
        description: 'Plan your wedding budget instantly — no signup required.',
    },
};

/**
 * This page exists to:
 * 1. Provide correct Next.js metadata (title, OG, canonical)
 * 2. Immediately redirect the browser to the fully self-contained static HTML
 *    served from /public/tools/wedding-budget-calculator/index.html
 *
 * Next.js serves /public/** at the root, so the file is available at
 * /tools/wedding-budget-calculator/index.html (a static asset URL).
 * We embed it in a full-height iframe so the URL stays clean at /tools/wedding-budget-calculator/
 */
export default function WeddingBudgetCalculatorPage() {
    return (
        <>
            <style>{`
                /* Hide site header/footer so the tool feels standalone */
                header, footer { display: none !important; }
                main { padding: 0 !important; margin: 0 !important; }
                body { overflow: hidden; }
            `}</style>
            <iframe
                src="/tools/wedding-budget-calculator/index.html"
                title="Free Wedding Budget Calculator"
                style={{
                    width: '100%',
                    height: '100vh',
                    border: 'none',
                    display: 'block',
                }}
                loading="eager"
            />
        </>
    );
}
