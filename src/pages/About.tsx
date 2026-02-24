
import { Link } from "react-router-dom";

export default function About() {
    return (
        <>
            <style>
                {`
        .text-shadow {
            text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .no-scrollbar {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
        }
        `}
            </style>

            {/* Hero Section */}
            <section className="relative h-[80vh] w-full overflow-hidden flex items-end">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(33,17,17,0.9)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuDvsGEwMzKmRccfltexhVcg-sYtr4LNmDMrV-_8FJB4xPMyPRXl2TchmW0KaxdMjMNZxnV2mrE8joR2B58PXCY8REtDe4ICmf0qCFHJxk_LYNrrsova0IuKpjVyntVM_Mw4KXbNWnavIZBbWvTZID55gTPEnI6mufrS1Et0vaRXrzqsc3LFrkU5PWtBDEvQIew1F21sGidbKtwHjk-4d0wRPIl6EzVtp1ArCbjNSkJX9EJJaLymyi6lfmZZdASLSF5e2nKy6iQdziLl')",
                    }}
                ></div>
                <div className="relative w-full max-w-6xl mx-auto px-6 pb-16 md:pb-24 text-center md:text-left">
                    <span className="inline-block px-4 py-1 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-widest mb-4">
                        Established 1980
                    </span>
                    <h1 className="text-white text-5xl md:text-7xl font-bold leading-tight mb-6 text-shadow">The Art of the Willow</h1>
                    <p className="text-slate-200 text-lg md:text-xl max-w-2xl leading-relaxed">
                        In the heart of the Kashmir valley, a century-old legacy breathes. Discover how nature's finest timber is transformed into the world's most coveted cricket bats.
                    </p>
                </div>
            </section>

            {/* The Source Section */}
            <section className="py-20 px-6 md:px-20 bg-background-light dark:bg-background-dark">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
                    <div className="flex-1 space-y-6">
                        <div className="flex items-center gap-2 text-primary">
                            <span className="material-symbols-outlined">eco</span>
                            <span className="uppercase tracking-[0.2em] font-bold text-sm">Chapter One</span>
                        </div>
                        <h2 className="text-4xl font-bold leading-tight">The Source: Salix Alba Caerulea</h2>
                        <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                            True Kashmir willow thrives in the unique microclimate of the valley. Fed by glacial meltwater and nurtured by the rich alluvial soil, our willow trees grow with the perfect density and resilience required for professional play.
                        </p>
                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <div className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                                <span className="text-primary font-bold text-2xl block">15+ Years</span>
                                <span className="text-xs text-slate-500 uppercase tracking-tighter">Growth Duration</span>
                            </div>
                            <div className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                                <span className="text-primary font-bold text-2xl block">Sustainable</span>
                                <span className="text-xs text-slate-500 uppercase tracking-tighter">Harvesting Policy</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 w-full">
                        <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                            <img
                                className="w-full h-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjZBfidC_4LEfRLTfCs4fqwOa4YZXqy6OogXfJ6b0NLvYMZCtEOywLRzpd2ILx1vaTkRX1qMdlSKlowVQ8D0dVXa40pMsw9td0XPPiASYfbsbzGrpuxsRaoPdLIGqamMBPZIhb8lpe0-W2vGlV4ihAnRLQd9sSki_GRJcvoQJ6m9XjXn5zjegz2-U8d2HC5HF28dPWJl8WYMoTSOhuznDe_2fRtW_DYehAFSzR3UwYyCd8l05jSambR7Den0zP8_PStORPaEIyFB9J"
                                alt="Misty Himalayan peaks bordering a willow plantation"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* The Process (Horizontal Scroll / Grid) */}
            <section className="py-24 bg-slate-100 dark:bg-slate-900 overflow-hidden">
                <div className="max-w-6xl mx-auto px-6 mb-16 text-center">
                    <h2 className="text-4xl font-bold mb-4">The Seasoning Process</h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Precision takes time. Our willow undergoes a meticulous journey from raw cleft to master stroke.
                    </p>
                </div>
                <div className="flex gap-8 px-6 md:px-20 overflow-x-auto pb-12 snap-x no-scrollbar">
                    {/* Step 1 */}
                    <div className="min-w-[300px] md:min-w-[400px] snap-center">
                        <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 aspect-video mb-6">
                            <img
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJ4arinF7_qOOQ9TEIuaVNK-HNVDsV15odB0OAnDEN-Y9Msjc8cx17Dit0r29yDBBBjn9Q1502AfhlCEFiJtW936ivxpgsZM_KC_FtVB8IQgI7mOJHhcn3vtTxbeOLfSJ_ewea-mUS5e6lLDLgvZ3JrTFE09mcbjlc48niQryITy8HHMYl80U5F9BywUP1w7ToGKRvibRYMl56PXFIlBCRe2eCC752XNbtB3gMITidXnU3qA2G88TU_Vo75PgskwKicND1L_APgDNM"
                                alt="Stacked raw willow clefts in a sunlit warehouse"
                            />
                            <div className="absolute top-4 left-4 bg-primary text-white size-10 rounded-full flex items-center justify-center font-bold">01</div>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Natural Seasoning</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">
                            Clefts are stacked to air-dry for months, allowing moisture to escape naturally without compromising fiber integrity.
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="min-w-[300px] md:min-w-[400px] snap-center">
                        <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 aspect-video mb-6">
                            <img
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrFeNWwK_ywgyzWhlqd78Hxwl3Ly4TTvkQZ6u314DLTaa7PxQVtWjcyMv2ra6_e1Qxoz_LFjvQcp_nYQ71lFE5VHyG0e4sLk5_SjCG3yidgREIluSCT4wO9yTYNE8hflZMQ0OqyDKRY9FH7c8PF05PEo5D2Z9xKxQDguDvrVnSiPiK4f8zlOi9Z0jfhxEpGEaNzFuksUsOHPtSpAQLrKnV353h51RXtNqdxI5UdGS-0HZ6LX5yFge5MT294oNxjg3QsZ_0ausWcxuz"
                                alt="Close up of mechanical pressing of a cricket bat"
                            />
                            <div className="absolute top-4 left-4 bg-primary text-white size-10 rounded-full flex items-center justify-center font-bold">02</div>
                        </div>
                        <h3 className="text-xl font-bold mb-2">The Pressing</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">
                            Each cleft is pressed with up to 4 tons of pressure to compress fibers for maximum power and 'ping'.
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="min-w-[300px] md:min-w-[400px] snap-center">
                        <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 aspect-video mb-6">
                            <img
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUDbhL3TY93HxYhefcIVIIYZttdLP6rNNtLaRufOxWLXcoHqPx4zscC7FvOZirVqSRTJJTe7iw6Wj08slUbRbhsW9dVxhPjG9nYcI3MIvFP3hj6iKLH8V6C8B0QETGTFi97gbmdbu7QfGb15IskUL9hm7RGsPeUM29k4s2DAzKaTADaCB66-Ozz1oOEN1AC3fvFEEthr2CtFVyrQHfTzXGrdDiCDEh79VQtDwq_IaV81kWww9CFW6Op9khYKk7N9jGLiOCrjFe4de2"
                                alt="Artisan using a hand plane to shape a bat"
                            />
                            <div className="absolute top-4 left-4 bg-primary text-white size-10 rounded-full flex items-center justify-center font-bold">03</div>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Master Shaping</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">
                            Hands that have shaped thousands of bats use traditional draw knives to carve the perfect profile.
                        </p>
                    </div>
                </div>
            </section>

            {/* Meet the Artisans */}
            <section className="py-24 px-6 md:px-20">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <div className="order-2 md:order-1 relative">
                        <div className="grid grid-cols-2 gap-4">
                            <img
                                className="rounded-xl aspect-square object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgL7UPF8UUnv4DNeZUxZ7WDjMAMxdvUiF9kh5gKD_sopJnKDZeXI3Owo6Zx-Sw_s5rv2LpwNUhZ9IRmWrtE6ryMfAGQcgMd_GuqfmAo2CG0HCQ4jDOU2Ezr9KdhJTqKAXTyCUnKHDKjqKdAUQwtmR4gGd6180m2ecNmsVYO5Eaf-PUt3rQIqjZw3vlPaCcw6-ad-q0afPI75rG7tmg7x0sLnZ9rU9z692pmOi3ML01Me3o9Q-cUicS_ZUwJnvrXgKatTDK7YPSyZOg"
                                alt="Elderly craftsman smiling in his workshop"
                            />
                            <img
                                className="rounded-xl aspect-square object-cover mt-8"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9bNjvNeXAjY_Leff-KclIAFQNihNUVbjuWRSU9Oc2AMbdtTINENHl8BfmLjCjR2mlhyyZnaSgexjzlBEFETzmLmbWD68H-dKv-3pcpme9pxpRMKlYrTkyryD1I4bWxOwrM1wG2xLSS-93drAuWXBfPlGkGCvdAYw8zHLb4YelFEaR_BIvXX96Hpp34fAubwApOq4kQWy-l3W0-6DyU_-lJ88IO-r_h3YtMz0dfdM9i56aN1slWCNmp87ew1c2uWu7iMHboPQhCOr1"
                                alt="Hands working on detailed wood engraving"
                            />
                        </div>
                        <div className="absolute -bottom-6 -right-6 bg-primary p-8 rounded-2xl text-white hidden md:block">
                            <span className="text-4xl font-black italic">40+</span>
                            <p className="text-sm font-bold opacity-80 uppercase tracking-widest">Generations of Knowledge</p>
                        </div>
                    </div>
                    <div className="order-1 md:order-2 space-y-6">
                        <div className="flex items-center gap-2 text-primary">
                            <span className="material-symbols-outlined">groups</span>
                            <span className="uppercase tracking-[0.2em] font-bold text-sm">The Makers</span>
                        </div>
                        <h2 className="text-4xl font-bold leading-tight">Meet the Artisans</h2>
                        <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                            A Stag bat isn't manufactured; it's birthed. Our master artisans, many from families that have been craftspeople for four generations, treat every piece of willow as a unique living entity. They listen to the wood, feeling for the grain and density to ensure every bat is perfectly balanced.
                        </p>
                        <blockquote className="border-l-4 border-primary pl-6 py-2 italic text-slate-500 dark:text-slate-300">
                            "The bat is already inside the wood. I just remove the parts that don't belong."
                            <footer className="text-sm font-bold mt-2 not-italic text-slate-900 dark:text-white">— Master Shaper, Ghulam Nabi</footer>
                        </blockquote>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 px-6 mb-20">
                <div className="max-w-4xl mx-auto rounded-3xl bg-primary overflow-hidden relative shadow-2xl">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                    <div className="relative z-10 p-10 md:p-16 text-center">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Experience the Heritage</h2>
                        <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">From the forest of Kashmir to the boundaries of the world. Own a piece of cricketing history.</p>
                        <div className="flex flex-col md:flex-row justify-center gap-4">
                            <Link to="/shop" className="px-8 py-4 bg-white text-primary rounded-full font-bold hover:bg-slate-100 transition-colors">Browse Collections</Link>
                            <Link to="/custom-bat" className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-colors">Custom Bat Order</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
