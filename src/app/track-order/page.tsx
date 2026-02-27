"use client";

import { useState } from "react";
import Link from "next/link";

// Status badge (client copy — same logic as dashboard)
function StatusBadge({ status }: { status: string }) {
    const map: Record<string, { label: string; cls: string; icon: string }> = {
        PENDING: { label: "Pending", cls: "bg-slate-700 text-slate-300", icon: "schedule" },
        PROCESSING: { label: "Processing", cls: "bg-blue-500/20 text-blue-300", icon: "autorenew" },
        PAID_PARTIAL: { label: "Booking Paid", cls: "bg-amber-500/20 text-amber-300", icon: "payments" },
        PAID: { label: "Paid", cls: "bg-green-500/20 text-green-300", icon: "check_circle" },
        DISPATCHED: { label: "Dispatched", cls: "bg-purple-500/20 text-purple-300", icon: "local_shipping" },
        DELIVERED: { label: "Delivered", cls: "bg-green-500/20 text-green-400", icon: "inventory_2" },
        CANCELLED: { label: "Cancelled", cls: "bg-red-500/20 text-red-400", icon: "cancel" },
    };
    const s = map[status] ?? { label: status, cls: "bg-slate-700 text-slate-400", icon: "help" };
    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${s.cls}`}>
            <span className="material-symbols-outlined !text-[13px]">{s.icon}</span>
            {s.label}
        </span>
    );
}

const TIMELINE = ["PENDING", "PROCESSING", "DISPATCHED", "SHIPPED", "DELIVERED"];
const TL_LABELS = ["Order Placed", "Processing", "Dispatched", "Shipped", "Delivered"];
const TL_ICONS = ["receipt", "autorenew", "local_shipping", "flight_takeoff", "inventory_2"];

// Some statuses (PAID, PAID_PARTIAL) map to PENDING position in the timeline
function getTimelineIndex(status: string) {
    if (status === "PAID" || status === "PAID_PARTIAL") return 0; // treated as Order Placed
    return TIMELINE.indexOf(status);
}

function OrderTimeline({ status }: { status: string }) {
    const idx = getTimelineIndex(status);
    return (
        <div className="flex items-start overflow-x-auto pb-2 mt-4">
            {TIMELINE.map((step, i) => {
                const done = idx > i;
                const current = idx === i;
                return (
                    <div key={step} className="flex items-center flex-1 min-w-[70px]">
                        <div className="flex flex-col items-center gap-1 flex-1">
                            <div className={`size-8 rounded-full flex items-center justify-center border-2 ${done ? "bg-primary border-primary" : current ? "border-primary bg-primary/10" : "border-slate-700 bg-slate-800"}`}>
                                <span className={`material-symbols-outlined !text-[15px] ${done ? "text-black" : current ? "text-primary" : "text-slate-600"}`}>{TL_ICONS[i]}</span>
                            </div>
                            <p className={`text-[10px] font-semibold text-center whitespace-nowrap ${current ? "text-primary" : done ? "text-slate-400" : "text-slate-600"}`}>{TL_LABELS[i]}</p>
                        </div>
                        {i < TIMELINE.length - 1 && <div className={`h-0.5 flex-1 mb-4 mx-1 ${done ? "bg-primary/60" : current ? "bg-primary/20" : "bg-slate-700"}`} />}
                    </div>
                );
            })}
        </div>
    );
}

export default function TrackOrderPage() {
    const [phone, setPhone] = useState("");
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState<any>(null);
    const [error, setError] = useState("");

    async function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");
        setOrder(null);
        try {
            const res = await fetch(`/api/track-order?phone=${encodeURIComponent(phone)}&code=${encodeURIComponent(code)}`);
            const data = await res.json();
            if (!res.ok || !data.order) {
                setError(data.error ?? "No order found. Please check your phone number and tracking code.");
            } else {
                setOrder(data.order);
            }
        } catch {
            setError("Something went wrong. Please try again.");
        }
        setLoading(false);
    }

    const inp = "w-full px-4 py-3 rounded-xl border border-slate-600 bg-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-primary text-sm";

    return (
        <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-12">
            <div className="mb-8">
                <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white mb-4 transition-colors">
                    <span className="material-symbols-outlined !text-[16px]">arrow_back</span>
                    Back to Home
                </Link>
                <h1 className="text-3xl font-bold text-white">Track Your Order</h1>
                <p className="text-slate-400 mt-2">Placed an order without signing in? Enter your WhatsApp number and the tracking code we sent you.</p>
            </div>

            {/* Info banner */}
            <div className="flex items-start gap-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl px-5 py-4 mb-6">
                <span className="material-symbols-outlined !text-[20px] text-amber-400 shrink-0 mt-0.5">info</span>
                <div className="text-sm text-amber-200/80">
                    <strong className="text-amber-300">Where is my tracking code?</strong> After you placed your order, we sent a 6-digit tracking code to your WhatsApp number. If you didn't receive it, contact us and we'll resend it.
                </div>
            </div>

            {/* Search form */}
            <form onSubmit={handleSearch} className="rounded-2xl border border-slate-700 bg-slate-900 p-6 flex flex-col gap-5 mb-6">
                <div>
                    <label className="block text-sm font-semibold text-slate-200 mb-1.5">WhatsApp / Phone Number <span className="text-primary">*</span></label>
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} required placeholder="+91 98765 43210" className={inp} />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-slate-200 mb-1.5">Tracking Code <span className="text-primary">*</span></label>
                    <input type="text" value={code} onChange={e => setCode(e.target.value.toUpperCase())} required maxLength={8} placeholder="e.g. SK7F2A" className={`${inp} font-mono tracking-widest`} />
                    <p className="text-xs text-slate-500 mt-1.5">Sent to your WhatsApp when your order was confirmed</p>
                </div>
                {error && (
                    <div className="flex items-center gap-2 text-red-300 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                        <span className="material-symbols-outlined !text-[16px]">error</span>
                        {error}
                    </div>
                )}
                <button type="submit" disabled={loading}
                    className="flex items-center justify-center gap-2 bg-primary hover:bg-amber-400 text-black font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-primary/20 disabled:opacity-60">
                    {loading
                        ? <><span className="material-symbols-outlined animate-spin !text-[18px]">sync</span>Searching…</>
                        : <><span className="material-symbols-outlined !text-[18px]">manage_search</span>Find My Order</>}
                </button>
            </form>

            {/* Result */}
            {order && (
                <div className="rounded-2xl border border-slate-700 bg-slate-900 overflow-hidden">
                    {/* Header */}
                    <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-slate-700 bg-slate-800/50">
                        <div>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Order ID</p>
                            <p className="font-bold text-white font-mono">#{order.id.slice(-8).toUpperCase()}</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Placed On</p>
                            <p className="text-sm text-slate-300">{new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total</p>
                            <p className="text-sm font-bold text-primary">₹{order.total.toLocaleString("en-IN")}</p>
                        </div>
                        <StatusBadge status={order.status} />
                    </div>

                    <div className="p-6 flex flex-col gap-5">
                        {/* Items */}
                        {order.items?.map((item: any) => (
                            <div key={item.id} className="flex gap-3 items-center">
                                <div className="size-14 rounded-xl overflow-hidden border border-slate-700 bg-slate-800 shrink-0">
                                    {item.product?.imageUrl
                                        ? <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover" />
                                        : <span className="material-symbols-outlined !text-2xl text-slate-600 flex items-center justify-center h-full">sports_cricket</span>}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-white line-clamp-1">{item.product?.name ?? "Product"}</p>
                                    <p className="text-xs text-slate-400 mt-0.5">Qty: {item.quantity} × ₹{item.price.toLocaleString("en-IN")}</p>
                                </div>
                            </div>
                        ))}

                        {/* Timeline */}
                        {order.status !== "CANCELLED" && <OrderTimeline status={order.status} />}

                        {/* Shipping address */}
                        {order.address && (
                            <div className="flex items-start gap-2 text-xs text-slate-400 bg-slate-800 rounded-xl px-4 py-3">
                                <span className="material-symbols-outlined !text-[15px] text-slate-500 mt-0.5 shrink-0">location_on</span>
                                <span>{order.address}, {order.city}, {order.state} – {order.pincode}</span>
                            </div>
                        )}

                        {/* Admin note */}
                        {order.adminNote && (
                            <div className="flex items-start gap-2 text-xs text-amber-300/80 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3">
                                <span className="material-symbols-outlined !text-[15px] shrink-0 mt-0.5">info</span>
                                {order.adminNote}
                            </div>
                        )}

                        <Link href="/contact" className="flex items-center justify-center gap-2 text-sm font-bold border border-slate-600 text-slate-300 hover:text-white hover:border-slate-400 py-3 rounded-xl transition-colors">
                            <span className="material-symbols-outlined !text-[18px]">support_agent</span>
                            Need Help With This Order?
                        </Link>
                    </div>
                </div>
            )}

            <div className="mt-8 text-center">
                <p className="text-slate-500 text-sm">Have an account? <Link href="/dashboard" className="text-primary hover:underline font-semibold">Sign in to view all orders →</Link></p>
            </div>
        </main>
    );
}
