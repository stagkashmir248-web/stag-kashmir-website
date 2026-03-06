import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us — Get in Touch with Stag Kashmir",
    description: "Have a question about our cricket bats, a custom order, or need shipping support? Contact the Stag Kashmir team via our form or WhatsApp. We reply same day.",
    keywords: ["contact Stag Kashmir", "cricket bat inquiry", "custom bat order", "Kashmir bat support"],
    alternates: { canonical: "https://stagkashmir.com/contact" },
    openGraph: {
        title: "Contact Stag Kashmir",
        description: "Reach out for cricket bat inquiries, custom orders, or any support. We're here to help.",
        url: "https://stagkashmir.com/contact",
    },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return children;
}
