"use client";

import Link from "next/link";

interface AnalyticsData {
    revenueChart: { date: string; revenue: number }[];
    ordersByStatus: { status: string; count: number }[];
    topProducts: { name: string; slug: string; quantity: number; revenue: number }[];
    totalRevenue: number;
    totalOrders: number;
    avgOrderValue: number;
}

const STATUS_COLORS: Record<string, string> = {
    PAID: "#22c55e",
    PAID_PARTIAL: "#3b82f6",
    PENDING: "#f59e0b",
    SHIPPED: "#8b5cf6",
    DELIVERED: "#10b981",
    CANCELLED: "#ef4444",
};

const STATUS_LABELS: Record<string, string> = {
    PAID: "Paid (Full)",
    PAID_PARTIAL: "Partially Paid",
    PENDING: "Pending",
    SHIPPED: "Shipped",
    DELIVERED: "Delivered",
    CANCELLED: "Cancelled",
};

export default function AnalyticsClient({ data }: { data: AnalyticsData | null }) {
    if (!data) {
        return (
            <div className="text-center py-20 text-slate-400">
                <span className="material-symbols-outlined !text-[48px] block mb-3 opacity-30">error</span>
                Failed to load analytics data.
            </div>
        );
    }

    const maxRevenue = Math.max(...data.revenueChart.map(d => d.revenue), 1);
    const totalStatusCount = data.ordersByStatus.reduce((s, o) => s + o.count, 0);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Analytics</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Revenue and order performance (last 30 days)</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                    { label: "Revenue (30 days)", value: `₹${Math.round(data.totalRevenue).toLocaleString("en-IN")}`, icon: "payments", color: "text-green-500" },
                    { label: "Orders (30 days)", value: data.totalOrders.toString(), icon: "shopping_bag", color: "text-blue-500" },
                    { label: "Avg. Order Value", value: `₹${Math.round(data.avgOrderValue).toLocaleString("en-IN")}`, icon: "trending_up", color: "text-purple-500" },
                ].map(card => (
                    <div key={card.label} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-3">
                            <span className={`material-symbols-outlined !text-[24px] ${card.color}`}>{card.icon}</span>
                            <span className="text-sm text-slate-500 dark:text-slate-400">{card.label}</span>
                        </div>
                        <p className="text-3xl font-bold text-slate-900 dark:text-white">{card.value}</p>
                    </div>
                ))}
            </div>

            {/* Revenue Chart */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                <h2 className="font-bold text-slate-900 dark:text-white mb-6">Daily Revenue (₹)</h2>
                <div className="flex items-end gap-1 h-48 overflow-x-auto pb-2">
                    {data.revenueChart.map(({ date, revenue }) => {
                        const barHeight = Math.max((revenue / maxRevenue) * 100, revenue > 0 ? 4 : 0);
                        const shortDate = new Date(date).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
                        return (
                            <div key={date} className="flex flex-col items-center gap-1 min-w-[28px] flex-1" title={`${shortDate}: ₹${revenue.toLocaleString("en-IN")}`}>
                                <div className="w-full flex items-end" style={{ height: "160px" }}>
                                    <div
                                        className="w-full rounded-t-md bg-primary/80 hover:bg-primary transition-all cursor-default"
                                        style={{ height: `${barHeight}%`, minHeight: revenue > 0 ? "4px" : "0px" }}
                                    />
                                </div>
                                {data.revenueChart.length <= 14 && (
                                    <span className="text-[9px] text-slate-400 rotate-45 origin-left whitespace-nowrap">{shortDate}</span>
                                )}
                            </div>
                        );
                    })}
                </div>
                {data.revenueChart.length > 14 && (
                    <div className="flex justify-between mt-2 text-xs text-slate-400">
                        <span>{new Date(data.revenueChart[0].date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                        <span>{new Date(data.revenueChart[data.revenueChart.length - 1].date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Orders by Status */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                    <h2 className="font-bold text-slate-900 dark:text-white mb-6">Orders by Status (All Time)</h2>
                    <div className="space-y-3">
                        {data.ordersByStatus.map(({ status, count }) => {
                            const pct = totalStatusCount > 0 ? Math.round((count / totalStatusCount) * 100) : 0;
                            return (
                                <div key={status}>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm text-slate-600 dark:text-slate-400">{STATUS_LABELS[status] || status}</span>
                                        <span className="text-sm font-semibold text-slate-900 dark:text-white">{count} ({pct}%)</span>
                                    </div>
                                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                                        <div
                                            className="h-2 rounded-full transition-all duration-700"
                                            style={{ width: `${pct}%`, backgroundColor: STATUS_COLORS[status] || "#94a3b8" }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                        {data.ordersByStatus.length === 0 && (
                            <p className="text-slate-400 text-sm text-center py-4">No order data yet.</p>
                        )}
                    </div>
                </div>

                {/* Top Products */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                    <h2 className="font-bold text-slate-900 dark:text-white mb-6">Top Selling Products</h2>
                    <div className="space-y-3">
                        {data.topProducts.map((p, i) => (
                            <div key={p.slug} className="flex items-center gap-3">
                                <span className="text-xl font-black text-slate-200 dark:text-slate-700 w-8 shrink-0 text-center">
                                    {i + 1}
                                </span>
                                <div className="flex-1 min-w-0">
                                    <Link href={`/shop/${p.slug}`} className="text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-primary transition-colors truncate block">
                                        {p.name}
                                    </Link>
                                    <span className="text-xs text-slate-400">{p.quantity} sold</span>
                                </div>
                                <span className="text-sm font-bold text-green-500 shrink-0">₹{Math.round(p.revenue).toLocaleString("en-IN")}</span>
                            </div>
                        ))}
                        {data.topProducts.length === 0 && (
                            <p className="text-slate-400 text-sm text-center py-4">No sales data yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
