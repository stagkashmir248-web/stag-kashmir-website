import { prisma } from "@/lib/prisma";
import AddReviewForm from "./AddReviewForm";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function NewReviewPage() {
    const products = await prisma.product.findMany({
        where: { isArchived: false },
        select: { id: true, name: true, slug: true },
        orderBy: { name: 'asc' }
    });

    return (
        <div className="p-6 max-w-3xl mx-auto flex flex-col gap-8">
            <div className="flex items-center gap-4">
                <Link href="/admin/reviews" className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-500 hover:text-white">
                    <span className="material-symbols-outlined !text-[24px]">arrow_back</span>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-white mb-1">Add Manual Review</h1>
                    <p className="text-slate-400 text-sm">Create an approved customer review directly.</p>
                </div>
            </div>

            <AddReviewForm products={products} />
        </div>
    );
}
