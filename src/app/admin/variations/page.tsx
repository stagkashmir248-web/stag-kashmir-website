
import Link from "next/link";

export default function AdminVariations() {
    return (
        <div className="flex w-full overflow-hidden bg-background-light dark:bg-background-dark font-display text-text-main-light dark:text-text-main-dark transition-colors duration-200" style={{ height: "100vh" }}>
            {/* Sidebar */}
            <aside className="w-64 flex flex-col bg-surface-light dark:bg-surface-dark border-r border-border-light dark:border-border-dark h-full flex-shrink-0 transition-colors duration-200">
                <div className="flex h-full flex-col justify-between p-4">
                    <div className="flex flex-col gap-6">
                        {/* Profile / Brand */}
                        <div className="flex gap-3 items-center px-2">
                            <div
                                className="bg-center bg-no-repeat bg-cover rounded-full size-12 shadow-sm border-2 border-primary/20"
                                style={{
                                    backgroundImage:
                                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDsyl9eFjp7AzXGPvd4wbJRiniEsl8Dh58wudZIhyclfSNPJTy3zvgG_XInF0XjM-_wHQYZJ40toFdfPaoeVhh6FGy01K8xS1d_7r7ccVFK1cCkHTvPZ-u6NQIyspRFf4irennRWsW4sPxvf9thePAemBi_348Aliqw1enUkfa5xkA3vjdd55KIxxZOm-pnamSMza-c8lLYIrcUbGDj4_VgYgsRv-H36x2qsYGba0yqrkmw-Qa7P8-TdCs2vJdxiY5pQJiKmPbnZ8gz")',
                                }}
                            ></div>
                            <div className="flex flex-col">
                                <h1 className="text-text-main-light dark:text-text-main-dark text-lg font-bold leading-tight">Stag Kashmir</h1>
                                <p className="text-text-sub-light dark:text-text-sub-dark text-xs font-normal">Admin Console</p>
                            </div>
                        </div>

                        {/* Navigation */}
                        <nav className="flex flex-col gap-2">
                            <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-background-light dark:hover:bg-background-dark transition-colors group">
                                <span className="material-symbols-outlined text-text-sub-light dark:text-text-sub-dark group-hover:text-primary transition-colors">dashboard</span>
                                <p className="text-text-main-light dark:text-text-main-dark text-sm font-medium">Dashboard</p>
                            </Link>
                            <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-background-light dark:hover:bg-background-dark transition-colors group">
                                <span className="material-symbols-outlined text-text-sub-light dark:text-text-sub-dark group-hover:text-primary transition-colors">inventory_2</span>
                                <p className="text-text-main-light dark:text-text-main-dark text-sm font-medium">Products</p>
                            </Link>
                            <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-background-light dark:hover:bg-background-dark transition-colors group">
                                <span className="material-symbols-outlined text-text-sub-light dark:text-text-sub-dark group-hover:text-primary transition-colors">shopping_cart</span>
                                <p className="text-text-main-light dark:text-text-main-dark text-sm font-medium">Orders</p>
                            </Link>
                            {/* Active Item */}
                            <Link href="/admin/variations" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 dark:bg-primary/20 border border-primary/5">
                                <span className="material-symbols-outlined text-primary fill-current" style={{ fontVariationSettings: "'FILL' 1" }}>
                                    tune
                                </span>
                                <p className="text-primary text-sm font-bold">Variations</p>
                            </Link>
                            <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-background-light dark:hover:bg-background-dark transition-colors group">
                                <span className="material-symbols-outlined text-text-sub-light dark:text-text-sub-dark group-hover:text-primary transition-colors">settings</span>
                                <p className="text-text-main-light dark:text-text-main-dark text-sm font-medium">Settings</p>
                            </Link>
                        </nav>
                    </div>

                    {/* Bottom Actions */}
                    <div className="flex flex-col gap-2 border-t border-border-light dark:border-border-dark pt-4">
                        <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-background-light dark:hover:bg-background-dark transition-colors text-text-sub-light dark:text-text-sub-dark">
                            <span className="material-symbols-outlined text-sm">logout</span>
                            <p className="text-sm font-medium">Exit Admin</p>
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                {/* Header */}
                <header className="flex items-center justify-between px-8 py-5 border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark flex-shrink-0 z-10">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-text-main-light dark:text-text-main-dark">Variation Manager</h2>
                        <p className="text-text-sub-light dark:text-text-sub-dark text-sm mt-1">Configure attributes and pricing for cricket bats.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-text-sub-light dark:text-text-sub-dark hover:text-primary transition-colors rounded-full hover:bg-background-light dark:hover:bg-background-dark">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full ring-2 ring-white dark:ring-surface-dark"></span>
                        </button>
                        <div className="h-8 w-[1px] bg-border-light dark:bg-border-dark"></div>
                        <button className="flex items-center gap-2 bg-primary hover:bg-red-700 text-white px-4 py-2.5 rounded-lg transition-colors shadow-lg shadow-primary/20">
                            <span className="material-symbols-outlined text-[20px]">add</span>
                            <span className="text-sm font-semibold">New Variation</span>
                        </button>
                    </div>
                </header>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-8 scroll-smooth">
                    <div className="max-w-6xl mx-auto flex flex-col gap-8">
                        {/* Stats Row */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-sm border border-border-light dark:border-border-dark">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-text-sub-light dark:text-text-sub-dark text-sm font-medium mb-1">Total Attributes</p>
                                        <h3 className="text-3xl font-bold text-text-main-light dark:text-text-main-dark">3</h3>
                                    </div>
                                    <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg text-blue-600 dark:text-blue-400">
                                        <span className="material-symbols-outlined">category</span>
                                    </div>
                                </div>
                                <p className="text-xs text-text-sub-light dark:text-text-sub-dark mt-4">Grade, Size, Weight</p>
                            </div>

                            <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-sm border border-border-light dark:border-border-dark">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-text-sub-light dark:text-text-sub-dark text-sm font-medium mb-1">Active SKUs</p>
                                        <h3 className="text-3xl font-bold text-text-main-light dark:text-text-main-dark">126</h3>
                                    </div>
                                    <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-lg text-green-600 dark:text-green-400">
                                        <span className="material-symbols-outlined">check_circle</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 mt-4 text-xs font-medium text-green-600 dark:text-green-400">
                                    <span className="material-symbols-outlined text-[16px]">trending_up</span>
                                    <span>+12 this week</span>
                                </div>
                            </div>

                            <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-sm border border-border-light dark:border-border-dark">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-text-sub-light dark:text-text-sub-dark text-sm font-medium mb-1">Pricing Updates</p>
                                        <h3 className="text-3xl font-bold text-text-main-light dark:text-text-main-dark">14</h3>
                                    </div>
                                    <div className="bg-orange-50 dark:bg-orange-900/20 p-2 rounded-lg text-orange-600 dark:text-orange-400">
                                        <span className="material-symbols-outlined">pending_actions</span>
                                    </div>
                                </div>
                                <p className="text-xs text-text-sub-light dark:text-text-sub-dark mt-4">Pending approval</p>
                            </div>
                        </div>

                        {/* Main Section: Configuration */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Col: Form */}
                            <div className="lg:col-span-1 flex flex-col gap-6">
                                <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden">
                                    <div className="px-6 py-4 border-b border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark/50">
                                        <h3 className="font-bold text-lg text-text-main-light dark:text-text-main-dark">Add New Attribute</h3>
                                    </div>
                                    <div className="p-6 flex flex-col gap-5">
                                        <label className="flex flex-col gap-2">
                                            <span className="text-sm font-medium text-text-main-light dark:text-text-main-dark">Attribute Name</span>
                                            <input
                                                className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-surface-dark text-text-main-light dark:text-text-main-dark focus:ring-primary focus:border-primary text-sm h-10 px-3 placeholder-text-sub-light dark:placeholder-text-sub-dark"
                                                placeholder="e.g. Willow Grade"
                                                type="text"
                                            />
                                        </label>
                                        <label className="flex flex-col gap-2">
                                            <span className="text-sm font-medium text-text-main-light dark:text-text-main-dark">Display Type</span>
                                            <select className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-surface-dark text-text-main-light dark:text-text-main-dark focus:ring-primary focus:border-primary text-sm h-10 px-3">
                                                <option>Dropdown</option>
                                                <option>Radio Buttons</option>
                                                <option>Color Swatch</option>
                                                <option>Button Group</option>
                                            </select>
                                        </label>
                                        <label className="flex flex-col gap-2">
                                            <span className="text-sm font-medium text-text-main-light dark:text-text-main-dark">Values (Comma separated)</span>
                                            <textarea
                                                className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-surface-dark text-text-main-light dark:text-text-main-dark focus:ring-primary focus:border-primary text-sm p-3 placeholder-text-sub-light dark:placeholder-text-sub-dark"
                                                placeholder="Grade 1, Grade 2, Grade 3..."
                                                rows={3}
                                            ></textarea>
                                        </label>
                                        <button className="w-full bg-text-main-light dark:bg-white text-white dark:text-black font-semibold py-2.5 rounded-lg hover:opacity-90 transition-opacity mt-2">
                                            Create Attribute
                                        </button>
                                    </div>
                                </div>

                                {/* Bulk Action Card */}
                                <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="material-symbols-outlined text-primary">auto_fix_high</span>
                                        <h3 className="font-bold text-text-main-light dark:text-text-main-dark">Bulk Pricing Update</h3>
                                    </div>
                                    <p className="text-sm text-text-sub-light dark:text-text-sub-dark mb-4">Apply a percentage increase or fixed amount to all variations of a specific grade.</p>
                                    <button className="text-primary text-sm font-bold hover:underline">Open Bulk Editor →</button>
                                </div>
                            </div>

                            {/* Right Col: Table / Matrix */}
                            <div className="lg:col-span-2 flex flex-col gap-6">
                                <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark flex flex-col h-full">
                                    <div className="px-6 py-4 border-b border-border-light dark:border-border-dark flex flex-wrap items-center justify-between gap-4">
                                        <h3 className="font-bold text-lg text-text-main-light dark:text-text-main-dark">Pricing Matrix</h3>
                                        <div className="flex items-center gap-2">
                                            <div className="relative">
                                                <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-text-sub-light text-[20px]">search</span>
                                                <input
                                                    className="pl-9 pr-4 py-2 rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-sm focus:ring-primary focus:border-primary w-48"
                                                    placeholder="Search SKU..."
                                                    type="text"
                                                />
                                            </div>
                                            <button className="p-2 border border-border-light dark:border-border-dark rounded-lg hover:bg-background-light dark:hover:bg-background-dark text-text-sub-light dark:text-text-sub-dark">
                                                <span className="material-symbols-outlined text-[20px]">filter_list</span>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left text-sm">
                                            <thead className="bg-background-light dark:bg-background-dark/50 text-text-sub-light dark:text-text-sub-dark uppercase text-xs font-semibold tracking-wider border-b border-border-light dark:border-border-dark">
                                                <tr>
                                                    <th className="px-6 py-4">Variant Info</th>
                                                    <th className="px-6 py-4">Attributes</th>
                                                    <th className="px-6 py-4">Stock</th>
                                                    <th className="px-6 py-4">Price (₹)</th>
                                                    <th className="px-6 py-4 text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-border-light dark:divide-border-dark text-text-main-light dark:text-text-main-dark">
                                                {/* Row 1 */}
                                                <tr className="hover:bg-background-light/50 dark:hover:bg-background-dark/30 transition-colors group">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div
                                                                className="size-10 rounded bg-gray-200 bg-cover bg-center"
                                                                style={{
                                                                    backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA1qyMByKNETOQgCPqIp3qrr-hJock0Y_KGTg0RuGbjRUSxiIIugofEtpo5a7TeyU-4w-AdI2e0WkPEiRHuSrAmfRM1z1Qy9wJFlcNZXHOXUmcYkQk2XQn-IWKKrxp_Myj1vaaX_Qcuv7sfAcm2QmLlHdfLeVd0cgo8fzxxagxOI7juVVYSs46bCrsc5EPaxXfE8_jgMbGfSxNx3AllHXsO84WOEWryOlWFtKmMB6jKijqwzGAaceok4RsDyDPXnCAFWwpSGLkHoNoT")',
                                                                }}
                                                            ></div>
                                                            <div className="flex flex-col">
                                                                <span className="font-medium">English Willow Pro</span>
                                                                <span className="text-xs text-text-sub-light">SKU: EW-PRO-001</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-wrap gap-1">
                                                            <span className="px-2 py-0.5 rounded text-xs bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">Grade 1+</span>
                                                            <span className="px-2 py-0.5 rounded text-xs bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">SH</span>
                                                            <span className="px-2 py-0.5 rounded text-xs bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">2lb 8oz</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <span className="size-2 rounded-full bg-green-500"></span>
                                                            <span>24</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <input className="w-24 px-2 py-1 rounded border border-border-light dark:border-border-dark bg-transparent text-right font-medium focus:ring-1 focus:ring-primary focus:border-primary" type="text" defaultValue="45,000" />
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <button className="text-text-sub-light hover:text-primary transition-colors p-1">
                                                            <span className="material-symbols-outlined text-[20px]">edit</span>
                                                        </button>
                                                    </td>
                                                </tr>

                                                {/* Row 2 */}
                                                <tr className="hover:bg-background-light/50 dark:hover:bg-background-dark/30 transition-colors group">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div
                                                                className="size-10 rounded bg-gray-200 bg-cover bg-center"
                                                                style={{
                                                                    backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC4OQ7AvAo6c5axLvP83vU8tsXgxeko7ITQ1i7w5BdSmBiT8MUpHUTn3GPKAJcFXL2eLcunee_9XvMFJDlt34nL7yJFqTbShcIQfjBV_Eyht2rX_2w4MyrctK9kTMflt9th3AEOt0Zs7KWSW2u8enaKQ57I5Pfv8W4p5cP3se6vhMbv1GJ4DcXBI4AOsm3RgmALNvGHVxi3bz3kyFIxA0xwB8vuh9gAQ96qz-HgNFHD64Sa2S8dFB80tTXKFeaG2P8h_jtpOquOFmNJ")',
                                                                }}
                                                            ></div>
                                                            <div className="flex flex-col">
                                                                <span className="font-medium">Kashmir Willow Elite</span>
                                                                <span className="text-xs text-text-sub-light">SKU: KW-ELT-042</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-wrap gap-1">
                                                            <span className="px-2 py-0.5 rounded text-xs bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">Grade 2</span>
                                                            <span className="px-2 py-0.5 rounded text-xs bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">LH</span>
                                                            <span className="px-2 py-0.5 rounded text-xs bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">2lb 9oz</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <span className="size-2 rounded-full bg-yellow-500"></span>
                                                            <span>4</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <input className="w-24 px-2 py-1 rounded border border-border-light dark:border-border-dark bg-transparent text-right font-medium focus:ring-1 focus:ring-primary focus:border-primary" type="text" defaultValue="12,500" />
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <button className="text-text-sub-light hover:text-primary transition-colors p-1">
                                                            <span className="material-symbols-outlined text-[20px]">edit</span>
                                                        </button>
                                                    </td>
                                                </tr>

                                                {/* Row 3 */}
                                                <tr className="hover:bg-background-light/50 dark:hover:bg-background-dark/30 transition-colors group">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div
                                                                className="size-10 rounded bg-gray-200 bg-cover bg-center"
                                                                style={{
                                                                    backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAd66dKFW_Sd432nBPkDGPs37Dngp5JDKrH8xcN7q0wkM1g0RQqVcNsfdLiEJVn0Dee5fcDmDKhG7c6wcn6qqSt6qBr7QJlLGEVqVuh7Mv_keDBsUB8C4tfqzvcyC-JgOYVf8m6rxKskwjgs3IBj-hqayE-0fSlDgad4_NHDhSIc4Ges4n7103QcCAIEJWHEqf1nesTQMHuXIug-RFZ6z5wTWZ5RbaGhvleSCgTVVsQ8a5zkeZ8MQjMz2NR5X_EooGQzxRv8_JpAJ9D")',
                                                                }}
                                                            ></div>
                                                            <div className="flex flex-col">
                                                                <span className="font-medium">Kashmir Willow Select</span>
                                                                <span className="text-xs text-text-sub-light">SKU: KW-SEL-008</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-wrap gap-1">
                                                            <span className="px-2 py-0.5 rounded text-xs bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">Grade 3</span>
                                                            <span className="px-2 py-0.5 rounded text-xs bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">SH</span>
                                                            <span className="px-2 py-0.5 rounded text-xs bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">2lb 10oz</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <span className="size-2 rounded-full bg-red-500"></span>
                                                            <span>0</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <input className="w-24 px-2 py-1 rounded border border-border-light dark:border-border-dark bg-transparent text-right font-medium focus:ring-1 focus:ring-primary focus:border-primary" type="text" defaultValue="8,200" />
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <button className="text-text-sub-light hover:text-primary transition-colors p-1">
                                                            <span className="material-symbols-outlined text-[20px]">edit</span>
                                                        </button>
                                                    </td>
                                                </tr>

                                                {/* Row 4 */}
                                                <tr className="hover:bg-background-light/50 dark:hover:bg-background-dark/30 transition-colors group">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div
                                                                className="size-10 rounded bg-gray-200 bg-cover bg-center"
                                                                style={{
                                                                    backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDHrPn_jU7Cz_uUDraINXXAs3j4nRQAKriuVUDqxptb3U5Wyi1rml-OfYBWIMK7WGsIv9Z7UcDBlRnlFhrh1OZVkOvsstqLs2C_UUZzT4SQFCfhpyUO7GSwRKzFAFfuxDIbic5nCzKp6nDUtRN368aUvUZOEOEKhAaLMUngqF7wqR0f8-E1hsGYmKi70m9RuMQnTg9nO9SsXCuiDJhAfBlTEkt3CG4yjJqXX3Go7Ii_EQ80WldNkx1rpwWZfVXVlSEQHR8ZQxitsW2o")',
                                                                }}
                                                            ></div>
                                                            <div className="flex flex-col">
                                                                <span className="font-medium">Stag Limited Edition</span>
                                                                <span className="text-xs text-text-sub-light">SKU: STG-LTD-101</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-wrap gap-1">
                                                            <span className="px-2 py-0.5 rounded text-xs bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">Player Grade</span>
                                                            <span className="px-2 py-0.5 rounded text-xs bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">SH</span>
                                                            <span className="px-2 py-0.5 rounded text-xs bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">2lb 7oz</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <span className="size-2 rounded-full bg-green-500"></span>
                                                            <span>12</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <input className="w-24 px-2 py-1 rounded border border-border-light dark:border-border-dark bg-transparent text-right font-medium focus:ring-1 focus:ring-primary focus:border-primary" type="text" defaultValue="85,000" />
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <button className="text-text-sub-light hover:text-primary transition-colors p-1">
                                                            <span className="material-symbols-outlined text-[20px]">edit</span>
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="px-6 py-4 border-t border-border-light dark:border-border-dark flex justify-between items-center bg-background-light/30 dark:bg-background-dark/30 mt-auto rounded-b-xl">
                                        <span className="text-sm text-text-sub-light dark:text-text-sub-dark">Showing 1-4 of 126 variations</span>
                                        <div className="flex gap-2">
                                            <button className="px-3 py-1 text-sm border border-border-light dark:border-border-dark rounded hover:bg-white dark:hover:bg-surface-dark disabled:opacity-50" disabled>
                                                Previous
                                            </button>
                                            <button className="px-3 py-1 text-sm border border-border-light dark:border-border-dark rounded hover:bg-white dark:hover:bg-surface-dark">
                                                Next
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
