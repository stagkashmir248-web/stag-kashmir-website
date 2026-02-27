"use client";

import { useState, useEffect } from "react";
import { subscribeNewsletter } from "@/actions/newsletter";

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!;

export default function NewsletterForm() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [error, setError] = useState("");

    useEffect(() => {
        // Only inject script once (contact page may have already done it)
        if (document.querySelector(`script[src*="recaptcha"]`)) return;
        const s = document.createElement("script");
        s.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
        s.async = true;
        document.head.appendChild(s);
    }, []);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("loading");
        setError("");
        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            const token = await (window as any).grecaptcha.execute(SITE_KEY, { action: "newsletter" });
            formData.append("recaptchaToken", token);
        } catch {
            setStatus("error");
            setError("Security check failed. Please refresh and try again.");
            return;
        }

        const result = await subscribeNewsletter(formData);
        if (result.success) {
            setStatus("success");
            form.reset();
        } else {
            setStatus("error");
            setError(result.error ?? "Something went wrong.");
        }
    }

    if (status === "success") {
        return (
            <div className="flex flex-col items-center gap-3 py-4">
                <span className="material-symbols-outlined text-primary !text-[48px]">check_circle</span>
                <p className="text-white font-bold text-lg">You're in! 🎉</p>
                <p className="text-slate-300 text-sm">We'll keep you in the loop on drops and exclusive deals.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col md:flex-row gap-4 justify-center items-stretch max-w-lg mx-auto">
                <input
                    name="email"
                    required
                    type="email"
                    className="flex-1 bg-white/10 border border-white/20 text-white placeholder-slate-400 rounded-lg px-6 py-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    placeholder="Enter your email address"
                    disabled={status === "loading"}
                />
                <button
                    type="submit"
                    disabled={status === "loading"}
                    className="bg-primary hover:bg-primary-dark text-background-dark font-bold px-8 py-4 rounded-lg transition-colors whitespace-nowrap disabled:opacity-60 flex items-center gap-2"
                >
                    {status === "loading"
                        ? <><span className="material-symbols-outlined animate-spin !text-[18px]">sync</span> Subscribing…</>
                        : "Subscribe Now"
                    }
                </button>
            </div>
            {error && <p className="text-red-400 text-sm text-center mt-1">{error}</p>}
            <p className="text-slate-500 text-xs text-center mt-1">
                Protected by reCAPTCHA · <a href="https://policies.google.com/privacy" target="_blank" className="underline hover:text-slate-400">Privacy</a> · <a href="https://policies.google.com/terms" target="_blank" className="underline hover:text-slate-400">Terms</a>
            </p>
        </form>
    );
}
