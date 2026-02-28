"use server";

import { prisma } from "@/lib/prisma";

export async function getDashboardMetrics() {
    try {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        // 1. Total Revenue (This Month vs All Time could be cool, but let's just do total for now)
        const orders = await prisma.order.findMany({
            where: { status: { not: "CANCELLED" } }
        });
        const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

        // 2. Pending Orders
        const pendingOrders = await prisma.order.count({
            where: { status: "PENDING" }
        });

        // 3. Total Customers
        const totalCustomers = await prisma.user.count();

        // 4. Low Stock Alerts (Products and Variations < 5)
        const lowStockProducts = await prisma.product.findMany({
            where: { stock: { lt: 5 }, isArchived: false },
            select: { id: true, name: true, stock: true },
            take: 10
        });

        const lowStockVariations = await prisma.productVariation.findMany({
            where: { stock: { lt: 5 }, product: { isArchived: false } },
            include: { product: { select: { name: true } } },
            take: 10
        });

        const lowStockAlerts = [
            ...lowStockProducts.map(p => ({
                id: p.id,
                name: p.name,
                stock: p.stock,
                type: 'Product'
            })),
            ...lowStockVariations.map(v => ({
                id: v.id,
                name: `${v.product.name} - ${v.name}`,
                stock: v.stock,
                type: 'Variation'
            }))
        ].sort((a, b) => a.stock - b.stock).slice(0, 10);

        // 5. Recent Activity (Last 5 Orders & Inquiries)
        const recentOrders = await prisma.order.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            select: { id: true, customer: true, total: true, status: true, createdAt: true }
        });

        const recentInquiries = await prisma.inquiry.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            select: { id: true, name: true, subject: true, createdAt: true }
        });

        return {
            success: true,
            totalRevenue,
            pendingOrders,
            totalCustomers,
            lowStockAlerts,
            recentOrders,
            recentInquiries
        };

    } catch (error) {
        console.error("Failed to fetch dashboard metrics:", error);
        return { success: false, error: "Failed to load dashboard data" };
    }
}
