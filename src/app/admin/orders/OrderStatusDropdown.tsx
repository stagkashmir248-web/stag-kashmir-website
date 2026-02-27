"use client";

import { updateOrderStatus } from "@/actions/admin-order";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";

type OrderStatusDropdownProps = {
    orderId: string;
    currentStatus: string;
};

const STATUS_OPTIONS = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];

export default function OrderStatusDropdown({ orderId, currentStatus }: OrderStatusDropdownProps) {
    const [isPending, startTransition] = useTransition();
    const [status, setStatus] = useState(currentStatus);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value;
        setStatus(newStatus);

        startTransition(async () => {
            const result = await updateOrderStatus(orderId, newStatus);
            if (result.success) {
                toast.success(`Order marked as ${newStatus}`);
            } else {
                toast.error(result.error || "Failed to update order");
                setStatus(currentStatus); // Revert on failure
            }
        });
    };

    const getStatusColors = (s: string) => {
        switch (s) {
            case 'PENDING': return 'bg-amber-100 text-amber-800 border-amber-200 focus:ring-amber-500';
            case 'PROCESSING': return 'bg-blue-100 text-blue-800 border-blue-200 focus:ring-blue-500';
            case 'SHIPPED': return 'bg-indigo-100 text-indigo-800 border-indigo-200 focus:ring-indigo-500';
            case 'DELIVERED': return 'bg-green-100 text-green-800 border-green-200 focus:ring-green-500';
            case 'CANCELLED': return 'bg-red-100 text-red-800 border-red-200 focus:ring-red-500';
            default: return 'bg-slate-100 text-slate-800 border-slate-200 focus:ring-slate-500';
        }
    };

    return (
        <select
            value={status}
            onChange={handleChange}
            disabled={isPending}
            className={`text-xs font-bold uppercase tracking-wider rounded-full px-3 py-1.5 border appearance-none cursor-pointer text-center outline-none focus:ring-2 focus:ring-offset-1 transition-all ${getStatusColors(status)} ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {STATUS_OPTIONS.map((opt) => (
                <option key={opt} value={opt} className="bg-white text-slate-900 font-medium">
                    {opt}
                </option>
            ))}
        </select>
    );
}
