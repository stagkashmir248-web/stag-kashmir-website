"use client";

import { useState, useEffect, useMemo } from "react";
import { format, isToday, isYesterday } from "date-fns";

interface Inquiry {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt: Date;
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
        <div className="flex items-center justify-center gap-1 pt-2 pb-4">
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

export default function InquiriesClient({ inquiries }: { inquiries: Inquiry[] }) {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const filtered = useMemo(() => inquiries.filter((inq) =>
        inq.name.toLowerCase().includes(search.toLowerCase()) ||
        inq.email.toLowerCase().includes(search.toLowerCase()) ||
        inq.subject.toLowerCase().includes(search.toLowerCase()) ||
        inq.message.toLowerCase().includes(search.toLowerCase())
    ), [inquiries, search]);

    useEffect(() => { setPage(1); }, [search]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    const groupedItems = useMemo(() => {
        const groups: { label: string; items: Inquiry[] }[] = [];
        const seen = new Map<string, number>();
        for (const inq of pageItems) {
            const label = getDateLabel(new Date(inq.createdAt));
            if (!seen.has(label)) { seen.set(label, groups.length); groups.push({ label, items: [] }); }
            groups[seen.get(label)!].items.push(inq);
        }
        return groups;
    }, [pageItems]);

    return (
        <div className="flex flex-col gap-8 w-full max-w-6xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Contact Messages</h1>
                    <p className="text-slate-500 mt-2">
                        {filtered.length} of {inquiries.length} message{inquiries.length === 1 ? "" : "s"}
                        {filtered.length !== inquiries.length && " matching search"}
                        {totalPages > 1 && ` — Page ${page} of ${totalPages}`}
                    </p>
                </div>
                <div className="relative w-full md:w-72">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, email, subject..." className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg text-sm focus:outline-none focus:border-primary" />
                </div>
            </div>

            {filtered.length === 0 ? (
                <div className="bg-white dark:bg-slate-900 rounded-xl p-12 text-center border border-slate-200 dark:border-slate-800">
                    <span className="material-symbols-outlined text-4xl text-slate-300 mb-4 block">mail</span>
                    <h3 className="text-lg font-medium text-slate-900 dark:text-white">{search ? "No messages match your search" : "No inquiries yet"}</h3>
                    <p className="text-slate-500 text-sm mt-1">{search ? "Try a different keyword." : "When customers contact you, their messages will appear here."}</p>
                </div>
            ) : (
                <>
                    {groupedItems.map((group) => (
                        <div key={group.label} className="flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined !text-[15px] text-slate-400">calendar_today</span>
                                <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">{group.label}</span>
                                <span className="text-xs text-slate-600">— {group.items.length} message{group.items.length !== 1 ? "s" : ""}</span>
                                <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                {group.items.map((inquiry) => (
                                    <div key={inquiry.id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                                        <div className="absolute top-0 left-0 w-1 h-full bg-primary/20 group-hover:bg-primary transition-colors" />
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-center gap-4">
                                                <div className="size-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center font-bold text-primary">
                                                    {inquiry.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-slate-900 dark:text-white text-lg">{inquiry.subject}</h3>
                                                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                                                        <span className="font-medium text-slate-700 dark:text-slate-300">{inquiry.name}</span>
                                                        <span>•</span>
                                                        <a href={`mailto:${inquiry.email}`} className="hover:text-primary transition-colors flex items-center gap-1">
                                                            <span className="material-symbols-outlined !text-[12px]">mail</span> {inquiry.email}
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <span className="text-xs font-mono text-slate-400 bg-slate-50 dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-100 dark:border-slate-700 whitespace-nowrap">
                                                {format(new Date(inquiry.createdAt), "hh:mm a")}
                                            </span>
                                        </div>
                                        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-100 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                                            {inquiry.message}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    <PaginationControls page={page} totalPages={totalPages} onPage={setPage} />
                </>
            )}
        </div>
    );
}
