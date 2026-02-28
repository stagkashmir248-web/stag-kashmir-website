"use client";

export function ShopSorter({ initialSort }: { initialSort: string }) {
    return (
        <form className="relative flex items-center group">
            <span className="absolute left-3 material-symbols-outlined text-slate-400 text-[18px] group-focus-within:text-primary transition-colors pointer-events-none">sort</span>
            <select
                name="sort"
                defaultValue={initialSort}
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
    );
}
