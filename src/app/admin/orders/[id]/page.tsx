import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import OrderStatusDropdown from "../OrderStatusDropdown";
import PrintShippingLabelButton from "./PrintShippingLabelButton";

export default async function AdminOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const order = await prisma.order.findUnique({
        where: { id },
        include: {
            items: {
                include: {
                    product: true,
                },
            },
        },
    });

    if (!order) notFound();

    const amountPaid = order.amountPaid ?? (order.status === "PAID" ? order.total : 0);
    const balanceDue = Math.max(0, order.total - (amountPaid as number));

    return (
        <div className="flex flex-col gap-8 w-full max-w-6xl">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <Link href="/admin/orders" className="text-sm text-slate-400 hover:text-primary transition-colors flex items-center gap-1 mb-3">
                        <span className="material-symbols-outlined !text-[16px]">arrow_back</span>
                        Back to Orders
                    </Link>
                    <h1 className="text-3xl font-bold text-white">Order #{order.id.slice(-8).toUpperCase()}</h1>
                    <p className="text-slate-400 mt-1">Placed on {format(new Date(order.createdAt), "MMMM d, yyyy 'at' h:mm a")}</p>
                </div>
                <div className="flex items-center gap-3 bg-slate-800 border border-slate-700 px-4 py-3 rounded-xl">
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Current Status</span>
                    <OrderStatusDropdown orderId={order.id} currentStatus={order.status} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Col: Order Items + Payment */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Items card */}
                    <div className="bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-700 bg-slate-800/50 flex items-center gap-2">
                            <span className="material-symbols-outlined !text-[20px] text-slate-400">inventory_2</span>
                            <h2 className="font-bold text-white text-lg">Order Items</h2>
                        </div>
                        <ul className="divide-y divide-slate-800">
                            {order.items.map(item => (
                                <li key={item.id} className="p-6 flex gap-5 items-start hover:bg-slate-800/30 transition-colors">
                                    <div className="size-20 rounded-xl bg-slate-800 border border-slate-700 overflow-hidden shrink-0">
                                        {item.product?.imageUrl
                                            ? <img src={item.product.imageUrl} className="w-full h-full object-cover" alt="" />
                                            : <span className="material-symbols-outlined !text-3xl text-slate-600 flex items-center justify-center h-full">sports_cricket</span>
                                        }
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-white text-base">{item.product?.name || "Deleted Product"}</h3>
                                        {item.product?.description && (
                                            <p className="text-sm text-slate-400 line-clamp-2 mt-1">{item.product.description}</p>
                                        )}
                                        <div className="flex justify-between items-center mt-4">
                                            <span className="text-sm font-bold text-slate-300 bg-slate-700 px-3 py-1 rounded-lg">Qty: {item.quantity}</span>
                                            <span className="font-bold text-lg text-white">₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        {/* Payment summary */}
                        <div className="border-t border-slate-700 bg-slate-800/40">
                            <div className="flex justify-between items-center px-6 py-3 border-b border-slate-700/50">
                                <span className="text-slate-400 text-sm">Order Total</span>
                                <span className="font-bold text-white">₹{order.total.toLocaleString("en-IN")}</span>
                            </div>
                            <div className="flex justify-between items-center px-6 py-3 border-b border-slate-700/50">
                                <span className="text-slate-400 text-sm flex items-center gap-1.5">
                                    Amount Paid
                                    {(order as any).paymentType === "PARTIAL" && (
                                        <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-bold">Booking</span>
                                    )}
                                </span>
                                <span className={`font-bold ${(amountPaid as number) > 0 ? "text-green-300" : "text-slate-500"}`}>
                                    ₹{(amountPaid as number).toLocaleString("en-IN")}
                                </span>
                            </div>
                            <div className="flex justify-between items-center px-6 py-4">
                                <span className="text-slate-400 text-sm font-bold">Balance Due</span>
                                {balanceDue > 0 ? (
                                    <span className="font-extrabold text-amber-300 text-lg">₹{balanceDue.toLocaleString("en-IN")}</span>
                                ) : (
                                    <span className="font-bold text-green-400 text-sm">✓ FULLY PAID</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Shipping address */}
                    {order.address && (
                        <div className="bg-slate-900 rounded-2xl border border-slate-700 p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="material-symbols-outlined !text-[20px] text-slate-400">location_on</span>
                                <h2 className="font-bold text-white text-lg">Shipping Address</h2>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { label: "Street", value: order.address },
                                    { label: "City", value: order.city },
                                    { label: "State", value: order.state },
                                    { label: "Pincode", value: order.pincode },
                                    { label: "Landmark", value: order.landmark },
                                ].filter(f => f.value).map(f => (
                                    <div key={f.label}>
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{f.label}</p>
                                        <p className="text-white font-medium text-sm">{f.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Col: Customer + Admin Note */}
                <div className="space-y-6">
                    <div className="bg-slate-900 rounded-2xl border border-slate-700 p-6">
                        <div className="flex items-center gap-2 mb-5">
                            <span className="material-symbols-outlined !text-[20px] text-purple-400">account_circle</span>
                            <h2 className="font-bold text-white text-lg">Customer</h2>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Name</p>
                                <p className="text-white font-semibold">{order.customer}</p>
                            </div>
                            <hr className="border-slate-700" />
                            <div>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Email</p>
                                <a href={`mailto:${order.email}`} className="text-primary hover:underline font-medium flex items-center gap-2 text-sm">
                                    <span className="material-symbols-outlined !text-[15px]">mail</span>
                                    {order.email}
                                </a>
                            </div>
                            {order.phone && (
                                <>
                                    <hr className="border-slate-700" />
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Phone</p>
                                        <a href={`tel:${order.phone}`} className="text-white hover:text-primary font-medium flex items-center gap-2 text-sm transition-colors">
                                            <span className="material-symbols-outlined !text-[15px] text-slate-400">call</span>
                                            {order.phone}
                                        </a>
                                    </div>
                                </>
                            )}
                            <hr className="border-slate-700" />
                            <div>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Payment Type</p>
                                <p className="text-white font-medium text-sm capitalize">{(order as any).paymentType?.toLowerCase() ?? "—"}</p>
                            </div>
                        </div>
                    </div>

                    {/* Admin Note */}
                    {(order as any).adminNote && (
                        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="material-symbols-outlined !text-[18px] text-amber-400">sticky_note_2</span>
                                <h3 className="font-bold text-amber-300 text-sm">Admin Note</h3>
                            </div>
                            <p className="text-amber-200/80 text-sm">{(order as any).adminNote}</p>
                        </div>
                    )}

                    {/* Quick links */}
                    <div className="bg-slate-900 rounded-2xl border border-slate-700 p-5 space-y-2">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Quick Actions</p>

                        <div className="mb-4 pb-4 border-b border-slate-800">
                            <PrintShippingLabelButton order={order} />
                        </div>

                        <a href={`https://wa.me/${order.phone?.replace(/\D/g, "")}`} target="_blank"
                            className="flex items-center gap-3 text-sm text-white hover:text-green-300 transition-colors py-2 border-b border-slate-800">
                            <span className="material-symbols-outlined !text-[18px] text-green-400">chat</span>
                            Message on WhatsApp
                        </a>
                        <a href={`mailto:${order.email}`}
                            className="flex items-center gap-3 text-sm text-white hover:text-primary transition-colors py-2">
                            <span className="material-symbols-outlined !text-[18px] text-blue-400">mail</span>
                            Send Email
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
