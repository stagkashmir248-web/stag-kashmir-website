
import { Link } from "react-router-dom";

export default function Shop() {
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
                            <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 w-full text-left transition-colors group">
                                <span className="material-symbols-outlined text-slate-400 group-hover:text-primary">build</span>
                                <span className="text-sm font-medium group-hover:text-slate-900 dark:group-hover:text-white">Custom Bats</span>
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
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col pb-2 border-b border-slate-200 dark:border-slate-800">
                            <h3 className="text-slate-900 dark:text-white text-base font-bold">Willow Grade</h3>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4" type="checkbox" />
                                <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200">Grade 1</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4" type="checkbox" />
                                <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200">Grade 2</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4" type="checkbox" />
                                <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200">Grade 3</span>
                            </label>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1 flex flex-col gap-6">
                    {/* Breadcrumbs & Title */}
                    <div className="flex flex-col gap-4">
                        <nav className="flex text-sm text-slate-500 dark:text-slate-400">
                            <Link className="hover:text-primary transition-colors" to="/">Home</Link>
                            <span className="mx-2">/</span>
                            <Link className="hover:text-primary transition-colors" to="/shop">Shop</Link>
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
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                </select>
                            </div>
                        </div>
                        {/* Mobile Filter Toggle */}
                        <div className="lg:hidden flex overflow-x-auto gap-2 py-1 scrollbar-hide">
                            <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium whitespace-nowrap">
                                <span className="material-symbols-outlined text-[18px]">filter_list</span> Filters
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium whitespace-nowrap">
                                All Bats
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium whitespace-nowrap">
                                Hard Tennis
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium whitespace-nowrap">
                                Soft Tennis
                            </button>
                        </div>
                    </div>
                    {/* Product Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Product Card 1 */}
                        <div className="group flex flex-col bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 transition-all duration-300">
                            <Link to="/product/thunder-stroke-pro" className="relative aspect-[4/5] bg-slate-100 dark:bg-slate-800 overflow-hidden block">
                                <img alt="Cricket bat leaning against a wall" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdI1lC2XyHcHmFlSZUiw8Gp-ZOoNbFHmRyN5gb5CwYn9uHfTkN788evpse6D3BvcXcDmJbFjUo3fFn2KUQZaWhMpCDMsEmY320zqcMxPq9ikXc6TpB8tyF5tvPHBQFjz6jhJBRGyZbz3zKr7tXtswgXfpE-MPAQ-0Drr69WhOj95kAinT-r_80o5X7aI07-KL_tDzukEGJydAoGS0fycFMqsFguGqQVKRi24E4KDBlwb2Mn_E8Ow8WIWXeeOo-GkE1rQzG94sYExsM" />
                                <div className="absolute top-3 left-3">
                                    <span className="px-2 py-1 bg-primary text-white text-xs font-bold uppercase rounded-md tracking-wide">Best Seller</span>
                                </div>
                                <button onClick={(e) => e.preventDefault()} className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm text-slate-500 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300">
                                    <span className="material-symbols-outlined text-[20px]">favorite</span>
                                </button>
                            </Link>
                            <div className="flex flex-col flex-1 p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <Link to="/product/thunder-stroke-pro" className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-primary transition-colors">Thunder Stroke Pro</Link>
                                    <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                                        <span>4.9</span>
                                        <span className="material-symbols-outlined text-[14px] fill-current">star</span>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">Grade 1 Kashmir Willow, full profile with massive edges for power hitters.</p>
                                <div className="mt-auto flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-slate-400 line-through">₹4,999</span>
                                        <span className="text-xl font-bold text-slate-900 dark:text-white">₹3,499</span>
                                    </div>
                                    <button className="flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors">
                                        <span className="material-symbols-outlined">add_shopping_cart</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Product Card 2 */}
                        <div className="group flex flex-col bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 transition-all duration-300">
                            <Link to="/product/blaster-elite" className="relative aspect-[4/5] bg-slate-100 dark:bg-slate-800 overflow-hidden block">
                                <img alt="Professional cricket bat handle closeup" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZZJb2fWcuIS2u2slqv5ufy-ntfArx2xJPs1apEuMYitYn31YCNHfduApvWX802gZgxAzYU1jQ8VGx6KvGv3cBIrgLOI1hpaqJS-QWrWtDxjeIzutNaY7oovFNHT-rLbfP7Wx-LAroY2NPXOz9BphGB5vm8bRzr23Jc2lbufsYOgyxC2vUFNY-MUGNRGD-cXCLrBSEAc90zz4961wdESITNBrMhAfysBdcvTN15EzhTCJZIi6696mU2kBU21OLqDJfCoLHHMoyYziv" />
                                <div className="absolute top-3 left-3">
                                    <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold uppercase rounded-md tracking-wide">New</span>
                                </div>
                                <button onClick={(e) => e.preventDefault()} className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm text-slate-500 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300">
                                    <span className="material-symbols-outlined text-[20px]">favorite</span>
                                </button>
                            </Link>
                            <div className="flex flex-col flex-1 p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <Link to="/product/blaster-elite" className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-primary transition-colors">Blaster Elite</Link>
                                    <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                                        <span>4.7</span>
                                        <span className="material-symbols-outlined text-[14px] fill-current">star</span>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">Designed for hard tennis ball cricket, lightweight pickup and punchy drive.</p>
                                <div className="mt-auto flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-xl font-bold text-slate-900 dark:text-white">₹1,899</span>
                                    </div>
                                    <button className="flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors">
                                        <span className="material-symbols-outlined">add_shopping_cart</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Product Card 3 */}
                        <div className="group flex flex-col bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 transition-all duration-300">
                            <Link to="/product/master-blaster" className="relative aspect-[4/5] bg-slate-100 dark:bg-slate-800 overflow-hidden block">
                                <img alt="Cricket bat on grass field" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDC9K1OzjZAlTnfTVEIbOFwd0V72lXTclOkHX9M4ek9QKKVzT_Mh588KhfvSTHVCmuq2juciFMfaN2u8Kf8ErrN1VFMJXYYqs04-6YSwrSNJGJJ8P0Ed35vKlGnqC8wPPsiaEZSs6okwTC8niRTccieVwQ4jYYkkLvk1aYOwNp6An2w8cXdc0hsblHehzPg_eI4X1NIQeig4EMxRkaTKHYOEtZijXl1H5jLiwf1BwXTmSh-NFhmDVn_y1wu5ATjzzEOyOSbfN9heWxV" />
                                <button onClick={(e) => e.preventDefault()} className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm text-slate-500 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300">
                                    <span className="material-symbols-outlined text-[20px]">favorite</span>
                                </button>
                            </Link>
                            <div className="flex flex-col flex-1 p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <Link to="/product/master-blaster" className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-primary transition-colors">Stag Master Blaster</Link>
                                    <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                                        <span>4.8</span>
                                        <span className="material-symbols-outlined text-[14px] fill-current">star</span>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">Double blade technology for enhanced sweet spot. Ideal for advanced players.</p>
                                <div className="mt-auto flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-slate-400 line-through">₹6,999</span>
                                        <span className="text-xl font-bold text-slate-900 dark:text-white">₹5,299</span>
                                    </div>
                                    <button className="flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors">
                                        <span className="material-symbols-outlined">add_shopping_cart</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Product Card 4 */}
                        <div className="group flex flex-col bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 transition-all duration-300">
                            <Link to="/product/scoop-fire" className="relative aspect-[4/5] bg-slate-100 dark:bg-slate-800 overflow-hidden block">
                                <img alt="Cricket bat with red grip" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdjTtEIsulLGarNtaimoE30fwVU9djU5tok4tL_Wu1dZNjRONQB44EvsoFfoEktg6eSroBxR9uPJnWIygvQhnh4lTiZ6VHGSGNcMDPy-icvhTxk_4Ry55lgUxxW0E_shPEMdMozzEoVEnyHXVt3X4Qj7QSDnrPg4BCji4Cngx0BZ9IS0WQWzms19RvyTJe6W6UQtH6rrZuuzPX4yzg8n_D458oMTA4KuZegJB-zym9V-1rg7MZHa-E6wZrVNFB6DsPkl-iyRJgwSJV" />
                                <div className="absolute top-3 left-3">
                                    <span className="px-2 py-1 bg-slate-800 text-white text-xs font-bold uppercase rounded-md tracking-wide">Sold Out</span>
                                </div>
                                <button onClick={(e) => e.preventDefault()} className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm text-slate-500 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300">
                                    <span className="material-symbols-outlined text-[20px]">favorite</span>
                                </button>
                            </Link>
                            <div className="flex flex-col flex-1 p-5 opacity-75">
                                <div className="flex justify-between items-start mb-2">
                                    <Link to="/product/scoop-fire" className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-primary transition-colors">Scoop Fire</Link>
                                    <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                                        <span>4.5</span>
                                        <span className="material-symbols-outlined text-[14px] fill-current">star</span>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">Scoop design for lighter weight and faster bat swing speed.</p>
                                <div className="mt-auto flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-xl font-bold text-slate-900 dark:text-white">₹2,199</span>
                                    </div>
                                    <button className="flex items-center justify-center size-10 rounded-lg bg-slate-100 text-slate-400 cursor-not-allowed" disabled>
                                        <span className="material-symbols-outlined">block</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Product Card 5 */}
                        <div className="group flex flex-col bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 transition-all duration-300">
                            <Link to="/product/classic-drive" className="relative aspect-[4/5] bg-slate-100 dark:bg-slate-800 overflow-hidden block">
                                <img alt="Cricket equipment still life" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2ky7oBKFBlMpMrY2gqBeL_nxW7D0sruP-PR7WNfFfuVXqCu7iNyUbQncAGuYzEYGH6h0NQlSowxW7984BLoPUxdiWn8RQqTi1CgHKJOhAgKtmreD8B_Iv7NJjIFx2yE64wpAiDw754jk0rTNBpPiBjuqbW38DeuZ7y284Dss_4QVN3jBdN632vCn7vZMnDHQLQxBjd9pc3raaVtpr3zCDnnkPL8WUC9wIPyJtMs71-sXqv_uKJ5dS4SpVTK4qloUF-bUfrA4azbGj" />
                                <button onClick={(e) => e.preventDefault()} className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm text-slate-500 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300">
                                    <span className="material-symbols-outlined text-[20px]">favorite</span>
                                </button>
                            </Link>
                            <div className="flex flex-col flex-1 p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <Link to="/product/classic-drive" className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-primary transition-colors">Classic Drive</Link>
                                    <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                                        <span>5.0</span>
                                        <span className="material-symbols-outlined text-[14px] fill-current">star</span>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">Traditional shape with a lower sweet spot, perfect for front-foot play.</p>
                                <div className="mt-auto flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-xl font-bold text-slate-900 dark:text-white">₹3,899</span>
                                    </div>
                                    <button className="flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors">
                                        <span className="material-symbols-outlined">add_shopping_cart</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Product Card 6 */}
                        <div className="group flex flex-col bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 transition-all duration-300">
                            <Link to="/product/limited-edition-willow" className="relative aspect-[4/5] bg-slate-100 dark:bg-slate-800 overflow-hidden block">
                                <img alt="Close up of cricket bat grain" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuChIRFgHwo8NHN2m5nvuMh6FrWBRDS7wsci7j_0nqdlahZVGYN4kSCpvmPm5w6rObRl0kKa15-veumm3HGfccX1n-rkt2a639m5a4LoxM7B7cX0x5vOUEjjnGq_cksSzw93V7hF6_qxFmYG3CPtXpelW4N15Kq9YMmM4V-T9bh5ShVgTu9VSKI2a0BJQPw-t5SShK4Q5We-xVoj_APiu6BCKFtfO_sunhW1skud5jwPwPoNXNCSYNXxtPgAs0_Ly8CYtLFhmUOQqIjJ" />
                                <div className="absolute top-3 left-3">
                                    <span className="px-2 py-1 bg-amber-500 text-white text-xs font-bold uppercase rounded-md tracking-wide">Limited</span>
                                </div>
                                <button onClick={(e) => e.preventDefault()} className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm text-slate-500 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300">
                                    <span className="material-symbols-outlined text-[20px]">favorite</span>
                                </button>
                            </Link>
                            <div className="flex flex-col flex-1 p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <Link to="/product/limited-edition-willow" className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-primary transition-colors">Limited Edition Willow</Link>
                                    <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                                        <span>5.0</span>
                                        <span className="material-symbols-outlined text-[14px] fill-current">star</span>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">Hand-selected Grade 1+ willow. Only 50 pieces manufactured.</p>
                                <div className="mt-auto flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-xl font-bold text-slate-900 dark:text-white">₹8,499</span>
                                    </div>
                                    <button className="flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors">
                                        <span className="material-symbols-outlined">add_shopping_cart</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Pagination */}
                    <div className="flex items-center justify-center gap-2 mt-8 py-4">
                        <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 hover:border-primary hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                        </button>
                        <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white text-sm font-bold shadow-lg shadow-primary/25">1</button>
                        <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:border-primary hover:text-primary transition-colors text-sm font-medium">2</button>
                        <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:border-primary hover:text-primary transition-colors text-sm font-medium">3</button>
                        <span className="flex h-10 w-10 items-center justify-center text-slate-400">...</span>
                        <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 hover:border-primary hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
