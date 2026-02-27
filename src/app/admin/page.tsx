import { getDashboardMetrics } from "@/actions/admin-dashboard";
import Link from "next/link";
import { format } from "date-fns";

export default async function AdminRootPage() {
    const metrics = await getDashboardMetrics();

    if (!metrics.success) {
        return (
            <div className="p-8 text-center bg-red-50 text-red-600 rounded-xl">
                Error loading dashboard: {metrics.error}
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Dashboard Overview</h1>
                <p className="text-slate-500 mt-2">Welcome back! Here is what's happening today.</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-green-50 dark:bg-green-900/10 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out z-0"></div>
                    <span className="material-symbols-outlined !text-[32px] text-green-500 mb-3 relative z-10">payments</span>
                    <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider relative z-10 mb-1">Total Revenue</h3>
                    <p className="text-4xl font-extrabold text-slate-900 dark:text-white relative z-10">₹{metrics.totalRevenue?.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</p>
                </div>

                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-50 dark:bg-blue-900/10 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out z-0"></div>
                    <span className="material-symbols-outlined !text-[32px] text-blue-500 mb-3 relative z-10">pending_actions</span>
                    <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider relative z-10 mb-1">Pending Orders</h3>
                    <p className="text-4xl font-extrabold text-slate-900 dark:text-white relative z-10">{metrics.pendingOrders}</p>
                </div>

                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-50 dark:bg-purple-900/10 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out z-0"></div>
                    <span className="material-symbols-outlined !text-[32px] text-purple-500 mb-3 relative z-10">group</span>
                    <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider relative z-10 mb-1">Total Customers</h3>
                    <p className="text-4xl font-extrabold text-slate-900 dark:text-white relative z-10">{metrics.totalCustomers}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Low Stock Alerts */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-red-50/50 dark:bg-red-900/10">
                        <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                            <span className="material-symbols-outlined">warning</span>
                            <h2 className="font-bold text-lg">Low Stock Alerts</h2>
                        </div>
                        <span className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-xs font-bold px-2 py-1 rounded-full">
                            {metrics.lowStockAlerts?.length} Items
                        </span>
                    </div>
                    <div className="p-0 flex-1 overflow-auto max-h-[400px]">
                        {metrics.lowStockAlerts?.length === 0 ? (
                            <div className="p-8 text-center text-slate-500 flex flex-col items-center gap-2">
                                <span className="material-symbols-outlined text-4xl text-green-400">check_circle</span>
                                <p>All items are sufficiently stocked!</p>
                            </div>
                        ) : (
                            <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                                {metrics.lowStockAlerts?.map((item: any) => (
                                    <li key={item.id} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-slate-900 dark:text-white">{item.name}</span>
                                            <span className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                                                <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                                                {item.type}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`text-sm font-bold px-3 py-1 rounded-full ${item.stock === 0 ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700"}`}>
                                                {item.stock} left
                                            </span>
                                            <Link href="/admin/products" className="text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 p-1.5 rounded-md transition-colors">
                                                <span className="material-symbols-outlined text-sm">edit</span>
                                            </Link>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                            <span className="material-symbols-outlined">history</span>
                            <h2 className="font-bold text-lg">Recent Orders</h2>
                        </div>
                        <Link href="/admin/orders" className="text-sm text-primary hover:underline font-medium">View All</Link>
                    </div>
                    <div className="p-0 flex-1 overflow-auto max-h-[400px]">
                        {metrics.recentOrders?.length === 0 ? (
                            <div className="p-8 text-center text-slate-500">No recent orders found.</div>
                        ) : (
                            <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                                {metrics.recentOrders?.map((order: any) => (
                                    <li key={order.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex flex-col gap-2">
                                        <div className="flex justify-between items-start">
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-slate-900 dark:text-white">{order.customer}</span>
                                                <span className="text-xs text-slate-500 font-mono mt-0.5">#{order.id.slice(-6).toUpperCase()}</span>
                                            </div>
                                            <span className="font-bold text-slate-700 dark:text-slate-300">₹{order.total?.toLocaleString("en-IN")}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="text-slate-400">{format(new Date(order.createdAt), "MMM d, yyyy 'at' h:mm a")}</span>
                                            <span className={`px-2 py-0.5 rounded-full font-bold uppercase tracking-wider text-[10px] ${order.status === 'PENDING' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                                                order.status === 'SHIPPED' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                                                    order.status === 'DELIVERED' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                                        'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
