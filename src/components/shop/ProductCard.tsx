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
        <Link
            href={`/shop/${product.slug}`}
            className="group flex flex-col relative w-full block transition-all duration-300 hover:-translate-y-1 will-change-transform"
        >
            {/* Badges Overlay */}
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                {isSoldOut ? (
                    <span className="px-2.5 py-1 bg-slate-900/80 backdrop-blur-md text-white text-[10px] uppercase font-bold tracking-widest rounded shadow-sm">
                        Sold Out
                    </span>
                ) : hasDiscount ? (
                    <span className="px-2.5 py-1 bg-red-600/90 text-white text-[10px] uppercase font-bold tracking-widest rounded shadow-sm">
                        Sale
                    </span>
                ) : null}
            </div>

            {/* Favorite Button Overlay (Cosmetic) */}
            <div className="absolute top-3 right-3 z-10">
                <button className="flex items-center justify-center size-8 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm text-slate-400 hover:text-red-500 hover:scale-105 transition-all duration-300 shadow-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
                    <span className="material-symbols-outlined text-[16px]">favorite</span>
                </button>
            </div>

            {/* Subtly Framed Image Container */}
            <div className="relative aspect-[4/5] w-full bg-slate-100 dark:bg-slate-800/50 rounded-2xl overflow-hidden mb-4 border border-slate-100 dark:border-slate-800/80 group-hover:shadow-lg group-hover:shadow-primary/5 transition-all">
                <img
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                    src={product.imageUrl || "/placeholder.jpg"}
                    loading="lazy"
                />
            </div>

            {/* Minimalist Info Cluster */}
            <div className="flex flex-col gap-1 px-1">
                <h3 className="text-[17px] font-semibold text-slate-900 dark:text-white group-hover:text-primary transition-colors line-clamp-1">
                    {product.name}
                </h3>

                <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-base font-semibold text-slate-800 dark:text-slate-200">
                        ₹{product.price.toLocaleString()}
                    </span>
                    {hasDiscount && (
                        <span className="text-sm font-medium text-slate-400 line-through">
                            ₹{product.compareAtPrice?.toLocaleString()}
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}
