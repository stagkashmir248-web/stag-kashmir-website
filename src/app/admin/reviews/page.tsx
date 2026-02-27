import { getAllReviews, approveReview, deleteReview } from "@/actions/review";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ReviewsAdminPage() {
    const reviews = await getAllReviews() as any[];

    const pending = reviews.filter(r => !r.approved);
    const approved = reviews.filter(r => r.approved);

    const ReviewCard = ({ review }: { review: any }) => (
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 bg-white/[0.03] border border-white/8 rounded-xl p-5">
            <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-semibold text-white text-sm">{review.authorName}</span>
                    <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map(i => (
                            <span key={i} className={`material-symbols-outlined !text-[14px] ${review.rating >= i ? "text-yellow-400" : "text-slate-600"}`}
                                style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        ))}
                    </div>
                    <Link href={`/shop/${review.product.slug}`} className="text-xs text-primary hover:underline">{review.product.name}</Link>
                    <span className="text-xs text-slate-500">{new Date(review.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{review.comment}</p>
            </div>
            <div className="flex gap-2 shrink-0">
                {!review.approved && (
                    <form action={async () => { "use server"; await approveReview(review.id); }}>
                        <button className="px-3 py-1.5 bg-green-500/10 text-green-400 border border-green-500/20 rounded-lg text-xs font-semibold hover:bg-green-500/20 transition-colors">
                            ✓ Approve
                        </button>
                    </form>
                )}
                <form action={async () => { "use server"; await deleteReview(review.id); }}>
                    <button className="px-3 py-1.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg text-xs font-semibold hover:bg-red-500/20 transition-colors">
                        Delete
                    </button>
                </form>
            </div>
        </div>
    );

    return (
        <div className="p-6 max-w-4xl mx-auto flex flex-col gap-10">
            <div>
                <h1 className="text-2xl font-bold text-white mb-1">Customer Reviews</h1>
                <p className="text-slate-400 text-sm">Approve reviews before they appear on the storefront.</p>
            </div>

            {/* Pending */}
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
                    <h2 className="text-lg font-bold text-white">Pending Approval ({pending.length})</h2>
                </div>
                {pending.length === 0 ? (
                    <p className="text-slate-500 text-sm py-6 text-center border border-white/5 rounded-xl">No pending reviews 🎉</p>
                ) : (
                    <div className="flex flex-col gap-3">
                        {pending.map(r => <ReviewCard key={r.id} review={r} />)}
                    </div>
                )}
            </div>

            {/* Approved */}
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full bg-green-400"></span>
                    <h2 className="text-lg font-bold text-white">Approved ({approved.length})</h2>
                </div>
                {approved.length === 0 ? (
                    <p className="text-slate-500 text-sm py-6 text-center border border-white/5 rounded-xl">No approved reviews yet.</p>
                ) : (
                    <div className="flex flex-col gap-3">
                        {approved.map(r => <ReviewCard key={r.id} review={r} />)}
                    </div>
                )}
            </div>
        </div>
    );
}
