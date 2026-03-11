import { prisma } from "@/lib/prisma";
import WhatsAppLeadsClient from "./WhatsAppLeadsClient";

export const dynamic = "force-dynamic";

export default async function WhatsAppLeadsPage() {
    // Fetch all WhatsApp leads, sorted newest first
    const leads = await prisma.whatsAppLead.findMany({
        orderBy: { createdAt: "desc" },
    });

    return <WhatsAppLeadsClient leads={leads} />;
}
