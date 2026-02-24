

export default function CareGuide() {
    return (
        <div className="flex flex-1 justify-center py-8 px-4 md:px-10">
            <div className="layout-content-container flex flex-col max-w-[1000px] flex-1 gap-10">
                {/* Navigation within page if needed, but we rely on generic Header mostly */}
                <div className="hidden md:flex flex-1 justify-between items-center mb-4">
                    <h2 className="text-2xl font-black px-4">Stag Kashmir Care</h2>
                    <nav className="flex items-center gap-9">
                        <a className="text-slate-700 dark:text-slate-300 text-sm font-semibold hover:text-primary transition-colors" href="#knocking">Knocking-in</a>
                        <a className="text-slate-700 dark:text-slate-300 text-sm font-semibold hover:text-primary transition-colors" href="#oiling">Oiling</a>
                        <a className="text-slate-700 dark:text-slate-300 text-sm font-semibold hover:text-primary transition-colors" href="#storage">Storage</a>
                        <a className="text-slate-700 dark:text-slate-300 text-sm font-semibold hover:text-primary transition-colors" href="#">FAQ</a>
                    </nav>
                </div>

                {/* Hero Section */}
                <section className="@container">
                    <div className="@[480px]:py-3">
                        <div
                            className="relative bg-cover bg-center flex flex-col justify-end overflow-hidden rounded-xl min-h-[400px] shadow-2xl"
                            style={{
                                backgroundImage:
                                    'linear-gradient(to top, rgba(33, 17, 17, 0.9) 0%, rgba(33, 17, 17, 0.2) 60%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBAbLmhW6mNG6rXUyNnfiLTtM37btSxaGkn7-Mw2dQyaSxmNSnTbI9X1V-H83OAzG7uaCfxbh0KyjnfsFgpvd5hCaIwK47POD3fpqJd8-qEvp3rGZso8otRXHF4EMQ3FM4f2EFqE0LybtR2NEGgofNHTeYeW3RTODaBRIuDGkerYZjhpIcn2c1eRXd120INq7iDzEXrUvaPfNdwXc0rWjVg3HqvdbntRDrydifRM7a-G-AhEXxefsgzWD2Ruac_TNAbwiyRzhBnVoDw")',
                            }}
                        >
                            <div className="flex flex-col p-8 gap-4">
                                <div className="inline-flex items-center gap-2 bg-primary px-3 py-1 rounded-full w-fit">
                                    <span className="material-symbols-outlined text-white text-xs">verified</span>
                                    <span className="text-white text-[10px] uppercase font-black tracking-widest">Official Maintenance Guide</span>
                                </div>
                                <h1 className="text-white text-4xl md:text-5xl font-black leading-tight">Master Your Stag Kashmir Willow</h1>
                                <p className="text-slate-200 text-lg max-w-xl">
                                    Unlock the full potential of your cricket bat. Proper seasoning and maintenance can increase durability by 40% and optimize your sweet spot.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Key Benefits */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col gap-3 rounded-xl p-6 border border-primary/10 bg-white dark:bg-background-dark shadow-sm">
                        <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-3xl">timer</span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Durability Boost</p>
                        <p className="text-slate-900 dark:text-slate-100 text-3xl font-black">+40% Lifespan</p>
                    </div>
                    <div className="flex flex-col gap-3 rounded-xl p-6 border border-primary/10 bg-white dark:bg-background-dark shadow-sm">
                        <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-3xl">bolt</span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Power Output</p>
                        <p className="text-slate-900 dark:text-slate-100 text-3xl font-black">Peak Performance</p>
                    </div>
                    <div className="flex flex-col gap-3 rounded-xl p-6 border border-primary/10 bg-white dark:bg-background-dark shadow-sm">
                        <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-3xl">target</span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Sweet Spot</p>
                        <p className="text-slate-900 dark:text-slate-100 text-3xl font-black">Edge-to-Edge</p>
                    </div>
                </section>

                {/* Knocking-In Guide */}
                <section className="flex flex-col gap-6 scroll-mt-24" id="knocking">
                    <div className="flex items-center gap-4">
                        <div className="h-1 w-12 bg-primary rounded-full"></div>
                        <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tight">Step 1: Knocking-In</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="flex flex-col gap-4">
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                Knocking-in is the process of compressing the soft fibers of the Kashmir willow to prevent cracking and improve the "ping" of the bat. This is the most crucial step for any new Stag bat.
                            </p>
                            <ul className="flex flex-col gap-4">
                                <li className="flex gap-4">
                                    <div className="flex-none h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">1</div>
                                    <p className="text-sm dark:text-slate-300"><span className="font-bold">Initial Softening:</span> Use a wooden bat mallet to gently strike the face and edges for 2-3 hours.</p>
                                </li>
                                <li className="flex gap-4">
                                    <div className="flex-none h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">2</div>
                                    <p className="text-sm dark:text-slate-300"><span className="font-bold">Gradual Force:</span> Increase the striking force slowly, focusing on the edges and toe (avoid the handle).</p>
                                </li>
                                <li className="flex gap-4">
                                    <div className="flex-none h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">3</div>
                                    <p className="text-sm dark:text-slate-300"><span className="font-bold">Net Testing:</span> Start with soft ball throw-downs before moving to new hard balls.</p>
                                </li>
                            </ul>
                        </div>
                        <div
                            className="rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800 aspect-video flex items-center justify-center border-4 border-white dark:border-background-dark shadow-xl"
                            style={{
                                backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDXlkSMktV_8E1uXtPOxxnI3LrphDQQHUI_B4DKzt0-B2urair948ZjNynOqDe0XbLNVIhR1SzqyZjQ3nf0w5aTrMT0H7OKRt-ZjT-pg7rbA0V_DzKX7ePb8u8wwNyyM2AkFZSscKCZSKXdL0IhMgCdXQM5EjQ-T8mqO8nYsCZ4B2PnR6UV3UKuyTvUQI0TEphiuAWtAV8QPBL5qPCr3Fev5fweWSNIxhQJkvJt3nqXXnNgrPYMcrOwjhgDbqL2I_tPQQra4Jju9Ztj")',
                                backgroundSize: 'cover'
                            }}
                        >
                            <div className="bg-black/40 backdrop-blur-sm p-4 rounded-full text-white cursor-pointer hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-4xl">play_circle</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Oiling Guide */}
                <section className="flex flex-col gap-6 scroll-mt-24 bg-white dark:bg-slate-900/50 p-8 rounded-2xl border border-primary/5" id="oiling">
                    <div className="flex items-center gap-4">
                        <div className="h-1 w-12 bg-primary rounded-full"></div>
                        <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tight">Step 2: Oiling</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-6 bg-background-light dark:bg-background-dark rounded-xl flex flex-col gap-3">
                            <span className="material-symbols-outlined text-primary text-4xl">format_paint</span>
                            <h3 className="font-bold text-lg">Apply Lightly</h3>
                            <p className="text-sm text-slate-500">Apply a teaspoon of Raw Linseed Oil to the face, edges, and back. Avoid the splice (handle joint).</p>
                        </div>
                        <div className="p-6 bg-background-light dark:bg-background-dark rounded-xl flex flex-col gap-3">
                            <span className="material-symbols-outlined text-primary text-4xl">schedule</span>
                            <h3 className="font-bold text-lg">Rest Time</h3>
                            <p className="text-sm text-slate-500">Leave the bat horizontal, face-up, for 24 hours to allow the oil to soak into the wood fibers.</p>
                        </div>
                        <div className="p-6 bg-background-light dark:bg-background-dark rounded-xl flex flex-col gap-3">
                            <span className="material-symbols-outlined text-primary text-4xl">cleaning_services</span>
                            <h3 className="font-bold text-lg">Wipe Excess</h3>
                            <p className="text-sm text-slate-500">Remove any unabsorbed oil with a clean cloth. Repeat 2-3 times during the initial season.</p>
                        </div>
                    </div>
                    <div className="bg-primary/10 border-l-4 border-primary p-4 rounded-r-lg">
                        <p className="text-sm text-primary font-semibold">Pro Tip: Over-oiling can make the wood 'dead' and heavy. Always err on the side of caution!</p>
                    </div>
                </section>

                {/* Storage Guide */}
                <section className="flex flex-col gap-6 scroll-mt-24" id="storage">
                    <div className="flex items-center gap-4">
                        <div className="h-1 w-12 bg-primary rounded-full"></div>
                        <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tight">Step 3: Proper Storage</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="flex flex-col gap-6">
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-green-500/10 rounded-lg text-green-600">
                                    <span className="material-symbols-outlined">check_circle</span>
                                </div>
                                <div>
                                    <h4 className="font-bold">Cool &amp; Dry</h4>
                                    <p className="text-sm text-slate-500">Store in a cool, dry place away from direct sunlight or damp areas like garages.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-green-500/10 rounded-lg text-green-600">
                                    <span className="material-symbols-outlined">check_circle</span>
                                </div>
                                <div>
                                    <h4 className="font-bold">Vertical Positioning</h4>
                                    <p className="text-sm text-slate-500">Keep the bat standing vertically on its toe or hanging by the handle to maintain balance.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                    <span className="material-symbols-outlined">cancel</span>
                                </div>
                                <div>
                                    <h4 className="font-bold">Heat Sources</h4>
                                    <p className="text-sm text-slate-500">NEVER leave your bat in a hot car or next to a radiator. This will dry out the willow and cause cracks.</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg border border-primary/20">
                            <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors z-10"></div>
                            <img alt="Cricket gear bag" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpogOC2Mf7Wggmp6h0TNB_GAGDd7-XE05W2I0tlIJKA_CnzldrwPkRvqk2IpzZ_PWQg1_kixDY0Ud0mel_WmBE-3ml1-6qqmW_sInmhjXlrbVctf1McbqPsRCxahTcxZqEuLxZmngT-sIvmE_Cmu1dZFEsGOCBgRgeAJKhr1Gj6u5r_CxJpZzJShPfvasucwwyR2K4RMS4iBemPgbBFvI6ra-3MNv4h_dZBSgjDZV1Pve9VRTOlONZU7I7Hoqj6w3DOUggfs2xkZSv" />
                            <div className="absolute bottom-4 left-4 z-20">
                                <span className="bg-white/90 dark:bg-background-dark/90 px-3 py-1 rounded text-xs font-bold text-primary shadow-sm">Safe Storage Example</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer Support */}
                <div className="mt-12 border-t border-primary/10 pt-12 pb-16 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col gap-2 text-center md:text-left">
                        <div className="flex items-center gap-3 justify-center md:justify-start">
                            <span className="material-symbols-outlined text-primary text-3xl">contact_support</span>
                            <h3 className="text-lg font-bold">Need Expert Advice?</h3>
                        </div>
                        <p className="text-slate-500 text-sm">Our master bat-makers are here to help you get the best from your equipment.</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="px-6 py-3 rounded-lg border border-primary/20 font-bold hover:bg-primary/5 transition-colors">Download PDF Guide</button>
                        <button className="px-6 py-3 rounded-lg bg-primary text-white font-bold hover:shadow-lg hover:shadow-primary/30 transition-all">Chat with an Expert</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
