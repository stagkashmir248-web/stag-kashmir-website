"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { sendEmail } from "@/lib/mail";
import { ADMIN_EMAIL } from "@/lib/constants";

async function requireAdmin() {
    const session = await auth();
    if (session?.user?.email !== ADMIN_EMAIL) throw new Error("Unauthorized");
}

// ── Save an abandoned cart (called on email blur at checkout) ────────────────
export async function saveAbandonedCart(email: string, cartJson: string) {
    if (!email || !email.includes("@")) return;
    try {
        await (prisma as any).abandonedCart.create({
            data: { email, cartJson }
        });
    } catch { /* fail silently — non-critical */ }
}

// ── Admin: Get all unsent abandoned carts ────────────────────────────────────
export async function getAbandonedCarts() {
    await requireAdmin();
    return (prisma as any).abandonedCart.findMany({
        orderBy: { createdAt: "desc" },
        where: { sentAt: null }
    });
}

// ── Admin: Send recovery email for an abandoned cart ─────────────────────────
export async function sendAbandonedCartEmail(id: string) {
    await requireAdmin();

    const cart = await (prisma as any).abandonedCart.findUnique({ where: { id } });
    if (!cart) return { success: false, error: "Cart not found." };

    let items: { name: string; price: number; quantity: number }[] = [];
    try {
        items = JSON.parse(cart.cartJson);
    } catch { items = []; }

    const total = items.reduce((s: number, i: any) => s + i.price * i.quantity, 0);

    const itemsHtml = items.map((item: any) =>
        `<tr>
            <td style="padding:8px;border-bottom:1px solid #f0f0f0;">${item.name}</td>
            <td style="padding:8px;border-bottom:1px solid #f0f0f0;text-align:center;">${item.quantity}</td>
            <td style="padding:8px;border-bottom:1px solid #f0f0f0;text-align:right;">₹${(item.price * item.quantity).toLocaleString("en-IN")}</td>
        </tr>`
    ).join("");

    const html = `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
            <div style="background:#1a1a1a;padding:20px;text-align:center;">
                <img src="https://stagkashmir.com/Stag_logo-removebg-preview.png" alt="Stag Kashmir" style="max-height:60px;" />
            </div>
            <div style="padding:30px;background:#fff;">
                <h2 style="color:#1f2937;">You left something behind! 🏏</h2>
                <p style="color:#4b5563;">Hi there! You started shopping at Stag Kashmir but didn't complete your order. Your cart is saved — come back and claim your bat!</p>
                <table style="width:100%;border-collapse:collapse;margin:20px 0;">
                    <thead>
                        <tr style="background:#f8fafc;">
                            <th style="padding:8px;text-align:left;font-size:12px;color:#6b7280;">ITEM</th>
                            <th style="padding:8px;text-align:center;font-size:12px;color:#6b7280;">QTY</th>
                            <th style="padding:8px;text-align:right;font-size:12px;color:#6b7280;">PRICE</th>
                        </tr>
                    </thead>
                    <tbody>${itemsHtml}</tbody>
                </table>
                <p style="text-align:right;font-weight:bold;font-size:18px;color:#1f2937;">Total: ₹${total.toLocaleString("en-IN")}</p>
                <div style="text-align:center;margin-top:30px;">
                    <a href="https://stagkashmir.com/cart" style="background:#D4AF37;color:#000;padding:14px 32px;text-decoration:none;border-radius:8px;font-weight:bold;font-size:16px;display:inline-block;">
                        Complete My Order →
                    </a>
                </div>
            </div>
            <div style="padding:20px;text-align:center;color:#9ca3af;font-size:12px;background:#f9fafb;">
                <p>Handcrafted in Kashmir. Played Worldwide.</p>
                <p>© ${new Date().getFullYear()} Stag Kashmir</p>
            </div>
        </div>
    `;

    const result = await sendEmail({
        to: cart.email,
        subject: "You left something in your cart — Stag Kashmir 🏏",
        text: `Hi! You left items in your cart at Stag Kashmir. Visit https://stagkashmir.com/cart to complete your order.`,
        html,
    });

    if (!result.success) {
        return { success: false, error: "Failed to send recovery email." };
    }

    await (prisma as any).abandonedCart.update({
        where: { id },
        data: { sentAt: new Date() }
    });

    return { success: true };
}
