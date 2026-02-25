"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function deleteProduct(productId: string) {
    try {
        // Note: In a real app we might prevent deletion if it's tied to an order, 
        // or use soft deletes. For this MVP, we allow raw deletion.
        await prisma.product.delete({
            where: { id: productId },
        });

        revalidatePath("/admin/products");
        revalidatePath("/shop");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete product:", error);
        return { success: false, error: "Failed to delete product." };
    }
}
