import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Toaster } from 'react-hot-toast';
import NextTopLoader from 'nextjs-toploader';
import Providers from '@/components/Providers';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    variable: '--font-space-grotesk',
    display: 'swap',
});

export const metadata: Metadata = {
    metadataBase: new URL('https://stagkashmir.com'),
    title: {
        default: 'Stag Kashmir — Premium Handcrafted Cricket Bats',
        template: '%s | Stag Kashmir',
    },
    description: 'Shop premium handcrafted Kashmir Willow cricket bats. Hard tennis, soft tennis, season leather & junior bats made by master artisans in Kashmir. Free Pan India delivery.',
    keywords: [
        'Kashmir willow cricket bat', 'hard tennis bat', 'soft tennis bat', 'season leather bat',
        'handcrafted cricket bat', 'Kashmir cricket bat', 'buy cricket bat online India',
        'junior cricket bat', 'premium willow bat', 'Stag Kashmir', 'cricket bat Kashmir',
        'best cricket bat under 2000', 'English willow cricket bat India',
    ],
    authors: [{ name: 'Stag Kashmir', url: 'https://stagkashmir.com' }],
    creator: 'Stag Kashmir',
    publisher: 'Stag Kashmir',
    alternates: { canonical: 'https://stagkashmir.com' },
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
    openGraph: {
        type: 'website',
        locale: 'en_IN',
        url: 'https://stagkashmir.com',
        siteName: 'Stag Kashmir',
        title: 'Stag Kashmir — Premium Handcrafted Cricket Bats',
        description: 'Shop premium handcrafted Kashmir Willow cricket bats. Hard tennis, soft tennis, season leather & junior bats made by master artisans in Kashmir.',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Stag Kashmir — Handcrafted Cricket Bats from Kashmir' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Stag Kashmir — Premium Handcrafted Cricket Bats',
        description: 'Shop premium handcrafted Kashmir Willow cricket bats. Pan India delivery.',
        images: ['/og-image.png'],
        site: '@stagkashmir',
    },
    icons: {
        icon: '/siteicon.jpg',
        shortcut: '/siteicon.jpg',
        apple: '/siteicon.jpg',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
            <head>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
                {/* Organization Schema — Google Knowledge Panel */}
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "name": "Stag Kashmir",
                    "url": "https://stagkashmir.com",
                    "logo": "https://stagkashmir.com/Stag_logo.png",
                    "description": "Premium handcrafted Kashmir Willow cricket bats made by master artisans in Kashmir, India.",
                    "foundingLocation": { "@type": "Place", "name": "Kashmir, India" },
                    "contactPoint": {
                        "@type": "ContactPoint",
                        "telephone": "+91-9469886630",
                        "contactType": "customer service",
                        "availableLanguage": ["English", "Hindi", "Kashmiri"]
                    },
                    "sameAs": [
                        "https://www.instagram.com/stagkashmir248",
                        "https://wa.me/919469886630"
                    ],
                    "areaServed": "IN",
                    "currenciesAccepted": "INR",
                    "paymentAccepted": "Cash, Credit Card, UPI, Net Banking"
                }) }} />
                {/* WebSite Schema — Google Sitelinks Searchbox */}
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "WebSite",
                    "name": "Stag Kashmir",
                    "url": "https://stagkashmir.com",
                    "potentialAction": {
                        "@type": "SearchAction",
                        "target": { "@type": "EntryPoint", "urlTemplate": "https://stagkashmir.com/shop?query={search_term_string}" },
                        "query-input": "required name=search_term_string"
                    }
                }) }} />
            </head>
            <body className={`${spaceGrotesk.variable} bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display overflow-x-hidden`}>
                <Providers>
                    <NextTopLoader color="#F97316" showSpinner={false} height={3} />
                    <WhatsAppButton />
                    <Toaster position="bottom-right" reverseOrder={false} />
                    <div className="flex min-h-screen flex-col selection:bg-primary/20 selection:text-primary">
                        <Header />
                        <main className="flex flex-col flex-grow pt-[72px]">
                            {children}
                        </main>
                        <Footer />
                    </div>
                </Providers>
            </body>
        </html>
    );
}
