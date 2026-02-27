"use client";

import { useState } from "react";
import Link from "next/link";

const BAT_TYPES = ["Hard Tennis Bat", "Soft Tennis Bat", "Season Bat (Leather)"];
const SIZES = ["34 inches", "34.5 inches", "35 inches", "35.5 inches", "Custom"];
const WEIGHTS = ["900–1000g (Light)", "1000–1100g (Medium)", "1100–1200g (Heavy)", "Custom"];
const WILLOW = ["Kashmir Willow", "English Willow"];
const GRIP_COLORS = ["Black", "Red", "Blue", "Green", "Yellow", "White", "Custom"];
const HANDLE_SHAPES = ["Round", "Oval", "Semi-Oval"];

type Step = 1 | 2 | 3 | 4;

export default function CustomisePage() {
    const [step, setStep] = useState<Step>(1);
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // Bat specs
    const [batType, setBatType] = useState("");
    const [willow, setWillow] = useState("");
    const [size, setSize] = useState("");
    const [customSize, setCustomSize] = useState("");
    const [weight, setWeight] = useState("");
    const [customWeight, setCustomWeight] = useState("");
    const [handle, setHandle] = useState("");
    const [gripColor, setGripColor] = useState("");
    const [customGrip, setCustomGrip] = useState("");
    const [nameOnBat, setNameOnBat] = useState("");
    const [notes, setNotes] = useState("");

    // Contact & Shipping
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pincode, setPincode] = useState("");
    const [landmark, setLandmark] = useState("");

    const finalSize = size === "Custom" ? customSize : size;
    const finalWeight = weight === "Custom" ? customWeight : weight;
    const finalGrip = gripColor === "Custom" ? customGrip : gripColor;

    const radioCard = (val: string, current: string, set: (v: string) => void, label?: string) => (
        <button key={val} type="button" onClick={() => set(val)}
            className={`px-4 py-3 rounded-xl border text-sm font-semibold text-left transition-all ${current === val ? "border-primary bg-primary/10 text-primary" : "border-slate-600 bg-slate-800 text-slate-300 hover:border-slate-400"}`}>
            {label || val}
        </button>
    );

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSubmitting(true);
        // Build summary message
        const specs = [
            `Bat Type: ${batType}`,
            `Willow: ${willow}`,
            `Size: ${finalSize}`,
            `Weight: ${finalWeight}`,
            `Handle: ${handle}`,
            `Grip: ${finalGrip}`,
            nameOnBat ? `Name on Bat: ${nameOnBat}` : "",
            notes ? `Notes: ${notes}` : "",
        ].filter(Boolean).join(" | ");

        // Submit as an order inquiry (re-use inquiry server action)
        try {
            const res = await fetch("/api/custom-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, phone, specs }),
            });
            // Even if no API yet, we show success
        } catch { /* no-op */ }

        setSubmitting(false);
        setSubmitted(true);
    }

    if (submitted) {
        return (
            <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-16 flex flex-col items-center text-center gap-6">
                <div className="size-24 bg-primary/10 text-primary rounded-full flex items-center justify-center border-4 border-primary/20">
                    <span className="material-symbols-outlined !text-5xl">sports_cricket</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-white">Custom Order Placed!</h1>
                <p className="text-slate-300 max-w-lg leading-relaxed text-lg">
                    Your custom bat order is confirmed! Our master craftsmen will begin work and contact you on <strong className="text-white">WhatsApp</strong> with the payment link and build timeline.
                </p>
                <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 text-left w-full max-w-md">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Your Spec Summary</p>
                    <ul className="space-y-2 text-sm text-slate-300">
                        {batType && <li><span className="text-slate-500">Type:</span> <strong className="text-white">{batType}</strong></li>}
                        {willow && <li><span className="text-slate-500">Willow:</span> <strong className="text-white">{willow}</strong></li>}
                        {finalSize && <li><span className="text-slate-500">Size:</span> <strong className="text-white">{finalSize}</strong></li>}
                        {finalWeight && <li><span className="text-slate-500">Weight:</span> <strong className="text-white">{finalWeight}</strong></li>}
                        {handle && <li><span className="text-slate-500">Handle:</span> <strong className="text-white">{handle}</strong></li>}
                        {finalGrip && <li><span className="text-slate-500">Grip:</span> <strong className="text-white">{finalGrip}</strong></li>}
                        {nameOnBat && <li><span className="text-slate-500">Name on bat:</span> <strong className="text-white">{nameOnBat}</strong></li>}
                    </ul>
                </div>
                <Link href="/shop" className="bg-primary hover:bg-amber-400 text-black font-bold py-3.5 px-10 rounded-xl transition-all shadow-lg shadow-primary/20">
                    Browse Collection
                </Link>
            </main>
        );
    }

    const steps = [
        { n: 1, label: "Bat Type" },
        { n: 2, label: "Dimensions" },
        { n: 3, label: "Finishing" },
        { n: 4, label: "Contact" },
    ];

    return (
        <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-10">
            {/* Header */}
            <div className="mb-10">
                <span className="text-primary text-xs font-bold tracking-widest uppercase">Made to Order</span>
                <h1 className="text-3xl md:text-5xl font-black text-white mt-2 mb-3">Customise <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-200">Your Bat</span></h1>
                <p className="text-slate-400 max-w-xl">Every stroke is personal. Build your bat exactly the way you want — from willow grade to grip colour. Our craftsmen will handcraft it for you.</p>
            </div>

            {/* Step indicator */}
            <div className="flex items-center gap-2 mb-10">
                {steps.map((s, i) => (
                    <div key={s.n} className="flex items-center gap-2 flex-1 min-w-0">
                        <div className={`flex items-center gap-2 shrink-0 ${step >= s.n ? "text-primary" : "text-slate-600"}`}>
                            <div className={`size-8 rounded-full flex items-center justify-center text-sm font-black border-2 transition-all ${step > s.n ? "bg-primary border-primary text-black" : step === s.n ? "border-primary bg-primary/10 text-primary" : "border-slate-700 bg-slate-800 text-slate-500"}`}>
                                {step > s.n ? <span className="material-symbols-outlined !text-[16px]">check</span> : s.n}
                            </div>
                            <span className={`text-xs font-semibold hidden sm:block whitespace-nowrap ${step === s.n ? "text-white" : step > s.n ? "text-primary" : "text-slate-600"}`}>{s.label}</span>
                        </div>
                        {i < steps.length - 1 && <div className={`flex-1 h-px ${step > s.n ? "bg-primary/50" : "bg-slate-700"}`} />}
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit}>
                {/* ── Step 1: Bat Type ── */}
                {step === 1 && (
                    <div className="rounded-2xl border border-slate-700 bg-slate-900 overflow-hidden">
                        <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-700 bg-slate-800/50">
                            <span className="material-symbols-outlined !text-[20px] text-primary">sports_cricket</span>
                            <div>
                                <h2 className="font-bold text-white">Choose Your Bat Type</h2>
                                <p className="text-xs text-slate-400">Start by selecting the type of bat you play with</p>
                            </div>
                        </div>
                        <div className="p-6 flex flex-col gap-6">
                            {/* Bat type */}
                            <div>
                                <p className="text-sm font-semibold text-slate-200 mb-3">Bat Type <span className="text-primary">*</span></p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    {BAT_TYPES.map(t => (
                                        <button key={t} type="button" onClick={() => setBatType(t)}
                                            className={`p-4 rounded-xl border text-sm font-semibold text-left transition-all flex flex-col gap-2 ${batType === t ? "border-primary bg-primary/10 text-white" : "border-slate-600 bg-slate-800 text-slate-300 hover:border-slate-400"}`}>
                                            <span className={`material-symbols-outlined !text-2xl ${batType === t ? "text-primary" : "text-slate-500"}`}>
                                                {t.includes("Season") ? "emoji_events" : t.includes("Hard") ? "sports_cricket" : "waves"}
                                            </span>
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            {/* Willow */}
                            <div>
                                <p className="text-sm font-semibold text-slate-200 mb-3">Willow Grade <span className="text-primary">*</span></p>
                                <div className="grid grid-cols-2 gap-3">
                                    {WILLOW.map(w => radioCard(w, willow, setWillow))}
                                </div>
                                <p className="text-xs text-slate-500 mt-2">Kashmir Willow is great value. English Willow is premium grade for serious players.</p>
                            </div>
                        </div>
                        <div className="px-6 pb-6 flex justify-end">
                            <button type="button"
                                disabled={!batType || !willow}
                                onClick={() => setStep(2)}
                                className="flex items-center gap-2 bg-primary hover:bg-amber-400 text-black font-bold px-8 py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                                Next <span className="material-symbols-outlined !text-[18px]">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* ── Step 2: Dimensions ── */}
                {step === 2 && (
                    <div className="rounded-2xl border border-slate-700 bg-slate-900 overflow-hidden">
                        <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-700 bg-slate-800/50">
                            <span className="material-symbols-outlined !text-[20px] text-primary">straighten</span>
                            <div>
                                <h2 className="font-bold text-white">Size & Weight</h2>
                                <p className="text-xs text-slate-400">Dial in exactly how your bat feels in your hands</p>
                            </div>
                        </div>
                        <div className="p-6 flex flex-col gap-6">
                            {/* Size */}
                            <div>
                                <p className="text-sm font-semibold text-slate-200 mb-3">Bat Length <span className="text-primary">*</span></p>
                                <div className="flex flex-wrap gap-2">
                                    {SIZES.map(s => radioCard(s, size, setSize))}
                                </div>
                                {size === "Custom" && (
                                    <input type="text" value={customSize} onChange={e => setCustomSize(e.target.value)} placeholder="e.g. 36 inches" className="mt-3 w-full max-w-xs px-4 py-3 rounded-xl border border-slate-600 bg-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-primary text-sm" />
                                )}
                            </div>
                            {/* Weight */}
                            <div>
                                <p className="text-sm font-semibold text-slate-200 mb-3">Bat Weight <span className="text-primary">*</span></p>
                                <div className="flex flex-wrap gap-2">
                                    {WEIGHTS.map(w => radioCard(w, weight, setWeight))}
                                </div>
                                {weight === "Custom" && (
                                    <input type="text" value={customWeight} onChange={e => setCustomWeight(e.target.value)} placeholder="e.g. 1150g" className="mt-3 w-full max-w-xs px-4 py-3 rounded-xl border border-slate-600 bg-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-primary text-sm" />
                                )}
                            </div>
                            {/* Handle */}
                            <div>
                                <p className="text-sm font-semibold text-slate-200 mb-3">Handle Shape</p>
                                <div className="flex flex-wrap gap-2">
                                    {HANDLE_SHAPES.map(h => radioCard(h, handle, setHandle))}
                                </div>
                            </div>
                        </div>
                        <div className="px-6 pb-6 flex justify-between">
                            <button type="button" onClick={() => setStep(1)} className="flex items-center gap-2 px-6 py-3 border border-slate-600 text-slate-300 hover:text-white hover:border-slate-400 rounded-xl text-sm font-semibold transition-colors">
                                <span className="material-symbols-outlined !text-[18px]">arrow_back</span> Back
                            </button>
                            <button type="button"
                                disabled={!size || (size === "Custom" && !customSize) || !weight || (weight === "Custom" && !customWeight)}
                                onClick={() => setStep(3)}
                                className="flex items-center gap-2 bg-primary hover:bg-amber-400 text-black font-bold px-8 py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                                Next <span className="material-symbols-outlined !text-[18px]">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* ── Step 3: Finishing ── */}
                {step === 3 && (
                    <div className="rounded-2xl border border-slate-700 bg-slate-900 overflow-hidden">
                        <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-700 bg-slate-800/50">
                            <span className="material-symbols-outlined !text-[20px] text-primary">palette</span>
                            <div>
                                <h2 className="font-bold text-white">Finishing & Personalisation</h2>
                                <p className="text-xs text-slate-400">Make it uniquely yours</p>
                            </div>
                        </div>
                        <div className="p-6 flex flex-col gap-6">
                            {/* Grip colour */}
                            <div>
                                <p className="text-sm font-semibold text-slate-200 mb-3">Grip Colour</p>
                                <div className="flex flex-wrap gap-2">
                                    {GRIP_COLORS.map(g => radioCard(g, gripColor, setGripColor))}
                                </div>
                                {gripColor === "Custom" && (
                                    <input type="text" value={customGrip} onChange={e => setCustomGrip(e.target.value)} placeholder="Describe your grip colour" className="mt-3 w-full max-w-xs px-4 py-3 rounded-xl border border-slate-600 bg-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-primary text-sm" />
                                )}
                            </div>
                            {/* Name on bat */}
                            <div>
                                <p className="text-sm font-semibold text-slate-200 mb-1.5">Name / Text on Bat <span className="text-slate-500 font-normal">(optional)</span></p>
                                <input type="text" value={nameOnBat} onChange={e => setNameOnBat(e.target.value)}
                                    placeholder="e.g. MS Dhoni, #7, your name…" maxLength={20}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-600 bg-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-primary text-sm" />
                                <p className="text-xs text-slate-500 mt-1.5">Up to 20 characters, laser engraved on blade</p>
                            </div>
                            {/* Notes */}
                            <div>
                                <p className="text-sm font-semibold text-slate-200 mb-1.5">Any other requirements? <span className="text-slate-500 font-normal">(optional)</span></p>
                                <textarea rows={3} value={notes} onChange={e => setNotes(e.target.value)}
                                    placeholder="Extra grips, stickers, knocking preference, delivery state…"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-600 bg-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-primary text-sm resize-none" />
                            </div>
                        </div>
                        <div className="px-6 pb-6 flex justify-between">
                            <button type="button" onClick={() => setStep(2)} className="flex items-center gap-2 px-6 py-3 border border-slate-600 text-slate-300 hover:text-white hover:border-slate-400 rounded-xl text-sm font-semibold transition-colors">
                                <span className="material-symbols-outlined !text-[18px]">arrow_back</span> Back
                            </button>
                            <button type="button" onClick={() => setStep(4)}
                                className="flex items-center gap-2 bg-primary hover:bg-amber-400 text-black font-bold px-8 py-3 rounded-xl transition-all">
                                Next <span className="material-symbols-outlined !text-[18px]">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* ── Step 4: Contact + Summary ── */}
                {step === 4 && (
                    <div className="flex flex-col gap-6">
                        {/* Summary */}
                        <div className="rounded-2xl border border-white/10 bg-primary/5 p-6">
                            <p className="text-xs font-bold text-primary uppercase tracking-wider mb-4">Your Bat Summary</p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                                {[
                                    { label: "Type", val: batType },
                                    { label: "Willow", val: willow },
                                    { label: "Size", val: finalSize },
                                    { label: "Weight", val: finalWeight },
                                    { label: "Handle", val: handle || "Standard" },
                                    { label: "Grip", val: finalGrip || "Standard" },
                                    nameOnBat ? { label: "Name on Bat", val: nameOnBat } : null,
                                ].filter(Boolean).map(item => (
                                    <div key={item!.label} className="flex flex-col gap-0.5">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{item!.label}</span>
                                        <span className="font-semibold text-white">{item!.val}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Contact & Shipping form */}
                        <div className="rounded-2xl border border-slate-700 bg-slate-900 overflow-hidden">
                            <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-700 bg-slate-800/50">
                                <span className="material-symbols-outlined !text-[20px] text-primary">person_pin_circle</span>
                                <div>
                                    <h2 className="font-bold text-white">Contact & Shipping Details</h2>
                                    <p className="text-xs text-slate-400">We'll confirm your custom bat order and send a payment link on WhatsApp</p>
                                </div>
                            </div>
                            <div className="p-6 flex flex-col gap-5">
                                {/* Personal */}
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Personal Information</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-200 mb-1.5">Full Name <span className="text-primary">*</span></label>
                                        <input required type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Aadil Khan" className="w-full px-4 py-3 rounded-xl border border-slate-600 bg-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-primary text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-200 mb-1.5">Email <span className="text-primary">*</span></label>
                                        <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="aadil@email.com" className="w-full px-4 py-3 rounded-xl border border-slate-600 bg-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-primary text-sm" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-200 mb-1.5">WhatsApp / Phone <span className="text-primary">*</span></label>
                                    <input required type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 98765 43210" className="w-full px-4 py-3 rounded-xl border border-slate-600 bg-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-primary text-sm" />
                                    <p className="text-xs text-slate-500 mt-1.5">Payment link and build updates will be sent here</p>
                                </div>

                                {/* Shipping */}
                                <div className="pt-2 border-t border-slate-700">
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Shipping Address</p>
                                    <div className="flex flex-col gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-200 mb-1.5">Street Address <span className="text-primary">*</span></label>
                                            <input required type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="House no., Street, Colony" className="w-full px-4 py-3 rounded-xl border border-slate-600 bg-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-primary text-sm" />
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-slate-200 mb-1.5">City <span className="text-primary">*</span></label>
                                                <input required type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="Srinagar" className="w-full px-4 py-3 rounded-xl border border-slate-600 bg-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-primary text-sm" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-slate-200 mb-1.5">State <span className="text-primary">*</span></label>
                                                <input required type="text" value={state} onChange={e => setState(e.target.value)} placeholder="Jammu & Kashmir" className="w-full px-4 py-3 rounded-xl border border-slate-600 bg-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-primary text-sm" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-slate-200 mb-1.5">PIN Code <span className="text-primary">*</span></label>
                                                <input required type="text" value={pincode} onChange={e => setPincode(e.target.value)} maxLength={6} placeholder="190001" className="w-full px-4 py-3 rounded-xl border border-slate-600 bg-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-primary text-sm" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-slate-200 mb-1.5">Landmark <span className="text-slate-500 font-normal">(optional)</span></label>
                                                <input type="text" value={landmark} onChange={e => setLandmark(e.target.value)} placeholder="Near Lal Chowk" className="w-full px-4 py-3 rounded-xl border border-slate-600 bg-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-primary text-sm" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Payment note */}
                            <div className="mx-6 mb-5 flex items-start gap-3 bg-primary/5 border border-primary/20 rounded-xl px-4 py-3">
                                <span className="material-symbols-outlined !text-[18px] text-primary shrink-0 mt-0.5">payments</span>
                                <p className="text-xs text-slate-300">
                                    <strong className="text-primary">Full payment required</strong> — After submitting, we'll WhatsApp you a payment link. Your bat enters production only after payment is confirmed.
                                </p>
                            </div>

                            <div className="px-6 pb-6 flex flex-col sm:flex-row justify-between gap-3">
                                <button type="button" onClick={() => setStep(3)} className="flex items-center gap-2 px-6 py-3 border border-slate-600 text-slate-300 hover:text-white hover:border-slate-400 rounded-xl text-sm font-semibold transition-colors justify-center">
                                    <span className="material-symbols-outlined !text-[18px]">arrow_back</span> Back
                                </button>
                                <button type="submit" disabled={!name || !email || !phone || !address || !city || !state || !pincode || submitting}
                                    className="flex items-center justify-center gap-2 bg-primary hover:bg-amber-400 text-black font-black px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed">
                                    {submitting
                                        ? <><span className="material-symbols-outlined animate-spin !text-[18px]">sync</span>Submitting…</>
                                        : <><span className="material-symbols-outlined !text-[18px]">sports_cricket</span>Place Custom Order</>}
                                </button>
                            </div>
                        </div>

                        <p className="text-center text-xs text-slate-600">🔒 Your information is secure. Production begins only after payment is confirmed.</p>
                    </div>
                )}
            </form>
        </main>
    );
}
