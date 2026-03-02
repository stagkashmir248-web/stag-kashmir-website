"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

const ADMIN_EMAIL = "stagkashmir248@gmail.com";

export async function getAdminCounts() {
    try {
        const session = await auth();
        if (session?.user?.email !== ADMIN_EMAIL) {
            return { success: false, error: "Unauthorized" };
        }

        const [ordersCount, inquiriesCount, newsletterCount] = await Promise.all([
            prisma.order.count(),
            prisma.inquiry.count(),
            prisma.newsletterSubscriber.count()
        ]);

        return {
            success: true,
            data: {
                orders: ordersCount,
                inquiries: inquiriesCount,
                newsletter: newsletterCount
            }
        };
    } catch (error) {
        console.error("Failed to fetch admin counts:", error);
        return { success: false, error: "Failed to fetch counts" };
    }
}
