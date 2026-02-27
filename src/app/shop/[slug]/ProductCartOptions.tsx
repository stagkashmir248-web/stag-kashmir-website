"use client";

import { useState, useMemo, useEffect } from "react";
import { useCartStore } from "@/store/cart";
import { toast } from "react-hot-toast";

interface ProductVariation {
    id: string;
    name: string;
    price: number;
    compareAtPrice?: number | null;
    stock: number;
}

interface ProductCartOptionsProps {
    product: {
        id: string;
        name: string;
        price: number;
        compareAtPrice?: number | null;
        stock: number;
        imageUrl?: string | null;
        variations?: ProductVariation[];
    };
}

const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`;
const discountPct = (sale: number, regular: number) => Math.round((1 - sale / regular) * 100);

export default function ProductCartOptions({ product }: ProductCartOptionsProps) {
    const [quantity, setQuantity] = useState(1);

    // Parse each variation into structured {size, weight, extra} dimensions
    const parsedVariations = useMemo(() => {
        if (!product.variations?.length) return [];
        return product.variations.map(v => {
            const parts = v.name.split(' | ');
            return { ...v, size: parts[0]?.trim() || "", weight: parts[1]?.trim() || "", extra: parts[2]?.trim() || "" };
        });
    }, [product.variations]);

    // All unique sizes that exist in ANY variation
    const allSizes = useMemo(() => Array.from(new Set(parsedVariations.map(v => v.size).filter(Boolean))), [parsedVariations]);
    // All unique extras that exist in ANY variation
    const allExtras = useMemo(() => Array.from(new Set(parsedVariations.map(v => v.extra).filter(Boolean))), [parsedVariations]);

    const [selectedSize, setSelectedSize] = useState<string>("");
    const [selectedWeight, setSelectedWeight] = useState<string>("");
    const [selectedExtra, setSelectedExtra] = useState<string>("");

    // Weights that are VALID for the currently selected size (and extra)
    const validWeights = useMemo(() => {
        if (parsedVariations.length === 0) return [];
        const matching = parsedVariations.filter(v =>
            (allSizes.length === 0 || v.size === selectedSize) &&
            (allExtras.length === 0 || !selectedExtra || v.extra === selectedExtra)
        );
        return Array.from(new Set(matching.map(v => v.weight).filter(Boolean)));
    }, [parsedVariations, selectedSize, selectedExtra, allSizes, allExtras]);

    // Sizes that are VALID for the currently selected weight (and extra)
    const validSizes = useMemo(() => {
        if (parsedVariations.length === 0) return allSizes;
        if (!selectedWeight) return allSizes;
        const matching = parsedVariations.filter(v => v.weight === selectedWeight && (allExtras.length === 0 || !selectedExtra || v.extra === selectedExtra));
        return Array.from(new Set(matching.map(v => v.size).filter(Boolean)));
    }, [parsedVariations, selectedWeight, selectedExtra, allSizes, allExtras]);

    // Initialize defaults to the first valid combination
    useEffect(() => {
        if (parsedVariations.length === 0) return;
        const first = parsedVariations[0];
        setSelectedSize(first.size || "");
        setSelectedWeight(first.weight || "");
        setSelectedExtra(first.extra || "");
    }, [parsedVariations]);

    // When size changes, reset weight to first valid one for that size
    const handleSizeSelect = (size: string) => {
        setSelectedSize(size);
        const available = Array.from(new Set(
            parsedVariations.filter(v => v.size === size && (allExtras.length === 0 || !selectedExtra || v.extra === selectedExtra)).map(v => v.weight).filter(Boolean)
        ));
        if (available.length > 0 && !available.includes(selectedWeight)) {
            setSelectedWeight(available[0]);
        }
    };

    // When weight changes, reset size if it becomes invalid
    const handleWeightSelect = (weight: string) => {
        setSelectedWeight(weight);
        const available = Array.from(new Set(
            parsedVariations.filter(v => v.weight === weight && (allExtras.length === 0 || !selectedExtra || v.extra === selectedExtra)).map(v => v.size).filter(Boolean)
        ));
        if (available.length > 0 && !available.includes(selectedSize)) {
            setSelectedSize(available[0]);
        }
    };

    const addItem = useCartStore((state) => state.addItem);

    // Find the exact matching variation
    const activeVariation = useMemo(() => {
        if (parsedVariations.length === 0) return null;
        return parsedVariations.find(v =>
            (allSizes.length === 0 || v.size === selectedSize) &&
            (validWeights.length === 0 || v.weight === selectedWeight) &&
            (allExtras.length === 0 || v.extra === selectedExtra)
        ) ?? null;
    }, [parsedVariations, selectedSize, selectedWeight, selectedExtra, allSizes, validWeights, allExtras]);

    const activePrice = activeVariation ? activeVariation.price : product.price;
    const activeCompareAt = activeVariation ? (activeVariation.compareAtPrice ?? null) : (product.compareAtPrice ?? null);
    const activeStock = activeVariation ? activeVariation.stock : product.stock;

    useEffect(() => {
        if (quantity > activeStock && activeStock > 0) setQuantity(activeStock);
        else if (activeStock === 0 && quantity > 1) setQuantity(1);
    }, [activeStock, quantity]);

    const handleAddToCart = () => {
        const cartItemId = activeVariation ? `${product.id}-${activeVariation.id}` : product.id;
        const selectionLabel = [selectedSize, selectedWeight, selectedExtra].filter(Boolean).join(" | ");
        addItem({ id: cartItemId, productId: product.id, name: product.name, price: activePrice, quantity, imageUrl: product.imageUrl || "/placeholder.jpg", size: selectionLabel || undefined });
        toast.success(
            <div className="flex flex-col gap-1">
                <span className="font-bold text-white">Added to Cart!</span>
                <span className="text-sm text-slate-300">{product.name}{selectionLabel ? ` (${selectionLabel})` : ''}</span>
            </div>,
            { style: { background: '#1a1a1a', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }, iconTheme: { primary: '#d4af37', secondary: '#1a1a1a' } }
        );
    };

    const btnCls = (selected: boolean) =>
        `px-4 py-3 text-sm transition-all bg-transparent ${selected ? 'border-2 border-white text-white font-medium' : 'border border-white/20 text-slate-300 hover:border-white/50'}`;

    return (
        <>
            {/* PRICE */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
                <span className="text-4xl font-bold text-white">{fmt(activePrice)}</span>
                {activeCompareAt && activeCompareAt > activePrice && (
                    <>
                        <span className="text-lg text-slate-400 line-through">{fmt(activeCompareAt)}</span>
                        <span className="inline-flex items-center gap-1 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                            <span className="material-symbols-outlined !text-[14px]">sell</span>
                            SAVE {discountPct(activePrice, activeCompareAt)}%
                        </span>
                    </>
                )}
            </div>

            {/* SELECTIONS */}
            <div className="flex flex-col gap-8 mb-8">

                {/* SIZE — only show sizes that have at least one valid weight combination */}
                {allSizes.length > 0 && (
                    <div>
                        <h3 className="text-xs uppercase tracking-[0.2em] text-slate-300 mb-4 font-medium">Select Your Bat Size</h3>
                        <div className="flex flex-wrap gap-2">
                            {allSizes.filter(s => validSizes.includes(s) || !selectedWeight).map(size => (
                                <button key={size} onClick={() => handleSizeSelect(size)} className={btnCls(selectedSize === size)}>
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* WEIGHT — only show weights valid for the current size selection */}
                {validWeights.length > 0 && (
                    <div>
                        <h3 className="text-xs uppercase tracking-[0.2em] text-slate-300 mb-4 font-medium">Weight</h3>
                        <div className="flex flex-wrap gap-2">
                            {validWeights.map(weight => (
                                <button key={weight} onClick={() => handleWeightSelect(weight)} className={btnCls(selectedWeight === weight)}>
                                    {weight}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* EXTRA — only show extras valid for the current size+weight */}
                {allExtras.length > 0 && (
                    <div>
                        <h3 className="text-xs uppercase tracking-[0.2em] text-slate-300 mb-4 font-medium">Willow Type / Other</h3>
                        <div className="flex flex-wrap gap-2">
                            {allExtras.filter(e => parsedVariations.some(v =>
                                (allSizes.length === 0 || v.size === selectedSize) &&
                                (validWeights.length === 0 || v.weight === selectedWeight) &&
                                v.extra === e
                            )).map(extra => (
                                <button key={extra} onClick={() => setSelectedExtra(extra)}
                                    className={`px-4 py-3 text-sm transition-all bg-transparent ${selectedExtra === extra ? 'border-2 border-primary text-primary font-medium' : 'border border-white/20 text-slate-300 hover:border-primary/50'}`}>
                                    {extra}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* ADD TO CART + BUY IT NOW */}
            <div className="pt-6 border-t border-white/5 flex flex-col gap-4">
                {/* Quantity stepper — pill style */}
                <div className="flex items-center gap-4">
                    <span className="text-xs uppercase tracking-[0.2em] text-slate-400 font-semibold">Quantity</span>
                    <div className="flex items-center bg-white/5 rounded-full border border-white/10 overflow-hidden">
                        <button
                            onClick={() => setQuantity(q => Math.max(1, q - 1))}
                            className="w-11 h-11 flex items-center justify-center text-slate-300 hover:bg-white/10 hover:text-white active:scale-90 transition-all">
                            <span className="material-symbols-outlined !text-[20px] font-bold">remove</span>
                        </button>
                        <span className="w-12 text-center text-lg font-bold text-white select-none">{quantity}</span>
                        <button
                            onClick={() => { if (quantity < activeStock) setQuantity(q => q + 1); }}
                            disabled={quantity >= activeStock}
                            className="w-11 h-11 flex items-center justify-center text-slate-300 hover:bg-white/10 hover:text-white active:scale-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed">
                            <span className="material-symbols-outlined !text-[20px] font-bold">add</span>
                        </button>
                    </div>
                </div>

                {/* Buttons row */}
                <div className="grid grid-cols-2 gap-3">
                    <button onClick={handleAddToCart} disabled={activeStock <= 0}
                        className={`py-3.5 text-sm font-bold transition-all flex items-center justify-center gap-2 uppercase tracking-wide border ${activeStock > 0
                            ? "border-white text-white hover:bg-white hover:text-black"
                            : "border-white/10 text-slate-500 cursor-not-allowed"
                            }`}>
                        <span className="material-symbols-outlined !text-[18px]">{activeStock <= 0 ? "block" : "shopping_cart"}</span>
                        {activeStock <= 0 ? "Out of Stock" : "Add to Cart"}
                    </button>

                    <button
                        onClick={() => {
                            handleAddToCart();
                            // Navigate to cart after a brief delay
                            setTimeout(() => { window.location.href = '/cart'; }, 300);
                        }}
                        disabled={activeStock <= 0}
                        className={`py-3.5 text-sm font-bold transition-all flex items-center justify-center gap-2 uppercase tracking-wide ${activeStock > 0
                            ? "bg-primary text-black hover:bg-amber-400"
                            : "bg-white/5 text-slate-500 cursor-not-allowed"
                            }`}>
                        <span className="material-symbols-outlined !text-[18px]">bolt</span>
                        Buy it Now
                    </button>
                </div>
            </div>
        </>
    );
}
