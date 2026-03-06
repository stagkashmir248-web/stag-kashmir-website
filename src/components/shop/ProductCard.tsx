"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cart";
import { toast } from "react-hot-toast";
import { LOW_STOCK_THRESHOLD } from "@/lib/constants";

interface ProductCardProps {
    product: {
        id: string;
        name: string;
        slug: string;
        price: number;
        compareAtPrice?: number | null;
        imageUrl: string | null;
        images?: string[];
        stock: number;
        category: string | null;
        description?: string | null;
        reviewCount?: number;
        avgRating?: number;
        featured?: boolean;
        isBestSeller?: boolean;
        createdAt?: Date | string;
    };
}

export function ProductCard({ product }: ProductCardProps) {
    const addItem = useCartStore((state) => state.addItem);
    const isSoldOut = product.stock <= 0;
    const isLowStock = !isSoldOut && product.stock <= LOW_STOCK_THRESHOLD;
    const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
    const reviewCount = product.reviewCount ?? 0;
    const avgRating = product.avgRating ?? 0;
    const displayImage = product.images?.[0] || product.imageUrl || "/placeholder.jpg";
    const isNew = product.createdAt
        ? new Date(product.createdAt).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000
        : false;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isSoldOut) return;
        addItem({
            id: product.id,
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            imageUrl: displayImage,
        });
        toast.success(
            <div className="flex flex-col gap-1">
                <span className="font-bold text-white">Added to Cart!</span>
                <span className="text-sm text-slate-300">{product.name}</span>
            </div>,
            {
                style: { background: '#1a1a1a', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' },
                iconTheme: { primary: '#d4af37', secondary: '#1a1a1a' },
            }
        );
    };

    return (
        <Link
            href={`/shop/${product.slug}`}
            className="group flex flex-col relative w-full block transition-all duration-300 hover:-translate-y-1 will-change-transform"
        >
            {/* Badges Overlay */}
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                {isSoldOut ? (
                    <span className="px-2.5 py-1 bg-slate-900/90 backdrop-blur-md text-white text-[10px] uppercase font-bold tracking-widest rounded shadow-sm border border-white/10">
                        Sold Out
                    </span>
                ) : hasDiscount ? (
                    <span className="px-2.5 py-1 bg-red-600/90 text-white text-[10px] uppercase font-bold tracking-widest rounded shadow-sm">
                        -{Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)}%
                    </span>
                ) : isNew ? (
                    <span className="px-2.5 py-1 bg-primary/90 text-black text-[10px] uppercase font-bold tracking-widest rounded shadow-sm">
                        New
                    </span>
                ) : null}

                {/* Low stock warning */}
                {isLowStock && (
                    <span className="px-2.5 py-1 bg-orange-500/90 text-white text-[10px] uppercase font-bold tracking-widest rounded shadow-sm flex items-center gap-1">
                        <span className="material-symbols-outlined !text-[11px]">warning</span>
                        Only {product.stock} left
                    </span>
                )}
            </div>

            {/* Best Seller / Featured badges — top right */}
            <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5 items-end">
                {product.isBestSeller && (
                    <span className="px-2 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] uppercase font-black tracking-wider rounded shadow-md flex items-center gap-1">
                        🔥 Best Seller
                    </span>
                )}
                {product.featured && !product.isBestSeller && (
                    <span className="px-2 py-1 bg-gradient-to-r from-primary to-yellow-400 text-black text-[10px] uppercase font-black tracking-wider rounded shadow-md flex items-center gap-1">
                        ⭐ Featured
                    </span>
                )}
            </div>

            {/* Image Container */}
            <div className={`relative aspect-square w-full bg-slate-100 dark:bg-slate-800/50 rounded-2xl overflow-hidden mb-4 border border-slate-100 dark:border-slate-800/80 group-hover:shadow-lg group-hover:shadow-primary/5 transition-all ${isSoldOut ? 'opacity-75' : ''}`}>
                <Image
                    alt={product.name}
                    className={`object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${isSoldOut ? '' : 'group-hover:scale-105'}`}
                    src={displayImage}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {/* OOS Overlay */}
                {isSoldOut && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="text-white font-bold text-sm uppercase tracking-widest bg-black/60 px-4 py-2 rounded-lg backdrop-blur-sm">
                            Out of Stock
                        </span>
                    </div>
                )}
                {/* Quick add button on hover */}
                {!isSoldOut && (
                    <div className="absolute bottom-3 inset-x-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                        <button
                            onClick={handleAddToCart}
                            className="w-full py-2 bg-primary text-black font-bold text-xs uppercase tracking-widest rounded-xl shadow-lg hover:bg-yellow-400 transition-colors"
                        >
                            Add to Cart
                        </button>
                    </div>
                )}
            </div>

            {/* Info Cluster */}
            <div className="flex flex-col gap-1 px-1">
                <h3 className="text-[17px] font-semibold text-slate-900 dark:text-white group-hover:text-primary transition-colors line-clamp-1">
                    {product.name}
                </h3>

                {/* Star Rating */}
                {reviewCount > 0 ? (
                    <div className="flex items-center gap-1.5">
                        <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map(i => (
                                <span
                                    key={i}
                                    className={`material-symbols-outlined !text-[13px] ${Math.round(avgRating) >= i ? 'text-yellow-400' : 'text-slate-500'}`}
                                    style={{ fontVariationSettings: "'FILL' 1" }}
                                >star</span>
                            ))}
                        </div>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                            {avgRating.toFixed(1)} ({reviewCount})
                        </span>
                    </div>
                ) : (
                    <div className="flex items-center gap-1.5 h-5">
                        <span className="text-xs text-slate-400 italic">No reviews yet</span>
                    </div>
                )}

                <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-base font-semibold text-slate-800 dark:text-slate-200">
                        ₹{product.price.toLocaleString("en-IN")}
                    </span>
                    {hasDiscount && (
                        <span className="text-sm font-medium text-slate-400 line-through">
                            ₹{product.compareAtPrice?.toLocaleString("en-IN")}
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}
