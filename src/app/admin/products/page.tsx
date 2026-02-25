import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import DeleteProductButton from "./DeleteProductButton";

const prisma = new PrismaClient();

export default async function AdminProductsPage() {
    const products = await prisma.product.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="flex flex-col gap-8 w-full max-w-6xl">
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Product Inventory</h1>
                    <p className="text-slate-500 mt-2">Manage the Stag Kashmir willow bats shown on your active storefront.</p>
                </div>
                <button className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-6 rounded-lg transition-colors shadow-sm cursor-not-allowed opacity-50" title="Will be implemented in Phase 5">
                    <span className="material-symbols-outlined !text-[20px]">add</span>
                    Add New Bat
                </button>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                            <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-slate-500">Product</th>
                            <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-slate-500">Added</th>
                            <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-slate-500">Stock</th>
                            <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-slate-500 text-right">Price</th>
                            <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-slate-500 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="py-12 text-center text-slate-500">
                                    No products found in the database.
                                </td>
                            </tr>
                        ) : products.map((product) => (
                            <tr key={product.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-4">
                                        <div className="size-12 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden shrink-0">
                                            <img src={product.imageUrl || '/placeholder.jpg'} alt={product.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-slate-900 dark:text-white">{product.name}</span>
                                            <span className="text-xs font-mono text-slate-500">ID: {product.id.slice(0, 8)}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 px-6 align-middle">
                                    <span className="text-sm text-slate-500">
                                        {formatDistanceToNow(product.createdAt, { addSuffix: true })}
                                    </span>
                                </td>
                                <td className="py-4 px-6 align-middle">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wider ${product.stock > 10 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                            : product.stock > 0 ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                                                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                        }`}>
                                        {product.stock} units
                                    </span>
                                </td>
                                <td className="py-4 px-6 align-middle text-right">
                                    <span className="font-bold text-slate-900 dark:text-white">₹{product.price.toLocaleString("en-IN")}</span>
                                </td>
                                <td className="py-4 px-6 align-middle text-right">
                                    <div className="flex items-center justify-end gap-2 text-slate-400">
                                        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors hover:text-primary" title="Edit Product">
                                            <span className="material-symbols-outlined !text-[20px]">edit</span>
                                        </button>
                                        <DeleteProductButton productId={product.id} productName={product.name} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
