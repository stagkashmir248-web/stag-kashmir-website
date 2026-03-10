"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { ADMIN_EMAIL } from "@/lib/constants";

async function requireAdmin() {
    const session = await auth();
    if (session?.user?.email !== ADMIN_EMAIL) {
        throw new Error("Unauthorized");
    }
}

export async function getDashboardMetrics() {
    await requireAdmin();
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

export async function getAnalyticsData(days = 30) {
    await requireAdmin();
    try {
        const since = new Date();
        since.setDate(since.getDate() - days);

        // All non-cancelled orders in period
        const orders = await prisma.order.findMany({
            where: { createdAt: { gte: since }, status: { not: "CANCELLED" } },
            include: { items: { include: { product: { select: { name: true } } } } },
            orderBy: { createdAt: "asc" }
        });

        // Revenue by day
        const revenueByDay: Record<string, number> = {};
        for (let i = 0; i < days; i++) {
            const d = new Date(since);
            d.setDate(d.getDate() + i);
            const key = d.toISOString().slice(0, 10);
            revenueByDay[key] = 0;
        }
        orders.forEach(o => {
            const key = o.createdAt.toISOString().slice(0, 10);
            if (key in revenueByDay) revenueByDay[key] += o.total;
        });
        const revenueChart = Object.entries(revenueByDay).map(([date, revenue]) => ({
            date,
            revenue: Math.round(revenue),
        }));

        // Orders by status
        const allOrders = await prisma.order.findMany({ select: { status: true } });
        const statusCounts: Record<string, number> = {};
        allOrders.forEach(o => { statusCounts[o.status] = (statusCounts[o.status] || 0) + 1; });
        const ordersByStatus = Object.entries(statusCounts).map(([status, count]) => ({ status, count }));

        // Top selling products
        const orderItems = await prisma.orderItem.findMany({
            include: { product: { select: { id: true, name: true, slug: true } } }
        });
        const productSales: Record<string, { name: string; slug: string; quantity: number; revenue: number }> = {};
        orderItems.forEach(item => {
            const key = item.productId;
            if (!productSales[key]) {
                productSales[key] = { name: item.product.name, slug: item.product.slug, quantity: 0, revenue: 0 };
            }
            productSales[key].quantity += item.quantity;
            productSales[key].revenue += item.price * item.quantity;
        });
        const topProducts = Object.values(productSales)
            .sort((a, b) => b.revenue - a.revenue)
            .slice(0, 10);

        // Summary stats
        const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
        const totalOrders = orders.length;
        const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

        return {
            revenueChart,
            ordersByStatus,
            topProducts,
            totalRevenue,
            totalOrders,
            avgOrderValue,
        };
    } catch (error) {
        console.error("Failed to fetch analytics:", error);
        return null;
    }
}
