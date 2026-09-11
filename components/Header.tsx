'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './Header.module.css';
import { client } from '@/sanity/lib/client';

interface SiteSettings {
    logoText: string;
    logoAccent: string;
}

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [settings, setSettings] = useState<SiteSettings>({ logoText: 'template', logoAccent: 'layer' });
    const pathname = usePathname();

    // Auto-close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        async function fetchSettings() {
            try {
                const data = await client.fetch(`
                    *[_type == "siteSettings"][0] { logoText, logoAccent }
                `);
                if (data?.logoText) {
                    setSettings({ logoText: data.logoText, logoAccent: data.logoAccent || '' });
                }
            } catch {
                // Use defaults
            }
        }
        fetchSettings();
    }, []);

    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.headerContainer}>
                    {/* Logo */}
                    <Link href="/" className={styles.logo}>
                        <span className={styles.logoText}>{settings.logoText}</span>
                        <span className={styles.logoAccent}>{settings.logoAccent}</span>
                        <span className={styles.logoDot}>.</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className={styles.nav}>
                        <Link href="/">Home</Link>
                        <Link href="/templates">Free Templates</Link>
                        <Link href="/blog">Blog</Link>
                        <Link href="/about">About</Link>
                        <Link href="/contact">Contact</Link>
                    </nav>

                    {/* Mobile Toggle */}
                    <button
                        className={styles.mobileToggle}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <div className={`${styles.hamburger} ${isMobileMenuOpen ? styles.open : ''}`}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
                <nav>
                    <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                    <Link href="/templates" onClick={() => setIsMobileMenuOpen(false)}>Free Templates</Link>
                    <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
                    <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
                    <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
                </nav>
            </div>
        </header>
    );
}
