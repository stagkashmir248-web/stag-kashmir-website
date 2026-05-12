"use client";

import { useState, useMemo } from "react";
import * as XLSX from "xlsx";
import Link from "next/link";
import OrderStatusDropdown from "./OrderStatusDropdown";
import { format } from "date-fns";

const PAGE_SIZE = 20;

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
    PENDING:     { label: "Pending",     cls: "bg-slate-700/60 text-slate-300 border-slate-600" },
    PROCESSING:  { label: "Processing",  cls: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
    PAID_PARTIAL:{ label: "Bkg. Paid",   cls: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
    PAID:        { label: "Paid",        cls: "bg-green-500/20 text-green-300 border-green-500/30" },
    DISPATCHED:  { label: "Dispatched",  cls: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
    SHIPPED:     { label: "Shipped",     cls: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30" },
    DELIVERED:   { label: "Delivered",   cls: "bg-green-500/20 text-green-400 border-green-500/30" },
    CANCELLED:   { label: "Cancelled",   cls: "bg-red-500/20 text-red-400 border-red-500/30" },
};

export default function AdminOrdersClient({ orders }: { orders: Order[] }) {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const today = format(new Date(), "yyyy-MM-dd");
    const [fromDate, setFromDate] = useState(today);
    const [toDate, setToDate] = useState(today);

    const sortedOrders = useMemo(() => {
        const q = search.toLowerCase().trim();
        const base = q
            ? orders.filter(o =>
                o.customer.toLowerCase().includes(q) ||
                o.email.toLowerCase().includes(q) ||
                (o.phone ?? "").toLowerCase().includes(q) ||
                o.id.slice(-8).toUpperCase().includes(search.toUpperCase()) ||
                String(o.total).includes(q) ||
                (o.amountPaid != null && String(o.amountPaid).includes(q))
            )
            : orders;
        return [...base].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }, [search, orders]);

    const totalPages = Math.max(1, Math.ceil(sortedOrders.length / PAGE_SIZE));
    const pageOrders = sortedOrders.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    function handleSearch(val: string) { setSearch(val); setPage(1); }

    function handleExport() {
        const from = new Date(fromDate);
        const to = new Date(toDate);
        to.setHours(23, 59, 59, 999);
        const filtered = orders.filter(o => { const d = new Date(o.createdAt); return d >= from && d <= to; });
        if (filtered.length === 0) { alert("No orders found in the selected date range."); return; }
        const rows = filtered.map(o => ({
            "Order ID": `#${o.id.slice(-8).toUpperCase()}`,
            "Date": format(new Date(o.createdAt), "dd MMM yyyy HH:mm"),
            "Customer": o.customer, "Email": o.email, "Phone": o.phone ?? "",
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
        <div className="flex flex-col gap-5">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Orders</h1>
                    <p className="text-slate-400 mt-1 text-sm">
                        {search ? `${sortedOrders.length} of ${orders.length} orders` : `${orders.length} total orders`}
                    </p>
                </div>
                {/* Export panel */}
                <div className="flex flex-wrap items-end gap-3 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3">
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">From</label>
                        <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)}
                            className="bg-slate-700 text-white text-sm rounded-lg px-3 py-1.5 border border-slate-600 focus:outline-none focus:border-primary" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">To</label>
                        <input type="date" value={toDate} onChange={e => setToDate(e.target.value)}
                            className="bg-slate-700 text-white text-sm rounded-lg px-3 py-1.5 border border-slate-600 focus:outline-none focus:border-primary" />
                    </div>
                    <button onClick={handleExport}
                        className="flex items-center gap-2 bg-primary hover:bg-amber-400 text-black font-bold text-sm py-2 px-4 rounded-lg transition-all">
                        <span className="material-symbols-outlined !text-[16px]">download</span>
                        Export Excel
                    </button>
                </div>
            </div>

            {/* Search */}
            <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 !text-[18px]">search</span>
                <input type="text" value={search} onChange={e => handleSearch(e.target.value)}
                    placeholder="Search by name, phone, email, order ID or amount…"
                    className="w-full pl-11 pr-10 py-3 bg-slate-800 border border-slate-700 focus:border-primary text-white rounded-xl text-sm outline-none placeholder-slate-500 transition-colors" />
                {search && (
                    <button onClick={() => handleSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                        <span className="material-symbols-outlined !text-[18px]">close</span>
                    </button>
                )}
            </div>

            {/* Orders */}
            {sortedOrders.length === 0 ? (
                <div className="bg-slate-900 rounded-xl border border-slate-800 py-16 text-center text-slate-500">
                    <span className="material-symbols-outlined !text-5xl text-slate-700 block mb-3">{search ? "search_off" : "receipt_long"}</span>
                    {search ? (
                        <>
                            <p className="text-white font-semibold mb-1">No orders found for &quot;{search}&quot;</p>
                            <button onClick={() => handleSearch("")} className="mt-3 text-primary hover:underline text-sm font-bold">Clear search</button>
                        </>
                    ) : <p>No orders yet.</p>}
                </div>
            ) : (
                <>
                    <div className="flex flex-col gap-0 rounded-xl border border-slate-700 overflow-hidden bg-slate-900">

                        {/* Column header */}
                        <div className="grid grid-cols-[140px_1fr_1fr_auto] gap-3 px-4 py-2.5 bg-slate-800/80 border-b border-slate-700">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Date & ID</span>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Customer</span>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Items & Financials</span>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 text-center min-w-[130px]">Status</span>
                        </div>

                        {pageOrders.map((order, idx) => {
                            const paid = order.amountPaid ?? (order.status === "PAID" ? order.total : 0);
                            const balance = Math.max(0, order.total - paid);
                            const dateLabel = format(new Date(order.createdAt), "dd MMM yyyy");
                            const timeStr = format(new Date(order.createdAt), "hh:mm a");
                            const prevOrder = pageOrders[idx - 1];
                            const prevLabel = prevOrder ? format(new Date(prevOrder.createdAt), "dd MMM yyyy") : null;
                            const showDateSep = dateLabel !== prevLabel;
                            const s = STATUS_MAP[order.status] ?? { label: order.status, cls: "bg-slate-700 text-slate-300 border-slate-600" };

                            return (
                                <div key={order.id}>
                                    {/* Date separator */}
                                    {showDateSep && (
                                        <div className="flex items-center gap-3 px-4 py-2 bg-slate-800/50 border-t border-slate-700/60">
                                            <span className="material-symbols-outlined !text-[13px] text-primary">calendar_today</span>
                                            <span className="text-[11px] font-bold text-primary uppercase tracking-widest">{dateLabel}</span>
                                            <div className="flex-1 h-px bg-slate-700/50" />
                                        </div>
                                    )}

                                    {/* Order card row */}
                                    <div className="grid grid-cols-[140px_1fr_1fr_auto] gap-3 px-4 py-3.5 border-t border-slate-800 hover:bg-slate-800/30 transition-colors items-center">

                                        {/* Col 1: Date + Order ID */}
                                        <div className="flex flex-col gap-1 min-w-0">
                                            <p className="text-xs font-semibold text-slate-300 whitespace-nowrap">{dateLabel}</p>
                                            <p className="text-[11px] text-slate-500">{timeStr}</p>
                                            <Link href={`/admin/orders/${order.id}`}
                                                className="font-mono text-xs font-bold text-primary hover:underline mt-0.5 whitespace-nowrap">
                                                #{order.id.slice(-8).toUpperCase()}
                                            </Link>
                                        </div>

                                        {/* Col 2: Customer */}
                                        <div className="flex flex-col gap-0.5 min-w-0">
                                            <p className="text-sm font-bold text-white truncate">{order.customer}</p>
                                            <p className="text-[11px] text-slate-400 truncate" title={order.email}>{order.email}</p>
                                            {order.phone && <p className="text-[11px] text-slate-500">{order.phone}</p>}
                                        </div>

                                        {/* Col 3: Items + Financials */}
                                        <div className="flex flex-col gap-1.5 min-w-0">
                                            {/* Items list */}
                                            <div className="flex flex-col gap-1">
                                                {order.items.map(item => (
                                                    <p key={item.id} className="text-xs text-slate-300 truncate">
                                                        <span className="text-slate-500 mr-1">×{item.quantity}</span>
                                                        {item.product?.name ?? "Custom Request"}
                                                        <span className="text-slate-500 ml-1">@ ₹{item.price.toLocaleString("en-IN")}</span>
                                                    </p>
                                                ))}
                                            </div>
                                            {/* Financial strip */}
                                            <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                                                <span className="text-xs font-bold text-white">
                                                    ₹{order.total.toLocaleString("en-IN")}
                                                </span>
                                                <span className="text-slate-600 text-xs">·</span>
                                                <span className={`text-xs font-semibold ${paid > 0 ? "text-green-400" : "text-slate-500"}`}>
                                                    ₹{paid.toLocaleString("en-IN")} paid
                                                    {order.paymentType === "PARTIAL" &&
                                                        <span className="text-amber-400/80 font-bold ml-1 text-[10px] uppercase">(booking)</span>
                                                    }
                                                </span>
                                                {balance > 0 && (
                                                    <>
                                                        <span className="text-slate-600 text-xs">·</span>
                                                        <span className="text-xs font-bold text-amber-300">₹{balance.toLocaleString("en-IN")} due</span>
                                                    </>
                                                )}
                                                {balance === 0 && (
                                                    <>
                                                        <span className="text-slate-600 text-xs">·</span>
                                                        <span className="text-[10px] font-bold text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded-full border border-green-500/20">Cleared</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        {/* Col 4: Status dropdown */}
                                        <div className="flex items-center justify-center min-w-[130px]">
                                            <OrderStatusDropdown orderId={order.id} currentStatus={order.status} />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between px-1">
                            <p className="text-sm text-slate-400">
                                Page <span className="text-white font-bold">{page}</span> of <span className="text-white font-bold">{totalPages}</span>
                                <span className="text-slate-600 mx-2">·</span>
                                <span className="text-white font-bold">{pageOrders.length}</span> of <span className="text-white font-bold">{sortedOrders.length}</span> orders
                            </p>
                            <div className="flex items-center gap-2">
                                <button onClick={() => { setPage(1); window.scrollTo(0, 0); }} disabled={page === 1}
                                    className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                                    <span className="material-symbols-outlined !text-[18px]">first_page</span>
                                </button>
                                <button onClick={() => { setPage(p => Math.max(1, p - 1)); window.scrollTo(0, 0); }} disabled={page === 1}
                                    className="flex items-center gap-1 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-sm font-medium">
                                    <span className="material-symbols-outlined !text-[16px]">chevron_left</span> Prev
                                </button>
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                                        .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                                        .reduce<(number | "...")[]>((acc, p, i, arr) => {
                                            if (i > 0 && p - (arr[i - 1] as number) > 1) acc.push("...");
                                            acc.push(p); return acc;
                                        }, [])
                                        .map((p, i) => p === "..." ? (
                                            <span key={`e-${i}`} className="px-2 text-slate-600 text-sm">…</span>
                                        ) : (
                                            <button key={p} onClick={() => { setPage(p as number); window.scrollTo(0, 0); }}
                                                className={`w-9 h-9 rounded-lg text-sm font-bold transition-all ${page === p ? "bg-primary text-black" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}>
                                                {p}
                                            </button>
                                        ))}
                                </div>
                                <button onClick={() => { setPage(p => Math.min(totalPages, p + 1)); window.scrollTo(0, 0); }} disabled={page === totalPages}
                                    className="flex items-center gap-1 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-sm font-medium">
                                    Next <span className="material-symbols-outlined !text-[16px]">chevron_right</span>
                                </button>
                                <button onClick={() => { setPage(totalPages); window.scrollTo(0, 0); }} disabled={page === totalPages}
                                    className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                                    <span className="material-symbols-outlined !text-[18px]">last_page</span>
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
