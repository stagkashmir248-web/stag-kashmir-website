"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { ADMIN_EMAIL } from "@/lib/constants";

async function requireAdmin() {
    const session = await auth();
    if (session?.user?.email !== ADMIN_EMAIL) throw new Error("Unauthorized");
}

// ── Public: Validate a coupon code ───────────────────────────────────────────
export async function validateCoupon(code: string, orderTotal: number) {
    if (!code.trim()) return { valid: false, error: "Please enter a coupon code." };

    const coupon = await (prisma as any).discountCode.findUnique({
        where: { code: code.trim().toUpperCase() }
    });

    if (!coupon) return { valid: false, error: "Invalid coupon code." };
    if (!coupon.isActive) return { valid: false, error: "This coupon is no longer active." };
    if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
        return { valid: false, error: "This coupon has expired." };
    }
    if (coupon.maxUses !== null && coupon.usedCount >= coupon.maxUses) {
        return { valid: false, error: "This coupon has reached its usage limit." };
    }
    if (coupon.minOrderValue && orderTotal < coupon.minOrderValue) {
        return {
            valid: false,
            error: `Minimum order of ₹${coupon.minOrderValue.toLocaleString("en-IN")} required for this coupon.`
        };
    }

    const discountAmount = coupon.type === "PERCENT"
        ? Math.round((orderTotal * coupon.value) / 100)
        : Math.min(coupon.value, orderTotal);

    return {
        valid: true,
        couponId: coupon.id,
        discountAmount,
        code: coupon.code,
        type: coupon.type as "PERCENT" | "FIXED",
        value: coupon.value,
        description: coupon.type === "PERCENT"
            ? `${coupon.value}% off`
            : `₹${coupon.value} off`,
    };
}

// ── Admin: Increment usage count after successful order ──────────────────────
export async function incrementCouponUsage(couponId: string) {
    try {
        await (prisma as any).discountCode.update({
            where: { id: couponId },
            data: { usedCount: { increment: 1 } }
        });
    } catch { /* fail silently */ }
}

// ── Admin: Get all coupons ───────────────────────────────────────────────────
export async function getDiscountCodes() {
    await requireAdmin();
    return (prisma as any).discountCode.findMany({ orderBy: { createdAt: "desc" } });
}

// ── Admin: Create a coupon ───────────────────────────────────────────────────
export async function createDiscountCode(data: {
    code: string;
    type: "PERCENT" | "FIXED";
    value: number;
    minOrderValue?: number;
    maxUses?: number;
    expiresAt?: string;
}) {
    await requireAdmin();
    try {
        await (prisma as any).discountCode.create({
            data: {
                code: data.code.trim().toUpperCase(),
                type: data.type,
                value: data.value,
                minOrderValue: data.minOrderValue || null,
                maxUses: data.maxUses || null,
                expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
            }
        });
        revalidatePath("/admin/coupons");
        return { success: true };
    } catch (err: any) {
        return { success: false, error: err?.message?.includes("Unique") ? "Coupon code already exists." : "Failed to create coupon." };
    }
}

// ── Admin: Toggle a coupon active state ─────────────────────────────────────
export async function toggleDiscountCode(id: string, isActive: boolean) {
    await requireAdmin();
    await (prisma as any).discountCode.update({ where: { id }, data: { isActive } });
    revalidatePath("/admin/coupons");
    return { success: true };
}

// ── Admin: Delete a coupon ───────────────────────────────────────────────────
export async function deleteDiscountCode(id: string) {
    await requireAdmin();
    await (prisma as any).discountCode.delete({ where: { id } });
    revalidatePath("/admin/coupons");
    return { success: true };
}
