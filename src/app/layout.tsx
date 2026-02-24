import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'Stag Kashmir',
    description: 'Handcrafted English Willow Cricket Bats',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;700;900&display=swap" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            </head>
            <body className="font-sans">
                <div className="flex min-h-screen flex-col bg-background-main selection:bg-primary/20 selection:text-primary overflow-x-hidden">
                    <Header />
                    <main className="flex-grow pt-[84px] md:pt-[104px]">
                        {children}
                    </main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
