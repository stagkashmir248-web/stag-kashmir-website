
import Link from "next/link";

export default function AdminInventory() {
    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark font-display transition-colors duration-200">
            {/* Header */}
            <header className="sticky top-0 z-10 flex items-center justify-between whitespace-nowrap border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark px-10 py-3 shadow-sm">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-4 text-primary dark:text-primary-light">
                        <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary text-[24px]">sports_cricket</span>
                        </div>
                        <h2 className="text-text-primary-light dark:text-text-primary-dark text-lg font-bold leading-tight tracking-[-0.015em]">Stag Kashmir Admin</h2>
                    </div>
                    <nav className="hidden md:flex items-center gap-9">
                        <Link className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary-light text-sm font-medium leading-normal transition-colors" to="/admin">Dashboard</Link>
                        <Link className="text-primary dark:text-primary-light text-sm font-bold leading-normal" to="/admin/inventory">Inventory</Link>
                        <Link className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary-light text-sm font-medium leading-normal transition-colors" to="/admin/orders">Orders</Link>
                        <Link className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary-light text-sm font-medium leading-normal transition-colors" to="/admin/customers">Customers</Link>
                        <Link className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary-light text-sm font-medium leading-normal transition-colors" to="/admin/settings">Settings</Link>
                    </nav>
                </div>
                <div className="flex flex-1 justify-end gap-6 items-center">
                    <label className="hidden lg:flex flex-col min-w-40 !h-10 max-w-64">
                        <div className="flex w-full flex-1 items-stretch rounded-lg h-full ring-1 ring-border-light dark:ring-border-dark focus-within:ring-2 focus-within:ring-primary">
                            <div className="text-text-secondary-light dark:text-text-secondary-dark flex bg-background-light dark:bg-surface-dark items-center justify-center pl-4 rounded-l-lg border-r-0">
                                <span className="material-symbols-outlined text-[20px]">search</span>
                            </div>
                            <input className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg text-text-primary-light dark:text-text-primary-dark focus:outline-0 border-none bg-background-light dark:bg-surface-dark h-full placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark px-4 pl-2 text-sm font-normal leading-normal" placeholder="Search products..." type="text" />
                        </div>
                    </label>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center justify-center size-10 rounded-full hover:bg-border-light dark:hover:bg-border-dark transition-colors">
                            <span className="material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark">notifications</span>
                        </button>
                        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary/20" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDtG-eJb9t-Q2KXquFoUmKVBnoxZi93VkBVYx9YCjfGz4Uh2H9t3oA6phCU2HFkHmz9xX-152sCfCgO76vQkWq26sQ2VIVgyAgiZ5vRn4hx5YKSw7ezrgHAaKwcgU9QpGu9BmqjUuW9N6WIAKc2w5U8mw7kUWNZd3KdXuXlxyJUZ_YUby2q22OoQNLxna6cRZmC7-SdD5_FvRc-opGqqb7HQd31k4lcWO7dHTrZ9rYkMyQm09CiCMTuZQcG5Er8RYw3UKHkz4imnf6n")' }}></div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 px-4 py-8 md:px-10 lg:px-20 xl:px-40">
                <div className="flex flex-col max-w-[1200px] mx-auto gap-6">
                    {/* Page Title Area */}
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <div className="flex min-w-72 flex-col gap-2">
                            <h1 className="text-text-primary-light dark:text-text-primary-dark text-4xl font-black leading-tight tracking-[-0.033em]">Inventory Management</h1>
                            <p className="text-text-secondary-light dark:text-text-secondary-dark text-base font-normal leading-normal">Manage your Kashmir Willow cricket bat stock levels and pricing.</p>
                        </div>
                        <div className="flex gap-3">
                            <button className="flex items-center justify-center gap-2 rounded-lg h-10 px-4 border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-primary-light dark:text-text-primary-dark hover:bg-background-light dark:hover:bg-background-dark transition-colors text-sm font-bold">
                                <span className="material-symbols-outlined text-[20px]">download</span>
                                <span className="truncate">Export</span>
                            </button>
                            <button className="flex items-center justify-center gap-2 rounded-lg h-10 px-6 bg-primary hover:bg-primary-dark text-white text-sm font-bold shadow-md shadow-primary/30 transition-all">
                                <span className="material-symbols-outlined text-[20px]">add</span>
                                <span className="truncate">Add New Product</span>
                            </button>
                        </div>
                    </div>

                    {/* Stats / Filters */}
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                        <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary text-white pl-3 pr-4 shadow-sm">
                            <span className="material-symbols-outlined text-[18px]">list</span>
                            <p className="text-sm font-medium leading-normal">All Stock</p>
                        </button>
                        <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark hover:border-primary/50 pl-3 pr-4 transition-colors">
                            <span className="material-symbols-outlined text-[18px] text-amber-500">warning</span>
                            <p className="text-text-primary-light dark:text-text-primary-dark text-sm font-medium leading-normal">Low Stock</p>
                        </button>
                        <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark hover:border-primary/50 pl-3 pr-4 transition-colors">
                            <span className="material-symbols-outlined text-[18px] text-red-500">error</span>
                            <p className="text-text-primary-light dark:text-text-primary-dark text-sm font-medium leading-normal">Out of Stock</p>
                        </button>
                        <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark hover:border-primary/50 pl-3 pr-4 transition-colors">
                            <span className="material-symbols-outlined text-[18px] text-green-500">local_offer</span>
                            <p className="text-text-primary-light dark:text-text-primary-dark text-sm font-medium leading-normal">Discounted</p>
                        </button>
                    </div>

                    {/* Table Container */}
                    <div className="flex flex-col overflow-hidden rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[800px] text-left border-collapse">
                                <thead>
                                    <tr className="bg-background-light dark:bg-background-dark/50 border-b border-border-light dark:border-border-dark">
                                        <th className="px-6 py-4 text-xs uppercase tracking-wider text-text-secondary-light dark:text-text-secondary-dark font-semibold">Product Name</th>
                                        <th className="px-6 py-4 text-xs uppercase tracking-wider text-text-secondary-light dark:text-text-secondary-dark font-semibold">SKU</th>
                                        <th className="px-6 py-4 text-xs uppercase tracking-wider text-text-secondary-light dark:text-text-secondary-dark font-semibold">Category</th>
                                        <th className="px-6 py-4 text-xs uppercase tracking-wider text-text-secondary-light dark:text-text-secondary-dark font-semibold w-48">Stock Level</th>
                                        <th className="px-6 py-4 text-xs uppercase tracking-wider text-text-secondary-light dark:text-text-secondary-dark font-semibold text-right">Base Price</th>
                                        <th className="px-6 py-4 text-xs uppercase tracking-wider text-text-secondary-light dark:text-text-secondary-dark font-semibold">Status</th>
                                        <th className="px-6 py-4 text-xs uppercase tracking-wider text-text-secondary-light dark:text-text-secondary-dark font-semibold text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border-light dark:divide-border-dark">
                                    {/* Row 1 */}
                                    <tr className="group hover:bg-background-light dark:hover:bg-background-dark/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                                                    <img className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOx5ZrweRYsJQDvaGB5Dhqy5K7coD0nrpAnO804kqXD--knvPykn0QUCLqq0TaS_1yp_yMF6RiipWAI65yr1lULaph59sI_ITHD4TzriagHOwQfVg7617DDMSmotMAuuYbjTFn9vPNdC9gXH01BD_TtK7vKbGi98NlPNDGfGaVenHTlGEvJ0Rdh21mV_fLjBMFjL55JVFC3XwaJkWAcxPfEL-SthBGu6boAVCg0riuZqVkztQptFPSLVM3xciNscRyP8lcAZG8S9dw" alt="Stag Hyperion 500" />
                                                </div>
                                                <span className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">Stag Hyperion 500</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-text-secondary-light dark:text-text-secondary-dark">SKU-HYP-500</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-900/30 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-300 ring-1 ring-inset ring-blue-700/10 dark:ring-blue-300/10">Premium Willow</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex justify-between text-xs mb-1">
                                                    <span className="text-text-primary-light dark:text-text-primary-dark font-medium">85</span>
                                                    <span className="text-text-secondary-light dark:text-text-secondary-dark">High</span>
                                                </div>
                                                <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
                                                    <div className="h-full bg-green-500 rounded-full" style={{ width: "85%" }}></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-text-primary-light dark:text-text-primary-dark text-right">₹4,500</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 dark:bg-green-900/30 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:text-green-300">
                                                <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span> In Stock
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="p-1.5 text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary-light transition-colors rounded hover:bg-blue-50 dark:hover:bg-blue-900/20">
                                                    <span className="material-symbols-outlined text-[20px]">edit</span>
                                                </button>
                                                <button className="p-1.5 text-text-secondary-light dark:text-text-secondary-dark hover:text-red-600 dark:hover:text-red-400 transition-colors rounded hover:bg-red-50 dark:hover:bg-red-900/20">
                                                    <span className="material-symbols-outlined text-[20px]">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>

                                    {/* Row 2 */}
                                    <tr className="group hover:bg-background-light dark:hover:bg-background-dark/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                                                    <img className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDF_rT530qD-XPlzKI63wO0jnu6hVZ_GREmc56aBavy58CFfLNVbm7_3eTeaMuDnXS-T-0nA7uF4iP3hIawfzKPo7rJynq83hLJEtU7_V9bXUy3-5EzEymaC7v2T8Nw2xenM9gzZDCqOuYDX-78DKWVfYarG_GJdefA3LDJEaXSqscINSojb2iyMc_i1WMZ08p_iVhZwMrcYx0EXMkFXUfeTxhhif1UY0hVY5gFSPCW48wT6aXFz7lG5GMOqCl4Pa1yCErsfs6iZ2uO" alt="Stag Thunder 300" />
                                                </div>
                                                <span className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">Stag Thunder 300</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-text-secondary-light dark:text-text-secondary-dark">SKU-THU-300</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center rounded-md bg-purple-50 dark:bg-purple-900/30 px-2 py-1 text-xs font-medium text-purple-700 dark:text-purple-300 ring-1 ring-inset ring-purple-700/10 dark:ring-purple-300/10">Grade 2 Willow</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex justify-between text-xs mb-1">
                                                    <span className="text-text-primary-light dark:text-text-primary-dark font-medium">45</span>
                                                    <span className="text-text-secondary-light dark:text-text-secondary-dark">Medium</span>
                                                </div>
                                                <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
                                                    <div className="h-full bg-blue-500 rounded-full" style={{ width: "45%" }}></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-text-primary-light dark:text-text-primary-dark text-right">₹3,200</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 dark:bg-amber-900/30 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:text-amber-400">
                                                <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span> Low Stock
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="p-1.5 text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary-light transition-colors rounded hover:bg-blue-50 dark:hover:bg-blue-900/20">
                                                    <span className="material-symbols-outlined text-[20px]">edit</span>
                                                </button>
                                                <button className="p-1.5 text-text-secondary-light dark:text-text-secondary-dark hover:text-red-600 dark:hover:text-red-400 transition-colors rounded hover:bg-red-50 dark:hover:bg-red-900/20">
                                                    <span className="material-symbols-outlined text-[20px]">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
