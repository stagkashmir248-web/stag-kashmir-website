"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdminNotifications } from "@/components/AdminNotificationProvider";

function NavLink({ href, icon, children, badgeCount = 0, isActive }: { href: string; icon: string; children: React.ReactNode; badgeCount?: number; isActive?: boolean }) {
    return (
        <Link 
            href={href} 
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all font-medium relative group text-sm
                ${isActive 
                    ? "bg-primary/10 text-primary dark:bg-primary/20" 
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                }
            `}
        >
            <span className={`material-symbols-outlined !text-[18px] ${isActive ? "text-primary" : ""}`}>{icon}</span>
            <span className="flex-1">{children}</span>
            {badgeCount > 0 && (
                <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center justify-center min-w-[18px]">
                    {badgeCount > 99 ? '99+' : badgeCount}
                </span>
            )}
        </Link>
    );
}

function NavSection({ title, icon, children, defaultOpen = false }: { title: string; icon: string; children: React.ReactNode; defaultOpen?: boolean }) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="mb-2">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider hover:text-slate-900 dark:hover:text-slate-300 transition-colors"
            >
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined !text-[16px]">{icon}</span>
                    {title}
                </div>
                <span className={`material-symbols-outlined !text-[16px] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
                    expand_more
                </span>
            </button>
            <div className={`flex flex-col gap-0.5 mt-1 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                {children}
            </div>
        </div>
    );
}

export default function SidebarNavLinks() {
    const { counts } = useAdminNotifications();
    const pathname = usePathname();

    return (
        <div className="flex flex-col gap-2 mt-2">
            <NavSection title="Store Operations" icon="storefront" defaultOpen={true}>
                <NavLink href="/admin/orders" icon="shopping_bag" badgeCount={counts.orders} isActive={pathname.startsWith("/admin/orders")}>Orders</NavLink>
                <NavLink href="/admin/customers" icon="group" isActive={pathname.startsWith("/admin/customers")}>Customers</NavLink>
                <NavLink href="/admin/abandoned-carts" icon="remove_shopping_cart" isActive={pathname.startsWith("/admin/abandoned")}>Abandoned Carts</NavLink>
                <NavLink href="/admin/coupons" icon="local_offer" isActive={pathname.startsWith("/admin/coupons")}>Coupons</NavLink>
            </NavSection>

            <NavSection title="Content & Inventory" icon="inventory_2" defaultOpen={true}>
                <NavLink href="/admin/products" icon="sports_cricket" isActive={pathname.startsWith("/admin/products")}>Products</NavLink>
                <NavLink href="/admin/inquiries" icon="inbox" badgeCount={counts.inquiries} isActive={pathname.startsWith("/admin/inquiries")}>Contact Messages</NavLink>
                <NavLink href="/admin/reviews" icon="star" isActive={pathname.startsWith("/admin/reviews")}>Reviews</NavLink>
                <NavLink href="/admin/newsletter" icon="mail" badgeCount={counts.newsletter} isActive={pathname.startsWith("/admin/newsletter")}>Newsletter</NavLink>
            </NavSection>

            <NavSection title="Insights" icon="monitoring" defaultOpen={true}>
                <NavLink href="/admin/analytics" icon="bar_chart" isActive={pathname.startsWith("/admin/analytics")}>Analytics</NavLink>
            </NavSection>
        </div>
    );
}
