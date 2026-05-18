import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import MarkViewedEffect from "@/components/MarkViewedEffect";
import InquiriesClient from "../inquiries/InquiriesClient";

export const dynamic = "force-dynamic";

const getCachedCustomBats = unstable_cache(
    async () => prisma.inquiry.findMany({ 
        where: { subject: "New Custom Bat Request" },
        orderBy: { createdAt: "desc" } 
    }),
    ["admin-custom-bats"],
    { revalidate: 30, tags: ["admin-inquiries"] }
);

export default async function AdminCustomBatsPage() {
    const customBats = await getCachedCustomBats();

    return (
        <div className="flex flex-col gap-8 w-full max-w-6xl">
            <MarkViewedEffect type="customBat" />
            <InquiriesClient inquiries={customBats} title="Custom Bat Requests" />
        </div>
    );
}
