"use client";

import { useTransition } from "react";
import { deleteProduct } from "@/actions/admin-product";

export default function DeleteProductButton({ productId, productName }: { productId: string, productName: string }) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        if (confirm(`Are you sure you want to delete ${productName}? This cannot be undone.`)) {
            startTransition(async () => {
                const result = await deleteProduct(productId);
                if (!result.success) {
                    alert(result.error);
                }
            });
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isPending}
            className={`p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors hover:text-red-500 ${isPending ? 'opacity-50 cursor-not-allowed text-red-500' : ''}`}
            title="Delete Product"
        >
            <span className="material-symbols-outlined !text-[20px]">
                {isPending ? 'sync' : 'delete'}
            </span>
        </button>
    );
}
