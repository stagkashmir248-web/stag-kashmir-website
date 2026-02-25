import Link from "next/link";
import { getProducts } from "@/actions/product";

export const dynamic = "force-dynamic";

export default async function Shop() {
    const products = await getProducts();

    return (
        <main className="flex flex-1 justify-center py-8 px-4 sm:px-8 md:px-12 lg:px-20">
            <div className="flex w-full max-w-[1440px] gap-8">
                {/* Sidebar Filters */}
                <aside className="hidden lg:flex w-64 flex-col gap-8 shrink-0">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col pb-2 border-b border-slate-200 dark:border-slate-800">
                            <h1 className="text-slate-900 dark:text-white text-lg font-bold">Filters</h1>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">Refine by Category</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary font-medium w-full text-left transition-colors">
                                <span className="material-symbols-outlined">sports_cricket</span>
                                <span className="text-sm">All Bats</span>
                            </button>
                            <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 w-full text-left transition-colors group">
                                <span className="material-symbols-outlined text-slate-400 group-hover:text-primary">circle</span>
                                <span className="text-sm font-medium group-hover:text-slate-900 dark:group-hover:text-white">Hard Tennis</span>
                            </button>
                            <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 w-full text-left transition-colors group">
                                <span className="material-symbols-outlined text-slate-400 group-hover:text-primary">radio_button_unchecked</span>
                                <span className="text-sm font-medium group-hover:text-slate-900 dark:group-hover:text-white">Soft Tennis</span>
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col pb-2 border-b border-slate-200 dark:border-slate-800">
                            <h3 className="text-slate-900 dark:text-white text-base font-bold">Price Range</h3>
                        </div>
                        <div className="flex flex-col gap-4 px-1">
                            <input className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary" max="10000" min="1000" type="range" />
                            <div className="flex justify-between text-xs text-slate-500 font-medium">
                                <span>₹1,000</span>
                                <span>₹10,000+</span>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1 flex flex-col gap-6">
                    {/* Breadcrumbs & Title */}
                    <div className="flex flex-col gap-4">
                        <nav className="flex text-sm text-slate-500 dark:text-slate-400">
                            <Link className="hover:text-primary transition-colors" href="/">Home</Link>
                            <span className="mx-2">/</span>
                            <span className="text-slate-900 dark:text-white font-medium">Cricket Bats</span>
                        </nav>
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">Kashmir Willow Bats</h1>
                                <p className="mt-2 text-slate-500 dark:text-slate-400 text-sm md:text-base max-w-2xl">Premium handcrafted bats made from the finest Kashmir willow for power and precision.</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap">Sort by:</span>
                                <select className="form-select text-sm font-medium py-2 pl-3 pr-8 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-primary focus:border-primary">
                                    <option>Most Popular</option>
                                    <option>Newest Arrivals</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.length === 0 ? (
                            <div className="col-span-3 py-12 flex flex-col items-center text-center">
                                <span className="material-symbols-outlined text-border-color text-6xl mb-4">inventory_2</span>
                                <h3 className="text-xl font-bold text-text-main">No Products Found</h3>
                                <p className="text-text-secondary">Products will appear here once the database is fully seeded.</p>
                            </div>
                        ) : products.map((product) => (
                            <div key={product.id} className="group flex flex-col bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 transition-all duration-300">
                                <Link href={`/shop/${product.slug}`} className="relative aspect-[4/5] bg-slate-100 dark:bg-slate-800 overflow-hidden block">
                                    <img alt={product.name} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" src={product.imageUrl || "/placeholder.jpg"} />
                                    {product.stock <= 0 && (
                                        <div className="absolute top-3 left-3">
                                            <span className="px-2 py-1 bg-slate-800 text-white text-xs font-bold uppercase rounded-md tracking-wide">Sold Out</span>
                                        </div>
                                    )}
                                    <div className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm text-slate-500 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300">
                                        <span className="material-symbols-outlined text-[20px]">favorite</span>
                                    </div>
                                </Link>
                                <div className="flex flex-col flex-1 p-5">
                                    <div className="flex justify-between items-start mb-2">
                                        <Link href={`/shop/${product.slug}`} className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-primary transition-colors">{product.name}</Link>
                                    </div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">{product.description}</p>
                                    <div className="mt-auto flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-xl font-bold text-slate-900 dark:text-white">₹{product.price.toLocaleString()}</span>
                                        </div>
                                        <button className={`flex items-center justify-center size-10 rounded-lg transition-colors ${product.stock > 0 ? "bg-primary/10 text-primary hover:bg-primary hover:text-white" : "bg-slate-100 text-slate-400 cursor-not-allowed"}`} disabled={product.stock <= 0}>
                                            <span className="material-symbols-outlined">{product.stock <= 0 ? "block" : "add_shopping_cart"}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
