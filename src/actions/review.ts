"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { ADMIN_EMAIL } from "@/lib/constants";

async function requireAdmin() {
    const session = await auth();
    if (session?.user?.email !== ADMIN_EMAIL) {
        throw new Error("Unauthorized");
    }
}

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

export async function addManualReview(data: {
    productId: string;
    productSlug: string;
    authorName: string;
    rating: number;
    comment: string;
    createdAt?: Date;
}) {
    await requireAdmin();
    if (!data.productId || !data.authorName.trim() || !data.comment.trim() || data.rating < 1 || data.rating > 5) {
        return { success: false, error: "Please fill in all fields correctly." };
    }
    try {
        await (prisma as any).review.create({
            data: {
                productId: data.productId,
                authorName: data.authorName.trim(),
                rating: data.rating,
                comment: data.comment.trim(),
                approved: true, // Auto-approve manual admin reviews
                ...(data.createdAt ? { createdAt: data.createdAt } : {})
            },
        });
        revalidatePath(`/shop/${data.productSlug}`);
        revalidatePath("/admin/reviews");
        return { success: true };
    } catch (error) {
        console.error("Failed to add manual review:", error);
        return { success: false, error: "Failed to add review." };
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
    await requireAdmin();
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
    await requireAdmin();
    try {
        await (prisma as any).review.update({ where: { id }, data: { approved: true } });
        revalidatePath("/admin/reviews");
        return { success: true };
    } catch {
        return { success: false };
    }
}

export async function deleteReview(id: string) {
    await requireAdmin();
    try {
        await (prisma as any).review.delete({ where: { id } });
        revalidatePath("/admin/reviews");
        return { success: true };
    } catch {
        return { success: false };
    }
}
