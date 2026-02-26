"use client";

import { useCartStore } from "@/store/cart";
import { toast } from "react-hot-toast";

interface AddToCartButtonProps {
    product: {
        id: string;
        name: string;
        price: number;
        imageUrl?: string;
    };
    className?: string;
}

export default function AddToCartButton({ product, className }: AddToCartButtonProps) {
    const addItem = useCartStore((state) => state.addItem);

    const handleAddToCart = (e: React.MouseEvent) => {
        // Prevent navigation if the button is inside a Link
        e.preventDefault();
        e.stopPropagation();

        addItem({
            id: product.id,
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            imageUrl: product.imageUrl || "/placeholder.jpg",
        });

        toast.success(
            <div className="flex flex-col gap-1">
                <span className="font-bold text-white">Added to Cart!</span>
                <span className="text-sm text-slate-300">{product.name}</span>
            </div>,
            {
                style: {
                    background: '#1a1a1a',
                    color: '#fff',
                    border: '1px solid rgba(255,255,255,0.1)',
                },
                iconTheme: {
                    primary: '#d4af37', // Gold primary color
                    secondary: '#1a1a1a',
                },
            }
        );
    };

    return (
        <button
            onClick={handleAddToCart}
            className={className || "text-primary hover:text-white border border-primary hover:bg-primary px-4 py-2 rounded-lg text-sm font-medium transition-all"}
        >
            Add to Cart
        </button>
    );
}
