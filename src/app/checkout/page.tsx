"use client";

import { useCartStore } from "@/store/cart";
import { submitOrder, createRazorpayOrder, verifyRazorpaySignature } from "@/actions/order";
import { useState } from "react";
import Link from "next/link";
import Script from "next/script";

const PARTIAL_AMOUNT = 300;

const INDIAN_STATES = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
    "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
    "West Bengal", "Jammu & Kashmir", "Ladakh", "Delhi", "Chandigarh", "Puducherry",
    "Andaman & Nicobar Islands", "Dadra & Nagar Haveli", "Daman & Diu", "Lakshadweep",
];

export default function CheckoutPage() {
    const { items, getCartTotal, clearCart } = useCartStore();
    const total = getCartTotal();
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [paymentMode, setPaymentMode] = useState<"partial" | "full">("partial");
    const [trackingCode, setTrackingCode] = useState("");

    // ── Empty cart ──────────────────────────────────────────────────────────
    if (items.length === 0 && status !== "success") {
        return (
            <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-20 flex flex-col items-center justify-center text-center gap-6">
                <span className="material-symbols-outlined !text-6xl text-slate-500">shopping_cart</span>
                <h1 className="text-3xl font-bold text-white">Your Cart is Empty</h1>
                <Link href="/shop" className="bg-primary hover:bg-amber-400 text-black font-bold py-3 px-8 rounded-xl transition-all">
                    Return to Shop
                </Link>
            </main>
        );
    }

    // ── Success screen ──────────────────────────────────────────────────────
    if (status === "success") {
        return (
            <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-16 flex flex-col items-center text-center gap-6">
                <div className="size-24 bg-green-500/10 text-green-400 rounded-full flex items-center justify-center border-4 border-green-500/20">
                    <span className="material-symbols-outlined !text-5xl">check_circle</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-white">
                    {paymentMode === "partial" ? "Booking Confirmed!" : "Order Confirmed!"}
                </h1>
                <p className="text-slate-300 max-w-lg leading-relaxed">
                    {paymentMode === "partial"
                        ? "Your ₹300 booking is confirmed. We'll contact you on WhatsApp to arrange delivery."
                        : "Your full payment is confirmed! We'll contact you on WhatsApp with shipping updates."}
                </p>

                {/* Tracking code box */}
                {trackingCode && (
                    <div className="w-full max-w-sm bg-slate-900 border border-primary/30 rounded-2xl p-5 flex flex-col items-center gap-2">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Your Order Tracking Code</p>
                        <p className="text-3xl font-black text-primary tracking-widest font-mono">{trackingCode}</p>
                        <p className="text-xs text-slate-500 text-center">Save this code. Visit <strong className="text-slate-300">/track-order</strong> to check your order status anytime without signing in.</p>
                    </div>
                )}

                <Link href="/shop" className="bg-primary hover:bg-amber-400 text-black font-bold py-3.5 px-10 rounded-xl transition-all shadow-lg shadow-primary/20">
                    Continue Shopping
                </Link>
            </main>
        );
    }


    const remainingOnDelivery = total - PARTIAL_AMOUNT;

    async function handleCheckout(formData: FormData) {
        setStatus("submitting");
        const customer = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            phone: formData.get("phone") as string,
            address: formData.get("address") as string,
            city: formData.get("city") as string,
            state: formData.get("state") as string,
            pincode: formData.get("pincode") as string,
            landmark: formData.get("landmark") as string,
            paymentType: paymentMode === "full" ? "FULL" : "PARTIAL" as any,
        };

        const amountToPay = paymentMode === "partial" ? PARTIAL_AMOUNT : total;

        try {
            // 1. Create order on server
            const { id: rzpOrderId } = await createRazorpayOrder(amountToPay);

            // 2. Initialize Razorpay widget
            const options = {
                key: "rzp_live_SL8CeZntngQnAy", // Client-safe key
                amount: amountToPay * 100,
                currency: "INR",
                name: "Stag Kashmir",
                description: paymentMode === "partial" ? "Booking Amount" : "Order Payment",
                image: "/Stag_logo-removebg-preview.png",
                order_id: rzpOrderId,
                handler: async function (response: any) {
                    try {
                        // 3. Verify signature on server
                        const isAuthentic = await verifyRazorpaySignature(
                            response.razorpay_order_id,
                            response.razorpay_payment_id,
                            response.razorpay_signature
                        );

                        if (isAuthentic) {
                            // 4. Save order to database
                            const result = await submitOrder(customer, items, total, amountToPay);
                            if (result.success) {
                                if (result.trackingCode) setTrackingCode(result.trackingCode);
                                setStatus("success");
                                clearCart();
                            } else {
                                setStatus("error");
                                setErrorMessage(result.error || "Failed to save order. Your payment was received — please contact us via WhatsApp.");
                            }
                        } else {
                            setStatus("error");
                            setErrorMessage("Payment verification failed. Please contact us via WhatsApp with your payment ID: " + response.razorpay_payment_id);
                        }
                    } catch (handlerErr: any) {
                        console.error("Payment handler error:", handlerErr);
                        setStatus("error");
                        setErrorMessage(
                            "Payment was received but order save failed. Please contact us on WhatsApp with Payment ID: " +
                            response.razorpay_payment_id
                        );
                    }
                },
                prefill: {
                    name: customer.name,
                    email: customer.email,
                    contact: customer.phone,
                },
                theme: {
                    color: "#D4AF37",
                },
                modal: {
                    ondismiss: function () {
                        setStatus("idle");
                    },
                },
            };

            const rzp1 = new (window as any).Razorpay(options);
            rzp1.on("payment.failed", function (response: any) {
                setStatus("error");
                setErrorMessage("Payment failed: " + response.error.description);
            });
            rzp1.open();
        } catch (error: any) {
            console.error("Checkout error:", error?.message ?? error);
            setStatus("error");
            setErrorMessage(error?.message ?? "Could not initialize payment. Please try again.");
        }
    }

    // Shared styles
    const inp = "w-full px-4 py-3 rounded-xl border border-slate-600 bg-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-sm";
    const lbl = "block text-sm font-semibold text-slate-200 mb-1.5";

    return (
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">Checkout</h1>
                <p className="text-slate-400 mt-1">Complete your payment securely to confirm your order.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start">

                {/* ── Left: Form ── */}
                <div className="flex-1 min-w-0 flex flex-col gap-6">
                    <form action={handleCheckout} className="flex flex-col gap-6">

                        {/* Contact */}
                        <div className="rounded-2xl border border-white/10 bg-slate-900 overflow-hidden">
                            <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10 bg-white/[0.02]">
                                <span className="material-symbols-outlined !text-[20px] text-primary">person</span>
                                <div>
                                    <h2 className="font-bold text-white">Contact Details</h2>
                                    <p className="text-xs text-slate-400">We'll use this to confirm and ship your order</p>
                                </div>
                            </div>
                            <div className="p-6 flex flex-col gap-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className={lbl}>Full Name <span className="text-primary">*</span></label>
                                        <input name="name" required type="text" placeholder="Aadil Khan" className={inp} />
                                    </div>
                                    <div>
                                        <label className={lbl}>Email Address <span className="text-primary">*</span></label>
                                        <input name="email" required type="email" placeholder="aadil@email.com" className={inp} />
                                    </div>
                                </div>
                                <div>
                                    <label className={lbl}>WhatsApp / Phone <span className="text-primary">*</span></label>
                                    <input name="phone" required type="tel" placeholder="+91 98765 43210" className={inp} />
                                    <p className="text-xs text-slate-400 mt-2">We'll send order confirmation and payment link on WhatsApp</p>
                                </div>
                            </div>
                        </div>

                        {/* Shipping Address */}
                        <div className="rounded-2xl border border-white/10 bg-slate-900 overflow-hidden">
                            <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10 bg-white/[0.02]">
                                <span className="material-symbols-outlined !text-[20px] text-primary">local_shipping</span>
                                <div>
                                    <h2 className="font-bold text-white">Shipping Address</h2>
                                    <p className="text-xs text-slate-400">Enter the exact delivery location</p>
                                </div>
                            </div>
                            <div className="p-6 flex flex-col gap-5">
                                <div>
                                    <label className={lbl}>Street Address / House No. <span className="text-primary">*</span></label>
                                    <input name="address" required type="text" placeholder="House No. 12, Main Bazar, Near Clock Tower" className={inp} />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className={lbl}>City / Town <span className="text-primary">*</span></label>
                                        <input name="city" required type="text" placeholder="Srinagar" className={inp} />
                                    </div>
                                    <div>
                                        <label className={lbl}>State <span className="text-primary">*</span></label>
                                        <select name="state" required
                                            className="w-full px-4 py-3 rounded-xl border border-slate-600 bg-slate-800 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-sm">
                                            <option value="" className="text-slate-400">Select State</option>
                                            {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className={lbl}>PIN Code <span className="text-primary">*</span></label>
                                        <input name="pincode" required type="text" maxLength={6} pattern="\d{6}" placeholder="190001" className={inp} />
                                    </div>
                                    <div>
                                        <label className={lbl}>Landmark <span className="text-slate-500 font-normal">(optional)</span></label>
                                        <input name="landmark" type="text" placeholder="Near mosque, school, etc." className={inp} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Mode */}
                        <div className="rounded-2xl border border-white/10 bg-slate-900 overflow-hidden">
                            <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10 bg-white/[0.02]">
                                <span className="material-symbols-outlined !text-[20px] text-primary">payment</span>
                                <div>
                                    <h2 className="font-bold text-white">Payment Option</h2>
                                    <p className="text-xs text-slate-400">Choose how you want to pay</p>
                                </div>
                            </div>
                            <div className="p-6 flex flex-col gap-3">

                                {/* Partial booking */}
                                <label className={`flex items-start gap-4 p-5 rounded-xl border cursor-pointer transition-all ${paymentMode === "partial" ? "border-primary bg-primary/8" : "border-slate-700 bg-slate-800/50 hover:border-slate-600"}`}>
                                    <input type="radio" name="paymentMode" value="partial" checked={paymentMode === "partial"} onChange={() => setPaymentMode("partial")} className="mt-1 accent-primary" />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="font-bold text-white">Pay ₹300 Now — Rest on Delivery</span>
                                            <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">Booking</span>
                                        </div>
                                        <p className="text-sm text-slate-400 mt-1">
                                            Secure your bat with just ₹{PARTIAL_AMOUNT}. Remaining <strong className="text-white">₹{remainingOnDelivery.toLocaleString("en-IN")}</strong> paid on delivery.
                                        </p>
                                    </div>
                                </label>

                                {/* Full payment */}
                                <label className={`flex items-start gap-4 p-5 rounded-xl border cursor-pointer transition-all ${paymentMode === "full" ? "border-primary bg-primary/8" : "border-slate-700 bg-slate-800/50 hover:border-slate-600"}`}>
                                    <input type="radio" name="paymentMode" value="full" checked={paymentMode === "full"} onChange={() => setPaymentMode("full")} className="mt-1 accent-primary" />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="font-bold text-white">Pay Full Amount — ₹{total.toLocaleString("en-IN")}</span>
                                            <span className="text-[10px] bg-green-500/20 text-green-300 border border-green-500/30 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">Instant Confirm</span>
                                        </div>
                                        <p className="text-sm text-slate-400 mt-1">Pay the full amount now via Razorpay. Order confirmed immediately after payment.</p>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {status === "error" && (
                            <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-sm">
                                <span className="material-symbols-outlined !text-[18px] shrink-0 mt-0.5">error</span>
                                {errorMessage}
                            </div>
                        )}

                        {/* Submit */}
                        <button disabled={status === "submitting"} type="submit"
                            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-amber-400 text-black font-black py-4 rounded-xl transition-all shadow-lg shadow-primary/20 text-base disabled:opacity-60 disabled:cursor-not-allowed">
                            {status === "submitting" ? (
                                <><span className="material-symbols-outlined animate-spin !text-[20px]">sync</span>Processing…</>
                            ) : paymentMode === "partial" ? (
                                <><span className="material-symbols-outlined !text-[20px]">lock</span>Confirm Booking — Pay ₹{PARTIAL_AMOUNT}</>
                            ) : (
                                <><span className="material-symbols-outlined !text-[20px]">lock</span>Pay ₹{total.toLocaleString("en-IN")} Now</>
                            )}
                        </button>

                        <p className="text-center text-xs text-slate-500">
                            🔒 Your information is safe and never shared with third parties.
                        </p>
                    </form>
                </div>

                {/* ── Right: Order Summary ── */}
                <div className="w-full lg:w-[380px] shrink-0">
                    <div className="rounded-2xl border border-white/10 bg-slate-900 overflow-hidden sticky top-6">
                        <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10 bg-white/[0.02]">
                            <span className="material-symbols-outlined !text-[20px] text-primary">receipt_long</span>
                            <h2 className="font-bold text-white">Order Summary</h2>
                        </div>
                        <div className="p-6 flex flex-col gap-5">
                            {/* Items */}
                            <div className="flex flex-col gap-4">
                                {items.map(item => (
                                    <div key={item.id} className="flex gap-3 items-start">
                                        <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-white/10 bg-slate-800 shrink-0">
                                            <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                                            <span className="absolute -top-1.5 -right-1.5 size-5 bg-primary text-black text-[10px] font-black flex items-center justify-center rounded-full">
                                                {item.quantity}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-white text-sm line-clamp-1">{item.name}</p>
                                            {item.size && <p className="text-xs text-slate-400 mt-0.5">{item.size}</p>}
                                        </div>
                                        <span className="font-bold text-white text-sm shrink-0">₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-white/10 pt-4 flex flex-col gap-2 text-sm">
                                <div className="flex justify-between text-slate-400">
                                    <span>Subtotal</span>
                                    <span className="text-white font-semibold">₹{total.toLocaleString("en-IN")}</span>
                                </div>
                                <div className="flex justify-between text-slate-400">
                                    <span>Shipping</span>
                                    <span className="text-green-400 font-bold">Free</span>
                                </div>
                            </div>

                            {/* Amount due — dynamic */}
                            <div className="border-t border-white/10 pt-4 flex flex-col gap-3">
                                {paymentMode === "partial" ? (
                                    <>
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-300 font-semibold">Pay Now (Booking)</span>
                                            <span className="text-2xl font-black text-primary">₹{PARTIAL_AMOUNT}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-slate-400">Remaining on Delivery</span>
                                            <span className="font-bold text-slate-300">₹{remainingOnDelivery.toLocaleString("en-IN")}</span>
                                        </div>
                                        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3 text-sm text-amber-200">
                                            Pay just ₹{PARTIAL_AMOUNT} to secure your bat. Rest on delivery.
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-300 font-semibold">Total Due Now</span>
                                        <span className="text-2xl font-black text-primary">₹{total.toLocaleString("en-IN")}</span>
                                    </div>
                                )}
                            </div>

                            {/* Trust badges */}
                            <div className="border-t border-white/10 pt-4 grid grid-cols-3 gap-2 text-center">
                                {[
                                    { icon: "verified_user", label: "Secure" },
                                    { icon: "support_agent", label: "Support" },
                                    { icon: "local_shipping", label: "Free Ship" },
                                ].map(b => (
                                    <div key={b.label} className="flex flex-col items-center gap-1 text-slate-400">
                                        <span className="material-symbols-outlined !text-[22px] text-slate-300">{b.icon}</span>
                                        <span className="text-xs font-medium">{b.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
