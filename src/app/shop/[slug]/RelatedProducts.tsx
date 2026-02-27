import Link from "next/link";

interface RelatedProduct {
    id: string;
    slug: string;
    name: string;
    price: number;
    compareAtPrice: number | null;
    imageUrl: string | null;
    stock: number;
    category: string | null;
}

interface Props {
    products: RelatedProduct[];
    currentCategory: string | null;
}

// Category colour map
const categoryColour: Record<string, { bg: string; text: string; dot: string }> = {
    "Hard Tennis Bats": { bg: "bg-blue-500/15", text: "text-blue-400", dot: "bg-blue-400" },
    "Soft Tennis Bats": { bg: "bg-cyan-500/15", text: "text-cyan-400", dot: "bg-cyan-400" },
    "Season Bats": { bg: "bg-amber-500/15", text: "text-amber-400", dot: "bg-amber-400" },
    "Kids Bats": { bg: "bg-pink-500/15", text: "text-pink-400", dot: "bg-pink-400" },
};

function CategoryBadge({ category }: { category: string | null }) {
    if (!category) return null;
    const c = categoryColour[category] ?? { bg: "bg-white/10", text: "text-slate-300", dot: "bg-slate-400" };
    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${c.bg} ${c.text}`}>
            <span className={`size-1.5 rounded-full ${c.dot} shrink-0`} />
            {category}
        </span>
    );
}

export default function RelatedProducts({ products, currentCategory }: Props) {
    if (products.length === 0) return null;

    return (
        <div className="mt-20 lg:col-span-12">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-1.5">
                        {currentCategory ? `More ${currentCategory} Bats` : "More Products"}
                    </p>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">You May Also Like</h2>
                </div>
                <Link href="/shop"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-400 hover:text-primary transition-colors group">
                    View All
                    <span className="material-symbols-outlined !text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </Link>
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
                {products.map(product => {
                    const hasDiscount = !!product.compareAtPrice && product.compareAtPrice > product.price;
                    const discountPct = hasDiscount
                        ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)
                        : null;
                    const isOutOfStock = product.stock <= 0;
                    const isLowStock = !isOutOfStock && product.stock <= 5;

                    return (
                        <Link key={product.id} href={`/shop/${product.slug}`}
                            className="group flex flex-col rounded-2xl overflow-hidden bg-white/[0.03] border border-white/8 hover:border-primary/40 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(245,167,20,0.15)]">

                            {/* Image */}
                            <div className="relative aspect-[4/3] overflow-hidden bg-white/5">
                                {product.imageUrl ? (
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <span className="material-symbols-outlined !text-5xl text-white/10">sports_cricket</span>
                                    </div>
                                )}

                                {/* Gradient overlay at bottom */}
                                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

                                {/* Top-left: discount badge */}
                                {discountPct && (
                                    <span className="absolute top-2.5 left-2.5 bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full tracking-wide shadow-lg">
                                        -{discountPct}%
                                    </span>
                                )}

                                {/* Top-right: stock badge */}
                                {isOutOfStock ? (
                                    <span className="absolute top-2.5 right-2.5 bg-black/70 backdrop-blur-sm text-white/60 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-white/10">
                                        Out of Stock
                                    </span>
                                ) : isLowStock ? (
                                    <span className="absolute top-2.5 right-2.5 bg-orange-500/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                        Only {product.stock} left
                                    </span>
                                ) : null}

                                {/* Bottom-left: category pill over image */}
                                {product.category && (
                                    <div className="absolute bottom-2.5 left-2.5">
                                        <CategoryBadge category={product.category} />
                                    </div>
                                )}
                            </div>

                            {/* Info */}
                            <div className="flex flex-col gap-2 p-4">
                                <p className="text-white font-semibold text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors min-h-[2.5rem]">
                                    {product.name}
                                </p>

                                {/* Price row */}
                                <div className="flex items-baseline gap-2 flex-wrap">
                                    <span className="text-primary font-black text-base">
                                        ₹{product.price.toLocaleString('en-IN')}
                                    </span>
                                    {hasDiscount && (
                                        <span className="text-slate-500 text-xs line-through font-medium">
                                            ₹{product.compareAtPrice!.toLocaleString('en-IN')}
                                        </span>
                                    )}
                                    {hasDiscount && (
                                        <span className="text-green-400 text-[10px] font-bold">
                                            Save ₹{(product.compareAtPrice! - product.price).toLocaleString('en-IN')}
                                        </span>
                                    )}
                                </div>

                                {/* Quick buy CTA */}
                                <div className="mt-1 pt-3 border-t border-white/5 flex items-center justify-between">
                                    <span className="text-xs text-slate-500 flex items-center gap-1">
                                        <span className={`size-1.5 rounded-full ${isOutOfStock ? "bg-red-500" : "bg-green-500"}`} />
                                        {isOutOfStock ? "Out of stock" : "In stock"}
                                    </span>
                                    <span className="text-[11px] font-bold text-primary/70 group-hover:text-primary transition-colors inline-flex items-center gap-0.5">
                                        View Details
                                        <span className="material-symbols-outlined !text-[13px] group-hover:translate-x-0.5 transition-transform">chevron_right</span>
                                    </span>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
