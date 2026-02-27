"use client";

import { useState, useEffect } from "react";
import { submitInquiry } from "@/actions/inquiry";

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!;

export default function Contact() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    // Load reCAPTCHA v3 script
    useEffect(() => {
        const script = document.createElement("script");
        script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
        script.async = true;
        document.head.appendChild(script);
        return () => { document.head.removeChild(script); };
    }, []);

    async function handleSubmit(formData: FormData) {
        setStatus("submitting");
        try {
            // Get invisible reCAPTCHA token
            const token = await (window as any).grecaptcha.execute(SITE_KEY, { action: "contact" });
            formData.append("recaptchaToken", token);
        } catch {
            setStatus("error");
            setErrorMessage("Security check failed. Please refresh the page and try again.");
            return;
        }
        const result = await submitInquiry(formData);
        if (result.success) {
            setStatus("success");
        } else {
            setStatus("error");
            setErrorMessage(result.error || "Something went wrong.");
        }
    }

    return (
        <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12">
            {/* Hero Section */}
            <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tight mb-4">Contact &amp; Support</h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
                    We're here to help you choose the perfect Kashmir Willow bat. Reach out for custom orders, shipping updates, or technical advice.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Contact Form Column */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white dark:bg-background-dark/50 p-8 rounded-xl border border-primary/5 shadow-sm">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">mail</span>
                            Send us a message
                        </h3>
                        <form action={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
                                    <input name="name" required className="rounded-lg border-primary/20 bg-background-light dark:bg-background-dark/20 focus:border-primary focus:ring-primary w-full p-3 transition-all" placeholder="John Doe" type="text" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
                                    <input name="email" required className="rounded-lg border-primary/20 bg-background-light dark:bg-background-dark/20 focus:border-primary focus:ring-primary w-full p-3 transition-all" placeholder="john@example.com" type="email" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Subject</label>
                                <select name="subject" required className="rounded-lg border-primary/20 bg-background-light dark:bg-background-dark/20 focus:border-primary focus:ring-primary w-full p-3 transition-all">
                                    <option value="General Inquiry">General Inquiry</option>
                                    <option value="Order Status">Order Status</option>
                                    <option value="Custom Bat Customization">Custom Bat Customization</option>
                                    <option value="Wholesale/Bulk Orders">Wholesale/Bulk Orders</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Your Message</label>
                                <textarea name="message" required className="rounded-lg border-primary/20 bg-background-light dark:bg-background-dark/20 focus:border-primary focus:ring-primary w-full p-3 transition-all" placeholder="Tell us how we can help..." rows={5}></textarea>
                            </div>

                            {status === "success" && (
                                <div className="p-4 bg-green-50 text-green-600 rounded-lg text-sm font-medium border border-green-200">Message sent successfully! We will get back to you soon.</div>
                            )}
                            {status === "error" && (
                                <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-200">{errorMessage}</div>
                            )}

                            <button disabled={status === "submitting"} className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed" type="submit">
                                <span className="material-symbols-outlined">{status === "submitting" ? "hourglass_empty" : "send"}</span>
                                {status === "submitting" ? "Sending..." : "Send Message"}
                            </button>
                        </form>
                    </div>

                    {/* FAQ Section */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">Frequently Asked Questions</h3>
                        <div className="space-y-3">
                            <details className="group bg-white dark:bg-background-dark/50 border border-primary/10 rounded-xl overflow-hidden shadow-sm">
                                <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-primary/5 transition-all list-none">
                                    <span className="font-medium">How long does shipping take?</span>
                                    <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
                                </summary>
                                <div className="p-4 pt-0 text-slate-600 dark:text-slate-400 text-sm">
                                    Typically, our bats reach customers within 7-10 business days for international orders and 3-5 days within India.
                                </div>
                            </details>

                            <details className="group bg-white dark:bg-background-dark/50 border border-primary/10 rounded-xl overflow-hidden shadow-sm">
                                <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-primary/5 transition-all list-none">
                                    <span className="font-medium">Are these bats genuine Kashmir Willow?</span>
                                    <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
                                </summary>
                                <div className="p-4 pt-0 text-slate-600 dark:text-slate-400 text-sm">
                                    Yes, 100%. We source our willow directly from sustainable plantations in the Kashmir valley and process it in our own facility.
                                </div>
                            </details>

                            <details className="group bg-white dark:bg-background-dark/50 border border-primary/10 rounded-xl overflow-hidden shadow-sm">
                                <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-primary/5 transition-all list-none">
                                    <span className="font-medium">Can I customize my bat's weight?</span>
                                    <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
                                </summary>
                                <div className="p-4 pt-0 text-slate-600 dark:text-slate-400 text-sm">
                                    Absolutely. Use the contact form to specify your required weight and handle type. Our craftsmen will match your needs.
                                </div>
                            </details>
                        </div>
                    </div>
                </div>

                {/* Contact Info & Map Column */}
                <div className="space-y-8">
                    {/* WhatsApp Integration */}
                    <div className="bg-green-500/10 border border-green-500/20 p-6 rounded-xl flex flex-col items-center text-center gap-4">
                        <div className="size-14 bg-green-500 text-white rounded-full flex items-center justify-center text-3xl">
                            <span className="material-symbols-outlined fill-1">chat</span>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100">WhatsApp Support</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Instant help from our experts</p>
                        </div>
                        <a className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition-all w-full flex items-center justify-center gap-2" href="#">
                            Chat on WhatsApp
                        </a>
                    </div>

                    {/* Map/Location */}
                    <div className="bg-white dark:bg-background-dark/50 rounded-xl border border-primary/10 overflow-hidden shadow-sm">
                        <div className="h-64 bg-slate-200 dark:bg-slate-800 relative">
                            <img
                                className="w-full h-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6AXfzANdHCchT-jtkA7Hoi96URNTnoojkPpc_OU8HjmdpZXNCLowUhUBYSZmjfR8WeiKIOWxBp6U-tsnCaLAPhRs_f8lGOeTXJIf5g0SoCOZqGkgX40z8zWcIbTf-GPTMKTq8W9pRbZ-3PX0xp6QJ1mK6PG-7CYfMo1ZRsPOfeoYNr9l_Iy1fJ3PmDHYTe6UTsSJgEaRi6wmjtKUbLjBNn0gVlBg9Dw4BSDm7saSFPJe2EhAf8kBthybii7vExn9mCcP30wFsMBv6"
                                alt="Map showing Kashmir workshop location"
                            />
                            <div className="absolute inset-0 bg-primary/10"></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <span className="material-symbols-outlined text-primary text-5xl drop-shadow-lg">location_on</span>
                            </div>
                        </div>
                        <div className="p-6">
                            <h4 className="font-bold text-lg mb-2">Our Workshop</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                                Industrial Area, Anantnag,<br />
                                Jammu &amp; Kashmir, 192101<br />
                                India
                            </p>
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                                    <span className="material-symbols-outlined text-primary text-lg">call</span>
                                    +91 98765 43210
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                                    <span className="material-symbols-outlined text-primary text-lg">schedule</span>
                                    Mon - Sat: 9AM - 6PM
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Social Presence */}
                    <div className="flex justify-center gap-4">
                        <a className="size-10 rounded-full bg-primary/5 hover:bg-primary hover:text-white flex items-center justify-center transition-all text-primary border border-primary/10" href="#">
                            <span className="material-symbols-outlined">social_leaderboard</span>
                        </a>
                        <a className="size-10 rounded-full bg-primary/5 hover:bg-primary hover:text-white flex items-center justify-center transition-all text-primary border border-primary/10" href="#">
                            <span className="material-symbols-outlined">photo_camera</span>
                        </a>
                        <a className="size-10 rounded-full bg-primary/5 hover:bg-primary hover:text-white flex items-center justify-center transition-all text-primary border border-primary/10" href="#">
                            <span className="material-symbols-outlined">play_circle</span>
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}
