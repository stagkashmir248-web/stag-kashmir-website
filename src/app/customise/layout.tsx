import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Customise Your Cricket Bat — Made to Order",
    description: "Build your dream cricket bat. Choose willow grade, bat size, weight, handle shape, and grip colour. Our master craftsmen in Kashmir will handcraft it to your exact specs.",
    keywords: ["custom cricket bat India", "custom Kashmir willow bat", "personalised cricket bat", "made to order cricket bat", "custom bat Stag Kashmir"],
    alternates: { canonical: "https://stagkashmir.com/customise" },
    openGraph: {
        title: "Customise Your Cricket Bat — Stag Kashmir",
        description: "Design your perfect bat. Choose your size, weight, willow grade and grip colour. Handcrafted to order in Kashmir.",
        url: "https://stagkashmir.com/customise",
    },
};

export default function CustomiseLayout({ children }: { children: React.ReactNode }) {
    return children;
}
