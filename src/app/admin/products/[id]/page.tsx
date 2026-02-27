import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import EditProductForm from "./EditProductForm";

export const dynamic = "force-dynamic";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;

    const product = await prisma.product.findUnique({
        where: { id: resolvedParams.id },
        include: { variations: true }
    });

    if (!product) {
        notFound();
    }

    return (
        <div className="flex flex-col gap-8 w-full max-w-4xl">
            <div className="flex items-center gap-4">
                <Link href="/admin/products" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-500">
                    <span className="material-symbols-outlined !text-[24px]">arrow_back</span>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Edit Product</h1>
                    <p className="text-slate-500 mt-2">Update inventory details for {product.name}.</p>
                </div>
            </div>

            <EditProductForm product={product} />
        </div>
    );
}
