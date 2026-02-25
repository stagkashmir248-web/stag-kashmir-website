"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cart";

export default function CartPage() {
    const { items, removeItem, updateQuantity, getCartTotal } = useCartStore();

    if (items.length === 0) {
        return (
            <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex flex-col items-center justify-center text-center">
                <div className="size-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-4xl text-primary">shopping_bag</span>
                </div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Your Cart is Empty</h1>
                <p className="text-slate-500 max-w-md mb-8">
                    Looks like you haven't added any Kashmir Willow bats to your cart yet.
                </p>
                <Link href="/shop" className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-lg transition-colors">
                    Start Shopping
                </Link>
            </main>
        );
    }

    return (
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Shopping Cart</h1>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Cart Items List */}
                <div className="flex-1">
                    <div className="flex flex-col gap-6">
                        {items.map((item) => (
                            <div key={item.id} className="flex flex-col sm:flex-row items-center gap-6 p-4 md:p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
                                <Link href={`/shop/${item.productId}`} className="w-full sm:w-32 aspect-square bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden shrink-0 block">
                                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                                </Link>

                                <div className="flex-1 flex flex-col w-full">
                                    <div className="flex justify-between items-start mb-2">
                                        <Link href={`/shop/${item.productId}`} className="font-bold text-lg text-slate-900 dark:text-white hover:text-primary transition-colors">
                                            {item.name}
                                        </Link>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-slate-400 hover:text-red-500 transition-colors p-1"
                                        >
                                            <span className="material-symbols-outlined !text-xl">delete</span>
                                        </button>
                                    </div>

                                    {item.size && (
                                        <p className="text-sm text-slate-500 mb-4">Size: {item.size}</p>
                                    )}

                                    <div className="mt-auto flex items-center justify-between">
                                        <div className="flex w-28 items-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="flex h-10 w-8 items-center justify-center text-slate-500 hover:text-primary transition-colors disabled:opacity-50"
                                                disabled={item.quantity <= 1}
                                            >
                                                <span className="material-symbols-outlined !text-sm">remove</span>
                                            </button>
                                            <span className="flex-1 text-center font-medium text-sm text-slate-900 dark:text-white">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="flex h-10 w-8 items-center justify-center text-slate-500 hover:text-primary transition-colors"
                                            >
                                                <span className="material-symbols-outlined !text-sm">add</span>
                                            </button>
                                        </div>
                                        <span className="font-bold text-lg text-slate-900 dark:text-white">
                                            ₹{(item.price * item.quantity).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Order Summary */}
                <div className="w-full lg:w-96 shrink-0">
                    <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 sticky top-24">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Order Summary</h2>

                        <div className="space-y-4 mb-6 text-sm">
                            <div className="flex justify-between text-slate-600 dark:text-slate-400">
                                <span>Subtotal</span>
                                <span className="font-medium text-slate-900 dark:text-white">₹{getCartTotal().toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-slate-600 dark:text-slate-400">
                                <span>Shipping</span>
                                <span className="font-medium text-green-600">Free</span>
                            </div>
                            <div className="flex justify-between text-slate-600 dark:text-slate-400">
                                <span>Taxes</span>
                                <span className="font-medium text-slate-900 dark:text-white">Calculated at checkout</span>
                            </div>
                        </div>

                        <div className="border-t border-slate-200 dark:border-slate-700 pt-6 mb-8">
                            <div className="flex justify-between items-center bg-primary/5 p-4 rounded-xl border border-primary/10">
                                <span className="font-bold text-slate-900 dark:text-white">Total</span>
                                <span className="text-2xl font-black text-primary">₹{getCartTotal().toLocaleString()}</span>
                            </div>
                        </div>

                        <Link href="/checkout" className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                            Proceed to Checkout
                            <span className="material-symbols-outlined !text-lg">arrow_forward</span>
                        </Link>

                        <div className="mt-6 flex flex-wrap justify-center gap-4 text-slate-400">
                            <span className="material-symbols-outlined">payments</span>
                            <span className="material-symbols-outlined">verified_user</span>
                            <span className="material-symbols-outlined">local_shipping</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
