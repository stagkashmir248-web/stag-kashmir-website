"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

const ADMIN_EMAIL = "stagkashmir248@gmail.com";

async function requireAdmin() {
    const session = await auth();
    if (session?.user?.email !== ADMIN_EMAIL) {
        throw new Error("Unauthorized");
    }
}

export async function updateOrderStatus(orderId: string, newStatus: string) {
    try {
        await requireAdmin();

        const VALID_STATUSES = ["PENDING", "PROCESSING", "PAID", "PAID_PARTIAL", "DISPATCHED", "SHIPPED", "DELIVERED", "CANCELLED"];
        if (!VALID_STATUSES.includes(newStatus)) {
            return { success: false, error: "Invalid status value." };
        }

        await prisma.order.update({
            where: { id: orderId },
            data: { status: newStatus }
        });

        revalidatePath("/admin/orders");
        revalidatePath("/admin");
        return { success: true };
    } catch (error: any) {
        if (error?.message === "Unauthorized") {
            return { success: false, error: "Unauthorized." };
        }
        console.error("Failed to update order status:", error);
        return { success: false, error: "Failed to update status." };
    }
}
