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
        // 1. Total Revenue — use DB-level SUM instead of loading all rows into JS
        const revenueAgg = await prisma.order.aggregate({
            _sum: { total: true },
            where: { status: { not: "CANCELLED" } },
        });
        const totalRevenue = revenueAgg._sum.total ?? 0;

        // 2. Pending Orders
        const pendingOrders = await prisma.order.count({
            where: { status: "PENDING" }
        });

        // 3. Total Customers
        const totalCustomers = await prisma.user.count();

        // 4. Low Stock Alerts (Products and Variations < 5)
        const [lowStockProducts, lowStockVariations] = await Promise.all([
            prisma.product.findMany({
                where: { stock: { lt: 5 }, isArchived: false },
                select: { id: true, name: true, stock: true },
                take: 10
            }),
            prisma.productVariation.findMany({
                where: { stock: { lt: 5 }, product: { isArchived: false } },
                include: { product: { select: { name: true } } },
                take: 10
            }),
        ]);

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

        // 5. Recent Orders & Inquiries — run in parallel
        const [recentOrders, recentInquiries] = await Promise.all([
            prisma.order.findMany({
                take: 5,
                orderBy: { createdAt: 'desc' },
                select: { id: true, customer: true, total: true, status: true, createdAt: true }
            }),
            prisma.inquiry.findMany({
                take: 5,
                orderBy: { createdAt: 'desc' },
                select: { id: true, name: true, subject: true, createdAt: true }
            }),
        ]);

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

        // --- Run independent queries in parallel ---
        const [orders, statusGroups, orderItems, periodRevenueAgg] = await Promise.all([
            // Orders in period (for chart) — select only what we need
            prisma.order.findMany({
                where: { createdAt: { gte: since }, status: { not: "CANCELLED" } },
                select: { createdAt: true, total: true },
                orderBy: { createdAt: "asc" },
            }),

            // Orders by status — use DB groupBy instead of loading all rows
            prisma.order.groupBy({
                by: ["status"],
                _count: { _all: true },
            }),

            // Top selling products — scoped to the analytics window
            prisma.orderItem.findMany({
                where: { order: { createdAt: { gte: since } } },
                select: {
                    productId: true,
                    quantity: true,
                    price: true,
                    product: { select: { name: true, slug: true } },
                },
            }),

            // Period summary revenue via aggregate (no JS reduce needed)
            prisma.order.aggregate({
                _sum: { total: true },
                _count: { _all: true },
                where: { createdAt: { gte: since }, status: { not: "CANCELLED" } },
            }),
        ]);

        // Revenue by day (build chart from already-selected rows)
        const revenueByDay: Record<string, number> = {};
        for (let i = 0; i < days; i++) {
            const d = new Date(since);
            d.setDate(d.getDate() + i);
            revenueByDay[d.toISOString().slice(0, 10)] = 0;
        }
        orders.forEach(o => {
            const key = o.createdAt.toISOString().slice(0, 10);
            if (key in revenueByDay) revenueByDay[key] += o.total;
        });
        const revenueChart = Object.entries(revenueByDay).map(([date, revenue]) => ({
            date,
            revenue: Math.round(revenue),
        }));

        // Orders by status — from groupBy result
        const ordersByStatus = statusGroups.map(g => ({
            status: g.status,
            count: g._count._all,
        }));

        // Top selling products — aggregate JS-side (rows already scoped to window)
        const productSales: Record<string, { name: string; slug: string; quantity: number; revenue: number }> = {};
        orderItems.forEach(item => {
            if (!item.product) return;
            if (!productSales[item.productId]) {
                productSales[item.productId] = {
                    name: item.product.name,
                    slug: item.product.slug,
                    quantity: 0,
                    revenue: 0,
                };
            }
            productSales[item.productId].quantity += item.quantity;
            productSales[item.productId].revenue += item.price * item.quantity;
        });
        const topProducts = Object.values(productSales)
            .sort((a, b) => b.revenue - a.revenue)
            .slice(0, 10);

        // Summary stats from DB aggregate
        const totalRevenue = periodRevenueAgg._sum.total ?? 0;
        const totalOrders = periodRevenueAgg._count._all;
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
