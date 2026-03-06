"use client";

import { useState, useTransition } from "react";
import { getDiscountCodes, createDiscountCode, toggleDiscountCode, deleteDiscountCode } from "@/actions/coupon";

interface Coupon {
    id: string;
    code: string;
    type: "PERCENT" | "FIXED";
    value: number;
    minOrderValue: number | null;
    maxUses: number | null;
    usedCount: number;
    isActive: boolean;
    expiresAt: Date | null;
    createdAt: Date;
}

export default function CouponsClient({ coupons }: { coupons: Coupon[] }) {
    const [isPending, startTransition] = useTransition();
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState("");

    async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const data = {
            code: fd.get("code") as string,
            type: fd.get("type") as "PERCENT" | "FIXED",
            value: parseFloat(fd.get("value") as string),
            minOrderValue: fd.get("minOrderValue") ? parseFloat(fd.get("minOrderValue") as string) : undefined,
            maxUses: fd.get("maxUses") ? parseInt(fd.get("maxUses") as string) : undefined,
            expiresAt: fd.get("expiresAt") as string || undefined,
        };
        startTransition(async () => {
            const res = await createDiscountCode(data);
            if (res.success) {
                setShowForm(false);
                setError("");
                window.location.reload();
            } else {
                setError(res.error || "Failed to create coupon");
            }
        });
    }

    async function handleToggle(id: string, isActive: boolean) {
        startTransition(async () => {
            await toggleDiscountCode(id, !isActive);
            window.location.reload();
        });
    }

    async function handleDelete(id: string) {
        if (!confirm("Delete this coupon code?")) return;
        startTransition(async () => {
            await deleteDiscountCode(id);
            window.location.reload();
        });
    }

    const inp = "w-full px-3 py-2.5 rounded-lg border border-slate-700 bg-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition text-sm";
    const lbl = "block text-sm font-medium text-slate-300 mb-1.5";

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Coupon Codes</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{coupons.length} coupon{coupons.length !== 1 ? 's' : ''} total</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 bg-primary text-black font-bold px-4 py-2.5 rounded-xl hover:bg-yellow-400 transition-all text-sm"
                >
                    <span className="material-symbols-outlined !text-[18px]">add</span>
                    New Coupon
                </button>
            </div>

            {/* Create Form */}
            {showForm && (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-900 dark:text-white mb-4">Create New Coupon</h3>
                    {error && <p className="text-red-400 text-sm mb-4 bg-red-500/10 p-3 rounded-lg border border-red-500/20">{error}</p>}
                    <form onSubmit={handleCreate} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                            <label className={lbl}>Code *</label>
                            <input name="code" required type="text" className={inp} placeholder="WELCOME10" style={{ textTransform: 'uppercase' }} />
                        </div>
                        <div>
                            <label className={lbl}>Type *</label>
                            <select name="type" required className={inp}>
                                <option value="PERCENT">Percentage (%)</option>
                                <option value="FIXED">Fixed Amount (₹)</option>
                            </select>
                        </div>
                        <div>
                            <label className={lbl}>Value *</label>
                            <input name="value" required type="number" min="1" step="0.01" className={inp} placeholder="10 for 10% off" />
                        </div>
                        <div>
                            <label className={lbl}>Min Order Value (₹)</label>
                            <input name="minOrderValue" type="number" min="0" className={inp} placeholder="Optional" />
                        </div>
                        <div>
                            <label className={lbl}>Max Uses</label>
                            <input name="maxUses" type="number" min="1" className={inp} placeholder="Unlimited" />
                        </div>
                        <div>
                            <label className={lbl}>Expires At</label>
                            <input name="expiresAt" type="date" className={inp} />
                        </div>
                        <div className="sm:col-span-2 lg:col-span-3 flex gap-3 pt-2">
                            <button type="submit" disabled={isPending} className="bg-primary text-black font-bold px-6 py-2.5 rounded-xl hover:bg-yellow-400 transition-all text-sm disabled:opacity-50">
                                {isPending ? "Creating..." : "Create Coupon"}
                            </button>
                            <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2.5 rounded-xl border border-slate-700 text-slate-400 hover:text-white hover:border-slate-600 transition text-sm">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Coupons Table */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                {coupons.length === 0 ? (
                    <div className="py-16 text-center text-slate-400">
                        <span className="material-symbols-outlined !text-[48px] block mb-3 opacity-30">local_offer</span>
                        No coupon codes yet. Create your first one!
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                <tr>
                                    <th className="text-left px-6 py-3.5 font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider text-xs">Code</th>
                                    <th className="text-left px-6 py-3.5 font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider text-xs">Discount</th>
                                    <th className="text-left px-6 py-3.5 font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider text-xs">Usage</th>
                                    <th className="text-left px-6 py-3.5 font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider text-xs">Expires</th>
                                    <th className="text-left px-6 py-3.5 font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider text-xs">Status</th>
                                    <th className="px-6 py-3.5"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {coupons.map(c => (
                                    <tr key={c.id} className={`hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors ${!c.isActive ? 'opacity-50' : ''}`}>
                                        <td className="px-6 py-4">
                                            <span className="font-mono font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-lg text-sm">{c.code}</span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                                            {c.type === "PERCENT" ? `${c.value}% off` : `₹${c.value} off`}
                                            {c.minOrderValue && <span className="text-xs text-slate-400 block mt-0.5">Min: ₹{c.minOrderValue}</span>}
                                        </td>
                                        <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                                            {c.usedCount} {c.maxUses ? `/ ${c.maxUses}` : 'uses'}
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 dark:text-slate-400 text-sm">
                                            {c.expiresAt ? new Date(c.expiresAt).toLocaleDateString("en-IN") : "Never"}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleToggle(c.id, c.isActive)}
                                                disabled={isPending}
                                                className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider transition-colors ${c.isActive ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20' : 'bg-slate-600/20 text-slate-500 hover:bg-slate-600/30'}`}
                                            >
                                                {c.isActive ? "Active" : "Inactive"}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleDelete(c.id)}
                                                disabled={isPending}
                                                className="p-1.5 text-slate-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-500/10"
                                            >
                                                <span className="material-symbols-outlined !text-[18px]">delete</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
