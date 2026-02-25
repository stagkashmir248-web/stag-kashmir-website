"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateProduct } from "@/actions/admin-product";
import Link from "next/link";
import { Product } from "@prisma/client";

export default function EditProductForm({ product }: { product: Product }) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    // For the UI preview, start with the existing image or null
    const [imagePreview, setImagePreview] = useState<string | null>(product.imageUrl);

    // Form state
    const [name, setName] = useState(product.name);
    const [slug, setSlug] = useState(product.slug);
    const [description, setDescription] = useState(product.description || "");
    const [price, setPrice] = useState(product.price.toString());
    const [stock, setStock] = useState(product.stock.toString());
    const [base64Image, setBase64Image] = useState<string | undefined>(undefined);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        setName(newName);
        // Only auto-update slug if they haven't manually changed it, or for ease of use we update it.
        // Let's just update it automatically when name changes, users can override.
        setSlug(newName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setErrorMsg("Please select a valid image file.");
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 800;
                let width = img.width;
                let height = img.height;

                if (width > MAX_WIDTH) {
                    height = Math.round((height * MAX_WIDTH) / width);
                    width = MAX_WIDTH;
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                if (!ctx) return;

                ctx.fillStyle = "#FFFFFF";
                ctx.fillRect(0, 0, width, height);
                ctx.drawImage(img, 0, 0, width, height);

                const compressedBase64 = canvas.toDataURL('image/webp', 0.8);

                setBase64Image(compressedBase64);
                setImagePreview(compressedBase64);
                setErrorMsg("");
            };
            img.src = event.target?.result as string;
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");
        setIsSubmitting(true);

        try {
            const result = await updateProduct(product.id, {
                name,
                slug,
                description,
                price: Number(price),
                stock: Number(stock),
                imageUrl: base64Image // only send if they picked a new one
            });

            if (result.success) {
                router.push("/admin/products");
            } else {
                setErrorMsg(result.error || "Failed to edit product");
                setIsSubmitting(false);
            }
        } catch (err) {
            setErrorMsg("An unexpected error occurred.");
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 md:p-8 flex flex-col gap-6">

            {errorMsg && (
                <div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm font-medium">
                    {errorMsg}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Product Name</label>
                    <input
                        required
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">URL Slug</label>
                    <input
                        required
                        type="text"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Description</label>
                <textarea
                    required
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-y"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-y border-slate-100 dark:border-slate-800 py-6 my-2">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Price (₹)</label>
                    <input
                        required
                        type="number"
                        min="0"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Stock Availability</label>
                    <input
                        required
                        type="number"
                        min="0"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Update Product Image (Optional)</label>

                <div className="flex flex-col md:flex-row gap-6 items-start">
                    {imagePreview ? (
                        <div className="relative size-32 md:size-48 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shrink-0">
                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                            <button
                                type="button"
                                onClick={() => { setImagePreview(null); setBase64Image(undefined); }}
                                className="absolute top-2 right-2 size-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 shadow-md"
                            >
                                <span className="material-symbols-outlined !text-[16px]">close</span>
                            </button>
                        </div>
                    ) : (
                        <label className="cursor-pointer size-32 md:size-48 bg-slate-50 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl flex flex-col items-center justify-center text-slate-500 hover:border-primary hover:text-primary transition-colors shrink-0">
                            <span className="material-symbols-outlined !text-3xl mb-2">add_photo_alternate</span>
                            <span className="text-xs font-medium">Select New Image</span>
                            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                        </label>
                    )}

                    <div className="flex-1 text-sm text-slate-500 flex flex-col justify-center h-full">
                        <p className="mb-2"><strong>Note:</strong> Leave the image as is unless you want to replace the existing photograph.</p>
                        <ul className="list-disc list-inside space-y-1 text-slate-400">
                            <li>Images will be compressed and resized to 800px automatically</li>
                            <li>Square ratios look best on the shop storefront</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="pt-6 mt-2 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-xl transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <>
                            <span className="material-symbols-outlined animate-spin !text-[20px]">sync</span>
                            Saving Changes...
                        </>
                    ) : (
                        <>
                            <span className="material-symbols-outlined !text-[20px]">save</span>
                            Save Product
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
