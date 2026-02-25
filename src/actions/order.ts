"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

interface CustomerDetails {
    name: string;
    email: string;
    phone: string;
}

interface CartItemInput {
    productId: string;
    quantity: number;
    price: number;
}

export async function submitOrder(
    customer: CustomerDetails,
    items: CartItemInput[],
    total: number
) {
    try {
        if (!customer.name || !customer.email || !customer.phone) {
            return { success: false, error: "All customer fields are required." };
        }

        if (!items || items.length === 0) {
            return { success: false, error: "Cannot submit an empty order." };
        }

        // Create the order and its items in a single transaction
        const order = await prisma.order.create({
            data: {
                customer: customer.name,
                email: customer.email,
                phone: customer.phone,
                total: total,
                status: "PENDING", // Default status for unpaid inquiries
                items: {
                    create: items.map((item) => ({
                        quantity: item.quantity,
                        price: item.price,
                        product: {
                            connect: { id: item.productId },
                        },
                    })),
                },
            },
        });

        console.log(`Order created successfully: ${order.id}`);

        // Optional: Revalidate the admin dashboard path later
        revalidatePath("/admin/orders");

        return { success: true, orderId: order.id };
    } catch (error) {
        console.error("Failed to submit order:", error);
        return {
            success: false,
            error: "An error occurred while submitting your order. Please try again.",
        };
    }
}
