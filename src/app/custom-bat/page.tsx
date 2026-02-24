

export default function CustomBat() {
    return (
        <div className="flex-grow flex flex-col lg:flex-row h-full">
            {/* Left Side: Bat Preview (Sticky) */}
            <section className="lg:w-7/12 w-full bg-slate-50 relative flex items-center justify-center p-8 lg:p-20 min-h-[50vh] lg:min-h-0 lg:sticky lg:top-[73px] lg:h-[calc(100vh-73px)] border-r border-slate-200">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-200/50 to-slate-100/0 opacity-70 pointer-events-none"></div>
                <div className="relative w-full h-full flex flex-col items-center justify-center max-w-2xl mx-auto">
                    <div className="relative w-full aspect-[3/4] md:aspect-[16/9] flex items-center justify-center">
                        {/* Placeholder for 3D Bat Image */}
                        <div
                            className="w-48 md:w-56 h-[80%] bg-gradient-to-br from-amber-100 to-amber-200 rounded-full shadow-2xl transform rotate-12 flex items-center justify-center border border-amber-300 relative"
                            style={{
                                backgroundImage:
                                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBHHH2SJXmDeJf9PKURbPB1OV4vsgqhxtzZlpPyxg7pH6TkjTMSa41ghM1GdZyXZYpZoZrxhnSk-o23p67CZT2Pg3MPmcAu6fG-y1UmfagX-XQOKnFisYHlWPUXZX4qYJQZet59-P962h-g3WKVVfSF8HZ_R6USzF8MM9EKl9AGCW3Mnq4GwnZiABjEq7-gFOSS2u9Qw5YMwgyzhQnd4NY1Ee4knQPFx55m4nsXphDVUKgZd9qhfcUb0qFbO_ZNJc4Rqp5F0U8xc9UY')",
                                backgroundSize: "contain",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                boxShadow: "none",
                                border: "none",
                                backgroundColor: "transparent",
                            }}
                        ></div>
                        {/* Floating Tags for visualization */}
                        <div className="absolute top-1/4 right-10 lg:right-20 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-lg p-3 shadow-lg animate-bounce duration-[3000ms]">
                            <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">Willow</div>
                            <div className="text-slate-900 font-bold">Grade 1 Pro</div>
                        </div>
                        <div className="absolute bottom-1/4 left-10 lg:left-20 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-lg p-3 shadow-lg">
                            <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">Weight</div>
                            <div className="text-slate-900 font-bold">1180g - 1220g</div>
                        </div>
                    </div>
                    <div className="mt-8 text-center space-y-2 z-10">
                        <h3 className="text-3xl font-black text-slate-900 tracking-tight">The Kashmir Legend</h3>
                        <p className="text-slate-500">Authentic handcrafted willow for the perfect stroke.</p>
                    </div>
                </div>
            </section>

            {/* Right Side: Builder Controls (Scrollable) */}
            <section className="lg:w-5/12 w-full bg-white flex flex-col h-auto min-h-full">
                <div className="flex-1 p-6 lg:p-10 pb-32">
                    <div className="mb-10">
                        <span className="text-primary text-sm font-bold tracking-widest uppercase mb-2 block">Custom Builder</span>
                        <h1 className="text-4xl font-black text-slate-900 leading-tight mb-4">Craft Your Legacy</h1>
                        <p className="text-slate-600 leading-relaxed">Customize every aspect of your bat to match your playing style. Each selection updates your estimated delivery time and price.</p>
                    </div>

                    {/* Step 1: Willow Grade */}
                    <div className="mb-10">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                <span className="flex items-center justify-center size-6 rounded-full bg-slate-900 text-white text-xs">1</span>
                                Select Willow Grade
                            </h3>
                            <button className="text-xs font-medium text-primary hover:underline">Compare Grades</button>
                        </div>
                        <div className="space-y-3">
                            <label className="group relative flex cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-primary/50 transition-all has-[:checked]:border-primary has-[:checked]:ring-1 has-[:checked]:ring-primary">
                                <input defaultChecked className="sr-only" name="willow-grade" type="radio" />
                                <div className="flex flex-1">
                                    <div className="flex flex-col">
                                        <span className="block text-sm font-bold text-slate-900">Grade 1 Willow (Pro)</span>
                                        <span className="mt-1 flex items-center text-xs text-slate-500">Straight grains, minimal blemishes. Used by professionals.</span>
                                    </div>
                                </div>
                                <div className="font-bold text-slate-900">₹12,000</div>
                                <div className="absolute -inset-px rounded-xl border-2 border-primary opacity-0 group-has-[:checked]:opacity-100 pointer-events-none"></div>
                            </label>

                            <label className="group relative flex cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-primary/50 transition-all has-[:checked]:border-primary has-[:checked]:ring-1 has-[:checked]:ring-primary">
                                <input className="sr-only" name="willow-grade" type="radio" />
                                <div className="flex flex-1">
                                    <div className="flex flex-col">
                                        <span className="block text-sm font-bold text-slate-900">Grade 2 Willow (Club)</span>
                                        <span className="mt-1 flex items-center text-xs text-slate-500">Minor blemishes, excellent performance value.</span>
                                    </div>
                                </div>
                                <div className="font-bold text-slate-900">₹8,500</div>
                                <div className="absolute -inset-px rounded-xl border-2 border-primary opacity-0 group-has-[:checked]:opacity-100 pointer-events-none"></div>
                            </label>

                            <label className="group relative flex cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-primary/50 transition-all has-[:checked]:border-primary has-[:checked]:ring-1 has-[:checked]:ring-primary">
                                <input className="sr-only" name="willow-grade" type="radio" />
                                <div className="flex flex-1">
                                    <div className="flex flex-col">
                                        <span className="block text-sm font-bold text-slate-900">Grade 3 Willow (Practice)</span>
                                        <span className="mt-1 flex items-center text-xs text-slate-500">Great for net practice and heavy usage.</span>
                                    </div>
                                </div>
                                <div className="font-bold text-slate-900">₹5,000</div>
                                <div className="absolute -inset-px rounded-xl border-2 border-primary opacity-0 group-has-[:checked]:opacity-100 pointer-events-none"></div>
                            </label>
                        </div>
                    </div>

                    {/* Step 2: Handle Shape */}
                    <div className="mb-10">
                        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <span className="flex items-center justify-center size-6 rounded-full bg-slate-900 text-white text-xs">2</span>
                            Handle Shape
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <label className="cursor-pointer group">
                                <input defaultChecked className="peer sr-only" name="handle-shape" type="radio" />
                                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 hover:bg-white hover:border-primary/50 peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:text-primary transition-all text-center h-full flex flex-col items-center justify-center gap-2">
                                    <span className="material-symbols-outlined text-3xl">circle</span>
                                    <span className="font-bold text-sm">Round Handle</span>
                                    <span className="text-xs text-slate-500 font-normal group-hover:text-slate-700 peer-checked:text-primary">Classic feel, allows bottom hand rotation.</span>
                                </div>
                            </label>

                            <label className="cursor-pointer group">
                                <input className="peer sr-only" name="handle-shape" type="radio" />
                                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 hover:bg-white hover:border-primary/50 peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:text-primary transition-all text-center h-full flex flex-col items-center justify-center gap-2">
                                    <span className="material-symbols-outlined text-3xl">egg</span>
                                    <span className="font-bold text-sm">Oval Handle</span>
                                    <span className="text-xs text-slate-500 font-normal group-hover:text-slate-700 peer-checked:text-primary">Better directional control, firm grip.</span>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Step 3: Balance Point */}
                    <div className="mb-10">
                        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <span className="flex items-center justify-center size-6 rounded-full bg-slate-900 text-white text-xs">3</span>
                            Sweet Spot Position
                        </h3>
                        <div className="relative bg-slate-100 rounded-xl p-1 flex">
                            <label className="flex-1 text-center cursor-pointer">
                                <input className="peer sr-only" name="balance" type="radio" />
                                <div className="py-2.5 px-3 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 peer-checked:bg-white peer-checked:text-primary peer-checked:shadow-sm transition-all">
                                    Low
                                </div>
                            </label>
                            <label className="flex-1 text-center cursor-pointer">
                                <input defaultChecked className="peer sr-only" name="balance" type="radio" />
                                <div className="py-2.5 px-3 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 peer-checked:bg-white peer-checked:text-primary peer-checked:shadow-sm transition-all">
                                    Mid
                                </div>
                            </label>
                            <label className="flex-1 text-center cursor-pointer">
                                <input className="peer sr-only" name="balance" type="radio" />
                                <div className="py-2.5 px-3 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 peer-checked:bg-white peer-checked:text-primary peer-checked:shadow-sm transition-all">
                                    High
                                </div>
                            </label>
                        </div>
                        <p className="mt-3 text-xs text-slate-500 text-center">
                            Mid profile is suitable for both front and back foot play, ideal for Indian conditions.
                        </p>
                    </div>

                    {/* Extras */}
                    <div className="mb-6">
                        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <span className="flex items-center justify-center size-6 rounded-full bg-slate-900 text-white text-xs">4</span>
                            Extras
                        </h3>
                        <div className="space-y-3">
                            <label className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer group">
                                <div className="flex items-center gap-3">
                                    <input className="rounded border-slate-300 text-primary focus:ring-primary h-5 w-5" type="checkbox" />
                                    <span className="text-sm font-medium text-slate-900">Add Toe Guard</span>
                                </div>
                                <span className="text-sm font-bold text-slate-600 group-hover:text-primary transition-colors">+₹300</span>
                            </label>

                            <label className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer group">
                                <div className="flex items-center gap-3">
                                    <input className="rounded border-slate-300 text-primary focus:ring-primary h-5 w-5" type="checkbox" />
                                    <span className="text-sm font-medium text-slate-900">Extra Grip</span>
                                </div>
                                <span className="text-sm font-bold text-slate-600 group-hover:text-primary transition-colors">+₹150</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Sticky Footer Action */}
                <div className="sticky bottom-0 left-0 w-full bg-white border-t border-slate-200 p-6 lg:p-8 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-20">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex flex-col">
                            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Total Estimate</span>
                            <span className="text-3xl font-black text-slate-900">₹12,450</span>
                        </div>
                        <div className="text-right hidden sm:block">
                            <span className="text-xs text-slate-500 block">Estimated Delivery</span>
                            <span className="text-sm font-bold text-slate-900">12 - 15 Days</span>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex-1 bg-primary hover:bg-red-700 text-white font-bold h-12 rounded-lg transition-colors flex items-center justify-center gap-2">
                            Add to Cart
                        </button>
                        <button className="aspect-square bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold h-12 rounded-lg transition-colors flex items-center justify-center">
                            <span className="material-symbols-outlined">favorite</span>
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
