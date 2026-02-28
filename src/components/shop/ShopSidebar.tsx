"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect } from "react";

const CATEGORIES = [
    { id: "all", label: "All Bats", icon: "sports_cricket" },
    { id: "hard-tennis", label: "Hard Tennis Bats", icon: "circle" },
    { id: "soft-tennis", label: "Soft Tennis Bats", icon: "radio_button_unchecked" },
    { id: "season-leather", label: "Season Leather Bats", icon: "sports_baseball" },
    { id: "junior", label: "Junior Bats", icon: "child_care" },
];

export function ShopSidebar() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Get current visual state from URL at load
    const currentCategory = searchParams.get("category") || "all";
    const minPriceParam = parseInt(searchParams.get("minPrice") || "1000");
    const maxPriceParam = parseInt(searchParams.get("maxPrice") || "10000");

    // Local state for the price slider for smooth visual dragging without spamming the URL
    const [priceRange, setPriceRange] = useState<number>(maxPriceParam);

    // Debounce the slider URL push so we don't trigger 100 navigation events per second
    useEffect(() => {
        const handler = setTimeout(() => {
            if (priceRange !== maxPriceParam) {
                updateFilter("maxPrice", priceRange.toString());
            }
        }, 300); // 300ms debounce
        return () => clearTimeout(handler);
    }, [priceRange, maxPriceParam]);

    // Re-sync local state if URL changes externally (e.g. user hits "back" button)
    useEffect(() => {
        setPriceRange(maxPriceParam);
    }, [maxPriceParam]);

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            if (value === "all") {
                params.delete(name);
            } else {
                params.set(name, value);
            }
            return params.toString();
        },
        [searchParams]
    );

    const updateFilter = (filterKey: string, filterValue: string) => {
        const newUrl = `${pathname}?${createQueryString(filterKey, filterValue)}`;
        // Use router.push but preserve scroll state so we don't jump to the top on every click
        router.push(newUrl, { scroll: false });
    };

    return (
        <aside className="w-full lg:w-72 flex-col gap-8 shrink-0 hidden lg:flex">

            {/* Categories Section */}
            <div className="flex flex-col gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex flex-col pb-4 border-b border-slate-100 dark:border-slate-800/80">
                    <h2 className="text-slate-900 dark:text-white text-lg font-bold flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">filter_list</span>
                        Categories
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                        Select a bat category
                    </p>
                </div>

                <div className="flex flex-col gap-1.5 pt-2">
                    {CATEGORIES.map((cat) => {
                        const isActive = currentCategory === cat.id;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => updateFilter("category", cat.id)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl w-full text-left transition-all duration-200 group ${isActive
                                    ? "bg-primary text-white font-medium shadow-md shadow-primary/20"
                                    : "hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                                    }`}
                            >
                                <span className={`material-symbols-outlined text-[20px] ${isActive ? "text-white" : "text-slate-400 group-hover:text-primary transition-colors"
                                    }`}>
                                    {cat.icon}
                                </span>
                                <span className="text-sm">{cat.label}</span>

                                {isActive && (
                                    <span className="material-symbols-outlined ml-auto text-[18px]">
                                        check
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Price Filter Section */}
            <div className="flex flex-col gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex flex-col pb-4 border-b border-slate-100 dark:border-slate-800/80">
                    <h2 className="text-slate-900 dark:text-white text-lg font-bold flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">payments</span>
                        Price Limit
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                        Maximum: ₹{priceRange.toLocaleString()}
                    </p>
                </div>

                <div className="flex flex-col gap-5 pt-4">
                    <input
                        className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        max="20000"
                        min="1000"
                        step="500"
                        type="range"
                        value={priceRange}
                        onChange={(e) => setPriceRange(parseInt(e.target.value))}
                    />

                    <div className="flex justify-between items-center text-xs font-semibold px-1">
                        <span className="flex px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-md">
                            ₹1,000
                        </span>
                        <span className="flex px-2 py-1 bg-primary/10 text-primary rounded-md">
                            ₹20,000+
                        </span>
                    </div>
                </div>
            </div>

            {/* Promotional Banner inside Sidebar */}
            <div className="relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 p-6 flex flex-col items-start justify-center text-white mt-auto isolate">
                <div className="absolute inset-0 bg-primary/20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/40 via-transparent to-transparent -z-10" />
                <span className="px-2.5 py-1 bg-primary text-[10px] uppercase font-bold tracking-wider rounded-md mb-4 shadow-lg shadow-primary/30">
                    Free Customization
                </span>
                <h3 className="text-xl font-bold mb-2">Build Your Dream Bat</h3>
                <p className="text-slate-300 text-sm mb-5 leading-relaxed">
                    Personalize the weight, handle size, and exact willow grade to match your playstyle.
                </p>
                <Link href="/customise" className="text-sm font-bold bg-white text-slate-900 px-5 py-2.5 rounded-lg hover:bg-slate-100 transition-colors shadow-sm flex items-center gap-2">
                    Start Building
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
            </div>
        </aside>
    );
}
