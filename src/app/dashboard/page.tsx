import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { signOut } from "@/auth";

// ── Helpers ──────────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
    const map: Record<string, { label: string; cls: string; icon: string }> = {
        PENDING: { label: "Pending", cls: "bg-slate-700 text-slate-300", icon: "schedule" },
        PROCESSING: { label: "Processing", cls: "bg-blue-500/20 text-blue-300", icon: "autorenew" },
        PAID_PARTIAL: { label: "Booking Paid", cls: "bg-amber-500/20 text-amber-300", icon: "payments" },
        PAID: { label: "Paid", cls: "bg-green-500/20 text-green-300", icon: "check_circle" },
        DISPATCHED: { label: "Dispatched", cls: "bg-purple-500/20 text-purple-300", icon: "local_shipping" },
        DELIVERED: { label: "Delivered", cls: "bg-green-500/20 text-green-400", icon: "inventory_2" },
        CANCELLED: { label: "Cancelled", cls: "bg-red-500/20 text-red-400", icon: "cancel" },
    };
    const s = map[status] ?? { label: status, cls: "bg-slate-700 text-slate-400", icon: "help" };
    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${s.cls}`}>
            <span className="material-symbols-outlined !text-[13px]">{s.icon}</span>
            {s.label}
        </span>
    );
}

function PaymentLabel({ type }: { type: string }) {
    if (type === "PARTIAL") return <span className="text-xs bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded-full font-semibold">₹300 Booking</span>;
    if (type === "FULL") return <span className="text-xs bg-green-500/10 text-green-300 px-2 py-0.5 rounded-full font-semibold">Full Payment</span>;
    return null;
}

const TL_STEPS = ["PENDING", "PROCESSING", "DISPATCHED", "DELIVERED"];
const TL_LABELS = ["Order Placed", "Processing", "Dispatched", "Delivered"];
const TL_ICONS = ["receipt", "autorenew", "local_shipping", "inventory_2"];
function OrderTimeline({ status }: { status: string }) {
    const idx = TL_STEPS.indexOf(status);
    if (idx === -1) return null;
    return (
        <div className="flex items-start overflow-x-auto pb-2 mt-4 gap-0">
            {TL_STEPS.map((step, i) => {
                const done = idx > i, cur = idx === i;
                return (
                    <div key={step} className="flex items-center flex-1 min-w-[70px]">
                        <div className="flex flex-col items-center gap-1 flex-1">
                            <div className={`size-8 rounded-full flex items-center justify-center border-2 ${done ? "bg-primary border-primary" : cur ? "border-primary bg-primary/10" : "border-slate-700 bg-slate-800"}`}>
                                <span className={`material-symbols-outlined !text-[14px] ${done ? "text-black" : cur ? "text-primary" : "text-slate-600"}`}>{TL_ICONS[i]}</span>
                            </div>
                            <p className={`text-[10px] font-semibold whitespace-nowrap text-center ${cur ? "text-primary" : done ? "text-slate-400" : "text-slate-600"}`}>{TL_LABELS[i]}</p>
                        </div>
                        {i < TL_STEPS.length - 1 && <div className={`h-0.5 flex-1 mb-4 mx-1 ${done || cur ? "bg-primary/40" : "bg-slate-700"}`} />}
                    </div>
                );
            })}
        </div>
    );
}

// ── Tab content components ───────────────────────────────────────────────────
function OrdersTab({ orders }: { orders: any[] }) {
    if (orders.length === 0) {
        return (
            <div className="rounded-2xl border border-slate-700 bg-slate-900 flex flex-col items-center gap-4 py-20 text-center">
                <span className="material-symbols-outlined !text-5xl text-slate-700">shopping_bag</span>
                <h2 className="text-xl font-bold text-white">No orders yet</h2>
                <p className="text-slate-400 text-sm max-w-xs">Your orders will appear here once you place them.</p>
                <Link href="/shop" className="bg-primary hover:bg-amber-400 text-black font-bold py-2.5 px-8 rounded-xl transition-all text-sm mt-2">
                    Browse Collection
                </Link>
            </div>
        );
    }
    return (
        <div className="flex flex-col gap-5">
            {orders.map((order: any) => (
                <div key={order.id} className="rounded-2xl border border-slate-700 bg-slate-900 overflow-hidden">
                    <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-slate-700 bg-slate-800/50">
                        <div className="flex flex-wrap items-center gap-4">
                            <div>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Order ID</p>
                                <p className="text-sm font-bold text-white font-mono">#{order.id.slice(-8).toUpperCase()}</p>
                            </div>
                            <div className="hidden sm:block w-px h-8 bg-slate-700" />
                            <div>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Placed</p>
                                <p className="text-sm text-slate-300">{new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                            </div>
                            <div className="hidden sm:block w-px h-8 bg-slate-700" />
                            <div>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total</p>
                                <p className="text-sm font-bold text-primary">₹{order.total.toLocaleString("en-IN")}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <PaymentLabel type={order.paymentType} />
                            <StatusBadge status={order.status} />
                        </div>
                    </div>

                    <div className="p-6 flex flex-col gap-4">
                        {order.items.map((item: any) => (
                            <div key={item.id} className="flex gap-3 items-center">
                                <div className="size-14 rounded-xl overflow-hidden border border-slate-700 bg-slate-800 shrink-0">
                                    {item.product?.imageUrl
                                        ? <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover" />
                                        : <div className="w-full h-full flex items-center justify-center"><span className="material-symbols-outlined !text-2xl text-slate-600">sports_cricket</span></div>}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <Link href={`/shop/${item.product.slug}`} className="text-sm font-semibold text-white hover:text-primary transition-colors line-clamp-1">{item.product.name}</Link>
                                    <p className="text-xs text-slate-400 mt-0.5">Qty: {item.quantity} × ₹{item.price.toLocaleString("en-IN")}</p>
                                </div>
                                <p className="text-sm font-bold text-white shrink-0">₹{(item.quantity * item.price).toLocaleString("en-IN")}</p>
                            </div>
                        ))}
                        {!["CANCELLED"].includes(order.status) && <OrderTimeline status={order.status} />}
                        {order.address && (
                            <div className="flex items-start gap-2 text-xs text-slate-400 bg-slate-800 rounded-xl px-4 py-3">
                                <span className="material-symbols-outlined !text-[15px] text-slate-500 mt-0.5 shrink-0">location_on</span>
                                <span>{order.address}, {order.city}, {order.state} – {order.pincode}{order.landmark ? `, Near ${order.landmark}` : ""}</span>
                            </div>
                        )}
                        {order.adminNote && (
                            <div className="flex items-start gap-2 text-xs text-amber-300/80 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3">
                                <span className="material-symbols-outlined !text-[15px] shrink-0 mt-0.5">info</span>
                                {order.adminNote}
                            </div>
                        )}
                        <div className="flex flex-wrap gap-2 pt-1 border-t border-slate-700/50">
                            <Link href="/contact" className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold border border-slate-600 text-slate-300 rounded-xl hover:border-slate-400 hover:text-white transition-colors">
                                <span className="material-symbols-outlined !text-[14px]">support_agent</span>Need Help?
                            </Link>
                            <Link href="/shop" className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold border border-primary/30 text-primary rounded-xl hover:bg-primary/10 transition-colors">
                                <span className="material-symbols-outlined !text-[14px]">replay</span>Buy Again
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

function ProfileTab({ user }: { user: any }) {
    return (
        <div className="flex flex-col gap-5">
            <div className="rounded-2xl border border-slate-700 bg-slate-900 overflow-hidden">
                <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-700 bg-slate-800/50">
                    <span className="material-symbols-outlined !text-[20px] text-primary">person</span>
                    <h2 className="font-bold text-white">Profile Information</h2>
                </div>
                <div className="p-6 flex flex-col gap-5">
                    {/* Avatar */}
                    <div className="flex items-center gap-4">
                        {user.image ? (
                            <img src={user.image} alt={user.name ?? ""} className="size-20 rounded-full border-4 border-primary/20 object-cover" />
                        ) : (
                            <div className="size-20 rounded-full border-4 border-primary/20 bg-primary/10 flex items-center justify-center text-primary text-2xl font-black">
                                {user.name?.[0] ?? "U"}
                            </div>
                        )}
                        <div>
                            <p className="text-lg font-bold text-white">{user.name ?? "—"}</p>
                            <p className="text-sm text-slate-400">{user.email}</p>
                            <span className="inline-block mt-1.5 text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full">Stag Kashmir Member</span>
                        </div>
                    </div>

                    {/* Info fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            { label: "Full Name", value: user.name ?? "—", icon: "badge" },
                            { label: "Email Address", value: user.email, icon: "mail" },
                        ].map(f => (
                            <div key={f.label} className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3">
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                                    <span className="material-symbols-outlined !text-[12px]">{f.icon}</span>{f.label}
                                </p>
                                <p className="text-sm font-semibold text-white break-all">{f.value}</p>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-start gap-3 bg-slate-800 rounded-xl px-4 py-3 text-xs text-slate-400">
                        <span className="material-symbols-outlined !text-[16px] text-slate-500 shrink-0 mt-0.5">info</span>
                        Your profile details are managed through your Google account. To update your name or photo, change them in your Google account settings.
                    </div>
                </div>
            </div>
        </div>
    );
}

function AddressesTab() {
    return (
        <div className="flex flex-col gap-5">
            <div className="rounded-2xl border border-slate-700 bg-slate-900 overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700 bg-slate-800/50">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined !text-[20px] text-primary">location_on</span>
                        <h2 className="font-bold text-white">Saved Addresses</h2>
                    </div>
                </div>
                <div className="p-10 flex flex-col items-center text-center gap-4">
                    <span className="material-symbols-outlined !text-5xl text-slate-700">home_pin</span>
                    <h3 className="text-lg font-bold text-white">No saved addresses yet</h3>
                    <p className="text-slate-400 text-sm max-w-sm">Your shipping addresses will be saved here after you place an order. Next time, checkout will be faster.</p>
                    <Link href="/shop" className="mt-2 bg-primary hover:bg-amber-400 text-black font-bold py-2.5 px-8 rounded-xl transition-all text-sm">
                        Shop Now
                    </Link>
                </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xs text-slate-400">
                <span className="material-symbols-outlined !text-[16px] text-amber-400 shrink-0 mt-0.5">lightbulb</span>
                <span>Address management (save, edit, delete) is coming soon. For now, your address is saved with each order and shown in Order History.</span>
            </div>
        </div>
    );
}

// ── Main page ────────────────────────────────────────────────────────────────
export default async function DashboardPage(props: {
    searchParams: Promise<{ tab?: string }>;
}) {
    const searchParams = await props.searchParams;
    const session = await auth();
    if (!session?.user) redirect("/signin");

    const user = session.user;
    const tab = searchParams.tab ?? "orders";

    const orders = tab === "orders"
        ? await (prisma.order as any).findMany({
            where: { email: user.email! },
            orderBy: { createdAt: "desc" },
            include: { items: { include: { product: { select: { name: true, imageUrl: true, slug: true } } } } },
        })
        : [];

    const navItems = [
        { key: "orders", icon: "package_2", label: "Orders", badge: true },
        { key: "profile", icon: "person", label: "Profile" },
        { key: "addresses", icon: "location_on", label: "Addresses" },
    ];

    const tabHeadings: Record<string, { title: string; sub: string }> = {
        orders: { title: "My Orders", sub: "All your orders placed through Stag Kashmir" },
        profile: { title: "Profile", sub: "Your account information from Google" },
        addresses: { title: "Addresses", sub: "Manage your saved shipping addresses" },
    };
    const heading = tabHeadings[tab] ?? tabHeadings.orders;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col lg:flex-row gap-8 items-start">

                {/* ── Sidebar ── */}
                <aside className="w-full lg:w-72 shrink-0 flex flex-col gap-4">
                    {/* Profile card */}
                    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6 flex flex-col items-center text-center gap-3">
                        {user.image ? (
                            <img src={user.image} alt={user.name ?? ""} className="size-20 rounded-full border-4 border-primary/20 object-cover" />
                        ) : (
                            <div className="size-20 rounded-full border-4 border-primary/20 bg-primary/10 flex items-center justify-center text-primary text-2xl font-black">
                                {user.name?.[0] ?? "U"}
                            </div>
                        )}
                        <div>
                            <h2 className="text-lg font-bold text-white">{user.name ?? "User"}</h2>
                            <p className="text-xs text-slate-400 mt-0.5 break-all">{user.email}</p>
                        </div>
                        <span className="text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
                            Stag Kashmir Member
                        </span>
                    </div>

                    {/* Nav */}
                    <nav className="rounded-2xl border border-slate-700 bg-slate-900 overflow-hidden">
                        {navItems.map(item => {
                            const active = tab === item.key;
                            return (
                                <Link key={item.key}
                                    href={`/dashboard?tab=${item.key}`}
                                    className={`flex items-center gap-3 px-5 py-3.5 border-b border-slate-700/50 transition-colors ${active ? "bg-primary/5 border-l-4 border-l-primary text-primary" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`}>
                                    <span className={`material-symbols-outlined !text-[20px] ${active ? "text-primary" : "text-slate-500"}`}>{item.icon}</span>
                                    <span className="text-sm font-semibold">{item.label}</span>
                                    {item.badge && <span className="ml-auto text-xs bg-primary/15 text-primary px-2 py-0.5 rounded-full font-bold">{active ? orders.length : ""}</span>}
                                </Link>
                            );
                        })}
                        <form action={async () => { "use server"; await signOut({ redirectTo: "/" }); }}>
                            <button type="submit" className="w-full flex items-center gap-3 px-5 py-3.5 text-red-400 hover:bg-red-500/10 transition-colors">
                                <span className="material-symbols-outlined !text-[20px]">logout</span>
                                <span className="text-sm font-semibold">Sign Out</span>
                            </button>
                        </form>
                    </nav>

                    {/* Guest lookup tip */}
                    <Link href="/track-order" className="group rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 hover:border-amber-500/40 transition-colors flex gap-3 items-start">
                        <span className="material-symbols-outlined !text-[22px] text-amber-400 shrink-0 mt-0.5">manage_search</span>
                        <div>
                            <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">Track a Guest Order</p>
                            <p className="text-xs text-slate-400 mt-0.5">Ordered without an account? Enter your phone + tracking code</p>
                        </div>
                    </Link>
                </aside>

                {/* ── Main ── */}
                <div className="flex-1 min-w-0 flex flex-col gap-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white">{heading.title}</h1>
                        <p className="text-slate-400 text-sm mt-1">{heading.sub}</p>
                    </div>
                    {tab === "orders" && <OrdersTab orders={orders} />}
                    {tab === "profile" && <ProfileTab user={user} />}
                    {tab === "addresses" && <AddressesTab />}
                </div>
            </div>
        </div>
    );
}
