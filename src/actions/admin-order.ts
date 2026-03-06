"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { sendEmail } from "@/lib/mail";
import { ADMIN_EMAIL } from "@/lib/constants";

async function requireAdmin() {
    const session = await auth();
    if (session?.user?.email !== ADMIN_EMAIL) {
        throw new Error("Unauthorized");
    }
}

export async function updateOrderStatus(orderId: string, newStatus: string) {
    try {
        await requireAdmin();

        const VALID_STATUSES = ["PENDING", "PROCESSING", "PAID", "PAID_PARTIAL", "DISPATCHED", "SHIPPED", "DELIVERED", "CANCELLED"];
        if (!VALID_STATUSES.includes(newStatus)) {
            return { success: false, error: "Invalid status value." };
        }

        const existingOrder = await prisma.order.findUnique({
            where: { id: orderId }
        });

        if (!existingOrder) {
            return { success: false, error: "Order not found." };
        }

        await prisma.order.update({
            where: { id: orderId },
            data: { status: newStatus }
        });

        revalidatePath("/admin/orders");
        revalidatePath("/admin");
        return { success: true };
    } catch (error: any) {
        console.error("Failed to update order status:", error);
        return { success: false, error: error?.message === "Unauthorized" ? "Unauthorized" : "Failed to update status." };
    }
}

export async function updateTrackingDetails(orderId: string, courier: string, awb: string, adminNote: string) {
    try {
        await requireAdmin();
        await prisma.order.update({
            where: { id: orderId },
            data: { courier, awb, adminNote }
        });
        revalidatePath("/admin/orders");
        revalidatePath("/admin");
        return { success: true };
    } catch (error: any) {
        console.error("Failed to update tracking:", error);
        return { success: false, error: error?.message === "Unauthorized" ? "Unauthorized" : "Failed to save tracking details." };
    }
}

export async function sendOrderUpdateEmail(orderId: string) {
    try {
        await requireAdmin();
        const order = await prisma.order.findUnique({ where: { id: orderId } });
        if (!order) return { success: false, error: "Order not found." };

        const status = order.status;
        let statusMessage = "Your order status has been updated.";
        let statusColor = "#333333";

        if (status === "PROCESSING") {
            statusMessage = "Good news! We have started processing your order.";
            statusColor = "#f59e0b";
        } else if (status === "SHIPPED" || status === "DISPATCHED") {
            statusMessage = "Great news! Your order has been shipped and is on its way to you.";
            statusColor = "#3b82f6";
        } else if (status === "DELIVERED") {
            statusMessage = "Your order has been marked as Delivered! Enjoy your premium Stag Kashmir bat.";
            statusColor = "#22c55e";
        } else if (status === "CANCELLED") {
            statusMessage = "Your order has been cancelled.";
            statusColor = "#ef4444";
        }

        const trackingDetailHtml = (order.courier || order.awb || order.adminNote) ? `
            <div style="margin-top: 20px; padding: 15px; background-color: #f8fafc; border-left: 4px solid #94a3b8; border-radius: 4px;">
                <p style="margin: 0; color: #475569; font-size: 14px;"><strong>Shipping / Tracking Details:</strong></p>
                ${order.courier ? `<p style="margin: 8px 0 0 0; color: #334155; font-size: 14px;">Delivery Partner: <strong>${order.courier}</strong></p>` : ''}
                ${order.awb ? `<p style="margin: 4px 0 0 0; color: #334155; font-size: 14px;">Tracking Number (AWB): <strong>${order.awb}</strong></p>` : ''}
                ${order.adminNote ? `<p style="margin: 8px 0 0 0; color: #334155; font-size: 14px; border-top: 1px dashed #cbd5e1; padding-top: 8px;">Note: ${order.adminNote}</p>` : ''}
            </div>
        ` : "";

        const htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 8px; overflow: hidden;">
                <div style="background-color: #fce7f3; text-align: center; padding: 20px;">
                    <img src="https://stagkashmir.com/Stag_logo-removebg-preview.png" alt="Stag Kashmir" style="max-height: 60px;" />
                </div>
                <div style="padding: 30px; background-color: #ffffff;">
                    <h2 style="margin-top: 0; color: #1f2937;">Order Update: #${order.id.slice(-6).toUpperCase()}</h2>
                    <p style="color: #4b5563; font-size: 16px;">Hi ${order.customer},</p>
                    <p style="color: #4b5563; font-size: 16px;">${statusMessage}</p>
                    
                    <div style="margin: 25px 0; text-align: center;">
                        <span style="display: inline-block; background-color: ${statusColor}; color: white; padding: 8px 16px; border-radius: 9999px; font-weight: bold; font-size: 14px; letter-spacing: 1px;">
                            STATUS: ${status}
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

        await sendEmail({
            to: order.email,
            subject: `Order Update: ${status} - Stag Kashmir #${order.id.slice(-6).toUpperCase()}`,
            text: `Hi ${order.customer}, ${statusMessage}\n\nCourier: ${order.courier || '-'}\nAWB: ${order.awb || '-'}`,
            html: htmlContent
        });

        return { success: true };
    } catch (error: any) {
        console.error("Failed to send email:", error);
        return { success: false, error: error?.message === "Unauthorized" ? "Unauthorized" : "Failed to send email." };
    }
}
