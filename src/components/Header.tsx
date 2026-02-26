"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cart";

export default function Header() {
    const cartCount = useCartStore((state) => state.getCartCount());

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-white/10 bg-background-dark/80 backdrop-blur-md px-6 py-4 lg:px-12">
            <div className="flex items-center gap-8">
                <Link href="/" className="flex items-center gap-2 text-white hover:text-primary transition-colors cursor-pointer">
                    <span className="material-symbols-outlined !text-[32px]">sports_cricket</span>
                    <h2 className="text-white text-xl font-bold leading-tight tracking-wider uppercase">Stag Kashmir</h2>
                </Link>
                <nav className="hidden lg:flex items-center gap-8">
                    <Link className="text-slate-300 hover:text-primary text-sm font-medium leading-normal transition-colors" href="/shop?category=season">Shop Bats</Link>
                    <Link className="text-slate-300 hover:text-primary text-sm font-medium leading-normal transition-colors" href="/shop?category=accessories">Accessories</Link>
                    <Link className="text-slate-300 hover:text-primary text-sm font-medium leading-normal transition-colors" href="/about">Our Story</Link>
                    <Link className="text-slate-300 hover:text-primary text-sm font-medium leading-normal transition-colors" href="/shop?sale=true">Sale</Link>
                </nav>
            </div>

            <div className="flex flex-1 justify-end gap-6 items-center">
                {/* Search Input Desktop */}
                <div className="hidden md:flex w-full max-w-[240px] items-center rounded-full bg-white/5 border border-white/10 px-3 h-10 focus-within:border-primary transition-colors">
                    <span className="material-symbols-outlined text-slate-400 !text-[20px]">search</span>
                    <input className="w-full bg-transparent border-none text-sm text-white placeholder-slate-400 focus:ring-0 px-2 outline-none" placeholder="Search..." />
                </div>

                <div className="flex gap-3">
                    <button className="md:hidden flex items-center justify-center rounded-full size-10 bg-white/5 hover:bg-primary hover:text-background-dark text-white transition-all">
                        <span className="material-symbols-outlined !text-[20px]">search</span>
                    </button>
                    <Link href="/cart" className="flex items-center justify-center rounded-full size-10 bg-white/5 hover:bg-primary hover:text-background-dark text-white transition-all relative">
                        <span className="material-symbols-outlined !text-[20px]">shopping_bag</span>
                        {cartCount > 0 && <span className="absolute top-2 right-2 size-2 bg-primary rounded-full"></span>}
                    </Link>
                    <Link href="/dashboard" className="flex items-center justify-center rounded-full size-10 bg-white/5 hover:bg-primary hover:text-background-dark text-white transition-all">
                        <span className="material-symbols-outlined !text-[20px]">person</span>
                    </Link>
                </div>
            </div>
        </header>
    );
}
