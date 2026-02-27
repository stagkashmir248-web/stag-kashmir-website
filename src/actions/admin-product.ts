"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteProduct(productId: string) {
    try {
        await prisma.product.delete({ where: { id: productId } });
        revalidatePath("/admin/products");
        revalidatePath("/shop");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete product:", error);
        return { success: false, error: "Failed to delete product." };
    }
}

type ProductSpecsInput = {
    willowType?: string;
    grade?: string;
    blade?: string;
    ballType?: string;
    warranty?: string;
    features?: string[];
    category?: string;
};

export async function createProduct(data: {
    name: string;
    slug: string;
    description: string;
    price: number;
    compareAtPrice?: number;
    stock: number;
    imageUrl?: string;
    images?: string[];
    videoUrl?: string;
    variations?: { name: string; price: number; compareAtPrice?: number; stock: number }[];
} & ProductSpecsInput) {
    try {
        const product = await prisma.product.create({
            data: {
                name: data.name,
                slug: data.slug,
                description: data.description,
                price: data.price,
                compareAtPrice: data.compareAtPrice || null,
                stock: data.stock,
                imageUrl: data.imageUrl,
                images: data.images || [],
                videoUrl: data.videoUrl,
                willowType: data.willowType || null,
                grade: data.grade || null,
                blade: data.blade || null,
                ballType: data.ballType || null,
                warranty: data.warranty || null,
                features: data.features || [],
                category: data.category || null,
                variations: { create: data.variations || [] }
            },
        });
        revalidatePath("/admin/products");
        revalidatePath("/shop");
        return { success: true, product };
    } catch (error) {
        console.error("Failed to create product:", error);
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
    compareAtPrice?: number;
    stock: number;
    imageUrl?: string;
    images?: string[];
    videoUrl?: string;
    variations?: { id?: string; name: string; price: number; compareAtPrice?: number; stock: number }[];
} & ProductSpecsInput) {
    try {
        await prisma.productVariation.deleteMany({ where: { productId: id } });

        const product = await prisma.product.update({
            where: { id },
            data: {
                name: data.name,
                slug: data.slug,
                description: data.description,
                price: data.price,
                compareAtPrice: data.compareAtPrice || null,
                stock: data.stock,
                ...(data.imageUrl && { imageUrl: data.imageUrl }),
                ...(data.images !== undefined && { images: data.images }),
                ...(data.videoUrl !== undefined && { videoUrl: data.videoUrl }),
                willowType: data.willowType || null,
                grade: data.grade || null,
                blade: data.blade || null,
                ballType: data.ballType || null,
                warranty: data.warranty || null,
                features: data.features || [],
                category: data.category || null,
                variations: {
                    create: data.variations?.map(v => ({
                        name: v.name,
                        price: v.price,
                        compareAtPrice: v.compareAtPrice || null,
                        stock: v.stock
                    })) || []
                }
            },
        });

        revalidatePath("/admin/products");
        revalidatePath("/shop");
        revalidatePath(`/shop/${product.slug}`);
        return { success: true, product };
    } catch (error) {
        console.error("Failed to update product:", error);
        if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
            return { success: false, error: "A product with this slug already exists." };
        }
        return { success: false, error: "Failed to update product." };
    }
}
