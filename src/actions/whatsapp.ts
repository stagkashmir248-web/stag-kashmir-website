"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveWhatsAppLead(name: string, phone: string) {
    if (!name || !phone) {
        return { success: false, error: "Name and phone are required." };
    }

    try {
        await prisma.whatsAppLead.create({
            data: {
                name,
                phone,
            },
        });
        
        revalidatePath("/admin");
        return { success: true };
    } catch (error) {
        console.error("Failed to save WhatsApp lead:", error);
        return { success: false, error: "Failed to save lead." };
    }
}
