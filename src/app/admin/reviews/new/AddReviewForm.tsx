"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addManualReview } from "@/actions/review";

type ProductBasics = { id: string; name: string; slug: string };

const inp = "w-full px-4 py-3 rounded-xl border border-slate-600 bg-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-sm";
const sel = "w-full px-4 py-3 rounded-xl border border-slate-600 bg-slate-800 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-sm";
const lbl = "block text-sm font-semibold text-slate-200 mb-1.5";

export default function AddReviewForm({ products }: { products: ProductBasics[] }) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const [productId, setProductId] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [dateStr, setDateStr] = useState(""); // YYYY-MM-DD

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");
        setIsSubmitting(true);

        const prod = products.find(p => p.id === productId);
        if (!prod) {
            setErrorMsg("Please select a valid product.");
            setIsSubmitting(false);
            return;
        }

        let createdAtDate: Date | undefined;
        if (dateStr) {
            createdAtDate = new Date(dateStr);
        }

        const res = await addManualReview({
            productId: prod.id,
            productSlug: prod.slug,
            authorName,
            rating,
            comment,
            createdAt: createdAtDate
        });

        if (res.success) {
            router.push("/admin/reviews");
        } else {
            setErrorMsg(res.error || "Failed to add review.");
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-slate-900 border border-slate-700 rounded-2xl p-6 md:p-8">
            {errorMsg && (
                <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                    <span className="material-symbols-outlined !text-[18px] shrink-0 mt-0.5">error</span>
                    {errorMsg}
                </div>
            )}

            <div>
                <label className={lbl}>Product <span className="text-primary">*</span></label>
                <select required value={productId} onChange={e => setProductId(e.target.value)} className={sel}>
                    <option value="" disabled>-- Select a product --</option>
                    {products.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className={lbl}>Author Name <span className="text-primary">*</span></label>
                    <input required type="text" placeholder="e.g. John Doe" value={authorName} onChange={e => setAuthorName(e.target.value)} className={inp} />
                </div>
                <div>
                    <label className={lbl}>Review Date <span className="text-slate-500 font-normal normal-case">— optional</span></label>
                    <input type="date" value={dateStr} onChange={e => setDateStr(e.target.value)} className={inp} />
                </div>
            </div>

            <div>
                <label className={lbl}>Rating <span className="text-primary">*</span></label>
                <div className="flex items-center gap-2 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className="p-1 hover:scale-110 transition-transform focus:outline-none"
                        >
                            <span
                                className={`material-symbols-outlined text-3xl ${star <= rating ? "text-yellow-400" : "text-slate-600"}`}
                                style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                                star
                            </span>
                        </button>
                    ))}
                    <span className="ml-2 text-slate-400 font-medium">({rating}/5)</span>
                </div>
            </div>

            <div>
                <label className={lbl}>Comment <span className="text-primary">*</span></label>
                <textarea required rows={5} placeholder="Write the review content..." value={comment} onChange={e => setComment(e.target.value)} className={`${inp} resize-y`} />
            </div>

            <div className="flex justify-end gap-3 mt-4 pt-6 border-t border-slate-700">
                <button type="button" onClick={() => router.push("/admin/reviews")} className="px-5 py-2.5 rounded-xl border border-slate-600 text-slate-300 hover:text-white hover:border-slate-400 text-sm font-semibold transition-colors">
                    Cancel
                </button>
                <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-amber-400 text-black font-bold rounded-xl text-sm transition-all shadow-lg shadow-primary/20 disabled:opacity-60 disabled:cursor-not-allowed">
                    {isSubmitting ? (
                        <><span className="material-symbols-outlined animate-spin !text-[18px]">sync</span>Saving...</>
                    ) : (
                        <><span className="material-symbols-outlined !text-[18px]">add_circle</span>Add Review</>
                    )}
                </button>
            </div>
        </form>
    );
}
