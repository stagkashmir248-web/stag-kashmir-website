"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { sendEmail } from "@/lib/mail";

const ADMIN_EMAIL = "stagkashmir248@gmail.com";

async function requireAdmin() {
    const session = await auth();
    if (session?.user?.email !== ADMIN_EMAIL) {
        throw new Error("Unauthorized");
    }
}

export async function updateOrderStatus(orderId: string, newStatus: string, note?: string) {
    try {
        await requireAdmin();

        const VALID_STATUSES = ["PENDING", "PROCESSING", "PAID", "PAID_PARTIAL", "DISPATCHED", "SHIPPED", "DELIVERED", "CANCELLED"];
        if (!VALID_STATUSES.includes(newStatus)) {
            return { success: false, error: "Invalid status value." };
        }

        // Fetch the old order to see if status actually changed
        const existingOrder = await prisma.order.findUnique({
            where: { id: orderId }
        });

        if (!existingOrder) {
            return { success: false, error: "Order not found." };
        }

        const updatedOrder = await prisma.order.update({
            where: { id: orderId },
            data: {
                status: newStatus,
                ...(note !== undefined && { adminNote: note })
            }
        });

        // If the status actually changed, send an email to the customer
        if (existingOrder.status !== newStatus) {

            let statusMessage = "Your order status has been updated.";
            let statusColor = "#333333";

            if (newStatus === "PROCESSING") {
                statusMessage = "Good news! We have started processing your order.";
                statusColor = "#f59e0b"; // amber
            } else if (newStatus === "SHIPPED" || newStatus === "DISPATCHED") {
                statusMessage = "Great news! Your order has been shipped and is on its way to you.";
                statusColor = "#3b82f6"; // blue
            } else if (newStatus === "DELIVERED") {
                statusMessage = "Your order has been marked as Delivered! Enjoy your premium Stag Kashmir bat.";
                statusColor = "#22c55e"; // green
            } else if (newStatus === "CANCELLED") {
                statusMessage = "Your order has been cancelled.";
                statusColor = "#ef4444"; // red
            }

            // Include any admin notes (could be tracking numbers)
            const trackingDetailHtml = updatedOrder.adminNote ? `
                <div style="margin-top: 20px; padding: 15px; background-color: #f8fafc; border-left: 4px solid #94a3b8; border-radius: 4px;">
                    <p style="margin: 0; color: #475569; font-size: 14px;"><strong>Shipping / Tracking Note:</strong></p>
                    <p style="margin: 8px 0 0 0; color: #334155; font-size: 15px;">${updatedOrder.adminNote}</p>
                </div>
            ` : "";

            const htmlContent = `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 8px; overflow: hidden;">
                    <div style="background-color: #fce7f3; text-align: center; padding: 20px;">
                        <img src="https://stagkashmir.com/Stag_logo-removebg-preview.png" alt="Stag Kashmir" style="max-height: 60px;" />
                    </div>
                    <div style="padding: 30px; background-color: #ffffff;">
                        <h2 style="margin-top: 0; color: #1f2937;">Order Update: #${updatedOrder.id.slice(-6).toUpperCase()}</h2>
                        <p style="color: #4b5563; font-size: 16px;">Hi ${updatedOrder.customer},</p>
                        <p style="color: #4b5563; font-size: 16px;">${statusMessage}</p>
                        
                        <div style="margin: 25px 0; text-align: center;">
                            <span style="display: inline-block; background-color: ${statusColor}; color: white; padding: 8px 16px; border-radius: 9999px; font-weight: bold; font-size: 14px; letter-spacing: 1px;">
                                STATUS: ${newStatus}
                            </span>
                        </div>
                        
                        ${trackingDetailHtml}
                        
                        <p style="color: #6b7280; font-size: 14px; margin-top: 30px; border-top: 1px solid #eaeaea; padding-top: 20px;">
                            If you have any questions, simply reply to this email or contact us on WhatsApp.
                        </p>
                    </div>
                    <div style="background-color: #f9fafb; text-align: center; padding: 15px; color: #9ca3af; font-size: 12px;">
                        © ${new Date().getFullYear()} Stag Kashmir. Handcrafted in Kashmir.
                    </div>
                </div>
            `;

            // Fire and forget email
            sendEmail({
                to: updatedOrder.email,
                subject: `Order Update: ${newStatus} - Stag Kashmir #${updatedOrder.id.slice(-6).toUpperCase()}`,
                text: `Hi ${updatedOrder.customer}, ${statusMessage}`,
                html: htmlContent
            }).catch(e => console.error("Error sending order status email:", e));
        }

        revalidatePath("/admin/orders");
        revalidatePath("/admin");
        return { success: true };
    } catch (error: any) {
        if (error?.message === "Unauthorized") {
            return { success: false, error: "Unauthorized." };
        }
        console.error("Failed to update order status:", error);
        return { success: false, error: "Failed to update status." };
    }
}
