import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import WhatsAppLeadsClient from "./WhatsAppLeadsClient";

export const dynamic = "force-dynamic";

const getCachedLeads = unstable_cache(
    async () => prisma.whatsAppLead.findMany({ orderBy: { createdAt: "desc" } }),
    ["admin-whatsapp-leads"],
    { revalidate: 30, tags: ["admin-whatsapp-leads"] }
);

export default async function WhatsAppLeadsPage() {
    const leads = await getCachedLeads();
    return <WhatsAppLeadsClient leads={leads} />;
}
