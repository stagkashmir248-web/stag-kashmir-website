import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
    const orders = await prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            items: {
                include: {
                    product: true
                }
            }
        }
    });

    return (
        <div className="flex flex-col gap-8 w-full max-w-6xl">
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Order Inquiries</h1>
                    <p className="text-slate-500 mt-2">Manage incoming checkout submissions awaiting payment.</p>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                            <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-slate-500">Order ID & Date</th>
                            <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-slate-500">Customer Info</th>
                            <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-slate-500">Items</th>
                            <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-slate-500 text-right">Total</th>
                            <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-slate-500 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="py-12 text-center text-slate-500">
                                    No pending orders yet.
                                </td>
                            </tr>
                        ) : orders.map((order) => (
                            <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                                <td className="py-4 px-6">
                                    <div className="flex flex-col">
                                        <span className="font-mono text-sm font-bold text-primary">{order.id.slice(0, 8).toUpperCase()}</span>
                                        <span className="text-xs text-slate-500">{formatDistanceToNow(order.createdAt, { addSuffix: true })}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-medium text-slate-900 dark:text-white text-sm">{order.customer}</span>
                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                            <span className="material-symbols-outlined !text-[14px]">mail</span> {order.email}
                                        </div>
                                        {order.phone && (
                                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                                <span className="material-symbols-outlined !text-[14px]">call</span> {order.phone}
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="flex flex-col gap-2">
                                        {order.items.map(item => (
                                            <div key={item.id} className="flex items-center gap-3">
                                                <div className="size-8 bg-slate-100 rounded overflow-hidden">
                                                    <img src={item.product?.imageUrl || '/placeholder.jpg'} alt="" className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-slate-900 dark:text-white line-clamp-1">{item.product?.name || "Unknown Product"}</span>
                                                    <span className="text-xs text-slate-500">Qty: {item.quantity}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </td>
                                <td className="py-4 px-6 text-right">
                                    <span className="font-bold text-slate-900 dark:text-white">₹{order.total.toLocaleString()}</span>
                                </td>
                                <td className="py-4 px-6 align-middle text-center">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
