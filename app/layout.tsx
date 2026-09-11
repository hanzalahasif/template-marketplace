import type { Metadata } from "next";

export const metadata: Metadata = {
    
    title: {
        default: "TemplateLayer — Free HTML Website Templates Download",
        template: "%s | TemplateLayer",
    },
    description:
        "Download 100% free responsive HTML5/CSS3 website templates. Built with Bootstrap 5, Tailwind CSS, and modern JavaScript — ready to launch.",
    metadataBase: new URL("https://templatelayer.com"),
    authors: [{ name: "TemplateLayer", url: "https://templatelayer.com" }],
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true },
    },
    openGraph: {
        siteName: "TemplateLayer",
        type: "website",
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        site: "@templatelayer",
    },
    other: {
        "p:domain_verify": "640b6dedcb7868887019fcd3ea9ec994",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
