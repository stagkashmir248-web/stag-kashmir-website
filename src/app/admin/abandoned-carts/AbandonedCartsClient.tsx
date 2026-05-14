"use client";

import { useState, useEffect, useMemo, useTransition } from "react";
import { format, isToday, isYesterday } from "date-fns";

interface AbandonedCart {
    id: string;
    email: string;
    cartJson: string;
    createdAt: Date;
    sentAt: Date | null;
}

const PAGE_SIZE = 20;

function getDateLabel(date: Date): string {
    const d = new Date(date);
    if (isToday(d)) return "Today";
    if (isYesterday(d)) return "Yesterday";
    return format(d, "dd MMM yyyy");
}

function PaginationControls({ page, totalPages, onPage }: { page: number; totalPages: number; onPage: (p: number) => void; }) {
    if (totalPages <= 1) return null;
    const getPages = () => {
        const pages: (number | "…")[] = [];
        if (totalPages <= 7) { for (let i = 1; i <= totalPages; i++) pages.push(i); }
        else {
            pages.push(1);
            if (page > 3) pages.push("…");
            for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
            if (page < totalPages - 2) pages.push("…");
            pages.push(totalPages);
        }
        return pages;
    };
    return (
        <div className="flex items-center justify-center gap-1 py-4 border-t border-slate-200 dark:border-slate-800">
            <button onClick={() => onPage(page - 1)} disabled={page === 1} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                <span className="material-symbols-outlined !text-[16px]">chevron_left</span>Prev
            </button>
            {getPages().map((p, i) => p === "…" ? (
                <span key={`e-${i}`} className="px-2 text-slate-600">…</span>
            ) : (
                <button key={p} onClick={() => onPage(p as number)} className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${p === page ? "bg-primary text-black" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}>{p}</button>
            ))}
            <button onClick={() => onPage(page + 1)} disabled={page === totalPages} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                Next<span className="material-symbols-outlined !text-[16px]">chevron_right</span>
            </button>
        </div>
    );
}

export default function AbandonedCartsClient({ carts }: { carts: AbandonedCart[] }) {
    const [isPending, startTransition] = useTransition();
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    async function handleSendEmail(id: string) {
        const { sendAbandonedCartEmail } = await import("@/actions/abandoned-cart");
        startTransition(async () => {
            const res = await sendAbandonedCartEmail(id);
            if (res.success) { alert("Recovery email sent!"); window.location.reload(); }
            else { alert(res.error || "Failed to send email."); }
        });
    }

    const filtered = useMemo(() => carts.filter((c) =>
        c.email.toLowerCase().includes(search.toLowerCase())
    ), [carts, search]);

    useEffect(() => { setPage(1); }, [search]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    const groupedItems = useMemo(() => {
        const groups: { label: string; items: AbandonedCart[] }[] = [];
        const seen = new Map<string, number>();
        for (const cart of pageItems) {
            const label = getDateLabel(new Date(cart.createdAt));
            if (!seen.has(label)) { seen.set(label, groups.length); groups.push({ label, items: [] }); }
            groups[seen.get(label)!].items.push(cart);
        }
        return groups;
    }, [pageItems]);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Abandoned Carts</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                        {filtered.length} of {carts.length} cart{carts.length !== 1 ? "s" : ""}
                        {filtered.length !== carts.length && " matching search"}
                        {totalPages > 1 && ` — Page ${page} of ${totalPages}`}
                    </p>
                </div>
                <div className="relative w-full md:w-64">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search email..." className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg text-sm focus:outline-none focus:border-primary" />
                </div>
            </div>

            {/* Content */}
            {filtered.length === 0 ? (
                <div className="py-16 text-center text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
                    <span className="material-symbols-outlined !text-[48px] block mb-3 opacity-30">shopping_cart</span>
                    {search ? "No carts match your search." : "No abandoned carts to recover. Great job!"}
                </div>
            ) : (
                <div className="flex flex-col gap-6">
                    {groupedItems.map((group) => (
                        <div key={group.label} className="flex flex-col gap-3">
                            {/* Date group label */}
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined !text-[15px] text-slate-400">calendar_today</span>
                                <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">{group.label}</span>
                                <span className="text-xs text-slate-500">— {group.items.length} cart{group.items.length !== 1 ? "s" : ""}</span>
                                <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
                            </div>

                            {/* Table for this group */}
                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                            <tr>
                                                <th className="text-left px-6 py-3.5 font-semibold text-slate-600 dark:text-slate-400 text-xs uppercase tracking-wider">Email</th>
                                                <th className="text-left px-6 py-3.5 font-semibold text-slate-600 dark:text-slate-400 text-xs uppercase tracking-wider">Items</th>
                                                <th className="text-left px-6 py-3.5 font-semibold text-slate-600 dark:text-slate-400 text-xs uppercase tracking-wider">Value</th>
                                                <th className="text-left px-6 py-3.5 font-semibold text-slate-600 dark:text-slate-400 text-xs uppercase tracking-wider">Time</th>
                                                <th className="px-6 py-3.5" />
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                            {group.items.map((cart) => {
                                                let items: any[] = [];
                                                let total = 0;
                                                try { items = JSON.parse(cart.cartJson); total = items.reduce((s: number, i: any) => s + i.price * i.quantity, 0); } catch { }
                                                return (
                                                    <tr key={cart.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                                        <td className="px-6 py-4 font-medium text-slate-800 dark:text-slate-200">{cart.email}</td>
                                                        <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                                                            <div className="flex flex-col gap-0.5">
                                                                {items.map((item: any, idx: number) => (
                                                                    <span key={idx} className="text-xs">{item.quantity}× {item.name}</span>
                                                                ))}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 font-semibold text-slate-800 dark:text-slate-200">₹{total.toLocaleString("en-IN")}</td>
                                                        <td className="px-6 py-4 text-slate-500 dark:text-slate-400 text-xs font-mono">
                                                            {format(new Date(cart.createdAt), "hh:mm a")}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <button onClick={() => handleSendEmail(cart.id)} disabled={isPending} className="flex items-center gap-1.5 bg-primary/10 text-primary hover:bg-primary hover:text-black font-semibold px-3 py-1.5 rounded-lg transition-all text-xs disabled:opacity-50">
                                                                <span className="material-symbols-outlined !text-[16px]">send</span>
                                                                Send Recovery Email
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    ))}
                    <PaginationControls page={page} totalPages={totalPages} onPage={setPage} />
                </div>
            )}
        </div>
    );
}
