"use client";

import { useCartStore } from "@/store/cart";
import { submitOrder } from "@/actions/order";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function CheckoutPage() {
    const { items, getCartTotal, clearCart } = useCartStore();
    const router = useRouter();
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    if (items.length === 0 && status !== "success") {
        return (
            <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-12 flex flex-col items-center justify-center text-center">
                <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
                <Link href="/shop" className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-lg transition-colors">
                    Return to Shop
                </Link>
            </main>
        );
    }

    if (status === "success") {
        return (
            <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-12 md:py-20 flex flex-col items-center justify-center text-center">
                <div className="size-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6 border-8 border-green-100">
                    <span className="material-symbols-outlined text-5xl">check_circle</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">Order Inquiry Received!</h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mb-8 leading-relaxed">
                    Thank you for choosing Stag Kashmir. Since we build custom bats to order, we have received your inquiry and will contact you via WhatsApp or Email shortly to finalize your custom requirements and process your payment!
                </p>
                <div className="flex gap-4">
                    <Link href="/shop" className="bg-primary hover:bg-primary-dark text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-lg shadow-primary/20">
                        Continue Shopping
                    </Link>
                </div>
            </main>
        );
    }

    async function handleCheckout(formData: FormData) {
        setStatus("submitting");

        // Structure the order data
        const customerDetails = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            phone: formData.get("phone") as string,
        };

        const result = await submitOrder(customerDetails, items, getCartTotal());

        if (result.success) {
            setStatus("success");
            clearCart();
        } else {
            setStatus("error");
            setErrorMessage(result.error || "Failed to submit order. Please try again.");
        }
    }

    return (
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Checkout Inquiry</h1>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Checkout Form */}
                <div className="flex-1">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Contact Information</h2>

                        <form action={handleCheckout} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
                                    <input name="name" required className="rounded-lg border-slate-200 bg-slate-50 focus:border-primary focus:ring-primary w-full p-3 transition-all" placeholder="John Doe" type="text" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
                                    <input name="email" required className="rounded-lg border-slate-200 bg-slate-50 focus:border-primary focus:ring-primary w-full p-3 transition-all" placeholder="john@example.com" type="email" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">WhatsApp / Phone Number</label>
                                <input name="phone" required className="rounded-lg border-slate-200 bg-slate-50 focus:border-primary focus:ring-primary w-full p-3 transition-all" placeholder="+91 98765 43210" type="tel" />
                                <p className="text-xs text-slate-500">We will use this to contact you for payment link and exact address confirmation.</p>
                            </div>

                            {status === "error" && (
                                <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-200">{errorMessage}</div>
                            )}

                            <button disabled={status === "submitting"} className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 mt-8 disabled:opacity-70 disabled:cursor-not-allowed" type="submit">
                                {status === "submitting" ? (
                                    <>
                                        <span className="material-symbols-outlined animate-spin">sync</span>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined">send</span>
                                        Submit Inquiry
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="w-full lg:w-[400px] shrink-0">
                    <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Inquiry Summary</h2>

                        <div className="space-y-4 mb-6">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="w-16 h-16 bg-white border border-slate-200 rounded-lg overflow-hidden shrink-0 relative">
                                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                                        <span className="absolute -top-2 -right-2 bg-slate-800 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                            {item.quantity}
                                        </span>
                                    </div>
                                    <div className="flex-1 flex flex-col justify-center">
                                        <span className="font-medium text-sm text-slate-900 dark:text-white line-clamp-1">{item.name}</span>
                                        {item.size && <span className="text-xs text-slate-500">Size: {item.size}</span>}
                                    </div>
                                    <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center">
                                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-slate-200 dark:border-slate-700 pt-6 space-y-3 text-sm">
                            <div className="flex justify-between text-slate-600 dark:text-slate-400">
                                <span>Subtotal</span>
                                <span className="font-medium text-slate-900 dark:text-white">₹{getCartTotal().toLocaleString("en-IN")}</span>
                            </div>
                            <div className="flex justify-between text-slate-600 dark:text-slate-400">
                                <span>Shipping estimate</span>
                                <span className="font-medium text-green-600 font-bold">Free</span>
                            </div>
                        </div>

                        <div className="border-t border-slate-200 dark:border-slate-700 pt-6 mt-6">
                            <div className="flex justify-between items-center bg-primary/5 p-4 rounded-xl border border-primary/10">
                                <span className="font-bold text-slate-900 dark:text-white">Amount Due</span>
                                <span className="text-2xl font-black text-primary">₹{getCartTotal().toLocaleString("en-IN")}</span>
                            </div>
                            <p className="text-center text-xs text-slate-500 mt-4 leading-relaxed">
                                No payment required now. Our team will verify inventory and contact you with a direct payment link to complete this order.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
