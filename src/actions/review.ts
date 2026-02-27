"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitReview(data: {
    productId: string;
    productSlug: string;
    authorName: string;
    rating: number;
    comment: string;
}) {
    if (!data.authorName.trim() || !data.comment.trim() || data.rating < 1 || data.rating > 5) {
        return { success: false, error: "Please fill in all fields with a valid rating." };
    }
    try {
        await (prisma as any).review.create({
            data: {
                productId: data.productId,
                authorName: data.authorName.trim(),
                rating: data.rating,
                comment: data.comment.trim(),
                approved: false,
            },
        });
        revalidatePath(`/shop/${data.productSlug}`);
        return { success: true };
    } catch (error) {
        console.error("Failed to submit review:", error);
        return { success: false, error: "Failed to submit review." };
    }
}

export async function getReviewsForProduct(productId: string) {
    try {
        const reviews = await (prisma as any).review.findMany({
            where: { productId, approved: true },
            orderBy: { createdAt: "desc" },
        });
        return reviews as { id: string; authorName: string; rating: number; comment: string; createdAt: Date }[];
    } catch {
        return [];
    }
}

export async function getAllReviews() {
    try {
        const reviews = await (prisma as any).review.findMany({
            orderBy: { createdAt: "desc" },
            include: { product: { select: { name: true, slug: true } } },
        });
        return reviews;
    } catch {
        return [];
    }
}

export async function approveReview(id: string) {
    try {
        await (prisma as any).review.update({ where: { id }, data: { approved: true } });
        revalidatePath("/admin/reviews");
        return { success: true };
    } catch {
        return { success: false };
    }
}

export async function deleteReview(id: string) {
    try {
        await (prisma as any).review.delete({ where: { id } });
        revalidatePath("/admin/reviews");
        return { success: true };
    } catch {
        return { success: false };
    }
}
