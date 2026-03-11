"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { markWhatsAppLeadsAsViewed } from "@/actions/admin-notifications";
import { useAdminNotifications } from "@/components/AdminNotificationProvider";

type Lead = {
    id: string;
    name: string;
    phone: string;
    createdAt: Date;
    adminViewed: boolean;
};

export default function WhatsAppLeadsClient({ leads }: { leads: Lead[] }) {
    const [search, setSearch] = useState("");
    const { refreshCounts } = useAdminNotifications();

    useEffect(() => {
        const clearBadge = async () => {
            const hasUnread = leads.some(l => !l.adminViewed);
            if (hasUnread) {
                await markWhatsAppLeadsAsViewed();
                await refreshCounts();
            }
        };
        clearBadge();
    }, [leads, refreshCounts]);

    const filteredLeads = leads.filter(lead => 
        lead.name.toLowerCase().includes(search.toLowerCase()) || 
        lead.phone.includes(search)
    );

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">WhatsApp Leads</h1>
                    <p className="text-slate-400 mt-1">
                        {leads.length} customer{leads.length === 1 ? "" : "s"} collected before entering chat
                    </p>
                </div>
                
                <div className="relative w-full md:w-72">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search name or phone..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 text-white rounded-lg text-sm focus:outline-none focus:border-green-500"
                    />
                </div>
            </div>

            <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-800/80 border-b border-slate-700">
                                <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-slate-400">Date Logged</th>
                                <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-slate-400">Customer Name</th>
                                <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-slate-400">Phone Number</th>
                                <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-slate-400 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {filteredLeads.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="py-12 text-center text-slate-500">
                                        <span className="material-symbols-outlined !text-4xl text-slate-700 block mb-2">forum</span>
                                        {search ? "No matches found" : "No WhatsApp leads recorded yet"}
                                    </td>
                                </tr>
                            ) : (
                                filteredLeads.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-slate-800/50 transition-colors">
                                        <td className="py-4 px-6">
                                            <p className="font-semibold text-white text-sm">{format(new Date(lead.createdAt), "dd MMM yyyy")}</p>
                                            <p className="text-xs text-slate-500">{format(new Date(lead.createdAt), "hh:mm a")}</p>
                                        </td>
                                        <td className="py-4 px-6 font-medium text-white">
                                            {lead.name}
                                        </td>
                                        <td className="py-4 px-6 text-slate-300 font-mono text-sm">
                                            {lead.phone}
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <a 
                                                href={`https://wa.me/${lead.phone.replace(/\D/g, '')}`} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 text-green-400 hover:bg-green-500 hover:text-white rounded-lg transition-colors text-sm font-semibold border border-green-500/20 hover:border-transparent"
                                            >
                                                Message <span className="material-symbols-outlined !text-[16px]">open_in_new</span>
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
