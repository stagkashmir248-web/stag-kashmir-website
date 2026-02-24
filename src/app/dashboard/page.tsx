
import Link from "next/link";

export default function Dashboard() {
    return (
        <div className="container mx-auto px-4 py-8 md:px-10 lg:px-20 max-w-7xl">
            <div className="flex flex-col lg:flex-row gap-8">
                <aside className="w-full lg:w-72 flex-shrink-0 flex flex-col gap-6">
                    <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col items-center text-center shadow-sm">
                        <div
                            className="bg-center bg-no-repeat bg-cover rounded-full size-24 mb-4 ring-4 ring-slate-50"
                            style={{
                                backgroundImage:
                                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBprHk61o5q_jO4LS3C8cJjMiIO2wSYEerPXvO6l0Qimm8nCzNAa8JnyQ_jA0J8wx226o_72FIVuonLj7l_ILRmHp4UZLrixfuUbHuYT0Cf_j966InU1ipuhWNn7u48lxe5IA123tVJpOOAwy2g-t7BxrSe3OUI_zuy5e1j5DAkGIfkWmjTdWJheGJreXrI_lmXAYXPP5kuoRE898285lcQ4NZoxX2PBpqQEsCq7JTozKSXaABUZ1AJGVYvPgwMiK5O74-KNGy072fB")',
                            }}
                        ></div>
                        <h1 className="text-slate-900 text-lg font-bold leading-normal">Rahul Dravid</h1>
                        <p className="text-primary text-sm font-medium bg-primary/10 px-3 py-1 rounded-full mt-1">Premium Member</p>
                        <p className="text-slate-500 text-xs mt-2">Member since 2021</p>
                    </div>
                    <nav className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
                        <Link className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 text-slate-700 transition-colors border-b border-slate-100" to="#">
                            <span className="material-symbols-outlined text-slate-400">person</span>
                            <span className="text-sm font-medium">Profile Information</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-5 py-3 bg-primary/5 text-primary border-l-4 border-primary transition-colors border-b border-slate-100" to="#">
                            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>package_2</span>
                            <span className="text-sm font-bold">Orders &amp; Returns</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 text-slate-700 transition-colors border-b border-slate-100" to="#">
                            <span className="material-symbols-outlined text-slate-400">location_on</span>
                            <span className="text-sm font-medium">Addresses</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 text-slate-700 transition-colors border-b border-slate-100" to="#">
                            <span className="material-symbols-outlined text-slate-400">credit_card</span>
                            <span className="text-sm font-medium">Payment Methods</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 text-slate-700 transition-colors border-b border-slate-100" to="#">
                            <span className="material-symbols-outlined text-slate-400">settings</span>
                            <span className="text-sm font-medium">Account Settings</span>
                        </Link>
                        <button className="flex items-center gap-3 px-5 py-4 text-red-600 hover:bg-red-50 transition-colors text-left w-full mt-auto">
                            <span className="material-symbols-outlined">logout</span>
                            <span className="text-sm font-bold">Log Out</span>
                        </button>
                    </nav>
                </aside>

                <main className="flex-1 flex flex-col gap-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Order History</h2>
                            <p className="text-slate-500 mt-1">Track, return, or buy items again.</p>
                        </div>
                        <div className="flex gap-3 w-full md:w-auto">
                            <label className="relative flex-1 md:w-64">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                                    <span className="material-symbols-outlined text-[20px]">search</span>
                                </div>
                                <input className="block w-full rounded-lg border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 focus:border-primary focus:ring-primary shadow-sm" placeholder="Search order ID or item" type="text" />
                            </label>
                            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 shadow-sm transition-colors">
                                <span className="material-symbols-outlined text-[20px]">filter_list</span>
                                Filter
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-primary/20 shadow-md overflow-hidden">
                        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-green-400">local_shipping</span>
                                <div>
                                    <h3 className="font-bold text-sm">Track Your Order #405-9283-112</h3>
                                    <p className="text-xs text-slate-400">Estimated Arrival: Today by 8 PM</p>
                                </div>
                            </div>
                            <button className="text-xs bg-white/10 hover:bg-white/20 transition px-3 py-1.5 rounded text-white flex items-center gap-1">
                                <span className="material-symbols-outlined text-[16px]">share</span> Share Tracking
                            </button>
                        </div>
                        <div className="flex flex-col lg:flex-row h-[450px]">
                            <div className="flex-1 bg-slate-800 relative overflow-hidden group">
                                <div className="absolute inset-0 opacity-40 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/India_relief_location_map.jpg/800px-India_relief_location_map.jpg')] bg-cover bg-center grayscale mix-blend-overlay"></div>
                                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-transparent to-slate-900/80"></div>
                                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: "drop-shadow(0 0 4px rgba(59, 130, 246, 0.5))" }}>
                                    <path className="animate-pulse" d="M 200 50 Q 220 150 350 300" fill="none" stroke="#3b82f6" strokeDasharray="8 4" strokeWidth="3"></path>
                                    <circle cx="200" cy="50" fill="#1349ec" r="6" stroke="white" strokeWidth="2"></circle>
                                    <circle className="animate-ping absolute" cx="280" cy="190" fill="#22c55e" r="8" stroke="white" strokeWidth="2"></circle>
                                    <circle cx="280" cy="190" fill="#22c55e" r="6" stroke="white" strokeWidth="2"></circle>
                                    <circle cx="350" cy="300" fill="#cbd5e1" r="6" stroke="#64748b" strokeWidth="2"></circle>
                                </svg>
                                <div className="absolute top-8 left-[140px] bg-slate-900/90 text-white text-xs px-2 py-1 rounded border border-slate-700 shadow-lg">
                                    <span className="font-bold">Srinagar Hub</span><br />Origin
                                </div>
                                <div className="absolute top-[170px] left-[290px] bg-white text-slate-900 text-xs px-3 py-2 rounded-lg border border-slate-200 shadow-xl transform transition-transform hover:scale-105 cursor-pointer z-10">
                                    <div className="font-bold flex items-center gap-1 text-green-600"><span className="material-symbols-outlined text-[14px]">local_shipping</span> In Transit</div>
                                    <div className="font-medium text-[10px] text-slate-500">Delhi Cargo Terminal</div>
                                    <div className="text-[10px] text-slate-400">Updated 2 mins ago</div>
                                </div>
                                <div className="absolute top-[310px] left-[320px] bg-slate-900/90 text-white text-xs px-2 py-1 rounded border border-slate-700 shadow-lg">
                                    <span className="font-bold">Bengaluru</span><br />Destination
                                </div>
                                <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                                    <button className="bg-white text-slate-700 p-2 rounded shadow hover:bg-slate-50 transition"><span className="material-symbols-outlined text-[20px]">add</span></button>
                                    <button className="bg-white text-slate-700 p-2 rounded shadow hover:bg-slate-50 transition"><span className="material-symbols-outlined text-[20px]">remove</span></button>
                                </div>
                            </div>
                            <div className="w-full lg:w-80 bg-white border-l border-slate-200 flex flex-col">
                                <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                                    <h4 className="font-bold text-slate-900 text-sm">Shipment Timeline</h4>
                                    <p className="text-xs text-slate-500">Courier: Blue Dart Express</p>
                                </div>
                                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                                    <div className="relative pl-6 border-l-2 border-slate-200 pb-2">
                                        <div className="absolute -left-[9px] top-0 size-4 rounded-full bg-slate-300 border-2 border-white"></div>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Order Placed</span>
                                            <span className="text-sm font-medium text-slate-500">Oct 24, 10:30 AM</span>
                                            <p className="text-xs text-slate-400 mt-1">Order confirmed and waiting for processing.</p>
                                        </div>
                                    </div>
                                    <div className="relative pl-6 border-l-2 border-slate-200 pb-2">
                                        <div className="absolute -left-[9px] top-0 size-4 rounded-full bg-slate-300 border-2 border-white"></div>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Dispatched</span>
                                            <span className="text-sm font-medium text-slate-500">Oct 25, 02:15 PM</span>
                                            <p className="text-xs text-slate-400 mt-1">Srinagar Warehouse, J&amp;K.</p>
                                        </div>
                                    </div>
                                    <div className="relative pl-6 border-l-2 border-primary pb-2">
                                        <div className="absolute -left-[9px] top-0 size-4 rounded-full bg-primary border-4 border-white shadow-sm ring-1 ring-primary"></div>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-primary uppercase tracking-wide flex items-center gap-1">
                                                In Transit <span className="animate-pulse bg-green-500 size-1.5 rounded-full inline-block"></span>
                                            </span>
                                            <span className="text-sm font-bold text-slate-900">Oct 27, 09:42 AM</span>
                                            <p className="text-xs text-slate-600 mt-1 font-medium bg-blue-50 p-2 rounded border border-blue-100">Arrived at Delhi Cargo Hub. Package is being sorted for connecting flight.</p>
                                        </div>
                                    </div>
                                    <div className="relative pl-6 border-l-2 border-slate-100 border-dashed">
                                        <div className="absolute -left-[9px] top-0 size-4 rounded-full bg-slate-100 border-2 border-white"></div>
                                        <div className="flex flex-col opacity-50">
                                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Out for Delivery</span>
                                            <span className="text-sm font-medium text-slate-400">Expected Oct 28</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 border-t border-slate-200 bg-slate-50">
                                    <button className="w-full text-center text-sm font-medium text-primary hover:text-primary/80 transition flex items-center justify-center gap-2">
                                        View Detailed History <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-1">
                            <p className="text-slate-500 text-sm font-medium">Total Orders</p>
                            <p className="text-3xl font-bold text-slate-900">12</p>
                        </div>
                        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-1 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <span className="material-symbols-outlined text-6xl text-primary">local_shipping</span>
                            </div>
                            <p className="text-slate-500 text-sm font-medium">Pending Delivery</p>
                            <p className="text-3xl font-bold text-primary">2</p>
                        </div>
                        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-1">
                            <p className="text-slate-500 text-sm font-medium">Returns</p>
                            <p className="text-3xl font-bold text-slate-900">0</p>
                        </div>
                    </div>

                    {/* Orders List */}
                    <div className="bg-white rounded-xl border border-primary/20 shadow-md overflow-hidden">
                        <div className="bg-primary/5 px-6 py-4 border-b border-primary/10 flex flex-wrap gap-4 justify-between items-center">
                            <div className="flex gap-6 text-sm">
                                <div className="flex flex-col">
                                    <span className="text-slate-500 text-xs uppercase tracking-wider font-semibold">Order Placed</span>
                                    <span className="text-slate-900 font-medium">Oct 24, 2023</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-slate-500 text-xs uppercase tracking-wider font-semibold">Total</span>
                                    <span className="text-slate-900 font-medium">₹24,500.00</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-slate-500 text-xs uppercase tracking-wider font-semibold">Ship To</span>
                                    <span className="text-slate-900 font-medium group relative cursor-pointer text-primary underline decoration-dotted">
                                        Rahul Dravid
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-slate-500 text-xs uppercase tracking-wider font-semibold">Order # 405-9283-112</span>
                                <div className="flex gap-2 text-sm mt-1">
                                    <Link className="text-primary hover:text-primary/80 font-medium hover:underline" to="#">View Invoice</Link>
                                </div>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex flex-col lg:flex-row gap-6">
                                <div className="w-32 h-32 flex-shrink-0 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                                    <img alt="Stag Kashmir Willow Cricket Bat" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkurUlVV7K8Xm9lDd0c5pN9m0lz_v2wSEDKie0-kc-1HXkUODhoq8ubLyd4HxOgEFU9J_GBTiM-gGpAILbEITOtYsrJGySrBDe2zouV9ovYDrAGZZ8uNJ_B2OQB7nHkBPNvJxtttY2F8mYnlhYZNV8xZZscpE1FodrnUk0Ev9PFcqFjj3ezk_Jrly_uZA1tRaM5enWBDYuyD2i3IA2k93wryk-mPmS4XeoHw-dEi_0mqjMyKl7r3eDL6PKpWy1alFxgfkIqvT-XeUm" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900">Stag Kashmir Willow - Grade 1 English Willow Profile</h3>
                                            <p className="text-slate-500 text-sm mt-1">Sold by: Stag Sports Pvt Ltd</p>
                                            <div className="mt-2 flex gap-2">
                                                <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-500/10">Weight: 1180g</span>
                                                <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-500/10">Size: SH</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-bold text-slate-900">₹24,500.00</p>
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-bold text-green-700 flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[18px] fill-current">local_shipping</span>
                                                Shipped - In Transit (PAN India)
                                            </span>
                                            <span className="text-xs text-slate-500">Est. Delivery: Oct 28</span>
                                        </div>
                                        <div className="w-full bg-slate-100 rounded-full h-2.5">
                                            <div className="bg-green-600 h-2.5 rounded-full w-[65%]" style={{ width: "65%" }}></div>
                                        </div>
                                        <p className="text-xs text-slate-500 mt-2">Latest Update: Arrived at regional distribution center, Delhi.</p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3 w-full lg:w-48 flex-shrink-0 lg:border-l lg:border-slate-100 lg:pl-6">
                                    <button className="w-full bg-primary text-white font-medium py-2 px-4 rounded-lg text-sm hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200">Track Package</button>
                                    <button className="w-full bg-white border border-slate-300 text-slate-700 font-medium py-2 px-4 rounded-lg text-sm hover:bg-slate-50 transition-colors">Problem with order?</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex flex-wrap gap-4 justify-between items-center">
                            <div className="flex gap-6 text-sm">
                                <div className="flex flex-col">
                                    <span className="text-slate-500 text-xs uppercase tracking-wider font-semibold">Order Placed</span>
                                    <span className="text-slate-900 font-medium">Aug 02, 2023</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-slate-500 text-xs uppercase tracking-wider font-semibold">Total</span>
                                    <span className="text-slate-900 font-medium">₹1,250.00</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-slate-500 text-xs uppercase tracking-wider font-semibold">Order # 112-9982-123</span>
                                <div className="flex gap-2 text-sm mt-1">
                                    <Link className="text-primary hover:text-primary/80 font-medium hover:underline" to="#">View Invoice</Link>
                                </div>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex flex-col lg:flex-row gap-6">
                                <div className="w-32 h-32 flex-shrink-0 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                                    <img alt="Red Cricket Ball" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDylOgZNRfw3WUGgKlTHiKI7T5LRysV_zaXqLlf_Xs3aiRgikHIt7woRozrksVTcmPWnK_jengwUTZTLFqPyE8ewKu9ee9YB-iba-oRAEuF_ArbuA1z1i6rTsqkNlOE-WBXpQxLd5OSBQW2QJ-LvjZ7sLpMeekBt7-I4pSa3VQFBXurcI5u9MBMJA7pTomniL5-vgUC2oEx82s2EC7L1jKUw3yZHzQ-er3IRDhFRWgeUnhe2qjV9Ncu07kXdOAKe0YEthKusp7Qvf5P" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900">Stag County Leather Ball (Pack of 2)</h3>
                                            <p className="text-slate-500 text-sm mt-1">Sold by: Stag Sports Pvt Ltd</p>
                                            <div className="mt-2 text-sm text-green-700 font-medium flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                                                Delivered on Aug 05, 2023
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-bold text-slate-900">₹1,250.00</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3 w-full lg:w-48 flex-shrink-0 lg:border-l lg:border-slate-100 lg:pl-6">
                                    <button className="w-full bg-primary text-white font-medium py-2 px-4 rounded-lg text-sm hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200">Write a Review</button>
                                    <button className="w-full bg-white border border-primary text-primary font-medium py-2 px-4 rounded-lg text-sm hover:bg-primary/5 transition-colors">Buy Again</button>
                                    <button className="w-full bg-white border border-slate-300 text-slate-700 font-medium py-2 px-4 rounded-lg text-sm hover:bg-slate-50 transition-colors">Archive Order</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
