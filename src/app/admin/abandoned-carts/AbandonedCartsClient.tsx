"use client";

import { useTransition } from "react";

interface AbandonedCart {
    id: string;
    email: string;
    cartJson: string;
    createdAt: Date;
    sentAt: Date | null;
}

export default function AbandonedCartsClient({ carts }: { carts: AbandonedCart[] }) {
    const [isPending, startTransition] = useTransition();

    async function handleSendEmail(id: string) {
        const { sendAbandonedCartEmail } = await import("@/actions/abandoned-cart");
        startTransition(async () => {
            const res = await sendAbandonedCartEmail(id);
            if (res.success) {
                alert("Recovery email sent!");
                window.location.reload();
            } else {
                alert(res.error || "Failed to send email.");
            }
        });
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Abandoned Carts</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                    {carts.length} unsent abandoned cart{carts.length !== 1 ? 's' : ''}. Send recovery emails to win back customers.
                </p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                {carts.length === 0 ? (
                    <div className="py-16 text-center text-slate-400">
                        <span className="material-symbols-outlined !text-[48px] block mb-3 opacity-30">shopping_cart</span>
                        No abandoned carts to recover. Great job!
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                <tr>
                                    <th className="text-left px-6 py-3.5 font-semibold text-slate-600 dark:text-slate-400 text-xs uppercase tracking-wider">Email</th>
                                    <th className="text-left px-6 py-3.5 font-semibold text-slate-600 dark:text-slate-400 text-xs uppercase tracking-wider">Items</th>
                                    <th className="text-left px-6 py-3.5 font-semibold text-slate-600 dark:text-slate-400 text-xs uppercase tracking-wider">Value</th>
                                    <th className="text-left px-6 py-3.5 font-semibold text-slate-600 dark:text-slate-400 text-xs uppercase tracking-wider">Abandoned</th>
                                    <th className="px-6 py-3.5"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {carts.map(cart => {
                                    let items: any[] = [];
                                    let total = 0;
                                    try {
                                        items = JSON.parse(cart.cartJson);
                                        total = items.reduce((s: number, i: any) => s + i.price * i.quantity, 0);
                                    } catch { }

                                    return (
                                        <tr key={cart.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                            <td className="px-6 py-4 font-medium text-slate-800 dark:text-slate-200">{cart.email}</td>
                                            <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                                                <div className="flex flex-col gap-0.5">
                                                    {items.map((item: any, idx: number) => (
                                                        <span key={idx} className="text-xs">{item.quantity}× {item.name}</span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-slate-800 dark:text-slate-200">
                                                ₹{total.toLocaleString("en-IN")}
                                            </td>
                                            <td className="px-6 py-4 text-slate-500 dark:text-slate-400 text-xs">
                                                {new Date(cart.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => handleSendEmail(cart.id)}
                                                    disabled={isPending}
                                                    className="flex items-center gap-1.5 bg-primary/10 text-primary hover:bg-primary hover:text-black font-semibold px-3 py-1.5 rounded-lg transition-all text-xs disabled:opacity-50"
                                                >
                                                    <span className="material-symbols-outlined !text-[16px]">send</span>
                                                    Send Recovery Email
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
