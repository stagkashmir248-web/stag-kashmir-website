import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Toaster } from 'react-hot-toast';
import NextTopLoader from 'nextjs-toploader';

export const metadata: Metadata = {
    title: 'Stag Kashmir',
    description: 'Handcrafted English Willow Cricket Bats',
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
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            </head>
            <body className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display overflow-x-hidden">
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
            </body>
        </html>
    );
}
