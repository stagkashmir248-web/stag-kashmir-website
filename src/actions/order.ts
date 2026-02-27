"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import Razorpay from "razorpay";
import crypto from "crypto";

const prisma = new PrismaClient();

interface CustomerDetails {
    name: string;
    email: string;
    phone: string;
    // Shipping
    address: string;
    city: string;
    state: string;
    pincode: string;
    landmark?: string;
    // Payment type chosen
    paymentType: "INQUIRY" | "PARTIAL" | "FULL";
}

interface CartItemInput {
    productId: string;
    quantity: number;
    price: number;
    variationId?: string;
}

export async function submitOrder(
    customer: CustomerDetails,
    items: CartItemInput[],
    total: number,
    amountPaid?: number   // set when Razorpay payment completes
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

        // Generate a short guest tracking code e.g. SK7F2A3B
        const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
        const trackingCode = "SK" + Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");

        const orderStatus = amountPaid
            ? (customer.paymentType === "FULL" ? "PAID" : "PAID_PARTIAL")
            : "PENDING";

        const order = await (prisma.order as any).create({
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
                total,
                status: orderStatus,
                items: {
                    create: items.map((item) => ({
                        quantity: item.quantity,
                        price: item.price,
                        product: { connect: { id: item.productId } },
                    })),
                },
            },
        });

        revalidatePath("/admin/orders");
        return { success: true, orderId: order.id, trackingCode };
    } catch (error: any) {
        console.error("❌ Failed to submit order:", JSON.stringify(error, null, 2));
        return { success: false, error: `Order save failed: ${error?.message ?? "Unknown error"}` };
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
            console.error("❌ Razorpay signature mismatch", { expected, received: signature });
        }
        return isValid;
    } catch (error: any) {
        console.error("❌ Signature verification error:", error?.message ?? error);
        return false;
    }
}
