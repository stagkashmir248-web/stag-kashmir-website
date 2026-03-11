"use client";

import { useState } from "react";
import { saveWhatsAppLead } from "@/actions/whatsapp";

export default function WhatsAppButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !phone) {
            setError("Both fields are required");
            return;
        }
        setLoading(true);
        setError("");

        try {
            await saveWhatsAppLead(name, phone);
        } catch (err) {
            console.error(err);
        }

        setLoading(false);
        setIsOpen(false);
        setName("");
        setPhone("");

        // Open WhatsApp chat
        const message = encodeURIComponent(`Hi Stag Kashmir team! I'm ${name}.`);
        window.open(`https://wa.me/919469886630?text=${message}`, "_blank");
    }

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-transform hover:scale-110"
                aria-label="Chat with us on WhatsApp"
            >
                <img
                    src="/whatsappicon.png"
                    alt="WhatsApp"
                    width={32}
                    height={32}
                    className="object-contain"
                />
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 transition-opacity">
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-200">
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>

                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-2">
                                <img src="/whatsappicon.png" alt="WhatsApp" className="w-8 h-8 object-contain" />
                                <h3 className="text-xl font-bold text-white">Chat with us</h3>
                            </div>
                            <p className="text-sm text-slate-400 mb-6 font-medium">Please enter your details to continue to WhatsApp.</p>

                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-200 mb-1.5">Full Name <span className="text-primary">*</span></label>
                                    <input 
                                        type="text" 
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        autoFocus
                                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-green-500 transition-colors"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-200 mb-1.5">WhatsApp Number <span className="text-primary">*</span></label>
                                    <input 
                                        type="tel" 
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-green-500 transition-colors"
                                        placeholder="Enter your number"
                                    />
                                </div>

                                {error && <p className="text-red-400 text-xs font-semibold">{error}</p>}

                                <button 
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-green-500 hover:bg-green-600 active:bg-green-700 disabled:opacity-50 text-white font-bold py-3.5 rounded-lg transition-all flex items-center justify-center gap-2 mt-2"
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            Start Chat <span className="material-symbols-outlined !text-[18px]">send</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
