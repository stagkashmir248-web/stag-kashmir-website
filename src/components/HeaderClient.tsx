"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { searchProducts } from "@/actions/product";

interface HeaderClientProps {
    isLoggedIn: boolean;
}

export default function HeaderClient({ isLoggedIn }: HeaderClientProps) {
    const cartCount = useCartStore((state) => state.getCartCount());
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (searchQuery.trim().length >= 2) {
                setIsSearching(true);
                const results = await searchProducts(searchQuery, 4);
                setSuggestions(results);
                setIsSearching(false);
                setShowSuggestions(true);
            } else {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Close suggestions on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/shop?query=${encodeURIComponent(searchQuery.trim())}`);
            setShowSuggestions(false);
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex flex-col w-full border-b border-solid border-white/10 bg-background-dark/95 backdrop-blur-md">
            <div className="flex items-center justify-between w-full px-6 py-4 xl:px-12 gap-4">
                {/* Left: Hamburger (Mobile) + Logo */}
                <div className="flex items-center gap-4 shrink-0">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="xl:hidden flex items-center justify-center p-2 rounded-md hover:bg-white/5 text-white transition-colors"
                    >
                        <span className="material-symbols-outlined !text-[28px]">{isMobileMenuOpen ? "close" : "menu"}</span>
                    </button>
                    <Link href="/" className="relative flex items-center justify-center gap-2 hover:opacity-80 transition-opacity cursor-pointer group shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/40 to-white/30 blur-xl rounded-full opacity-70 group-hover:opacity-100 transition-opacity" />
                        <img src="/Stag_logo-removebg-preview.png" alt="Stag Kashmir" className="relative z-10 w-[120px] md:w-[140px] h-auto object-contain drop-shadow-sm" />
                    </Link>
                </div>

                {/* Center: Desktop Nav */}
                <nav className="hidden xl:flex flex-1 justify-center items-center gap-4 xl:gap-6 2xl:gap-8 px-4">
                    <Link href="/" className="group relative flex flex-col items-center shrink-0">
                        <span className="text-slate-300 group-hover:text-white text-[11px] 2xl:text-[12px] font-bold uppercase tracking-widest transition-colors mb-1">
                            Home
                        </span>
                        <span className="h-[2px] w-full bg-primary/0 group-hover:bg-primary transition-all duration-300 rounded-full scale-x-0 group-hover:scale-x-100 origin-left block" />
                    </Link>

                    <Link href="/shop?category=season-leather" className="group relative flex flex-col items-center shrink-0">
                        <span className="text-slate-300 group-hover:text-white text-[11px] 2xl:text-[12px] font-bold uppercase tracking-widest transition-colors mb-1">
                            Season Bats
                        </span>
                        <span className="h-[2px] w-full bg-primary/0 group-hover:bg-primary transition-all duration-300 rounded-full scale-x-0 group-hover:scale-x-100 origin-left block" />
                    </Link>

                    <Link href="/shop?category=hard-tennis" className="group relative flex flex-col items-center shrink-0">
                        <span className="text-slate-300 group-hover:text-white text-[11px] 2xl:text-[12px] font-bold uppercase tracking-widest transition-colors mb-1">
                            Hard Tennis
                        </span>
                        <span className="h-[2px] w-full bg-primary/0 group-hover:bg-primary transition-all duration-300 rounded-full scale-x-0 group-hover:scale-x-100 origin-left block" />
                    </Link>

                    <Link href="/shop?category=soft-tennis" className="group relative flex flex-col items-center shrink-0">
                        <span className="text-slate-300 group-hover:text-white text-[11px] 2xl:text-[12px] font-bold uppercase tracking-widest transition-colors mb-1">
                            Soft Tennis
                        </span>
                        <span className="h-[2px] w-full bg-primary/0 group-hover:bg-primary transition-all duration-300 rounded-full scale-x-0 group-hover:scale-x-100 origin-left block" />
                    </Link>

                    <Link href="/about" className="group relative flex flex-col items-center shrink-0">
                        <span className="text-slate-300 group-hover:text-white text-[11px] 2xl:text-[12px] font-bold uppercase tracking-widest transition-colors mb-1">
                            About Us
                        </span>
                        <span className="h-[2px] w-full bg-primary/0 group-hover:bg-primary transition-all duration-300 rounded-full scale-x-0 group-hover:scale-x-100 origin-left block" />
                    </Link>

                    <Link href="/contact" className="group relative flex flex-col items-center shrink-0">
                        <span className="text-slate-300 group-hover:text-white text-[11px] 2xl:text-[12px] font-bold uppercase tracking-widest transition-colors mb-1">
                            Contact Us
                        </span>
                        <span className="h-[2px] w-full bg-primary/0 group-hover:bg-primary transition-all duration-300 rounded-full scale-x-0 group-hover:scale-x-100 origin-left block" />
                    </Link>

                    <Link href="/customise" className="group relative flex items-center gap-1.5 bg-white/5 hover:bg-white/10 px-4 py-1.5 rounded-full border border-white/5 hover:border-primary/50 transition-all duration-300 whitespace-nowrap shrink-0 ml-2">
                        <span className="material-symbols-outlined text-primary text-[14px]">architecture</span>
                        <span className="text-slate-100 group-hover:text-white text-[10px] 2xl:text-[11px] font-black uppercase tracking-widest transition-colors">
                            Customize Your Bat
                        </span>
                    </Link>
                </nav>

                {/* Right: Search + Icons */}
                <div className="flex shrink-0 justify-end items-center gap-4 xl:gap-6">
                    {/* Search Input Desktop */}
                    <div ref={searchRef} className="relative hidden lg:block shrink-0">
                        <form onSubmit={handleSearch} className="flex w-full xl:w-[220px] items-center rounded-full bg-white/5 border border-white/10 px-3 h-10 focus-within:border-primary transition-colors">
                            <button type="submit" className="flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                                <span className="material-symbols-outlined !text-[20px]">search</span>
                            </button>
                            <input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => { if (searchQuery.trim().length >= 2) setShowSuggestions(true); }}
                                className="w-full bg-transparent border-none text-sm text-white placeholder-slate-400 focus:ring-0 pl-3 pr-2 outline-none"
                                placeholder="Search bats..."
                            />
                        </form>

                        {/* Desktop Search Suggestions */}
                        {showSuggestions && (searchQuery.trim().length >= 2) && (
                            <div className="absolute top-full mt-2 w-[300px] right-0 bg-[#14171f] border border-white/10 rounded-xl shadow-2xl overflow-hidden py-2 z-50">
                                {isSearching ? (
                                    <div className="p-4 text-center text-sm text-slate-400 flex items-center justify-center gap-2">
                                        <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                                        Searching...
                                    </div>
                                ) : suggestions.length > 0 ? (
                                    <div className="flex flex-col">
                                        {suggestions.map((product) => (
                                            <Link
                                                key={product.id}
                                                href={`/shop/${product.slug}`}
                                                onClick={() => { setShowSuggestions(false); setIsMobileMenuOpen(false); }}
                                                className="flex items-center gap-3 p-3 hover:bg-white/5 transition-colors"
                                            >
                                                <div className="size-10 bg-white/5 rounded-md overflow-hidden shrink-0">
                                                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex flex-col overflow-hidden">
                                                    <span className="text-white text-sm font-medium truncate">{product.name}</span>
                                                    <span className="text-primary text-xs font-bold">₹{product.price.toLocaleString("en-IN")}</span>
                                                </div>
                                            </Link>
                                        ))}
                                        <button
                                            onClick={handleSearch}
                                            className="p-3 text-center text-xs font-bold text-slate-400 hover:text-white hover:bg-white/5 transition-colors border-t border-white/5 uppercase tracking-wider"
                                        >
                                            View All Results
                                        </button>
                                    </div>
                                ) : (
                                    <div className="p-4 text-center text-sm text-slate-400">
                                        No products found.
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="flex gap-2 sm:gap-3 shrink-0">
                        <Link href="/cart" className="flex items-center justify-center rounded-full size-10 bg-white/5 hover:bg-primary hover:text-background-dark text-white transition-all relative">
                            <span className="material-symbols-outlined !text-[20px]">shopping_bag</span>
                            {cartCount > 0 && <span className="absolute top-2 right-2 size-2 bg-primary rounded-full"></span>}
                        </Link>
                        {/* User icon -> dashboard if logged in, signin if not */}
                        <Link
                            href={isLoggedIn ? "/dashboard" : "/signin"}
                            className="flex items-center justify-center rounded-full size-10 bg-white/5 hover:bg-primary hover:text-background-dark text-white transition-all"
                            title={isLoggedIn ? "My Account" : "Sign In"}
                        >
                            <span className="material-symbols-outlined !text-[20px]">person</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Drawer */}
            <div className={`xl:hidden w-full overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "max-h-[600px] border-t border-white/10" : "max-h-0"}`}>
                <div className="px-6 py-4 flex flex-col gap-4 bg-background-dark pb-6">
                    <div className="relative w-full">
                        <form onSubmit={handleSearch} className="flex w-full items-center rounded-full bg-white/5 border border-white/10 px-3 h-12 focus-within:border-primary transition-colors">
                            <button type="submit" className="flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                                <span className="material-symbols-outlined !text-[22px]">search</span>
                            </button>
                            <input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-transparent border-none text-base text-white placeholder-slate-400 focus:ring-0 px-3 outline-none"
                                placeholder="Search bats..."
                            />
                        </form>

                        {/* Mobile Search Suggestions */}
                        {searchQuery.trim().length >= 2 && (
                            <div className="w-full bg-white/5 border border-white/10 rounded-xl overflow-hidden mt-2">
                                {isSearching ? (
                                    <div className="p-4 text-center text-sm text-slate-400 flex items-center justify-center gap-2">
                                        <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                                        Searching...
                                    </div>
                                ) : suggestions.length > 0 ? (
                                    <div className="flex flex-col">
                                        {suggestions.map((product) => (
                                            <Link
                                                key={product.id}
                                                href={`/shop/${product.slug}`}
                                                onClick={() => { setShowSuggestions(false); setIsMobileMenuOpen(false); }}
                                                className="flex items-center gap-3 p-3 hover:bg-white/10 transition-colors border-b border-white/5 last:border-0"
                                            >
                                                <div className="size-12 bg-white/5 rounded-md overflow-hidden shrink-0">
                                                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex flex-col flex-1 min-w-0">
                                                    <span className="text-white text-sm font-medium truncate">{product.name}</span>
                                                    <span className="text-primary text-xs font-bold">₹{product.price.toLocaleString("en-IN")}</span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-4 text-center text-sm text-slate-400">
                                        No products found.
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <nav className="flex flex-col gap-2 mt-2">
                        <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 rounded-lg hover:bg-white/5 text-slate-200 font-medium transition-colors">Home</Link>
                        <Link href="/shop?category=season-leather" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 rounded-lg hover:bg-white/5 text-slate-200 font-medium transition-colors">Season Bats</Link>
                        <Link href="/shop?category=hard-tennis" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 rounded-lg hover:bg-white/5 text-slate-200 font-medium transition-colors">Hard Tennis</Link>
                        <Link href="/shop?category=soft-tennis" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 rounded-lg hover:bg-white/5 text-slate-200 font-medium transition-colors">Soft Tennis</Link>
                        <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 rounded-lg hover:bg-white/5 text-slate-200 font-medium transition-colors">About Us</Link>
                        <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 rounded-lg hover:bg-white/5 text-slate-200 font-medium transition-colors">Contact Us</Link>

                        <Link href="/customise" onClick={() => setIsMobileMenuOpen(false)} className="mt-2 flex items-center justify-center gap-2 bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 hover:border-primary/40 px-4 py-3 rounded-lg transition-colors">
                            <span className="material-symbols-outlined !text-[20px]">architecture</span>
                            <span className="font-bold tracking-wider uppercase text-sm">Customize Your Bat</span>
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}
