import Link from "next/link";
import { auth, signOut } from "@/auth";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* ── Sidebar ── */}
            {/* On mobile: full-width top bar. On md+: fixed left sidebar */}
            <aside className="
                hidden md:flex
                w-64 shrink-0
                flex-col
                bg-white dark:bg-slate-900
                border-r border-slate-200 dark:border-slate-800
                sticky top-0 h-screen overflow-y-auto
            ">
                {/* Logo */}
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

                <nav className="flex-1 p-4 flex flex-col gap-1">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-3 mt-4">Management</div>
                    <NavLink href="/admin/orders" icon="shopping_bag">Order Inquiries</NavLink>
                    <NavLink href="/admin/inquiries" icon="mark_email_unread">Contact Messages</NavLink>
                    <NavLink href="/admin/customers" icon="group">Customers</NavLink>
                    <NavLink href="/admin/newsletter" icon="mail">Newsletter</NavLink>

                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-3 mt-6">Inventory</div>
                    <NavLink href="/admin/products" icon="inventory_2">Products</NavLink>
                    <NavLink href="/admin/reviews" icon="rate_review">Reviews</NavLink>
                </nav>

                {/* User footer */}
                <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-3">
                    {session?.user && (
                        <div className="flex items-center gap-3 px-2 mb-2">
                            {session.user.image ? (
                                <img src={session.user.image} alt="Admin" className="w-8 h-8 rounded-full border border-slate-200" />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                                    {session.user.name?.charAt(0) || "A"}
                                </div>
                            )}
                            <div className="flex flex-col overflow-hidden">
                                <span className="text-sm font-bold text-slate-900 dark:text-white truncate">{session.user.name}</span>
                                <span className="text-xs text-slate-500 dark:text-slate-400 truncate">{session.user.email}</span>
                            </div>
                        </div>
                    )}
                    <Link href="/" className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-medium transition-colors text-sm">
                        <span className="material-symbols-outlined !text-[18px]">public</span>
                        View Live Site
                    </Link>
                    <form action={async () => {
                        "use server"
                        await signOut({ redirectTo: "/login" })
                    }}>
                        <button type="submit" className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 font-medium transition-colors text-sm border border-red-100 dark:border-red-900/30">
                            <span className="material-symbols-outlined !text-[18px]">logout</span>
                            Sign Out
                        </button>
                    </form>
                </div>
            </aside>

            {/* ── Mobile Top Bar ── */}
            <div className="md:hidden fixed top-0 inset-x-0 z-50 flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                <Link href="/admin" className="flex items-center gap-2">
                    <div className="size-6 text-primary">
                        <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"></path>
                        </svg>
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white">Admin Hub</span>
                </Link>
                {/* Mobile quick nav */}
                <div className="flex items-center gap-1">
                    <Link href="/admin/orders" className="p-2 rounded-lg text-slate-500 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <span className="material-symbols-outlined !text-[20px]">shopping_bag</span>
                    </Link>
                    <Link href="/admin/products" className="p-2 rounded-lg text-slate-500 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <span className="material-symbols-outlined !text-[20px]">inventory_2</span>
                    </Link>
                    <Link href="/admin/reviews" className="p-2 rounded-lg text-slate-500 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <span className="material-symbols-outlined !text-[20px]">rate_review</span>
                    </Link>
                    <Link href="/admin" className="p-2 rounded-lg text-slate-500 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <span className="material-symbols-outlined !text-[20px]">public</span>
                    </Link>
                    <Link href="/admin/newsletter" className="p-2 rounded-lg text-slate-500 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <span className="material-symbols-outlined !text-[20px]">mail</span>
                    </Link>
                </div>
            </div>

            {/* ── Main Content ─ No overflow set here; browser scrolls the page naturally ── */}
            <main className="flex-1 min-w-0 p-4 md:p-8 lg:p-12 pt-20 md:pt-8">
                {children}
            </main>
        </div>
    );
}

function NavLink({ href, icon, children }: { href: string; icon: string; children: React.ReactNode }) {
    return (
        <Link href={href} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary transition-all font-medium">
            <span className="material-symbols-outlined !text-[20px]">{icon}</span>
            {children}
        </Link>
    );
}
