"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toggleProductActive } from "@/actions/admin-product";

export default function ProductVisibilityToggle({ productId, isActive }: { productId: string, isActive: boolean }) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleToggle = () => {
        startTransition(async () => {
            const res = await toggleProductActive(productId, !isActive);
            if (res.success) {
                router.refresh();
            } else {
                alert("Failed to toggle visibility");
            }
        });
    };

    return (
        <button 
            type="button" 
            onClick={handleToggle} 
            disabled={isPending}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full border transition-all disabled:opacity-50
                ${isActive 
                    ? 'border-green-500/20 bg-green-500/10 text-green-500 hover:bg-green-500/20' 
                    : 'border-slate-500/30 bg-slate-500/10 text-slate-400 hover:bg-slate-500/20'
                }`}
            title={isActive ? "Set to Draft" : "Set to Active"}
        >
            <span className="material-symbols-outlined !text-[14px]">
                {isPending ? "sync" : (isActive ? "visibility" : "visibility_off")}
            </span>
            {isActive ? "Active" : "Draft"}
        </button>
    );
}
