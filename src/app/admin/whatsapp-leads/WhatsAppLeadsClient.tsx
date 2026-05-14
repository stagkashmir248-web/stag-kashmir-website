"use client";

import { useState, useEffect, useMemo } from "react";
import { format, isToday, isYesterday } from "date-fns";
import { markWhatsAppLeadsAsViewed } from "@/actions/admin-notifications";
import { useAdminNotifications } from "@/components/AdminNotificationProvider";

type Lead = {
    id: string;
    name: string;
    phone: string;
    createdAt: Date;
    adminViewed: boolean;
};

const PAGE_SIZE = 20;

function getDateLabel(date: Date): string {
    const d = new Date(date);
    if (isToday(d)) return "Today";
    if (isYesterday(d)) return "Yesterday";
    return format(d, "dd MMM yyyy");
}

function PaginationControls({
    page,
    totalPages,
    onPage,
}: {
    page: number;
    totalPages: number;
    onPage: (p: number) => void;
}) {
    if (totalPages <= 1) return null;

    const getPages = () => {
        const pages: (number | "…")[] = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            if (page > 3) pages.push("…");
            for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
            if (page < totalPages - 2) pages.push("…");
            pages.push(totalPages);
        }
        return pages;
    };

    return (
        <div className="flex items-center justify-center gap-1 py-4 border-t border-slate-800">
            <button
                onClick={() => onPage(page - 1)}
                disabled={page === 1}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
                <span className="material-symbols-outlined !text-[16px]">chevron_left</span>
                Prev
            </button>

            {getPages().map((p, i) =>
                p === "…" ? (
                    <span key={`ellipsis-${i}`} className="px-2 text-slate-600">…</span>
                ) : (
                    <button
                        key={p}
                        onClick={() => onPage(p as number)}
                        className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                            p === page
                                ? "bg-green-500 text-white"
                                : "text-slate-400 hover:text-white hover:bg-slate-800"
                        }`}
                    >
                        {p}
                    </button>
                )
            )}

            <button
                onClick={() => onPage(page + 1)}
                disabled={page === totalPages}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
                Next
                <span className="material-symbols-outlined !text-[16px]">chevron_right</span>
            </button>
        </div>
    );
}

export default function WhatsAppLeadsClient({ leads }: { leads: Lead[] }) {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const { refreshCounts } = useAdminNotifications();

    useEffect(() => {
        const clearBadge = async () => {
            const hasUnread = leads.some((l) => !l.adminViewed);
            if (hasUnread) {
                await markWhatsAppLeadsAsViewed();
                await refreshCounts();
            }
        };
        clearBadge();
    }, [leads, refreshCounts]);

    const filteredLeads = useMemo(
        () =>
            leads.filter(
                (lead) =>
                    lead.name.toLowerCase().includes(search.toLowerCase()) ||
                    lead.phone.includes(search)
            ),
        [leads, search]
    );

    // Reset to page 1 when search changes
    useEffect(() => {
        setPage(1);
    }, [search]);

    const totalPages = Math.max(1, Math.ceil(filteredLeads.length / PAGE_SIZE));
    const pageLeads = filteredLeads.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    // Group current page's leads by date label
    const groupedLeads = useMemo(() => {
        const groups: { label: string; items: Lead[] }[] = [];
        const seen = new Map<string, number>();
        for (const lead of pageLeads) {
            const label = getDateLabel(new Date(lead.createdAt));
            if (!seen.has(label)) {
                seen.set(label, groups.length);
                groups.push({ label, items: [] });
            }
            groups[seen.get(label)!].items.push(lead);
        }
        return groups;
    }, [pageLeads]);

    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">WhatsApp Leads</h1>
                    <p className="text-slate-400 mt-1">
                        {filteredLeads.length} of {leads.length} lead{leads.length === 1 ? "" : "s"}
                        {filteredLeads.length !== leads.length && " matching search"}
                        {totalPages > 1 && ` — Page ${page} of ${totalPages}`}
                    </p>
                </div>

                <div className="relative w-full md:w-72">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        search
                    </span>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search name or phone..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 text-white rounded-lg text-sm focus:outline-none focus:border-green-500"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-sm">
                {filteredLeads.length === 0 ? (
                    <div className="py-16 text-center text-slate-500">
                        <span className="material-symbols-outlined !text-4xl text-slate-700 block mb-2">forum</span>
                        {search ? "No matches found" : "No WhatsApp leads recorded yet"}
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-800/80 border-b border-slate-700">
                                        <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-slate-400">
                                            Time
                                        </th>
                                        <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-slate-400">
                                            Customer Name
                                        </th>
                                        <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-slate-400">
                                            Phone Number
                                        </th>
                                        <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-slate-400 text-right">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {groupedLeads.map((group) => (
                                        <>
                                            {/* Date group header row */}
                                            <tr key={`group-${group.label}`} className="bg-slate-800/40">
                                                <td
                                                    colSpan={4}
                                                    className="px-6 py-2 text-xs font-semibold uppercase tracking-widest text-slate-500 border-t border-b border-slate-700/50"
                                                >
                                                    <span className="material-symbols-outlined !text-[13px] mr-1.5 align-middle">
                                                        calendar_today
                                                    </span>
                                                    {group.label}
                                                    <span className="ml-2 text-slate-600 font-normal normal-case tracking-normal">
                                                        — {group.items.length} lead{group.items.length !== 1 ? "s" : ""}
                                                    </span>
                                                </td>
                                            </tr>

                                            {/* Rows for this group */}
                                            {group.items.map((lead) => (
                                                <tr
                                                    key={lead.id}
                                                    className="hover:bg-slate-800/50 transition-colors border-b border-slate-800/50 last:border-b-0"
                                                >
                                                    <td className="py-3.5 px-6 text-slate-400 text-sm font-mono">
                                                        {format(new Date(lead.createdAt), "hh:mm a")}
                                                    </td>
                                                    <td className="py-3.5 px-6 font-medium text-white">
                                                        {lead.name}
                                                    </td>
                                                    <td className="py-3.5 px-6 text-slate-300 font-mono text-sm">
                                                        {lead.phone}
                                                    </td>
                                                    <td className="py-3.5 px-6 text-right">
                                                        <a
                                                            href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 text-green-400 hover:bg-green-500 hover:text-white rounded-lg transition-colors text-sm font-semibold border border-green-500/20 hover:border-transparent"
                                                        >
                                                            Message{" "}
                                                            <span className="material-symbols-outlined !text-[16px]">
                                                                open_in_new
                                                            </span>
                                                        </a>
                                                    </td>
                                                </tr>
                                            ))}
                                        </>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <PaginationControls page={page} totalPages={totalPages} onPage={setPage} />
                    </>
                )}
            </div>
        </div>
    );
}
