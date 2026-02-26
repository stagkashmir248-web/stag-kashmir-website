"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart";

interface ProductCartOptionsProps {
    product: {
        id: string;
        name: string;
        price: number;
        stock: number;
        imageUrl?: string | null;
    };
}

export default function ProductCartOptions({ product }: ProductCartOptionsProps) {
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState("34 inches");
    const addItem = useCartStore((state) => state.addItem);

    const handleAddToCart = () => {
        addItem({
            id: `${product.id}-${selectedSize}`, // Unique ID for this specific size variation
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity,
            imageUrl: product.imageUrl || "/placeholder.jpg",
            size: selectedSize,
        });

        // Optional: Add a toast notification here later
        alert("Added to cart!");
    };

    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleIncreaseQuantity = () => {
        if (quantity < product.stock) {
            setQuantity(quantity + 1);
        }
    };

    return (
        <>
            <div>
                <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-bold text-white uppercase tracking-wide">
                        Select Bat Size
                    </label>
                    <button className="text-xs text-primary font-medium hover:underline transition-all">
                        Size Guide
                    </button>
                </div>
                <div className="flex flex-wrap gap-3">
                    {["34 inches", "35 inches"].map((size) => (
                        <label key={size} className="cursor-pointer flex-1 min-w-[120px]">
                            <input
                                type="radio"
                                name="size"
                                className="peer sr-only"
                                checked={selectedSize === size}
                                onChange={() => setSelectedSize(size)}
                            />
                            <div className="flex h-14 items-center justify-center border border-white/10 bg-card-dark px-4 text-base font-medium text-slate-300 peer-checked:border-primary peer-checked:text-primary transition-all hover:border-white/30 rounded-lg">
                                {size}
                            </div>
                        </label>
                    ))}
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex flex-col gap-4">
                <div className="flex gap-4">
                    <div className="flex w-32 items-center rounded-lg border border-white/10 bg-card-dark">
                        <button
                            onClick={handleDecreaseQuantity}
                            className="flex h-full w-10 items-center justify-center text-slate-400 hover:text-white transition-colors"
                        >
                            <span className="material-symbols-outlined !text-lg">remove</span>
                        </button>
                        <input
                            className="h-full w-full border-none bg-transparent text-center font-bold text-white focus:ring-0"
                            readOnly
                            type="text"
                            value={quantity}
                        />
                        <button
                            onClick={handleIncreaseQuantity}
                            disabled={quantity >= product.stock}
                            className="flex h-full w-10 items-center justify-center text-slate-400 hover:text-white transition-colors disabled:opacity-50"
                        >
                            <span className="material-symbols-outlined !text-lg">add</span>
                        </button>
                    </div>
                    <button
                        onClick={handleAddToCart}
                        disabled={product.stock <= 0}
                        className={`flex-1 rounded-lg py-3.5 text-base font-bold transition-all flex items-center justify-center gap-2 ${product.stock > 0
                            ? "bg-primary text-background-dark shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:bg-primary-dark hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-[1.02]"
                            : "bg-white/10 text-slate-400 cursor-not-allowed border border-white/5"
                            }`}
                    >
                        <span className="material-symbols-outlined">
                            {product.stock <= 0 ? "block" : "shopping_bag"}
                        </span>
                        {product.stock <= 0 ? "Sold Out" : "Add to Cart"}
                    </button>
                </div>
            </div>
        </>
    );
}
