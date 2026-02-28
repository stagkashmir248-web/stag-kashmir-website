import Link from "next/link";

interface ProductCardProps {
    product: {
        id: string;
        name: string;
        slug: string;
        price: number;
        compareAtPrice?: number | null;
        imageUrl: string | null;
        stock: number;
        category: string;
        description?: string | null;
    };
}

export function ProductCard({ product }: ProductCardProps) {
    const isSoldOut = product.stock <= 0;
    const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;

    return (
        <div className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200/60 dark:border-slate-800/60 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/40 transition-all duration-500 will-change-transform hover:-translate-y-1 relative">

            {/* Badges Overlay */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                {isSoldOut ? (
                    <span className="px-3 py-1.5 bg-slate-900/90 dark:bg-slate-100/90 backdrop-blur-md text-white dark:text-slate-900 text-xs font-bold uppercase rounded-lg tracking-wider shadow-sm">
                        Sold Out
                    </span>
                ) : hasDiscount ? (
                    <span className="px-3 py-1.5 bg-red-500/90 backdrop-blur-md text-white text-xs font-bold uppercase rounded-lg tracking-wider shadow-sm">
                        Sale
                    </span>
                ) : null}
            </div>

            {/* Favorite Button Overlay (Cosmetic) */}
            <div className="absolute top-4 right-4 z-10">
                <button className="flex items-center justify-center w-8 h-8 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-slate-400 hover:text-red-500 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 shadow-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
                    <span className="material-symbols-outlined text-[18px]">favorite</span>
                </button>
            </div>

            {/* Image Container */}
            <Link href={`/shop/${product.slug}`} className="relative aspect-[4/5] bg-slate-50 dark:bg-slate-800/50 overflow-hidden block">
                <img
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    src={product.imageUrl || "/placeholder.jpg"}
                />
                {/* Subtle gradient overlay at bottom of image for text readability if needed later */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>

            {/* Content Area */}
            <div className="flex flex-col flex-1 p-5 md:p-6 bg-white dark:bg-slate-900">

                {/* Category & Title */}
                <div className="flex flex-col gap-1.5 mb-3">
                    <span className="text-xs font-medium text-primary tracking-wide uppercase">
                        {product.category || "Bat"}
                    </span>
                    <Link href={`/shop/${product.slug}`} className="font-bold text-lg md:text-xl text-slate-900 dark:text-white group-hover:text-primary transition-colors line-clamp-1">
                        {product.name}
                    </Link>
                </div>

                {/* Description (Line clamped) - Only show if provided */}
                {product.description && (
                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                        {product.description}
                    </p>
                )}

                {/* Price & Action Row */}
                <div className="mt-auto flex items-end justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex flex-col">
                        <span className="text-sm text-slate-500 dark:text-slate-400 mb-0.5">Price</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                                ₹{product.price.toLocaleString()}
                            </span>
                            {hasDiscount && (
                                <span className="text-sm text-slate-400 line-through font-medium">
                                    ₹{product.compareAtPrice?.toLocaleString()}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Add to Cart Quick Action */}
                    <Link
                        href={`/shop/${product.slug}`}
                        className={`group/btn flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-300 ${isSoldOut
                                ? "bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
                                : "bg-primary/10 text-primary hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/20"
                            }`}
                    >
                        <span className={`material-symbols-outlined transition-transform duration-300 ${!isSoldOut && "group-hover/btn:scale-110"}`}>
                            {isSoldOut ? "block" : "arrow_forward"}
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
