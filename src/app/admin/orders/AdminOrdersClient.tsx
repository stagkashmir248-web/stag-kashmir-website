"use client";

import { useState } from "react";
import * as XLSX from "xlsx";
import Link from "next/link";
import OrderStatusDropdown from "./OrderStatusDropdown";
import { format, parseISO, startOfDay } from "date-fns";

interface OrderItem {
    id: string;
    quantity: number;
    price: number;
    product?: { name: string; imageUrl?: string | null };
}

interface Order {
    id: string;
    customer: string;
    email: string;
    phone?: string | null;
    address?: string | null;
    city?: string | null;
    state?: string | null;
    pincode?: string | null;
    total: number;
    amountPaid?: number | null;
    paymentType: string;
    status: string;
    createdAt: string;
    items: OrderItem[];
}

const STATUS_MAP: Record<string, { label: string; cls: string }> = {
    PENDING: { label: "Pending", cls: "bg-slate-700 text-slate-300" },
    PROCESSING: { label: "Processing", cls: "bg-blue-500/20 text-blue-300" },
    PAID_PARTIAL: { label: "Booking Paid", cls: "bg-amber-500/20 text-amber-300" },
    PAID: { label: "Paid", cls: "bg-green-500/20 text-green-300" },
    DISPATCHED: { label: "Dispatched", cls: "bg-purple-500/20 text-purple-300" },
    SHIPPED: { label: "Shipped", cls: "bg-indigo-500/20 text-indigo-300" },
    DELIVERED: { label: "Delivered", cls: "bg-green-500/20 text-green-400" },
    CANCELLED: { label: "Cancelled", cls: "bg-red-500/20 text-red-400" },
};

function StatusBadge({ status }: { status: string }) {
    const s = STATUS_MAP[status] ?? { label: status, cls: "bg-slate-700 text-slate-400" };
    return <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${s.cls}`}>{s.label}</span>;
}

export default function AdminOrdersClient({ orders }: { orders: Order[] }) {
    const [search, setSearch] = useState("");
    const today = format(new Date(), "yyyy-MM-dd");
    const [fromDate, setFromDate] = useState(today);
    const [toDate, setToDate] = useState(today);

    // --- Search filter ---
    const searchLower = search.toLowerCase().trim();
    const filteredOrders = searchLower
        ? orders.filter(o =>
            o.customer.toLowerCase().includes(searchLower) ||
            o.email.toLowerCase().includes(searchLower) ||
            (o.phone ?? "").toLowerCase().includes(searchLower) ||
            o.id.slice(-8).toUpperCase().includes(search.toUpperCase()) ||
            String(o.total).includes(searchLower) ||
            (o.amountPaid != null && String(o.amountPaid).includes(searchLower))
        )
        : orders;

    // --- Group by day ---
    const grouped: Record<string, Order[]> = {};
    filteredOrders.forEach(o => {
        const day = o.createdAt.slice(0, 10); // "2026-02-27"
        if (!grouped[day]) grouped[day] = [];
        grouped[day].push(o);
    });
    const sortedDays = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

    // --- Excel Export ---
    function handleExport() {
        const from = new Date(fromDate);
        const to = new Date(toDate);
        to.setHours(23, 59, 59, 999); // include all of the end day

        const filtered = orders.filter(o => {
            const d = new Date(o.createdAt);
            return d >= from && d <= to;
        });

        if (filtered.length === 0) {
            alert("No orders found in the selected date range.");
            return;
        }

        const rows = filtered.map(o => ({
            "Order ID": `#${o.id.slice(-8).toUpperCase()}`,
            "Date": format(new Date(o.createdAt), "dd MMM yyyy HH:mm"),
            "Customer": o.customer,
            "Email": o.email,
            "Phone": o.phone ?? "",
            "Address": [o.address, o.city, o.state, o.pincode].filter(Boolean).join(", "),
            "Items": o.items.map(i => `${i.product?.name ?? "?"} ×${i.quantity}`).join("; "),
            "Order Total (₹)": o.total,
            "Amount Paid (₹)": o.amountPaid ?? (o.status === "PAID" ? o.total : 0),
            "Balance Due (₹)": o.status === "PAID" ? 0 : Math.max(0, o.total - (o.amountPaid ?? 0)),
            "Payment Type": o.paymentType,
            "Status": STATUS_MAP[o.status]?.label ?? o.status,
        }));

        const ws = XLSX.utils.json_to_sheet(rows);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Orders");
        XLSX.writeFile(wb, `StagKashmir_Orders_${fromDate}_to_${toDate}.xlsx`);
    }

    return (
        <div className="flex flex-col gap-6">

            {/* Header + Search + Export */}
            <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Order Inquiries</h1>
                        <p className="text-slate-400 mt-1">
                            {filteredOrders.length} of {orders.length} orders
                        </p>
                    </div>

                    {/* Export panel */}
                    <div className="flex flex-wrap items-end gap-3 bg-slate-800 border border-slate-700 rounded-xl px-5 py-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">From</label>
                            <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)}
                                className="bg-slate-700 text-white text-sm rounded-lg px-3 py-2 border border-slate-600 focus:outline-none focus:border-primary" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">To</label>
                            <input type="date" value={toDate} onChange={e => setToDate(e.target.value)}
                                className="bg-slate-700 text-white text-sm rounded-lg px-3 py-2 border border-slate-600 focus:outline-none focus:border-primary" />
                        </div>
                        <button onClick={handleExport}
                            className="flex items-center gap-2 bg-primary hover:bg-amber-400 text-black font-bold text-sm py-2.5 px-5 rounded-lg transition-all">
                            <span className="material-symbols-outlined !text-[18px]">download</span>
                            Export Excel
                        </button>
                    </div>
                </div>

                {/* Search bar */}
                <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 !text-[20px]">search</span>
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search by name, phone, email, order ID or amount…"
                        className="w-full pl-12 pr-12 py-3.5 bg-slate-800 border border-slate-700 focus:border-primary text-white rounded-xl text-sm outline-none placeholder-slate-500 transition-colors"
                    />
                    {search && (
                        <button onClick={() => setSearch("")}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors">
                            <span className="material-symbols-outlined !text-[20px]">close</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Day-wise order groups */}
            {sortedDays.length === 0 ? (
                <div className="bg-slate-900 rounded-xl border border-slate-800 py-16 text-center text-slate-500">
                    <span className="material-symbols-outlined !text-5xl text-slate-700 block mb-3">
                        {search ? "search_off" : "receipt_long"}
                    </span>
                    {search ? (
                        <>
                            <p className="text-white font-semibold mb-1">No orders found for "{search}"</p>
                            <p className="text-sm">Try searching by a different name, phone, or order ID</p>
                            <button onClick={() => setSearch("")} className="mt-4 text-primary hover:underline text-sm font-bold">
                                Clear search
                            </button>
                        </>
                    ) : (
                        <p>No orders yet.</p>
                    )}
                </div>
            ) : sortedDays.map(day => {
                const dayOrders = grouped[day];
                const dayTotal = dayOrders.reduce((sum, o) => sum + o.total, 0);
                const dayPaid = dayOrders.reduce((sum, o) => sum + (o.amountPaid ?? (o.status === "PAID" ? o.total : 0)), 0);
                const dayBalance = dayTotal - dayPaid;
                const dayLabel = format(parseISO(day), "EEEE, dd MMMM yyyy");

                return (
                    <div key={day} className="flex flex-col gap-0 rounded-xl border border-slate-700 overflow-hidden">
                        {/* Day header */}
                        <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-3 bg-slate-800 border-b border-slate-700">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined !text-[18px] text-primary">calendar_today</span>
                                <span className="font-bold text-white">{dayLabel}</span>
                                <span className="text-xs bg-slate-700 text-slate-300 px-2.5 py-1 rounded-full font-bold">
                                    {dayOrders.length} order{dayOrders.length !== 1 ? "s" : ""}
                                </span>
                            </div>
                            <div className="flex items-center gap-6 text-sm">
                                <span className="text-slate-400">Total: <strong className="text-white">₹{dayTotal.toLocaleString("en-IN")}</strong></span>
                                <span className="text-slate-400">Collected: <strong className="text-green-300">₹{dayPaid.toLocaleString("en-IN")}</strong></span>
                                {dayBalance > 0 && <span className="text-slate-400">Balance: <strong className="text-amber-300">₹{dayBalance.toLocaleString("en-IN")}</strong></span>}
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto bg-slate-900">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-800 bg-slate-900/50">
                                        <th className="py-3 px-6 font-bold text-[11px] uppercase tracking-wider text-slate-500">Order ID</th>
                                        <th className="py-3 px-6 font-bold text-[11px] uppercase tracking-wider text-slate-500">Customer</th>
                                        <th className="py-3 px-6 font-bold text-[11px] uppercase tracking-wider text-slate-500">Items</th>
                                        <th className="py-3 px-6 font-bold text-[11px] uppercase tracking-wider text-slate-500 text-right">Order Total</th>
                                        <th className="py-3 px-6 font-bold text-[11px] uppercase tracking-wider text-slate-500 text-right">Paid</th>
                                        <th className="py-3 px-6 font-bold text-[11px] uppercase tracking-wider text-slate-500 text-right">Balance Due</th>
                                        <th className="py-3 px-6 font-bold text-[11px] uppercase tracking-wider text-slate-500 text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800">
                                    {dayOrders.map(order => {
                                        const paid = order.amountPaid ?? (order.status === "PAID" ? order.total : 0);
                                        const balance = Math.max(0, order.total - paid);
                                        const time = format(new Date(order.createdAt), "hh:mm a");

                                        return (
                                            <tr key={order.id} className="hover:bg-slate-800/50 transition-colors">
                                                <td className="py-4 px-6">
                                                    <Link href={`/admin/orders/${order.id}`} className="font-mono text-sm font-bold text-primary hover:underline block">
                                                        #{order.id.slice(-8).toUpperCase()}
                                                    </Link>
                                                    <span className="text-xs text-slate-500">{time}</span>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <p className="text-white text-sm font-semibold">{order.customer}</p>
                                                    <p className="text-xs text-slate-400">{order.email}</p>
                                                    {order.phone && <p className="text-xs text-slate-400">{order.phone}</p>}
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex flex-col gap-1.5">
                                                        {order.items.map(item => (
                                                            <div key={item.id} className="flex items-center gap-2">
                                                                {item.product?.imageUrl && (
                                                                    <img src={item.product.imageUrl} alt="" className="size-7 rounded object-cover border border-slate-700" />
                                                                )}
                                                                <div>
                                                                    <p className="text-xs font-medium text-white line-clamp-1">{item.product?.name ?? "?"}</p>
                                                                    <p className="text-[11px] text-slate-500">Qty: {item.quantity} × ₹{item.price.toLocaleString("en-IN")}</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 text-right">
                                                    <span className="font-bold text-white">₹{order.total.toLocaleString("en-IN")}</span>
                                                </td>
                                                <td className="py-4 px-6 text-right">
                                                    <span className={`font-semibold ${paid > 0 ? "text-green-300" : "text-slate-500"}`}>
                                                        ₹{paid.toLocaleString("en-IN")}
                                                    </span>
                                                    {order.paymentType === "PARTIAL" && (
                                                        <p className="text-[10px] text-amber-400 mt-0.5">Booking</p>
                                                    )}
                                                </td>
                                                <td className="py-4 px-6 text-right">
                                                    {balance > 0 ? (
                                                        <span className="font-bold text-amber-300">₹{balance.toLocaleString("en-IN")}</span>
                                                    ) : (
                                                        <span className="text-green-400 font-bold text-xs">CLEARED</span>
                                                    )}
                                                </td>
                                                <td className="py-4 px-6 text-center">
                                                    <OrderStatusDropdown orderId={order.id} currentStatus={order.status} />
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
