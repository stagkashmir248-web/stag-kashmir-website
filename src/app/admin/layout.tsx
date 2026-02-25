import Link from "next/link";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* Sidebar Explorer */}
            <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0 sticky top-0 h-screen overflow-y-auto">
                <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                    <Link href="/admin" className="flex items-center gap-3">
                        <div className="size-8 text-primary">
                            <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"></path>
                            </svg>
                        </div>
                        <span className="font-bold text-lg text-slate-900 dark:text-white">Admin Hub</span>
                    </Link>
                </div>

                <nav className="flex-1 p-4 flex flex-col gap-2">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-3 mt-4">Management</div>
                    <Link href="/admin/orders" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary transition-all font-medium">
                        <span className="material-symbols-outlined !text-[20px]">shopping_bag</span>
                        Order Inquiries
                    </Link>
                    <Link href="/admin/inquiries" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary transition-all font-medium border-l-2 border-transparent hover:border-primary">
                        <span className="material-symbols-outlined !text-[20px]">mark_email_unread</span>
                        Contact Messages
                    </Link>

                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-3 mt-6">Inventory</div>
                    <Link href="/admin/products" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary transition-all font-medium">
                        <span className="material-symbols-outlined !text-[20px]">inventory_2</span>
                        Products
                    </Link>
                </nav>

                <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                    <Link href="/" className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-medium transition-colors text-sm">
                        <span className="material-symbols-outlined !text-[18px]">public</span>
                        View Live Site
                    </Link>
                </div>
            </aside>

            {/* Main Content Pane */}
            <main className="flex-1 overflow-x-hidden p-8 md:p-12 h-screen overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
