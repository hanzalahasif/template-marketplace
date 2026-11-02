import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "TemplateLayer — Free & Premium Website Templates",
    template: "%s | TemplateLayer",
  },
  description: "Discover beautifully crafted, SEO-optimized website templates. Live preview, instant access, and professionally designed for modern web projects.",
  keywords: "HTML templates, CSS templates, JavaScript templates, website templates, web design, responsive templates",
  authors: [{ name: "TemplateLayer" }],
  metadataBase: new URL("https://templatelayer.com"),
  openGraph: {
    title: "TemplateLayer — Free & Premium Website Templates",
    description: "Discover beautifully crafted, SEO-optimized website templates with live previews.",
    type: "website",
    locale: "en_US",
    url: "https://templatelayer.com",
    siteName: "TemplateLayer",
    images: [{
      url: "/og-default.png",
      width: 1200,
      height: 630,
      alt: "TemplateLayer — Premium Website Templates",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TemplateLayer — Free & Premium Website Templates",
    description: "Discover beautifully crafted, SEO-optimized website templates with live previews.",
    images: ["/og-default.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "gWTzTYZ8Yfrun2HCiqW2C4uZXMneEwmzPC4157dYn5M",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
