"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import Razorpay from "razorpay";
import crypto from "crypto";
import { sendEmail } from "@/lib/mail";
import { auth } from "@/auth";
import { ADMIN_EMAIL, LOW_STOCK_THRESHOLD } from "@/lib/constants";

interface CustomerDetails {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    landmark?: string;
    paymentType: "INQUIRY" | "PARTIAL" | "FULL";
}

interface CartItemInput {
    productId: string;
    quantity: number;
    price: number;   // kept for fallback but server verifies from DB
    variationId?: string;
}

export async function submitOrder(
    customer: CustomerDetails,
    items: CartItemInput[],
    total: number,
    amountPaid?: number
) {
    try {
        if (!customer.name || !customer.email || !customer.phone) {
            return { success: false, error: "Contact details are required." };
        }
        if (!customer.address || !customer.city || !customer.state || !customer.pincode) {
            return { success: false, error: "Complete shipping address is required." };
        }
        if (!items || items.length === 0) {
            return { success: false, error: "Cannot submit an empty order." };
        }

        // ── Security: fetch prices from DB — never trust the client ─────────
        let serverTotal = 0;
        const verifiedItems: { productId: string; quantity: number; price: number }[] = [];

        for (const item of items) {
            if (item.quantity < 1 || item.quantity > 100) {
                return { success: false, error: "Invalid quantity." };
            }

            const product = await (prisma.product as any).findUnique({
                where: { id: item.productId },
                select: { id: true, price: true, stock: true },
            });

            if (!product) {
                return { success: false, error: `Product not found: ${item.productId}` };
            }

            // ── Stock availability check ──────────────────────────────────────
            if (product.stock < item.quantity) {
                return {
                    success: false,
                    error: product.stock <= 0
                        ? `Sorry, this product is currently out of stock.`
                        : `Only ${product.stock} unit(s) left in stock for this product.`,
                };
            }

            const serverPrice = Number(product.price);
            serverTotal += serverPrice * item.quantity;
            verifiedItems.push({ productId: item.productId, quantity: item.quantity, price: serverPrice });
        }

        // Allow a tiny rounding tolerance (₹1) in case of floating-point drift
        if (Math.abs(serverTotal - total) > 1) {
            console.error(`Price mismatch: client sent ₹${total}, server computed ₹${serverTotal}`);
            return { success: false, error: "Price mismatch detected. Please refresh and try again." };
        }

        // Generate short tracking code e.g. SK7F2A3B
        const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
        const trackingCode = "SK" + Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");

        const orderStatus = amountPaid
            ? (customer.paymentType === "FULL" ? "PAID" : "PAID_PARTIAL")
            : "PENDING";

        // ── Run in a transaction: create order + decrement stock atomically ──
        const order = await (prisma as any).$transaction(async (tx: any) => {
            // Re-check and decrement stock for each item inside the transaction
            for (const item of verifiedItems) {
                const updated = await tx.product.updateMany({
                    where: { id: item.productId, stock: { gte: item.quantity } },
                    data: { stock: { decrement: item.quantity } },
                });
                if (updated.count === 0) {
                    throw new Error(`STOCK_RACE:${item.productId}`);
                }
            }

            return tx.order.create({
                data: {
                    customer: customer.name,
                    email: customer.email,
                    phone: customer.phone,
                    address: customer.address,
                    city: customer.city,
                    state: customer.state,
                    pincode: customer.pincode,
                    landmark: customer.landmark || null,
                    paymentType: customer.paymentType,
                    amountPaid: amountPaid ?? null,
                    trackingCode,
                    total: serverTotal,
                    status: orderStatus,
                    items: {
                        create: verifiedItems.map((item) => ({
                            quantity: item.quantity,
                            price: item.price,
                            product: { connect: { id: item.productId } },
                        })),
                    },
                },
            });
        });

        // Auto-save address for logged-in users (fire & forget)
        auth().then(session => {
            const userId = (session?.user as any)?.id;
            if (userId && customer.address && customer.city && customer.state && customer.pincode) {
                // Save if this exact address+pincode combo doesn't already exist
                (prisma as any).address.findFirst({
                    where: { userId, address: customer.address, pincode: customer.pincode }
                }).then((existing: any) => {
                    if (!existing) {
                        return (prisma as any).address.count({ where: { userId } }).then((count: number) =>
                            (prisma as any).address.create({
                                data: {
                                    userId,
                                    name: customer.name,
                                    phone: customer.phone,
                                    address: customer.address,
                                    city: customer.city,
                                    state: customer.state,
                                    pincode: customer.pincode,
                                    landmark: customer.landmark || null,
                                    isDefault: count === 0,
                                }
                            })
                        );
                    }
                }).catch(() => { });
            }
        }).catch(() => { });

        // Fire & Forget Emails (Do not await so checkout isn't delayed for user)
        sendEmail({
            to: customer.email,
            subject: `Order Confirmation - Stag Kashmir #${order.id.slice(-8).toUpperCase()}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #D4AF37;">Thank you for your order, ${customer.name}!</h2>
                    <p>Your order <strong>#${order.id.slice(-8).toUpperCase()}</strong> has been confirmed.</p>
                    <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <p style="margin: 5px 0;"><strong>Order Total:</strong> ₹${serverTotal.toLocaleString("en-IN")}</p>
                        <p style="margin: 5px 0;"><strong>Amount Paid:</strong> ₹${(amountPaid || 0).toLocaleString("en-IN")}</p>
                        <p style="margin: 5px 0;"><strong>Balance Due:</strong> ₹${Math.max(0, serverTotal - (amountPaid || 0)).toLocaleString("en-IN")}</p>
                    </div>
                    <p><strong>Your Tracking Code:</strong> <span style="font-size: 18px; font-weight: bold; padding: 5px 10px; background: #eee;">${trackingCode}</span></p>
                    <p>You can track your order status anytime here: <br/>
                    <a href="https://stagkashmir.com/track-order" style="color: #0b57d0;">https://stagkashmir.com/track-order</a></p>
                    <p style="margin-top: 30px; font-size: 12px; color: #64748b;">If you have any questions, reply to this email or contact us on WhatsApp.</p>
                </div>
            `
        });

        // ── Admin Notification Email ──────────────────────────────────────────
        const itemRows = verifiedItems.map(item => {
            return `<tr>
                <td style="padding:8px 12px;border-bottom:1px solid #1e293b;">${item.productId.slice(-8).toUpperCase()}</td>
                <td style="padding:8px 12px;border-bottom:1px solid #1e293b;text-align:center;">${item.quantity}</td>
                <td style="padding:8px 12px;border-bottom:1px solid #1e293b;text-align:right;">₹${(item.price * item.quantity).toLocaleString("en-IN")}</td>
            </tr>`;
        }).join("");

        sendEmail({
            to: ADMIN_EMAIL,
            subject: `🛒 New Order – ₹${serverTotal.toLocaleString("en-IN")} from ${customer.name} #${order.id.slice(-8).toUpperCase()}`,
            html: `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0f172a;">
<div style="max-width:580px;margin:0 auto;background:#1a2235;font-family:Arial,sans-serif;border-radius:12px;overflow:hidden;">
  <div style="background:#F5A714;padding:20px 28px;">
    <p style="margin:0;font-size:11px;text-transform:uppercase;letter-spacing:2px;color:#000;font-weight:bold;">Stag Kashmir · Admin Alert</p>
    <h1 style="margin:6px 0 0;font-size:22px;color:#000;">New Order Received 🎉</h1>
  </div>
  <div style="padding:24px 28px;">
    <p style="color:#94a3b8;margin:0 0 16px;font-size:14px;">A new order has been placed on <strong style="color:#fff;">stagkashmir.com</strong>.</p>

    <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:8px;overflow:hidden;border:1px solid #1e293b;margin-bottom:20px;">
      <tr style="background:#0f172a;">
        <td style="padding:10px 14px;color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Order ID</td>
        <td style="padding:10px 14px;color:#F5A714;font-weight:bold;">#${order.id.slice(-8).toUpperCase()}</td>
      </tr>
      <tr style="background:#1a2235;">
        <td style="padding:10px 14px;color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Tracking</td>
        <td style="padding:10px 14px;color:#fff;">${trackingCode}</td>
      </tr>
      <tr style="background:#0f172a;">
        <td style="padding:10px 14px;color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Payment</td>
        <td style="padding:10px 14px;color:#fff;">${customer.paymentType} — Paid ₹${(amountPaid || 0).toLocaleString("en-IN")} / ₹${serverTotal.toLocaleString("en-IN")}</td>
      </tr>
    </table>

    <h3 style="color:#fff;margin:0 0 10px;font-size:14px;">Customer Details</h3>
    <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:8px;overflow:hidden;border:1px solid #1e293b;margin-bottom:20px;">
      <tr style="background:#0f172a;">
        <td style="padding:8px 14px;color:#64748b;font-size:12px;width:35%;">Name</td>
        <td style="padding:8px 14px;color:#fff;">${customer.name}</td>
      </tr>
      <tr style="background:#1a2235;">
        <td style="padding:8px 14px;color:#64748b;font-size:12px;">Email</td>
        <td style="padding:8px 14px;color:#fff;">${customer.email}</td>
      </tr>
      <tr style="background:#0f172a;">
        <td style="padding:8px 14px;color:#64748b;font-size:12px;">Phone</td>
        <td style="padding:8px 14px;color:#fff;">${customer.phone}</td>
      </tr>
      <tr style="background:#1a2235;">
        <td style="padding:8px 14px;color:#64748b;font-size:12px;">Address</td>
        <td style="padding:8px 14px;color:#fff;">${customer.address}, ${customer.city}, ${customer.state} – ${customer.pincode}${customer.landmark ? ` (${customer.landmark})` : ""}</td>
      </tr>
    </table>

    <h3 style="color:#fff;margin:0 0 10px;font-size:14px;">Items Ordered</h3>
    <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:8px;overflow:hidden;border:1px solid #1e293b;margin-bottom:24px;">
      <tr style="background:#0f172a;">
        <th style="padding:8px 12px;color:#64748b;font-size:11px;text-align:left;">Product ID</th>
        <th style="padding:8px 12px;color:#64748b;font-size:11px;text-align:center;">Qty</th>
        <th style="padding:8px 12px;color:#64748b;font-size:11px;text-align:right;">Subtotal</th>
      </tr>
      ${itemRows}
      <tr style="background:#0f172a;">
        <td colspan="2" style="padding:10px 12px;font-weight:bold;color:#fff;text-align:right;">Order Total</td>
        <td style="padding:10px 12px;font-weight:bold;color:#F5A714;text-align:right;">₹${serverTotal.toLocaleString("en-IN")}</td>
      </tr>
    </table>

    <a href="https://stagkashmir.com/admin/orders" style="display:inline-block;background:#F5A714;color:#000;font-weight:bold;padding:12px 24px;border-radius:8px;text-decoration:none;font-size:14px;">View Order in Admin Panel →</a>

    <p style="color:#334155;font-size:11px;margin-top:24px;">This is an automated alert sent to ${ADMIN_EMAIL}. Do not reply.</p>
  </div>
</div>
</body>
</html>`,
        });

        // ── Low Stock Alerts (fire & forget) ─────────────────────────────────
        (async () => {
            for (const item of verifiedItems) {
                const product = await (prisma.product as any).findUnique({
                    where: { id: item.productId },
                    select: { name: true, stock: true, slug: true },
                });
                if (product && product.stock <= LOW_STOCK_THRESHOLD && product.stock > 0) {
                    sendEmail({
                        to: ADMIN_EMAIL,
                        subject: `⚠️ Low Stock Alert: ${product.name} (${product.stock} left)`,
                        html: `
<div style="max-width:520px;margin:0 auto;font-family:Arial,sans-serif;background:#1a2235;border-radius:12px;overflow:hidden;">
  <div style="background:#ef4444;padding:16px 24px;">
    <p style="margin:0;font-size:11px;text-transform:uppercase;letter-spacing:2px;color:#fff;font-weight:bold;">Stag Kashmir · Stock Alert</p>
    <h2 style="margin:6px 0 0;color:#fff;font-size:18px;">Low Stock Warning ⚠️</h2>
  </div>
  <div style="padding:20px 24px;">
    <p style="color:#94a3b8;margin:0 0 12px;"><strong style="color:#fff;">${product.name}</strong> is running low.</p>
    <p style="font-size:28px;font-weight:bold;color:#ef4444;margin:0 0 16px;">${product.stock} units remaining</p>
    <a href="https://stagkashmir.com/admin/products" style="display:inline-block;background:#F5A714;color:#000;font-weight:bold;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:13px;">Manage Stock →</a>
  </div>
</div>`,
                    });
                }
                if (product && product.stock === 0) {
                    sendEmail({
                        to: ADMIN_EMAIL,
                        subject: `🚫 Out of Stock: ${product.name}`,
                        html: `
<div style="max-width:520px;margin:0 auto;font-family:Arial,sans-serif;background:#1a2235;border-radius:12px;overflow:hidden;">
  <div style="background:#991b1b;padding:16px 24px;">
    <p style="margin:0;font-size:11px;text-transform:uppercase;letter-spacing:2px;color:#fff;font-weight:bold;">Stag Kashmir · Stock Alert</p>
    <h2 style="margin:6px 0 0;color:#fff;font-size:18px;">Product Out of Stock 🚫</h2>
  </div>
  <div style="padding:20px 24px;">
    <p style="color:#94a3b8;margin:0 0 12px;"><strong style="color:#fff;">${product.name}</strong> is now completely out of stock.</p>
    <p style="color:#94a3b8;font-size:13px;">The product has been automatically hidden from purchase options.</p>
    <a href="https://stagkashmir.com/admin/products" style="display:inline-block;background:#F5A714;color:#000;font-weight:bold;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:13px;">Update Stock →</a>
  </div>
</div>`,
                    });
                }
            }
        })().catch(() => { });

        revalidatePath("/admin/orders");

        return { success: true, orderId: order.id, trackingCode };
    } catch (error: any) {
        console.error("❌ Failed to submit order:", JSON.stringify(error, null, 2));
        // Return generic message — don't expose Prisma internals
        return { success: false, error: "Order could not be saved. Please contact support via WhatsApp." };
    }
}

// ── Razorpay helpers ─────────────────────────────────────────────────────────

export async function createRazorpayOrder(amount: number) {
    try {
        const rzp = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID!,
            key_secret: process.env.RAZORPAY_SECRET!,
        });

        const rzpOrder = await rzp.orders.create({
            amount: amount * 100,
            currency: "INR",
            receipt: `sk_${Date.now()}`,
        });

        return { id: rzpOrder.id, amount: rzpOrder.amount };
    } catch (error: any) {
        console.error("❌ Failed to create Razorpay order:", error?.message ?? error);
        throw new Error("Could not create payment session. Please try again.");
    }
}

export async function verifyRazorpaySignature(orderId: string, paymentId: string, signature: string) {
    try {
        const body = orderId + "|" + paymentId;
        const expected = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET!)
            .update(body)
            .digest("hex");
        const isValid = expected === signature;
        if (!isValid) {
            console.error("❌ Razorpay signature mismatch");
        }
        return isValid;
    } catch (error: any) {
        console.error("❌ Signature verification error:", error?.message ?? error);
        return false;
    }
}
