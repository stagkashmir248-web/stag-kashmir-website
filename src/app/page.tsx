import Link from "next/link";
import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton";
import NewsletterForm from "@/components/NewsletterForm";

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

                {/* Content - centered */}
                <div className="relative z-20 container mx-auto px-6 lg:px-12 flex flex-col items-center text-center gap-6 max-w-5xl">
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
                    <div className="flex flex-wrap justify-center gap-4 mt-4">
                        <Link href="/shop" className="bg-primary hover:bg-primary-dark text-background-dark font-bold text-base px-8 py-4 rounded-full transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                            Shop Season Collection
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats/Trust Indicators */}
            <div className="w-full bg-card-dark border-y border-white/5 py-8">
                <div className="container mx-auto px-6 lg:px-12 grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-3xl font-bold text-white">Hand-Crafted</span>
                        <span className="text-sm text-slate-400 uppercase tracking-wider">In Kashmir</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-3xl font-bold text-white">100%</span>
                        <span className="text-sm text-slate-400 uppercase tracking-wider">Kashmir Willow</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-3xl font-bold text-white">15k+</span>
                        <span className="text-sm text-slate-400 uppercase tracking-wider">Happy Cricketers</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-3xl font-bold text-white">PAN India</span>
                        <span className="text-sm text-slate-400 uppercase tracking-wider">Delivery</span>
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
                {/* Mobile: stacked vertically | Desktop: asymmetric 8+4 layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full mt-2">

                    {/* Hard Tennis */}
                    <Link href="/shop?category=hard-tennis" className="relative group overflow-hidden rounded-[1.5rem] md:rounded-[2rem] bg-neutral-900 border border-white/5 h-[320px] sm:h-[400px] lg:h-[460px] flex flex-col justify-end transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_40px_rgba(212,175,55,0.15)]">
                        {/* Background Image */}
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-110"
                            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAQ3bs7rI3vDpKLVBNElac5Jr2HkwLkLPCsYKKTAgJ_4rJqPJeVib1ojWQFd-meHiTsT6q6qZ7_rBF-7V1dtdaa21ujJmYhSegg9POwunu5qTv_mdiEPduLOJCUIR1SbxFYNtrSDx6A9Bz3fpmbjh45Z_ncZEZi84vwf4GthhCDL-yot4qpP_mg45CC-5mANA5_MCMBIGi3bV7CQZ5tid765GywcEfgWNu7ZItM6wRjkIahRoci4QXeQ7cElDDS6c9QFJgaJBTqy92M')" }} />

                        {/* Gradients */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 md:from-[#050505] md:via-[#050505]/40 to-transparent md:group-hover:from-black md:group-hover:via-black/70 transition-colors duration-500" />

                        {/* Content */}
                        <div className="relative z-10 p-4 sm:p-6 md:p-8 w-full transition-transform duration-500 ease-out transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0">
                            {/* Title */}
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-4 h-1 md:w-6 bg-primary rounded-full origin-left scale-x-100 md:scale-x-0 md:group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
                                <h3 className="text-lg sm:text-[22px] md:text-2xl lg:text-[22px] xl:text-3xl font-black text-primary md:text-white uppercase tracking-tight drop-shadow-lg md:group-hover:text-primary transition-colors duration-500 ml-0 md:-ml-8 md:group-hover:ml-0">
                                    Hard Tennis
                                </h3>
                            </div>

                            {/* Expandable Content */}
                            <div className="grid grid-rows-[1fr] md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-in-out">
                                <div className="overflow-hidden items-end flex">
                                    <div className="pt-1 md:pt-2 w-full">
                                        <p className="text-slate-300 text-[11px] sm:text-sm md:text-base leading-snug md:leading-relaxed mb-4 md:mb-6 opacity-100 md:opacity-0 md:group-hover:opacity-100 transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-500 delay-100 line-clamp-3 md:line-clamp-none">
                                            Engineered for explosive power and maximum durability under tough conditions.
                                        </p>

                                        {/* CTA */}
                                        <div className="flex items-center justify-between opacity-100 md:opacity-0 md:group-hover:opacity-100 transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-500 delay-200">
                                            <span className="text-white font-bold text-[10px] md:text-xs uppercase tracking-widest relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-primary after:origin-left after:scale-x-100 md:after:scale-x-0 md:group-hover:after:scale-x-100 after:transition-transform after:duration-500 after:delay-300">
                                                Explore
                                            </span>
                                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary md:bg-primary/20 backdrop-blur-sm border md:border-primary/30 flex items-center justify-center md:group-hover:bg-primary transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.4)] md:shadow-[0_0_15px_rgba(212,175,55,0)] md:group-hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                                                <span className="material-symbols-outlined !text-[16px] md:!text-[20px] text-black md:text-primary md:group-hover:text-black -rotate-45 md:rotate-0 md:group-hover:-rotate-45 transition-all duration-300">arrow_forward</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Soft Tennis */}
                    <Link href="/shop?category=soft-tennis" className="relative group overflow-hidden rounded-[1.5rem] md:rounded-[2rem] bg-neutral-900 border border-white/5 h-[320px] sm:h-[400px] lg:h-[460px] flex flex-col justify-end transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_40px_rgba(212,175,55,0.15)]">
                        {/* Background Image */}
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-110"
                            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAfTCVb0NnI2licMGUZh9PR4vNOx2_DWmNwcIEhrEvld5jDE3vu9Ajy9KTutKSyBaxo5EmjGXm2wNfh15_XygfNRGKbwMSgrFF1yXOe7Twv-X9_a18bFpe9XxujHKiRS_icL5JYqwLgFi4MZIhwyqvl_WsNbAUcdIhpKlHMu56wjlKNHVzTERRVpkX9-lURIZ7x7bqkUrgXZChH3NUvFP_7ZBpCEYErlmIemPuXM5yEJNAz9cxr0w2Z8qZ3AONttfyVcxC63TqMmOXG')" }} />

                        {/* Gradients */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 md:from-[#050505] md:via-[#050505]/40 to-transparent md:group-hover:from-black md:group-hover:via-black/70 transition-colors duration-500" />

                        {/* Content */}
                        <div className="relative z-10 p-4 sm:p-6 md:p-8 w-full transition-transform duration-500 ease-out transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0">
                            {/* Title */}
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-4 h-1 md:w-6 bg-primary rounded-full origin-left scale-x-100 md:scale-x-0 md:group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
                                <h3 className="text-lg sm:text-[22px] md:text-2xl lg:text-[22px] xl:text-3xl font-black text-primary md:text-white uppercase tracking-tight drop-shadow-lg md:group-hover:text-primary transition-colors duration-500 ml-0 md:-ml-8 md:group-hover:ml-0">
                                    Soft Tennis
                                </h3>
                            </div>

                            {/* Expandable Content */}
                            <div className="grid grid-rows-[1fr] md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-in-out">
                                <div className="overflow-hidden items-end flex">
                                    <div className="pt-1 md:pt-2 w-full">
                                        <p className="text-slate-300 text-[11px] sm:text-sm md:text-base leading-snug md:leading-relaxed mb-4 md:mb-6 opacity-100 md:opacity-0 md:group-hover:opacity-100 transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-500 delay-100 line-clamp-3 md:line-clamp-none">
                                            Lightweight design meant for unmatched control, precision, and swing speed.
                                        </p>

                                        {/* CTA */}
                                        <div className="flex items-center justify-between opacity-100 md:opacity-0 md:group-hover:opacity-100 transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-500 delay-200">
                                            <span className="text-white font-bold text-[10px] md:text-xs uppercase tracking-widest relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-primary after:origin-left after:scale-x-100 md:after:scale-x-0 md:group-hover:after:scale-x-100 after:transition-transform after:duration-500 after:delay-300">
                                                Explore
                                            </span>
                                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary md:bg-primary/20 backdrop-blur-sm border md:border-primary/30 flex items-center justify-center md:group-hover:bg-primary transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.4)] md:shadow-[0_0_15px_rgba(212,175,55,0)] md:group-hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                                                <span className="material-symbols-outlined !text-[16px] md:!text-[20px] text-black md:text-primary md:group-hover:text-black -rotate-45 md:rotate-0 md:group-hover:-rotate-45 transition-all duration-300">arrow_forward</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Season Bats */}
                    <Link href="/shop?category=season-leather" className="relative group overflow-hidden rounded-[1.5rem] md:rounded-[2rem] bg-neutral-900 border border-white/5 h-[320px] sm:h-[400px] lg:h-[460px] flex flex-col justify-end transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_40px_rgba(212,175,55,0.15)]">
                        {/* Background Image */}
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-110 bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuDQqA8Q54B86hN1l2B150p7205a2Pz0u11E152HnC4aA31mD9r1A3q2o9Q0KzL1TqWpF5QO7_p9N-z5_929z5xX3mB6L4yv4_E31Q0QZzMhF3d96924hN9qF_L461m_a6tP6A_5L7s4e0uF87x_B1Z1G_5vW_t0V_O_U_C1z7Bv4g9a63M9A3a3z8i_b5zM2Y2Q6r2N703U8aF7_L7a2tB28Xk')]" />

                        {/* Gradients */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 md:from-[#050505] md:via-[#050505]/40 to-transparent md:group-hover:from-black md:group-hover:via-black/70 transition-colors duration-500" />

                        {/* Content */}
                        <div className="relative z-10 p-4 sm:p-6 md:p-8 w-full transition-transform duration-500 ease-out transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0">
                            {/* Title */}
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-4 h-1 md:w-6 bg-primary rounded-full origin-left scale-x-100 md:scale-x-0 md:group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
                                <h3 className="text-lg sm:text-[22px] md:text-2xl lg:text-[22px] xl:text-3xl font-black text-primary md:text-white uppercase tracking-tight drop-shadow-lg md:group-hover:text-primary transition-colors duration-500 ml-0 md:-ml-8 md:group-hover:ml-0">
                                    Season Bats
                                </h3>
                            </div>

                            {/* Expandable Content */}
                            <div className="grid grid-rows-[1fr] md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-in-out">
                                <div className="overflow-hidden items-end flex">
                                    <div className="pt-1 md:pt-2 w-full">
                                        <p className="text-slate-300 text-[11px] sm:text-sm md:text-base leading-snug md:leading-relaxed mb-4 md:mb-6 opacity-100 md:opacity-0 md:group-hover:opacity-100 transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-500 delay-100 line-clamp-3 md:line-clamp-none">
                                            Masterfully handcrafted from premium selection of English and Kashmir willow.
                                        </p>

                                        {/* CTA */}
                                        <div className="flex items-center justify-between opacity-100 md:opacity-0 md:group-hover:opacity-100 transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-500 delay-200">
                                            <span className="text-white font-bold text-[10px] md:text-xs uppercase tracking-widest relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-primary after:origin-left after:scale-x-100 md:after:scale-x-0 md:group-hover:after:scale-x-100 after:transition-transform after:duration-500 after:delay-300">
                                                Explore
                                            </span>
                                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary md:bg-primary/20 backdrop-blur-sm border md:border-primary/30 flex items-center justify-center md:group-hover:bg-primary transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.4)] md:shadow-[0_0_15px_rgba(212,175,55,0)] md:group-hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                                                <span className="material-symbols-outlined !text-[16px] md:!text-[20px] text-black md:text-primary md:group-hover:text-black -rotate-45 md:rotate-0 md:group-hover:-rotate-45 transition-all duration-300">arrow_forward</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Junior Bats */}
                    <Link href="/shop?category=junior-bats" className="relative group overflow-hidden rounded-[1.5rem] md:rounded-[2rem] bg-neutral-900 border border-white/5 h-[320px] sm:h-[400px] lg:h-[460px] flex flex-col justify-end transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_40px_rgba(212,175,55,0.15)]">
                        {/* Background Image */}
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-110"
                            style={{ backgroundImage: "url('/Wolverine%20Hard%20Tennis%20Bat%20Gold%20Edition.webp')" }} />

                        {/* Gradients */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 md:from-[#050505] md:via-[#050505]/40 to-transparent md:group-hover:from-black md:group-hover:via-black/70 transition-colors duration-500" />

                        {/* Content */}
                        <div className="relative z-10 p-4 sm:p-6 md:p-8 w-full transition-transform duration-500 ease-out transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0">
                            {/* Title */}
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-4 h-1 md:w-6 bg-primary rounded-full origin-left scale-x-100 md:scale-x-0 md:group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
                                <h3 className="text-lg sm:text-[22px] md:text-2xl lg:text-[22px] xl:text-3xl font-black text-primary md:text-white uppercase tracking-tight drop-shadow-lg md:group-hover:text-primary transition-colors duration-500 ml-0 md:-ml-8 md:group-hover:ml-0">
                                    Junior Bats
                                </h3>
                            </div>

                            {/* Expandable Content */}
                            <div className="grid grid-rows-[1fr] md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-in-out">
                                <div className="overflow-hidden items-end flex">
                                    <div className="pt-1 md:pt-2 w-full">
                                        <p className="text-slate-300 text-[11px] sm:text-sm md:text-base leading-snug md:leading-relaxed mb-4 md:mb-6 opacity-100 md:opacity-0 md:group-hover:opacity-100 transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-500 delay-100 line-clamp-3 md:line-clamp-none">
                                            The perfect start for the absolute champions of tomorrow and future legends.
                                        </p>

                                        {/* CTA */}
                                        <div className="flex items-center justify-between opacity-100 md:opacity-0 md:group-hover:opacity-100 transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-500 delay-200">
                                            <span className="text-white font-bold text-[10px] md:text-xs uppercase tracking-widest relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-primary after:origin-left after:scale-x-100 md:after:scale-x-0 md:group-hover:after:scale-x-100 after:transition-transform after:duration-500 after:delay-300">
                                                Explore
                                            </span>
                                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary md:bg-primary/20 backdrop-blur-sm border md:border-primary/30 flex items-center justify-center md:group-hover:bg-primary transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.4)] md:shadow-[0_0_15px_rgba(212,175,55,0)] md:group-hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                                                <span className="material-symbols-outlined !text-[16px] md:!text-[20px] text-black md:text-primary md:group-hover:text-black -rotate-45 md:rotate-0 md:group-hover:-rotate-45 transition-all duration-300">arrow_forward</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>

                </div>

                {/* Customisable Bat Full-Width Banner */}
                <div className="mt-8 w-full">
                    <Link href="/customise" className="relative group block overflow-hidden rounded-2xl md:min-h-[240px] bg-gradient-to-br from-[#1a1c23] via-[#2a221a] to-[#3a2812] border border-white/10 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.2),transparent_60%)] group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] mix-blend-overlay"></div>

                        <div className="relative h-full flex flex-col md:flex-row items-center justify-between p-8 md:p-12 z-10 gap-8 md:gap-12">
                            <div className="flex-1 max-w-2xl transform group-hover:translate-x-2 transition-transform duration-500">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold tracking-widest uppercase mb-4">
                                    <span className="material-symbols-outlined !text-[14px]">auto_awesome</span>
                                    <span>Made to Order</span>
                                </div>
                                <h3 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight leading-tight">
                                    Craft Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-600">Perfect Profile</span>
                                </h3>
                                <p className="text-slate-400 text-sm md:text-base mb-8">
                                    Take full control of your game. Choose your preferred willow grade, weight, handle type, and sweet spot location to get a bat that perfectly matches your playing style. Let our master craftsmen build your dream bat.
                                </p>
                                <span className="inline-flex items-center justify-center gap-2 bg-primary text-background-dark px-8 py-3.5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-primary-light transition-all shadow-lg shadow-primary/20 group-hover:shadow-primary/40">
                                    Start Customizing Now <span className="material-symbols-outlined !text-[18px] group-hover:rotate-45 transition-transform duration-300">build</span>
                                </span>
                            </div>

                            {/* Decorative element on the right side */}
                            <div className="hidden md:flex flex-1 justify-end opacity-40 group-hover:opacity-100 transition-opacity duration-500 min-w-[200px]">
                                <span className="material-symbols-outlined !text-[180px] text-white/5 group-hover:text-primary/10 rotate-12 transform group-hover:-rotate-6 transition-all duration-700 ease-out">carpenter</span>
                            </div>
                        </div>

                        {/* Shimmer effect */}
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:animate-[shimmer_2s_infinite]" />
                    </Link>
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
                                    <AddToCartButton product={{ id: "wolverine-gold-edition", name: "Wolverine Gold Edition", price: 3499, imageUrl: "/Wolverine%20Hard%20Tennis%20Bat%20Gold%20Edition.webp" }} />
                                </div>
                            </div>
                        </div>

                        {/* Product Card 2 */}
                        <div className="group bg-background-dark rounded-xl border border-white/5 overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                            <div className="aspect-[4/5] w-full relative bg-neutral-800 overflow-hidden">
                                <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">-20%</div>

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
                                    <AddToCartButton product={{ id: "thala-edition-hard-tennis-bat", name: "Thala Edition", price: 2999, imageUrl: "/Thala%20Edition%20Hard%20Tennis%20Bat.webp" }} />
                                </div>
                            </div>
                        </div>

                        {/* Product Card 3 */}
                        <div className="group bg-background-dark rounded-xl border border-white/5 overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                            <div className="aspect-[4/5] w-full relative bg-neutral-800 overflow-hidden">

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
                                    <AddToCartButton product={{ id: "gorilla-edition-hard-tennis-bat", name: "Gorilla Edition", price: 2499, imageUrl: "/Gorilla%20Edition%20Hard%20Tennis%20Bat.webp" }} />
                                </div>
                            </div>
                        </div>

                        {/* Product Card 4 */}
                        <div className="group bg-background-dark rounded-xl border border-white/5 overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                            <div className="aspect-[4/5] w-full relative bg-neutral-800 overflow-hidden">

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
                                    <AddToCartButton product={{ id: "wolverine-hard-tennis", name: "Wolverine", price: 1899, imageUrl: "/Wolverine%20Hard%20Tennis%20Bat.webp" }} />
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
                    <NewsletterForm />
                </div>
            </section>
        </div>
    );
}
