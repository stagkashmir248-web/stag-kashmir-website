import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import MarkViewedEffect from "@/components/MarkViewedEffect";
import InquiriesClient from "./InquiriesClient";

export const dynamic = "force-dynamic";

const getCachedInquiries = unstable_cache(
    async () => prisma.inquiry.findMany({ orderBy: { createdAt: "desc" } }),
    ["admin-inquiries"],
    { revalidate: 30, tags: ["admin-inquiries"] }
);

export default async function AdminInquiriesPage() {
    const inquiries = await getCachedInquiries();

    return (
        <div className="flex flex-col gap-8 w-full max-w-6xl">
            <MarkViewedEffect type="inquiries" />
            <InquiriesClient inquiries={inquiries} />
        </div>
    );
}
