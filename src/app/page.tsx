import Link from "next/link";
import Image from "next/image";

export default function Home() {
    return (
        <div className="relative flex w-full flex-col group/design-root">
            {/* Hero Section */}
            <section className="relative h-[85vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuACJJkjBQqoshz-ycCQC5nQFp0w02RxHUt743T_P9goHxCGF_objQa9-kIyWnP81FYto3Y3V0rhLMtARjDWHSFOtL2g3fc4rocrTRrTatEeqbcVbY3E36JaJiZT6DLaruTKITZObygSI0wJQOuUiMPnXLl4iMAtuOaNkNNxE3LvLvHlSPSDNQ77XVL97rXeCeDs81A2p0YNlqket9Wqw2p4v1PT2VNSoGD85EuYAA4KoTrXGYFrGTHBzrgYx1b_SQzrxPJyCVFydoSI')" }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/80 to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent z-10" />

                {/* Content */}
                <div className="relative z-20 container mx-auto px-6 lg:px-12 flex flex-col items-start gap-6 max-w-7xl">
                    <span className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-2 backdrop-blur-sm">
                        Limited Edition Series
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] tracking-tight">
                        HANDCRAFTED <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-200">PERFECTION</span>
                    </h1>
                    <p className="text-slate-300 text-lg md:text-xl max-w-xl font-light leading-relaxed">
                        Experience the raw power of premium Kashmir Willow. Meticulously shaped for the modern cricketer who demands excellence in every stroke.
                    </p>
                    <div className="flex flex-wrap gap-4 mt-4">
                        <Link href="/shop" className="bg-primary hover:bg-primary-dark text-background-dark font-bold text-base px-8 py-4 rounded-full transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                            Shop Season Collection
                        </Link>
                        <button className="bg-white/5 hover:bg-white/10 border border-white/20 backdrop-blur-sm text-white font-medium text-base px-8 py-4 rounded-full transition-all flex items-center gap-2">
                            <span className="material-symbols-outlined !text-[20px]">play_circle</span>
                            Watch The Craft
                        </button>
                    </div>
                </div>
            </section>

            {/* Stats/Trust Indicators */}
            <div className="w-full bg-card-dark border-y border-white/5 py-8">
                <div className="container mx-auto px-6 lg:px-12 grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="flex flex-col items-center md:items-start gap-1">
                        <span className="text-3xl font-bold text-white">50+</span>
                        <span className="text-sm text-slate-400 uppercase tracking-wider">Years of Legacy</span>
                    </div>
                    <div className="flex flex-col items-center md:items-start gap-1">
                        <span className="text-3xl font-bold text-white">100%</span>
                        <span className="text-sm text-slate-400 uppercase tracking-wider">Kashmir Willow</span>
                    </div>
                    <div className="flex flex-col items-center md:items-start gap-1">
                        <span className="text-3xl font-bold text-white">15k+</span>
                        <span className="text-sm text-slate-400 uppercase tracking-wider">Happy Cricketers</span>
                    </div>
                    <div className="flex flex-col items-center md:items-start gap-1">
                        <span className="text-3xl font-bold text-white">Global</span>
                        <span className="text-sm text-slate-400 uppercase tracking-wider">Shipping</span>
                    </div>
                </div>
            </div>

            {/* Categories Grid */}
            <section className="py-20 px-6 lg:px-12 container mx-auto max-w-7xl">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Explore Categories</h2>
                        <p className="text-slate-400">Find the perfect blade for your playing style.</p>
                    </div>
                    <Link href="/shop" className="hidden md:flex items-center gap-1 text-primary hover:text-primary-dark font-medium transition-colors">
                        View All Categories <span className="material-symbols-outlined !text-[18px]">arrow_forward</span>
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">
                    {/* Large Card */}
                    <Link href="/shop?category=season" className="md:col-span-8 relative group overflow-hidden rounded-2xl h-[300px] md:h-full bg-neutral-800">
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCU5Ko31NNNh-DsSXePo0HqB6XWUh3WJedyFSRRVbOjwEYFZvIBYyP3oCmldxtLSVb-sQv_cQsomZIUrYLMzFAvw6FcXA1Y7VqllZt-zNoO8Ttxs9gX7QLWGT9DrIj7p46IcWKH2YVhsH-Wt1Y0ToqGyokRfO5IlUbk5IuTlerPY7OWp33_1AvNrmaHXzIFfENFg__GlSX30QxFLrF2_wtkTkAnz6YEZ82L2MHuiKAoj0NhRb4NXD_k6FSBg2kOZb9DaotTHFlPSQNX')" }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-8 w-full">
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Season Bats</h3>
                            <p className="text-slate-300 text-sm mb-4 max-w-md line-clamp-2">Premium grade willow designed for leather ball cricket. Superior balance and punch.</p>
                            <span className="inline-flex items-center gap-2 text-white font-medium group-hover:text-primary transition-colors">
                                Shop Now <span className="material-symbols-outlined !text-[18px]">arrow_right_alt</span>
                            </span>
                        </div>
                    </Link>

                    <div className="md:col-span-4 flex flex-col gap-6 h-full">
                        {/* Small Card 1 */}
                        <Link href="/shop?category=hard-tennis" className="flex-1 relative group overflow-hidden rounded-2xl bg-neutral-800 h-[250px] md:h-auto">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAQ3bs7rI3vDpKLVBNElac5Jr2HkwLkLPCsYKKTAgJ_4rJqPJeVib1ojWQFd-meHiTsT6q6qZ7_rBF-7V1dtdaa21ujJmYhSegg9POwunu5qTv_mdiEPduLOJCUIR1SbxFYNtrSDx6A9Bz3fpmbjh45Z_ncZEZi84vwf4GthhCDL-yot4qpP_mg45CC-5mANA5_MCMBIGi3bV7CQZ5tid765GywcEfgWNu7ZItM6wRjkIahRoci4QXeQ7cElDDS6c9QFJgaJBTqy92M')" }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
                            <div className="absolute bottom-0 left-0 p-6 w-full">
                                <h3 className="text-xl font-bold text-white">Hard Tennis</h3>
                                <span className="text-sm text-primary font-medium mt-1 inline-block">View Collection</span>
                            </div>
                        </Link>

                        {/* Small Card 2 */}
                        <Link href="/shop?category=soft-tennis" className="flex-1 relative group overflow-hidden rounded-2xl bg-neutral-800 h-[250px] md:h-auto">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAfTCVb0NnI2licMGUZh9PR4vNOx2_DWmNwcIEhrEvld5jDE3vu9Ajy9KTutKSyBaxo5EmjGXm2wNfh15_XygfNRGKbwMSgrFF1yXOe7Twv-X9_a18bFpe9XxujHKiRS_icL5JYqwLgFi4MZIhwyqvl_WsNbAUcdIhpKlHMu56wjlKNHVzTERRVpkX9-lURIZ7x7bqkUrgXZChH3NUvFP_7ZBpCEYErlmIemPuXM5yEJNAz9cxr0w2Z8qZ3AONttfyVcxC63TqMmOXG')" }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
                            <div className="absolute bottom-0 left-0 p-6 w-full">
                                <h3 className="text-xl font-bold text-white">Soft Tennis</h3>
                                <span className="text-sm text-primary font-medium mt-1 inline-block">View Collection</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Masterpieces */}
            <section className="bg-card-dark py-20 border-t border-white/5">
                <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
                    <div className="text-center mb-12">
                        <span className="text-primary text-sm font-bold tracking-widest uppercase mb-2 block">Premium Selection</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Featured Masterpieces</h2>
                        <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Product Card 1 */}
                        <div className="group bg-background-dark rounded-xl border border-white/5 overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                            <div className="aspect-[4/5] w-full relative bg-neutral-800 overflow-hidden">
                                <div className="absolute top-3 left-3 z-10 bg-primary text-background-dark text-xs font-bold px-2 py-1 rounded">NEW</div>
                                <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0">
                                    <button className="size-8 bg-white text-black rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                                        <span className="material-symbols-outlined !text-[16px]">favorite</span>
                                    </button>
                                </div>
                                <Link href="/shop/wolverine-gold-edition" className="block absolute inset-0 z-0">
                                    <Image
                                        fill
                                        src="/Wolverine%20Hard%20Tennis%20Bat%20Gold%20Edition.webp"
                                        alt="Wolverine Gold Edition"
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </Link>
                            </div>
                            <div className="p-5">
                                <div className="flex items-center gap-1 text-yellow-500 mb-2">
                                    <span className="material-symbols-outlined !text-[14px] fill-current">star</span>
                                    <span className="material-symbols-outlined !text-[14px] fill-current">star</span>
                                    <span className="material-symbols-outlined !text-[14px] fill-current">star</span>
                                    <span className="material-symbols-outlined !text-[14px] fill-current">star</span>
                                    <span className="material-symbols-outlined !text-[14px] fill-current">star</span>
                                    <span className="text-xs text-slate-500 ml-1">(24)</span>
                                </div>
                                <Link href="/shop/wolverine-gold-edition">
                                    <h3 className="text-lg font-bold text-white mb-1 hover:text-primary transition-colors">Wolverine Gold Edition</h3>
                                </Link>
                                <p className="text-slate-400 text-sm mb-4">Hard Tennis Bat</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xl font-bold text-white">₹3,499</span>
                                    <button className="text-primary hover:text-white border border-primary hover:bg-primary px-4 py-2 rounded-lg text-sm font-medium transition-all">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Product Card 2 */}
                        <div className="group bg-background-dark rounded-xl border border-white/5 overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                            <div className="aspect-[4/5] w-full relative bg-neutral-800 overflow-hidden">
                                <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">-20%</div>
                                <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0">
                                    <button className="size-8 bg-white text-black rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                                        <span className="material-symbols-outlined !text-[16px]">favorite</span>
                                    </button>
                                </div>
                                <Link href="/shop/thala-edition-hard-tennis-bat" className="block absolute inset-0 z-0">
                                    <Image
                                        fill
                                        src="/Thala%20Edition%20Hard%20Tennis%20Bat.webp"
                                        alt="Thala Edition Hard Tennis Bat"
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </Link>
                            </div>
                            <div className="p-5">
                                <div className="flex items-center gap-1 text-yellow-500 mb-2">
                                    <span className="material-symbols-outlined !text-[14px] fill-current">star</span>
                                    <span className="material-symbols-outlined !text-[14px] fill-current">star</span>
                                    <span className="material-symbols-outlined !text-[14px] fill-current">star</span>
                                    <span className="material-symbols-outlined !text-[14px] fill-current">star</span>
                                    <span className="material-symbols-outlined !text-[14px]">star_half</span>
                                    <span className="text-xs text-slate-500 ml-1">(18)</span>
                                </div>
                                <Link href="/shop/thala-edition-hard-tennis-bat">
                                    <h3 className="text-lg font-bold text-white mb-1 hover:text-primary transition-colors">Thala Edition</h3>
                                </Link>
                                <p className="text-slate-400 text-sm mb-4">Hard Tennis Bat</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-sm text-slate-500 line-through">₹3,599</span>
                                        <span className="text-xl font-bold text-white">₹2,999</span>
                                    </div>
                                    <button className="text-primary hover:text-white border border-primary hover:bg-primary px-4 py-2 rounded-lg text-sm font-medium transition-all">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Product Card 3 */}
                        <div className="group bg-background-dark rounded-xl border border-white/5 overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                            <div className="aspect-[4/5] w-full relative bg-neutral-800 overflow-hidden">
                                <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0">
                                    <button className="size-8 bg-white text-black rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                                        <span className="material-symbols-outlined !text-[16px]">favorite</span>
                                    </button>
                                </div>
                                <Link href="/shop/gorilla-edition-hard-tennis-bat" className="block absolute inset-0 z-0">
                                    <Image
                                        fill
                                        src="/Gorilla%20Edition%20Hard%20Tennis%20Bat.webp"
                                        alt="Gorilla Edition Hard Tennis Bat"
                                        className="object-cover transition-transform duration-500 group-hover:scale-105 brightness-90"
                                    />
                                </Link>
                            </div>
                            <div className="p-5">
                                <div className="flex items-center gap-1 text-yellow-500 mb-2">
                                    <span className="material-symbols-outlined !text-[14px] fill-current">star</span>
                                    <span className="material-symbols-outlined !text-[14px] fill-current">star</span>
                                    <span className="material-symbols-outlined !text-[14px] fill-current">star</span>
                                    <span className="material-symbols-outlined !text-[14px] fill-current">star</span>
                                    <span className="material-symbols-outlined !text-[14px] fill-current">star</span>
                                    <span className="text-xs text-slate-500 ml-1">(42)</span>
                                </div>
                                <Link href="/shop/gorilla-edition-hard-tennis-bat">
                                    <h3 className="text-lg font-bold text-white mb-1 hover:text-primary transition-colors">Gorilla Edition</h3>
                                </Link>
                                <p className="text-slate-400 text-sm mb-4">Hard Tennis Bat</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xl font-bold text-white">₹2,499</span>
                                    <button className="text-primary hover:text-white border border-primary hover:bg-primary px-4 py-2 rounded-lg text-sm font-medium transition-all">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Product Card 4 */}
                        <div className="group bg-background-dark rounded-xl border border-white/5 overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                            <div className="aspect-[4/5] w-full relative bg-neutral-800 overflow-hidden">
                                <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0">
                                    <button className="size-8 bg-white text-black rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                                        <span className="material-symbols-outlined !text-[16px]">favorite</span>
                                    </button>
                                </div>
                                <Link href="/shop/wolverine-hard-tennis" className="block absolute inset-0 z-0">
                                    <Image
                                        fill
                                        src="/Wolverine%20Hard%20Tennis%20Bat.webp"
                                        alt="Wolverine Hard Tennis Bat"
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </Link>
                            </div>
                            <div className="p-5">
                                <div className="flex items-center gap-1 text-yellow-500 mb-2">
                                    <span className="material-symbols-outlined !text-[14px] fill-current">star</span>
                                    <span className="material-symbols-outlined !text-[14px] fill-current">star</span>
                                    <span className="material-symbols-outlined !text-[14px] fill-current">star</span>
                                    <span className="material-symbols-outlined !text-[14px] fill-current">star</span>
                                    <span className="material-symbols-outlined !text-[14px] fill-current">star</span>
                                    <span className="text-xs text-slate-500 ml-1">(12)</span>
                                </div>
                                <Link href="/shop/wolverine-hard-tennis">
                                    <h3 className="text-lg font-bold text-white mb-1 hover:text-primary transition-colors">Wolverine</h3>
                                </Link>
                                <p className="text-slate-400 text-sm mb-4">Hard Tennis Bat</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xl font-bold text-white">₹1,899</span>
                                    <button className="text-primary hover:text-white border border-primary hover:bg-primary px-4 py-2 rounded-lg text-sm font-medium transition-all">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="mt-12 text-center">
                        <Link href="/shop" className="inline-flex items-center justify-center gap-2 bg-white text-background-dark font-bold text-base px-8 py-3 rounded-full hover:bg-gray-200 transition-colors">
                            View All Products
                        </Link>
                    </div>
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="relative py-20 px-6 lg:px-12 overflow-hidden border-t border-white/5 bg-background-dark">
                <div
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCJyo8wA-fPKyGDCb5cKHc089cUJpiM4I0bQF2j5N5wHLh7fuoIRXkwphmUR31yvjKMi6PIstWe4AYJEVUjYyHVxRbwF31GieAY9cDD23j3BlDsDLRUhW4EFuQ5uHrk4_o0t59yO609odTTDk_ohZuyoJzXtIt97zbqqpKUwdzroN-dcNqHOfrqZ3r65ZJRgxrRIRi03nF4JiDjtv_x7KtFOqyzC2WzbebQr5Sn6Bbl1WVXSMpMpx-8Ol-466NIPwEXuIWNUi3f6xY_')" }}
                />

                <div className="absolute inset-0 bg-background-dark/90 z-10" />

                <div className="relative z-20 container mx-auto max-w-4xl text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Join The Elite Club</h2>
                    <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">Subscribe to receive updates on limited edition drops, exclusive cricketer interviews, and early access to sales.</p>

                    <form className="flex flex-col md:flex-row gap-4 justify-center items-stretch max-w-lg mx-auto">
                        <input
                            className="flex-1 bg-white/10 border border-white/20 text-white placeholder-slate-400 rounded-lg px-6 py-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                            placeholder="Enter your email address"
                            type="email"
                        />
                        <button className="bg-primary hover:bg-primary-dark text-background-dark font-bold px-8 py-4 rounded-lg transition-colors whitespace-nowrap" type="submit">
                            Subscribe Now
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
}
