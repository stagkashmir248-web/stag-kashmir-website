"use client";

import Link from "next/link";
import { useAdminNotifications } from "@/components/AdminNotificationProvider";

function NavLink({ href, icon, children, badgeCount = 0 }: { href: string; icon: string; children: React.ReactNode; badgeCount?: number }) {
    return (
        <Link href={href} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary transition-all font-medium relative group">
            <span className="material-symbols-outlined !text-[20px]">{icon}</span>
            <span className="flex-1">{children}</span>
            {badgeCount > 0 && (
                <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center justify-center min-w-[20px]">
                    {badgeCount > 99 ? '99+' : badgeCount}
                </span>
            )}
        </Link>
    );
}

export default function SidebarNavLinks() {
    const { counts } = useAdminNotifications();

    return (
        <>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-3 mt-4">Management</div>
            <NavLink href="/admin/orders" icon="shopping_bag" badgeCount={counts.orders}>Orders</NavLink>
            <NavLink href="/admin/inquiries" icon="mark_email_unread" badgeCount={counts.inquiries}>Contact Messages</NavLink>
            <NavLink href="/admin/customers" icon="group">Customers</NavLink>
            <NavLink href="/admin/newsletter" icon="mail" badgeCount={counts.newsletter}>Newsletter</NavLink>
            <NavLink href="/admin/coupons" icon="local_offer">Coupons</NavLink>
            <NavLink href="/admin/abandoned-carts" icon="shopping_cart">Abandoned Carts</NavLink>

            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-3 mt-6">Inventory</div>
            <NavLink href="/admin/products" icon="inventory_2">Products</NavLink>
            <NavLink href="/admin/reviews" icon="rate_review">Reviews</NavLink>

            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-3 mt-6">Analytics</div>
            <NavLink href="/admin/analytics" icon="bar_chart">Analytics</NavLink>
        </>
    );
}
