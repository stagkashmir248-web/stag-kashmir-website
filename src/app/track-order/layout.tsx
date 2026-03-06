import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Track Your Order — Stag Kashmir",
    description: "Track your Stag Kashmir cricket bat order in real time. Enter your WhatsApp number and 6-digit tracking code to see your order status and shipping updates.",
    keywords: ["track cricket bat order", "Stag Kashmir order tracking", "order status Kashmir bat"],
    alternates: { canonical: "https://stagkashmir.com/track-order" },
    robots: { index: false, follow: false },
};

export default function TrackOrderLayout({ children }: { children: React.ReactNode }) {
    return children;
}
