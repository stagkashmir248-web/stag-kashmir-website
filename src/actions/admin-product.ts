"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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

export async function createProduct(data: {
    name: string;
    slug: string;
    description: string;
    price: number;
    stock: number;
    imageUrl?: string;
}) {
    try {
        const product = await prisma.product.create({
            data: {
                name: data.name,
                slug: data.slug,
                description: data.description,
                price: data.price,
                stock: data.stock,
                imageUrl: data.imageUrl,
            },
        });

        revalidatePath("/admin/products");
        revalidatePath("/shop");
        return { success: true, product };
    } catch (error) {
        console.error("Failed to create product:", error);
        // Prisma unique constraint validation
        if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
            return { success: false, error: "A product with this slug already exists." };
        }
        return { success: false, error: "Failed to create product." };
    }
}

export async function updateProduct(id: string, data: {
    name: string;
    slug: string;
    description: string;
    price: number;
    stock: number;
    imageUrl?: string;
}) {
    try {
        const product = await prisma.product.update({
            where: { id },
            data: {
                name: data.name,
                slug: data.slug,
                description: data.description,
                price: data.price,
                stock: data.stock,
                ...(data.imageUrl && { imageUrl: data.imageUrl }), // Only update image if provided
            },
        });

        revalidatePath("/admin/products");
        revalidatePath("/shop");
        revalidatePath(`/shop/${product.slug}`);
        return { success: true, product };
    } catch (error) {
        console.error("Failed to update product:", error);
        // Prisma unique constraint validation
        if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
            return { success: false, error: "A product with this slug already exists." };
        }
        return { success: false, error: "Failed to update product." };
    }
}
