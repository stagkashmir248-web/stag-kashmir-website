"use client";

import { useState, useTransition } from "react";
import { updateTrackingDetails } from "@/actions/admin-order";
import toast from "react-hot-toast";

const COURIERS = [
    "Amazon Shipping",
    "Blue Dart",
    "Delhivery",
    "DTDC",
    "Ecom Express",
    "India Post",
    "XpressBees",
    "Other"
];

export default function OrderTrackingPanel({ order }: { order: any }) {
    const [isPending, startTransition] = useTransition();
    const [courier, setCourier] = useState(order.courier || "");
    const [awb, setAwb] = useState(order.awb || "");
    const [adminNote, setAdminNote] = useState(order.adminNote || "");

    const handleSave = () => {
        startTransition(async () => {
            const result = await updateTrackingDetails(order.id, courier, awb, adminNote);
            if (result.success) {
                toast.success("Tracking details saved");
            } else {
                toast.error(result.error || "Failed to save");
            }
        });
    };

    return (
        <div className="bg-slate-900 rounded-2xl border border-slate-700 p-6 flex flex-col gap-4 mt-6">
            <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined !text-[20px] text-blue-400">local_shipping</span>
                <h2 className="font-bold text-white text-lg">Order Tracking & Notes</h2>
            </div>

            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Delivery Partner</label>
                <select
                    value={courier}
                    onChange={e => setCourier(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                >
                    <option value="">Select Courier...</option>
                    {COURIERS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>

            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tracking Number (AWB)</label>
                <input
                    type="text"
                    value={awb}
                    onChange={e => setAwb(e.target.value)}
                    placeholder="e.g. 1234567890"
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary border border-slate-700 bg-slate-800"
                />
            </div>

            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Internal Note / Customer Message</label>
                <textarea
                    value={adminNote}
                    onChange={e => setAdminNote(e.target.value)}
                    placeholder="Additional details..."
                    rows={3}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary resize-none border border-slate-700 bg-slate-800"
                />
            </div>

            <button
                onClick={handleSave}
                disabled={isPending}
                className="mt-2 w-full bg-slate-800 border border-slate-700 hover:border-primary hover:text-primary text-white font-semibold py-2 rounded-lg transition-all text-sm disabled:opacity-50 flex items-center justify-center gap-2"
            >
                {isPending ? <span className="material-symbols-outlined !text-[16px] animate-spin">sync</span> : <span className="material-symbols-outlined !text-[16px]">save</span>}
                {isPending ? "Saving..." : "Save Details"}
            </button>
        </div>
    );
}
