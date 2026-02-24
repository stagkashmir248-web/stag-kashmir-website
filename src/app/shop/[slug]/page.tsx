
import Link from "next/link";

export default function ProductDetail() {
    return (
        <main className="flex-1 flex justify-center py-8 px-4 sm:px-8 lg:px-12">
            <div className="flex flex-col w-full max-w-[1280px]">
                {/* Breadcrumb */}
                <div className="flex flex-wrap items-center gap-2 pb-6 text-sm">
                    <Link className="text-text-secondary hover:text-primary font-medium" href="/">Home</Link>
                    <span className="text-text-secondary/50">/</span>
                    <Link className="text-text-secondary hover:text-primary font-medium" href="/shop">Cricket Bats</Link>
                    <span className="text-text-secondary/50">/</span>
                    <span className="text-text-main font-semibold">Premium Kashmir Willow</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16">
                    {/* Image Gallery */}
                    <div className="lg:col-span-7 flex flex-col gap-4">
                        <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-white border border-border-color p-8 relative group">
                            <img
                                alt="Stag Premium Kashmir Willow Cricket Bat Front View"
                                className="h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDU2RTUrkWk_IiokURa8zTrDNdY_fXj-ODksiiI5n5H-LShEVhOTrikzrk_kpjDNAzETsjyA4QMdarbwrurxlYsbWgSN6hdtYI1LGY_QzqqoIyPbrpeb1Kh2AI5VpLhcn7FY9iov14q8izwVx4ctuhh4tCxSXiHLllMaeP_Ikd-i-lgL61A3QJr91q1rk4fL9aDoflGOmc1OTwr8_dkviOnXEifSXM-KYVMia4gMTb3iIP1VIb9mxEpRSKsS0_zxWhYgaNjb5PxyiDq"
                            />
                            <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                                Best Seller
                            </div>
                            <button className="absolute bottom-4 right-4 size-10 bg-white shadow-lg rounded-full flex items-center justify-center text-text-main hover:text-primary transition-colors">
                                <span className="material-symbols-outlined">zoom_in</span>
                            </button>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            <button className="aspect-square rounded-xl border-2 border-primary bg-white p-2 overflow-hidden">
                                <img
                                    alt="Front View"
                                    className="h-full w-full object-contain"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDsos0AEADYmFUJRPSOKGSA77ZPovJhr1T9hRhbYHkpG5f7odXWp1jqXUk2spnjHyhou2xJTnvWzs052gzPZ7W1VQ_rOrvnY271GaqQTPyovQZgb3LSIzbhTXhs15iCjFqzmui--8I_ALqE3Qk1UcpscbU4FUdjjH9k5hcV8wKNadEc0uKE9L4eZmh2HhND8JUf77irUK0Mb_jmMfdhycI9FIXxOVxLacT2tK64v1PB1X2mLc5dqFHf87axXitW8FmWbhDc5kPfVjC"
                                />
                            </button>
                            <button className="aspect-square rounded-xl border border-border-color hover:border-primary/50 bg-white p-2 overflow-hidden transition-colors">
                                <img
                                    alt="Side View"
                                    className="h-full w-full object-contain"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzKrgkTEiDM2d5osuLvNdMV6TJ-K5UA_MI4whYRTBsB0ITzJ0M1u4N8EMRLf64aisLTi2LRrk6FZBDoFWrD2E1STPjtyGObbd87YelIFqV-qdP5mG7vJbSl8zjM4ygBlFLCdntNClHuqFNTv3xfDq1nFsWc0A82xi6WuniH6eUalkasZS8zKMvAQjVpUS5eEEJzYLQax2Q7m5kiU-w-pBcw_m2LEppiYsClt4bmtYgwJI15hWA8LuSozvdavrlNmWrUdFYpRYWhBYp"
                                />
                            </button>
                            <button className="aspect-square rounded-xl border border-border-color hover:border-primary/50 bg-white p-2 overflow-hidden transition-colors">
                                <img
                                    alt="Handle Detail"
                                    className="h-full w-full object-contain"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbOnE-NTqaCCO7T8ZwnSzS4jCA22G5I673kTWDpqW2NfyJpjlVuJ1BBYGA4mWiZi19Ubw41aR0btKVSWincaSLiu9A38gy2i82HtmR_qpWySnIQMVw8uSE0ACDoTVqsv0kdOZUu6FmdJ0TSjcYsuMsapVhz3-gmQgCF86ek7Sn2NM3EyVWwE3tkJkqyKKKfdpPXHh49TvcU1p7sDo6FW1Egyz16IIFZ8IAWP_eUy7XH8Kg9FXUZkYbDmoiWPa08nukYo9brVzUf9cq"
                                />
                            </button>
                            <button className="aspect-square rounded-xl border border-border-color hover:border-primary/50 p-2 overflow-hidden transition-colors flex items-center justify-center bg-gray-50">
                                <span className="material-symbols-outlined text-text-secondary !text-3xl">play_circle</span>
                            </button>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="lg:col-span-5 flex flex-col h-full">
                        <h1 className="text-3xl md:text-4xl font-bold text-text-main leading-tight mb-2">Stag Premium Kashmir Willow Cricket Bat</h1>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center gap-1 text-yellow-400">
                                <span className="material-symbols-outlined !text-[20px] fill-current">star</span>
                                <span className="material-symbols-outlined !text-[20px] fill-current">star</span>
                                <span className="material-symbols-outlined !text-[20px] fill-current">star</span>
                                <span className="material-symbols-outlined !text-[20px] fill-current">star</span>
                                <span className="material-symbols-outlined !text-[20px] fill-current text-gray-300">star</span>
                            </div>
                            <span className="text-sm font-medium text-primary underline cursor-pointer">124 Reviews</span>
                            <span className="h-4 w-px bg-gray-300"></span>
                            <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                                <span className="material-symbols-outlined !text-[16px]">check_circle</span> In Stock
                            </span>
                        </div>
                        <div className="flex items-baseline gap-3 mb-8">
                            <span className="text-4xl font-bold text-text-main">₹8,499.00</span>
                            <span className="text-lg text-text-secondary line-through">₹11,999.00</span>
                            <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-1 rounded">25% OFF</span>
                        </div>

                        <div className="space-y-6 flex-1">
                            {/* Size Selector */}
                            <div>
                                <div className="flex justify-between items-center mb-3">
                                    <label className="text-sm font-bold text-text-main uppercase tracking-wide">Select Bat Size</label>
                                    <button className="text-xs text-primary font-medium hover:underline">Size Guide</button>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    <label className="cursor-pointer flex-1 min-w-[120px]">
                                        <input defaultChecked className="peer sr-only" name="size" type="radio" />
                                        <div className="flex h-14 items-center justify-center border-2 border-primary bg-white px-4 text-base font-medium text-text-main peer-checked:border-primary peer-checked:bg-white transition-all hover:border-gray-400 peer-hover:border-primary">
                                            34 inches
                                        </div>
                                    </label>
                                    <label className="cursor-pointer flex-1 min-w-[120px]">
                                        <input className="peer sr-only" name="size" type="radio" />
                                        <div className="flex h-14 items-center justify-center border border-border-color bg-white px-4 text-base font-medium text-text-main peer-checked:border-2 peer-checked:border-primary peer-checked:bg-white transition-all hover:border-gray-400">
                                            34.5 inches
                                        </div>
                                    </label>
                                    <label className="cursor-pointer flex-1 min-w-[120px]">
                                        <input className="peer sr-only" name="size" type="radio" />
                                        <div className="flex h-14 items-center justify-center border border-border-color bg-white px-4 text-base font-medium text-text-main peer-checked:border-2 peer-checked:border-primary peer-checked:bg-white transition-all hover:border-gray-400">
                                            35 inches
                                        </div>
                                    </label>
                                    <label className="cursor-pointer flex-1 min-w-[120px]">
                                        <input className="peer sr-only" name="size" type="radio" />
                                        <div className="flex h-14 items-center justify-center border border-border-color bg-white px-4 text-base font-medium text-text-main peer-checked:border-2 peer-checked:border-primary peer-checked:bg-white transition-all hover:border-gray-400">
                                            35.5 inches
                                        </div>
                                    </label>
                                </div>
                            </div>

                            {/* Weight Selector */}
                            <div>
                                <label className="text-sm font-bold text-text-main mb-3 block uppercase tracking-wide">Select Weight</label>
                                <div className="flex flex-wrap gap-3">
                                    <label className="cursor-pointer">
                                        <input className="peer sr-only" name="weight" type="radio" />
                                        <div className="flex h-14 items-center justify-center min-w-[160px] border border-border-color bg-white px-6 text-base font-medium text-text-main peer-checked:border-2 peer-checked:border-primary peer-checked:bg-white transition-all hover:border-gray-400">
                                            1050-1100 grams
                                        </div>
                                    </label>
                                    <label className="cursor-pointer">
                                        <input defaultChecked className="peer sr-only" name="weight" type="radio" />
                                        <div className="flex h-14 items-center justify-center min-w-[160px] border-2 border-primary bg-white px-6 text-base font-medium text-text-main peer-checked:border-2 peer-checked:border-primary peer-checked:bg-white transition-all hover:border-gray-400">
                                            1100-1150 grams
                                        </div>
                                    </label>
                                    <label className="cursor-pointer">
                                        <input className="peer sr-only" name="weight" type="radio" />
                                        <div className="flex h-14 items-center justify-center min-w-[160px] border border-border-color bg-white px-6 text-base font-medium text-text-main peer-checked:border-2 peer-checked:border-primary peer-checked:bg-white transition-all hover:border-gray-400">
                                            1150+ grams
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div className="pt-4">
                                <p className="text-text-secondary leading-relaxed text-sm">
                                    Handcrafted from premium Grade 2 Kashmir Willow. Featuring a large sweet spot and balanced pickup for explosive power hitting. Pre-knocked and ready to play.
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-border-color flex flex-col gap-4">
                            <div className="flex gap-4">
                                <div className="flex w-32 items-center rounded-lg border border-border-color bg-white">
                                    <button className="flex h-full w-10 items-center justify-center text-text-secondary hover:text-primary transition-colors">
                                        <span className="material-symbols-outlined !text-lg">remove</span>
                                    </button>
                                    <input className="h-full w-full border-none bg-transparent text-center font-medium text-text-main focus:ring-0" readOnly type="text" value="1" />
                                    <button className="flex h-full w-10 items-center justify-center text-text-secondary hover:text-primary transition-colors">
                                        <span className="material-symbols-outlined !text-lg">add</span>
                                    </button>
                                </div>
                                <button className="flex-1 rounded-lg bg-primary py-3.5 text-base font-bold text-white shadow-md shadow-primary/20 hover:bg-primary-dark hover:shadow-lg transition-all flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined">shopping_bag</span>
                                    Add to Cart
                                </button>
                            </div>
                            <button className="w-full rounded-lg border border-border-color bg-white py-3.5 text-base font-bold text-text-main hover:bg-gray-50 transition-colors">
                                Buy Now
                            </button>
                        </div>

                        <div className="mt-6 flex items-center justify-center gap-6 text-xs text-text-secondary">
                            <div className="flex items-center gap-1.5">
                                <span className="material-symbols-outlined !text-lg">local_shipping</span> Free Shipping
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="material-symbols-outlined !text-lg">verified_user</span> 1 Year Warranty
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="material-symbols-outlined !text-lg">sync_alt</span> 30 Days Return
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="mt-20">
                    <div className="border-b border-border-color">
                        <nav aria-label="Tabs" className="-mb-px flex gap-8 overflow-x-auto">
                            <span className="border-b-2 border-primary py-4 px-1 text-sm font-bold text-primary cursor-pointer">
                                Description
                            </span>
                            <span className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-text-secondary hover:border-gray-300 hover:text-text-main cursor-pointer">
                                Specifications
                            </span>
                            <span className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-text-secondary hover:border-gray-300 hover:text-text-main cursor-pointer">
                                Reviews (124)
                            </span>
                        </nav>
                    </div>
                    <div className="py-10 grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-6 text-text-secondary">
                            <h3 className="text-xl font-bold text-text-main">Built for Power and Precision</h3>
                            <p className="leading-relaxed">
                                The Stag Premium Kashmir Willow bat is designed for the modern cricketer who demands performance without breaking the bank. Each bat is individually handcrafted by our master bat makers in Kashmir, ensuring the highest quality finish and balance.
                            </p>
                            <ul className="space-y-3 mt-4">
                                <li className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-primary mt-0.5 !text-xl">check_circle</span>
                                    <span><strong>Grade 2 Kashmir Willow:</strong> Selected for durability and performance.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-primary mt-0.5 !text-xl">check_circle</span>
                                    <span><strong>Massive Edges:</strong> 38-40mm edges provide extra power on off-center hits.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-primary mt-0.5 !text-xl">check_circle</span>
                                    <span><strong>Balanced Pickup:</strong> Designed to feel lighter than the actual weight for quick hand speed.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-primary mt-0.5 !text-xl">check_circle</span>
                                    <span><strong>Handle:</strong> 12 piece Saravak cane handle for optimal shock absorption.</span>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-white rounded-2xl border border-border-color p-6 md:p-8">
                            <h3 className="text-lg font-bold text-text-main mb-6">Technical Specs</h3>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 py-3 border-b border-gray-100">
                                    <span className="text-text-secondary">Willow Type</span>
                                    <span className="text-text-main font-medium text-right">Kashmir Willow</span>
                                </div>
                                <div className="grid grid-cols-2 py-3 border-b border-gray-100">
                                    <span className="text-text-secondary">Grade</span>
                                    <span className="text-text-main font-medium text-right">Grade 2 Premium</span>
                                </div>
                                <div className="grid grid-cols-2 py-3 border-b border-gray-100">
                                    <span className="text-text-secondary">Handle Type</span>
                                    <span className="text-text-main font-medium text-right">Round / Semi-Oval</span>
                                </div>
                                <div className="grid grid-cols-2 py-3 border-b border-gray-100">
                                    <span className="text-text-secondary">Sweet Spot</span>
                                    <span className="text-text-main font-medium text-right">Mid to Low</span>
                                </div>
                                <div className="grid grid-cols-2 py-3 border-b border-gray-100">
                                    <span className="text-text-secondary">Toe Guard</span>
                                    <span className="text-text-main font-medium text-right">Yes, Pre-fitted</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Similar Products */}
                <div className="mt-12 mb-20">
                    <h3 className="text-2xl font-bold text-text-main mb-8">You might also like</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Pro Batting Gloves", price: "₹2,450.00", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAa9dLjtUgcoZY3gkmsRCuScMFEjScNcukZuSirVjDgHQM0f4ao1Fx7Hr70nbM8VcoJZZovjMw7NAFxl8wNC_rdlWEOTjeGEu4NNDLGiJKkpU04LrFxjl6pcA8pyn3lSzjcV9JeAVtVFLlTnETivbSaothrSlUqZNDPN8yVGJpsmJ7TX-6qjqyrZB2n3Sy2yRZH08LXPSJgCg-JkkJT0qlKKbznbUQI-UCAa1d0qwcfQkouk7uCyJqNKGA_HFX7ByqmNCGISqXAIwgg" },
                            { title: "Match Grade Ball", price: "₹1,220.00", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCtwMSC4WM4IZNhpeli3XvLNKmP19od6WUwL5-NzfXeFe9TYvJDm-ZFJU0Ph9O50Hf8wLHxWjOQPuiMHmvEAW4KM5N3Glm1zJQgVqiIvjzFMfdlCOZw-iJy6yUR67hbwLTEvGb_vZ6ptEokdUlsXa2Zm5JyXOi4YmA_8GSkPFeYZfqmeszGAxNSezrxQEjknDaVMhghF4p53m7yuOfL6rhRZX_Srw2pGRx3GGU0idVEzoZ6aKUQGllbAfQUrjPJvYURG9CSVs-duPVV" },
                            { title: "Elite Helmet", price: "₹3,890.00", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDm-FDqrYBoWZ9iS9cjkhvRqn_o5zL15n1EVKC9co-b9BL5RlHmy5dUYt53j5P4tU-ejfwq5uLxNVf1dsTj70u24HfzyDGRnNSJgRlaANnVumNHBNxe90uMLWR4CcYBWDUlRUhv0hzPfzjSvEOfujEjxDF1oA6a8u9JHPkOLeJ6j7AEHAUDcZUIcAWRwMWz1hzCpjd6JOrFI3o58L1c_d9aW9XK0LvVoIsHU9L93i3is0eZHG7KQRxnOIZ2AWDud22rl8FXseMMw4ys" },
                            { title: "Team Kit Bag", price: "₹4,650.00", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIhNwwtcCXvYmvrKIMXR-LA6foy3yjCghX-DKExfjKfFlGC2bZdQ4o0WUFH00B3VaVfdIVN6Qlufl1eu5JQ-_ia-SP_CdDmzdGdzOWzI2P3bZRI02QUxwTOSZisbQR0-3AmH0Y4ZSL2gZ5iq6R8f8zjH4Ic1RDUCyzP562B5X0NAZ9z2fYyhcvctqU501DEwej7jjvtkFxqGrTwBpI9T1pNf8gtZfezjh-wO3rXiLBua9NhY9lm6_Ex6lmvNd2ZY9BKVpiehHRl0oW" }
                        ].map((item, i) => (
                            <div key={i} className="group flex flex-col rounded-xl border border-border-color bg-white overflow-hidden hover:shadow-lg transition-all duration-300">
                                <div className="relative aspect-[4/5] overflow-hidden bg-gray-50 p-4">
                                    <img
                                        alt={item.title}
                                        className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                                        src={item.img}
                                    />
                                    <div className="absolute top-3 right-3 rounded-full bg-white p-1.5 shadow-sm text-gray-400 hover:text-red-500 cursor-pointer transition-colors">
                                        <span className="material-symbols-outlined !text-[20px]">favorite</span>
                                    </div>
                                </div>
                                <div className="p-4 flex flex-col flex-1">
                                    <h4 className="text-text-main font-bold text-lg mb-1 truncate">{item.title}</h4>
                                    <p className="text-text-secondary text-sm mb-3">Premium Quality</p>
                                    <div className="mt-auto flex items-center justify-between">
                                        <span className="text-text-main font-bold">{item.price}</span>
                                        <button className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                                            <span className="material-symbols-outlined !text-[18px]">add</span>
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
