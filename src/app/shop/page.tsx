import Link from "next/link";
import { getProducts } from "@/actions/product";
import { ShopSidebar } from "@/components/shop/ShopSidebar";
import { ProductCard } from "@/components/shop/ProductCard";

export const dynamic = "force-dynamic";

export default async function Shop({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    // Next.js 15 requires searchParams to be awaited
    const sp = await searchParams;
    const currentCategory = typeof sp.category === 'string' ? sp.category : "all";
    const maxPrice = typeof sp.maxPrice === 'string' ? parseInt(sp.maxPrice) : 20000;

    let sortBy = 'popular';
    if (typeof sp.sort === 'string') {
        sortBy = sp.sort;
    }

    // Fetch the unstable_cache memoized master product list 
    // This is instant because of caching!
    const allProducts = await getProducts();

    // 1. Filter by category
    let filteredProducts = currentCategory === "all"
        ? allProducts
        : allProducts.filter(p => {
            const cat = (p.category || "").toLowerCase();
            if (currentCategory === "hard-tennis") return cat.includes("hard") && cat.includes("tennis");
            if (currentCategory === "soft-tennis") return cat.includes("soft") && cat.includes("tennis");
            if (currentCategory === "season-leather") return cat.includes("season") || cat.includes("leather");
            if (currentCategory === "junior") return cat.includes("junior") || cat.includes("kid");

            // Fallback exact match
            return cat === currentCategory;
        });

    // 2. Filter by max price
    filteredProducts = filteredProducts.filter(p => p.price <= maxPrice);

    // 3. Sort
    if (sortBy === 'newest') {
        filteredProducts = [...filteredProducts].sort((a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    } else if (sortBy === 'price-low') {
        filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
        filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
    }

    return (
        <main className="flex flex-1 justify-center py-8 md:py-12 px-4 sm:px-8 md:px-12 lg:px-20 bg-slate-50 dark:bg-[#0B0F19] min-h-screen">
            <div className="flex w-full max-w-[1440px] gap-10">

                <ShopSidebar />

                {/* Main Content */}
                <div className="flex-1 flex flex-col gap-8 w-full max-w-full overflow-hidden">
                    {/* Breadcrumbs & Title Context */}
                    <div className="flex flex-col gap-5">
                        <nav className="flex text-sm text-slate-500 dark:text-slate-400 font-medium">
                            <Link className="hover:text-primary transition-colors" href="/">Home</Link>
                            <span className="mx-2.5 opacity-50">/</span>
                            <span className="text-slate-900 dark:text-white">Shop Bats</span>
                            {currentCategory !== "all" && (
                                <>
                                    <span className="mx-2.5 opacity-50">/</span>
                                    <span className="text-primary capitalize">{currentCategory.replace('-', ' ')}</span>
                                </>
                            )}
                        </nav>

                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                                    {currentCategory === "all" ? "Kashmir Willow Collection" : `${currentCategory.replace('-', ' ')} Bats`}
                                </h1>
                                <p className="mt-3 text-slate-500 dark:text-slate-400 text-sm md:text-base max-w-2xl leading-relaxed">
                                    Premium handcrafted bats tailored for every playstyle. Filter by category or build your own custom willow.
                                </p>
                            </div>

                            {/* Mobile Filter Trigger (Just a visual placeholder if you add a drawer later) & Sorter */}
                            <div className="flex items-center gap-3">
                                <button className="lg:hidden flex items-center justify-center gap-2 h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 font-medium text-sm text-slate-900 dark:text-white shadow-sm">
                                    <span className="material-symbols-outlined text-[18px]">filter_list</span>
                                    Filters
                                </button>

                                <form className="relative flex items-center group">
                                    <span className="absolute left-3 material-symbols-outlined text-slate-400 text-[18px] group-focus-within:text-primary transition-colors pointer-events-none">sort</span>
                                    <select
                                        name="sort"
                                        defaultValue={sortBy}
                                        className="appearance-none text-sm font-semibold h-11 pl-10 pr-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm hover:border-slate-300 dark:hover:border-slate-600 transition-colors cursor-pointer"
                                        onChange={(e) => {
                                            const url = new URL(window.location.href);
                                            url.searchParams.set("sort", e.target.value);
                                            window.location.href = url.toString();
                                        }}
                                    >
                                        <option value="popular">Most Popular</option>
                                        <option value="newest">Newest Arrivals</option>
                                        <option value="price-low">Price: Low to High</option>
                                        <option value="price-high">Price: High to Low</option>
                                    </select>
                                    <span className="absolute right-3 material-symbols-outlined text-slate-400 text-[18px] pointer-events-none">expand_more</span>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Active Filters Pill */}
                    {(currentCategory !== "all" || maxPrice < 20000) && (
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest mr-1">Active:</span>
                            {currentCategory !== "all" && (
                                <Link scroll={false} href={`/shop?maxPrice=${maxPrice}&sort=${sortBy}`} className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 hover:bg-red-500/10 text-primary hover:text-red-500 rounded-lg text-sm font-medium transition-colors group">
                                    <span className="capitalize">{currentCategory.replace('-', ' ')}</span>
                                    <span className="material-symbols-outlined text-[16px] opacity-70 group-hover:opacity-100">close</span>
                                </Link>
                            )}
                            {maxPrice < 20000 && (
                                <Link scroll={false} href={`/shop?category=${currentCategory}&sort=${sortBy}`} className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 hover:bg-red-500/10 text-primary hover:text-red-500 rounded-lg text-sm font-medium transition-colors group">
                                    <span>Up to ₹{maxPrice.toLocaleString()}</span>
                                    <span className="material-symbols-outlined text-[16px] opacity-70 group-hover:opacity-100">close</span>
                                </Link>
                            )}

                            <Link scroll={false} href="/shop" className="text-sm text-slate-400 hover:text-slate-900 dark:hover:text-white underline underline-offset-4 ml-2 transition-colors">
                                Clear All
                            </Link>
                        </div>
                    )}

                    {/* Product Grid */}
                    <div className="relative">
                        {filteredProducts.length === 0 ? (
                            <div className="py-20 flex flex-col items-center text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 border-dashed dark:border-slate-800">
                                <span className="material-symbols-outlined text-slate-300 dark:text-slate-700 text-7xl mb-6">search_off</span>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No Match Found</h3>
                                <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-6">
                                    We couldn't find any bats matching your current category and price filters.
                                </p>
                                <Link scroll={false} href="/shop" className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all">
                                    Clear Filters
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product as any} />
                                ))}
                            </div>
                        )}

                        {/* Summary string at the bottom */}
                        {filteredProducts.length > 0 && (
                            <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 text-center">
                                <p className="text-sm font-medium text-slate-500">
                                    Showing <strong className="text-slate-900 dark:text-white">{filteredProducts.length}</strong>
                                    {filteredProducts.length === 1 ? ' result' : ' results'}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
