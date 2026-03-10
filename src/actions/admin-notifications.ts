"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { ADMIN_EMAIL } from "@/lib/constants";

export async function getAdminCounts() {
    try {
        const session = await auth();
        if (session?.user?.email !== ADMIN_EMAIL) {
            return { success: false, error: "Unauthorized" };
        }

        const [ordersCount, inquiriesCount, newsletterCount] = await Promise.all([
            prisma.order.count({ where: { adminViewed: false } }),
            prisma.inquiry.count({ where: { adminViewed: false } }),
            prisma.newsletterSubscriber.count({ where: { adminViewed: false } })
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

export async function markOrdersAsViewed() {
    try {
        const session = await auth();
        if (session?.user?.email !== ADMIN_EMAIL) return { success: false };

        await prisma.order.updateMany({
            where: { adminViewed: false },
            data: { adminViewed: true }
        });
        return { success: true };
    } catch (error) {
        console.error("Failed to mark orders as viewed:", error);
        return { success: false };
    }
}

export async function markInquiriesAsViewed() {
    try {
        const session = await auth();
        if (session?.user?.email !== ADMIN_EMAIL) return { success: false };

        await prisma.inquiry.updateMany({
            where: { adminViewed: false },
            data: { adminViewed: true }
        });
        return { success: true };
    } catch (error) {
        console.error("Failed to mark inquiries as viewed:", error);
        return { success: false };
    }
}

export async function markNewsletterAsViewed() {
    try {
        const session = await auth();
        if (session?.user?.email !== ADMIN_EMAIL) return { success: false };

        await prisma.newsletterSubscriber.updateMany({
            where: { adminViewed: false },
            data: { adminViewed: true }
        });
        return { success: true };
    } catch (error) {
        console.error("Failed to mark newsletter as viewed:", error);
        return { success: false };
    }
}
