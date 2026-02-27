"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { signIn } from "next-auth/react";
import { submitReview } from "@/actions/review";

interface Review {
    id: string;
    authorName: string;
    rating: number;
    comment: string;
    createdAt: Date | string;
}

interface Props {
    productId: string;
    productSlug: string;
    reviews: Review[];
    user: { name?: string | null; email?: string | null; image?: string | null } | null;
}

function Stars({ rating, interactive = false, size = 18, onSelect }: {
    rating: number; interactive?: boolean; size?: number; onSelect?: (r: number) => void;
}) {
    const [hover, setHover] = useState(0);
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map(i => (
                <button key={i} type="button" disabled={!interactive}
                    onClick={() => onSelect?.(i)}
                    onMouseEnter={() => interactive && setHover(i)}
                    onMouseLeave={() => interactive && setHover(0)}
                    className={interactive ? "cursor-pointer" : "cursor-default"}>
                    <span className={`material-symbols-outlined !text-[${size}px] transition-colors ${(hover || rating) >= i ? "text-primary" : "text-white/15"}`}
                        style={{ fontVariationSettings: "'FILL' 1", fontSize: `${size}px` }}>star</span>
                </button>
            ))}
        </div>
    );
}

function RatingBar({ label, count, total }: { label: string; count: number; total: number }) {
    const pct = total > 0 ? (count / total) * 100 : 0;
    return (
        <div className="flex items-center gap-2.5 text-sm">
            <span className="text-slate-400 w-3 text-right shrink-0">{label}</span>
            <span className="material-symbols-outlined !text-[13px] text-primary shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            <div className="flex-1 h-1 bg-white/8 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
            </div>
            <span className="text-slate-600 w-4 text-right shrink-0 text-xs">{count}</span>
        </div>
    );
}

function ReviewCard({ review }: { review: Review }) {
    return (
        <div className="relative flex flex-col justify-between gap-5 p-6 rounded-2xl bg-white/[0.04] border border-white/8 hover:border-primary/30 hover:bg-white/[0.06] transition-all duration-300 h-full w-[300px] md:w-[340px] shrink-0">
            <span className="absolute top-4 right-5 text-6xl font-serif text-primary/10 leading-none select-none pointer-events-none">"</span>
            <Stars rating={review.rating} size={16} />
            <p className="text-slate-300 text-sm leading-relaxed flex-1 line-clamp-5">"{review.comment}"</p>
            <div className="flex items-center gap-3 pt-4 border-t border-white/8">
                <div className="size-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                    {review.authorName.charAt(0).toUpperCase()}
                </div>
                <div>
                    <p className="text-white font-semibold text-sm">{review.authorName}</p>
                    <p className="text-slate-500 text-xs">{new Date(review.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
                <span className="ml-auto inline-flex items-center gap-1 text-xs text-green-400/70 font-medium shrink-0">
                    <span className="material-symbols-outlined !text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                    Verified
                </span>
            </div>
        </div>
    );
}

export default function ProductReviews({ productId, productSlug, reviews, user }: Props) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [showForm, setShowForm] = useState(false);

    // Carousel
    const trackRef = useRef<HTMLDivElement>(null);
    const [activeIdx, setActiveIdx] = useState(0);
    const isPaused = useRef(false);

    const scrollTo = useCallback((idx: number) => {
        const track = trackRef.current;
        if (!track || reviews.length === 0) return;
        const clamped = (idx + reviews.length) % reviews.length;
        setActiveIdx(clamped);
        const card = track.children[clamped] as HTMLElement;
        if (card) {
            track.scrollTo({ left: card.offsetLeft - 16, behavior: "smooth" });
        }
    }, [reviews.length]);

    // Auto-scroll every 4s
    useEffect(() => {
        if (reviews.length <= 1) return;
        const interval = setInterval(() => {
            if (!isPaused.current) {
                setActiveIdx(prev => {
                    const next = (prev + 1) % reviews.length;
                    const track = trackRef.current;
                    if (track) {
                        const card = track.children[next] as HTMLElement;
                        if (card) track.scrollTo({ left: card.offsetLeft - 16, behavior: "smooth" });
                    }
                    return next;
                });
            }
        }, 4000);
        return () => clearInterval(interval);
    }, [reviews.length]);

    const avg = reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;
    const counts = [5, 4, 3, 2, 1].map(n => ({ label: n, count: reviews.filter(r => r.rating === n).length }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0) { setError("Please select a star rating."); return; }
        if (!user?.name) return;
        setSubmitting(true); setError("");
        const res = await submitReview({ productId, productSlug, authorName: user.name, rating, comment });
        setSubmitting(false);
        if (res.success) { setSubmitted(true); setComment(""); setRating(0); setShowForm(false); }
        else setError(res.error || "Something went wrong.");
    };

    return (
        <div className="mt-20 lg:col-span-12">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2">Customer Reviews</p>
                    <h2 className="text-3xl font-bold text-white">
                        What our <span className="text-primary italic">players</span> say
                    </h2>
                    {reviews.length > 0 && (
                        <div className="flex items-center gap-3 mt-2">
                            <Stars rating={Math.round(avg)} size={18} />
                            <span className="text-slate-400 text-sm">{avg.toFixed(1)} out of 5 · {reviews.length} {reviews.length === 1 ? "review" : "reviews"}</span>
                        </div>
                    )}
                </div>
                <button
                    onClick={() => {
                        if (!user) { signIn("google", { callbackUrl: window.location.href }); return; }
                        setShowForm(f => !f);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-black font-bold text-sm rounded-xl hover:bg-amber-400 transition-colors shrink-0">
                    <span className="material-symbols-outlined !text-[18px]">rate_review</span>
                    {user ? "Write a Review" : "Sign in to Review"}
                </button>
            </div>

            {/* Write Review form */}
            {showForm && user && (
                <div className="mb-8 bg-white/[0.03] border border-primary/20 rounded-2xl p-6 max-w-xl">
                    {submitted ? (
                        <div className="flex flex-col items-center gap-3 py-6 text-center">
                            <span className="material-symbols-outlined !text-5xl text-green-400" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                            <p className="text-white font-bold">Thank you for your review!</p>
                            <p className="text-sm text-slate-400">It'll appear here once our team approves it.</p>
                            <button onClick={() => { setSubmitted(false); setShowForm(false); }} className="text-xs text-primary underline mt-1">Close</button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <div className="flex items-center gap-3 pb-4 border-b border-white/8">
                                {user.image ? (
                                    <img src={user.image} alt={user.name || ""} className="size-10 rounded-full ring-2 ring-primary/30" />
                                ) : (
                                    <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                                        {user.name?.charAt(0).toUpperCase()}
                                    </div>
                                )}
                                <div>
                                    <p className="text-white font-semibold text-sm">{user.name}</p>
                                    <p className="text-slate-500 text-xs">{user.email}</p>
                                </div>
                            </div>
                            <div>
                                <label className="text-xs text-slate-400 mb-2 block font-medium uppercase tracking-wide">Your Rating *</label>
                                <Stars rating={rating} interactive size={28} onSelect={setRating} />
                            </div>
                            <div>
                                <label className="text-xs text-slate-400 mb-2 block font-medium uppercase tracking-wide">Your Review *</label>
                                <textarea value={comment} onChange={e => setComment(e.target.value)} required rows={4} maxLength={500}
                                    placeholder="Share your experience with this bat..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-primary/50 transition-colors resize-none" />
                                <span className="text-xs text-slate-600 float-right mt-1">{comment.length}/500</span>
                            </div>
                            {error && <p className="text-red-400 text-sm">{error}</p>}
                            <div className="flex gap-3">
                                <button type="submit" disabled={submitting}
                                    className="flex-1 py-3 bg-primary text-black font-bold text-sm rounded-xl hover:bg-amber-400 transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                                    {submitting ? <><span className="material-symbols-outlined animate-spin !text-[18px]">sync</span>Submitting...</> : "Submit Review"}
                                </button>
                                <button type="button" onClick={() => setShowForm(false)}
                                    className="px-4 py-3 bg-white/5 text-slate-400 rounded-xl hover:bg-white/10 transition-colors text-sm">Cancel</button>
                            </div>
                        </form>
                    )}
                </div>
            )}

            {reviews.length > 0 ? (
                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Rating summary */}
                    <div className="lg:w-52 shrink-0 flex flex-col gap-4">
                        <div>
                            <p className="text-7xl font-black text-white leading-none">{avg.toFixed(1)}</p>
                            <Stars rating={Math.round(avg)} size={20} />
                            <p className="text-slate-500 text-sm mt-2">{reviews.length} reviews</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            {counts.map(({ label, count }) => (
                                <RatingBar key={label} label={String(label)} count={count} total={reviews.length} />
                            ))}
                        </div>
                    </div>

                    {/* Carousel */}
                    <div className="flex-1 min-w-0 flex flex-col gap-4">
                        {/* Track */}
                        <div
                            ref={trackRef}
                            className="flex gap-4 overflow-x-auto pb-2 no-scrollbar"
                            style={{ scrollSnapType: "x mandatory", msOverflowStyle: "none", scrollbarWidth: "none" } as React.CSSProperties}
                            onMouseEnter={() => { isPaused.current = true; }}
                            onMouseLeave={() => { isPaused.current = false; }}
                        >
                            {reviews.map(review => (
                                <div key={review.id} style={{ scrollSnapAlign: "start" }}>
                                    <ReviewCard review={review} />
                                </div>
                            ))}
                        </div>

                        {/* Dot indicators + arrow controls */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                                {reviews.map((_, i) => (
                                    <button key={i} onClick={() => scrollTo(i)}
                                        className={`rounded-full transition-all duration-300 ${i === activeIdx ? "w-5 h-2 bg-primary" : "w-2 h-2 bg-white/20 hover:bg-white/40"}`}
                                    />
                                ))}
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => scrollTo(activeIdx - 1)}
                                    className="size-8 flex items-center justify-center rounded-full border border-white/10 hover:border-primary/40 hover:bg-primary/10 transition-colors text-slate-400 hover:text-primary">
                                    <span className="material-symbols-outlined !text-[18px]">chevron_left</span>
                                </button>
                                <button onClick={() => scrollTo(activeIdx + 1)}
                                    className="size-8 flex items-center justify-center rounded-full border border-white/10 hover:border-primary/40 hover:bg-primary/10 transition-colors text-slate-400 hover:text-primary">
                                    <span className="material-symbols-outlined !text-[18px]">chevron_right</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center border border-white/5 rounded-2xl bg-white/[0.02]">
                    <span className="text-7xl text-white/5 font-serif select-none mb-4">"</span>
                    <p className="text-white font-semibold text-lg mb-1">No reviews yet</p>
                    <p className="text-slate-500 text-sm">Be the first to share your experience!</p>
                </div>
            )}
        </div>
    );
}
