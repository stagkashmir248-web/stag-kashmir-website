"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct } from "@/actions/admin-product";
import Link from "next/link";

type VariationRow = { size: string; weight: string; extra: string; price: string; compareAtPrice: string; stock: string };

const COMMON_SIZES = ["34 inches", "34.5 inches", "35 inches", "35.5 inches"];
const COMMON_WEIGHTS = ["950-1050 grams", "1050-1100 grams", "1100-1150 grams"];
const COMMON_EXTRAS = ["English Willow", "Kashmir Willow", "Premium Grade 1", "Standard"];

export default function NewProductPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [compareAtPrice, setCompareAtPrice] = useState("");
    const [stock, setStock] = useState("");
    const [base64Image, setBase64Image] = useState<string | undefined>(undefined);
    const [videoUrl, setVideoUrl] = useState("");
    const [extraImages, setExtraImages] = useState<string[]>([]);
    const [variations, setVariations] = useState<VariationRow[]>([]);

    // Generator state
    const [showGen, setShowGen] = useState(false);
    const [genSizes, setGenSizes] = useState<string[]>([]);
    const [genWeights, setGenWeights] = useState<string[]>([]);
    const [genExtras, setGenExtras] = useState<string[]>([]);
    const [genDefaultPrice, setGenDefaultPrice] = useState("");
    const [genDefaultStock, setGenDefaultStock] = useState("10");
    const [genCustomSize, setGenCustomSize] = useState("");
    const [genCustomWeight, setGenCustomWeight] = useState("");

    const toggle = (arr: string[], val: string, set: (a: string[]) => void) =>
        set(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]);

    const generateCombinations = () => {
        const sizes = [...genSizes, ...(genCustomSize.trim() ? [genCustomSize.trim()] : [])];
        const weights = [...genWeights, ...(genCustomWeight.trim() ? [genCustomWeight.trim()] : [])];
        const extras = genExtras.length > 0 ? genExtras : [""];
        const sArr = sizes.length > 0 ? sizes : [""];
        const wArr = weights.length > 0 ? weights : [""];
        const defaultP = genDefaultPrice || price || "0";
        const newRows: VariationRow[] = [];
        for (const s of sArr) for (const w of wArr) for (const e of extras) {
            if (!variations.some(v => v.size === s && v.weight === w && v.extra === e)) {
                newRows.push({ size: s, weight: w, extra: e, price: defaultP, compareAtPrice: "", stock: genDefaultStock });
            }
        }
        setVariations(prev => [...prev, ...newRows]);
        setGenSizes([]); setGenWeights([]); setGenExtras([]); setGenCustomSize(""); setGenCustomWeight(""); setShowGen(false);
    };

    const addVariation = () => setVariations([...variations, { size: "", weight: "", extra: "", price: price || "0", compareAtPrice: "", stock: "0" }]);
    const updateVariation = (i: number, field: string, val: string) => { const n = [...variations]; n[i] = { ...n[i], [field]: val }; setVariations(n); };
    const removeVariation = (i: number) => setVariations(variations.filter((_, idx) => idx !== i));

    const compressImage = (file: File, cb: (b64: string) => void) => {
        if (!file.type.startsWith('image/')) return;
        const r = new FileReader();
        r.onload = ev => { const img = new Image(); img.onload = () => { const c = document.createElement('canvas'); const MAX = 800; let w = img.width, h = img.height; if (w > MAX) { h = Math.round(h * MAX / w); w = MAX; } c.width = w; c.height = h; const ctx = c.getContext('2d'); if (!ctx) return; ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h); ctx.drawImage(img, 0, 0, w, h); cb(c.toDataURL('image/webp', 0.8)); }; img.src = ev.target?.result as string; };
        r.readAsDataURL(file);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => { const f = e.target.files?.[0]; if (f) compressImage(f, b64 => { setBase64Image(b64); setImagePreview(b64); }); };
    const handleExtraImagesUpload = (e: React.ChangeEvent<HTMLInputElement>) => Array.from(e.target.files || []).forEach(f => compressImage(f, b64 => setExtraImages(p => [...p, b64])));
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => { setName(e.target.value); setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')); };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); setErrorMsg(""); setIsSubmitting(true);
        if (!base64Image) { setErrorMsg("Please upload a product image."); setIsSubmitting(false); return; }
        try {
            const result = await createProduct({
                name, slug, description, price: Number(price),
                compareAtPrice: compareAtPrice ? Number(compareAtPrice) : undefined,
                stock: Number(stock), imageUrl: base64Image, images: extraImages, videoUrl: videoUrl || undefined,
                variations: variations.map(v => { const parts = [v.size, v.weight, v.extra].filter(p => p.trim()); return { name: parts.join(' | '), price: Number(v.price), compareAtPrice: v.compareAtPrice ? Number(v.compareAtPrice) : undefined, stock: Number(v.stock) }; })
            });
            if (result.success) router.push("/admin/products");
            else { setErrorMsg(result.error || "Failed to create product."); setIsSubmitting(false); }
        } catch { setErrorMsg("An unexpected error occurred."); setIsSubmitting(false); }
    };

    const inp = "w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all";
    const varInp = "w-full p-2 rounded border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm focus:border-primary outline-none";
    const chip = (active: boolean) => `px-3 py-1.5 rounded-full text-xs font-semibold border cursor-pointer transition-all select-none ${active ? 'bg-primary text-white border-primary' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary'}`;
    const genCount = Math.max(1, genSizes.length + (genCustomSize.trim() ? 1 : 0)) * Math.max(1, genWeights.length + (genCustomWeight.trim() ? 1 : 0)) * Math.max(1, genExtras.length);

    return (
        <div className="flex flex-col gap-8 w-full max-w-4xl">
            <div className="flex items-center gap-4">
                <Link href="/admin/products" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-500">
                    <span className="material-symbols-outlined !text-[24px]">arrow_back</span>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Add New Product</h1>
                    <p className="text-slate-500 mt-1">Fill in the details below to add a new bat to your store.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 md:p-8 flex flex-col gap-6">
                {errorMsg && <div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm font-medium">{errorMsg}</div>}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2"><label className="text-sm font-bold text-slate-700 dark:text-slate-300">Product Name</label><input required type="text" value={name} onChange={handleNameChange} placeholder="e.g. Wolverine Gold Edition" className={inp} /></div>
                    <div className="flex flex-col gap-2"><label className="text-sm font-bold text-slate-700 dark:text-slate-300">URL Slug</label><input required type="text" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="auto-generated" className={inp} /></div>
                </div>

                <div className="flex flex-col gap-2"><label className="text-sm font-bold text-slate-700 dark:text-slate-300">Description</label><textarea required rows={4} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the bat..." className={`${inp} resize-y`} /></div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-y border-slate-100 dark:border-slate-800 py-6 my-2">
                    <div className="flex flex-col gap-2"><label className="text-sm font-bold text-slate-700 dark:text-slate-300">Selling Price (₹)</label><input required type="number" min="0" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="3499" className={inp} /></div>
                    <div className="flex flex-col gap-2"><label className="text-sm font-bold text-slate-700 dark:text-slate-300">Regular Price (₹) <span className="text-slate-400 font-normal text-xs">— strikethrough</span></label><input type="number" min="0" value={compareAtPrice} onChange={(e) => setCompareAtPrice(e.target.value)} placeholder="e.g. 4999" className={inp} /></div>
                    <div className="flex flex-col gap-2"><label className="text-sm font-bold text-slate-700 dark:text-slate-300">Base Stock</label><input required type="number" min="0" value={stock} onChange={(e) => setStock(e.target.value)} placeholder="25" className={inp} /></div>
                </div>

                {/* Variations */}
                <div className="flex flex-col gap-4 border-b border-slate-100 dark:border-slate-800 pb-6 mb-2">
                    <div className="flex items-center justify-between flex-wrap gap-3">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Product Variations</h3>
                            <p className="text-sm text-slate-500">Each row = one Size + Weight combination with its own price & stock.</p>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            <button type="button" onClick={() => setShowGen(g => !g)}
                                className="flex items-center gap-1.5 font-semibold text-sm px-4 py-2 rounded-lg transition-all bg-amber-500 hover:bg-amber-400 text-white shadow-sm">
                                <span className="material-symbols-outlined !text-[18px]">auto_awesome</span>Generate Combinations
                            </button>
                            <button type="button" onClick={addVariation}
                                className="flex items-center gap-1 text-primary font-medium text-sm bg-primary/10 px-4 py-2 rounded-lg transition-all hover:bg-primary/20">
                                <span className="material-symbols-outlined !text-[18px]">add</span>Add One
                            </button>
                        </div>
                    </div>

                    {/* Generator Panel */}
                    {showGen && (
                        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700/40 rounded-xl p-5 flex flex-col gap-5">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-amber-500">auto_awesome</span>
                                    <h4 className="font-bold text-slate-900 dark:text-white">Variation Generator</h4>
                                    <span className="text-xs bg-amber-100 dark:bg-amber-800/40 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-full font-medium">Pick options → Generate</span>
                                </div>
                                <button type="button" onClick={() => setShowGen(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded">
                                    <span className="material-symbols-outlined !text-[20px]">close</span>
                                </button>
                            </div>

                            <div>
                                <label className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2 block">Bat Sizes</label>
                                <div className="flex flex-wrap gap-2 mb-2">{COMMON_SIZES.map(s => <span key={s} className={chip(genSizes.includes(s))} onClick={() => toggle(genSizes, s, setGenSizes)}>{s}</span>)}</div>
                                <input type="text" placeholder="+ Custom size (e.g. 36 inches)" value={genCustomSize} onChange={e => setGenCustomSize(e.target.value)} className="text-sm p-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 outline-none focus:border-primary w-full max-w-xs" />
                            </div>

                            <div>
                                <label className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2 block">Weights</label>
                                <div className="flex flex-wrap gap-2 mb-2">{COMMON_WEIGHTS.map(w => <span key={w} className={chip(genWeights.includes(w))} onClick={() => toggle(genWeights, w, setGenWeights)}>{w}</span>)}</div>
                                <input type="text" placeholder="+ Custom weight (e.g. 1150-1200 grams)" value={genCustomWeight} onChange={e => setGenCustomWeight(e.target.value)} className="text-sm p-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 outline-none focus:border-primary w-full max-w-xs" />
                            </div>

                            <div>
                                <label className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2 block">Willow / Other <span className="font-normal normal-case">(optional)</span></label>
                                <div className="flex flex-wrap gap-2">{COMMON_EXTRAS.map(e => <span key={e} className={chip(genExtras.includes(e))} onClick={() => toggle(genExtras, e, setGenExtras)}>{e}</span>)}</div>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <div className="flex flex-col gap-1"><label className="text-xs font-bold text-slate-500">Default Sale Price (₹)</label><input type="number" value={genDefaultPrice} placeholder={price || "0"} onChange={e => setGenDefaultPrice(e.target.value)} className="p-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm outline-none focus:border-primary w-32" /></div>
                                <div className="flex flex-col gap-1"><label className="text-xs font-bold text-slate-500">Default Stock</label><input type="number" value={genDefaultStock} onChange={e => setGenDefaultStock(e.target.value)} className="p-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm outline-none focus:border-primary w-28" /></div>
                            </div>

                            <div className="flex items-center gap-3 pt-2 border-t border-amber-200 dark:border-amber-700/30 flex-wrap">
                                <button type="button" onClick={generateCombinations}
                                    className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-bold px-5 py-2.5 rounded-lg text-sm transition-all shadow-sm">
                                    <span className="material-symbols-outlined !text-[18px]">auto_awesome</span>Generate {genCount} Combination{genCount !== 1 ? 's' : ''}
                                </button>
                                <span className="text-xs text-slate-500">Will skip duplicates already in the table.</span>
                            </div>
                        </div>
                    )}

                    {/* Variation Table */}
                    {variations.length > 0 ? (
                        <div className="flex flex-col gap-2">
                            <div className="hidden md:grid grid-cols-[1fr_1fr_1fr_90px_90px_80px_36px] gap-2 px-3 text-xs font-bold text-slate-400 uppercase tracking-wide">
                                <span>Size</span><span>Weight</span><span>Willow / Other</span><span>Sale ₹</span><span>Regular ₹</span><span>Stock</span><span></span>
                            </div>
                            {variations.map((v, i) => (
                                <div key={i} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_90px_90px_80px_36px] items-center gap-2 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                                    <input type="text" list="sz-opts" placeholder="Size" value={v.size} onChange={e => updateVariation(i, 'size', e.target.value)} className={varInp} />
                                    <input type="text" list="wt-opts" placeholder="Weight" value={v.weight} onChange={e => updateVariation(i, 'weight', e.target.value)} className={varInp} />
                                    <input type="text" list="ex-opts" placeholder="Willow (Opt)" value={v.extra} onChange={e => updateVariation(i, 'extra', e.target.value)} className={varInp} />
                                    <input required type="number" placeholder="Sale ₹" value={v.price} onChange={e => updateVariation(i, 'price', e.target.value)} className={varInp} />
                                    <input type="number" placeholder="Reg ₹" value={v.compareAtPrice} onChange={e => updateVariation(i, 'compareAtPrice', e.target.value)} className={varInp} />
                                    <input required type="number" placeholder="Stock" value={v.stock} onChange={e => updateVariation(i, 'stock', e.target.value)} className={varInp} />
                                    <button type="button" onClick={() => removeVariation(i)} className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded transition-colors flex items-center justify-center">
                                        <span className="material-symbols-outlined !text-[18px]">delete</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl text-slate-400">
                            <span className="material-symbols-outlined !text-4xl mb-2 block">layers</span>
                            No variations yet. Click <strong>Generate Combinations</strong> to auto-create size×weight rows.
                        </div>
                    )}

                    <datalist id="sz-opts">{COMMON_SIZES.map(s => <option key={s} value={s} />)}</datalist>
                    <datalist id="wt-opts">{COMMON_WEIGHTS.map(w => <option key={w} value={w} />)}</datalist>
                    <datalist id="ex-opts">{COMMON_EXTRAS.map(e => <option key={e} value={e} />)}</datalist>
                </div>

                {/* Product Image */}
                <div className="flex flex-col gap-4">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Product Image <span className="text-red-500">*</span></label>
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        {imagePreview ? (
                            <div className="relative size-32 md:size-48 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shrink-0">
                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                <button type="button" onClick={() => { setImagePreview(null); setBase64Image(undefined); }} className="absolute top-2 right-2 size-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 shadow-md">
                                    <span className="material-symbols-outlined !text-[16px]">close</span>
                                </button>
                            </div>
                        ) : (
                            <label className="cursor-pointer size-32 md:size-48 bg-slate-50 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl flex flex-col items-center justify-center text-slate-500 hover:border-primary hover:text-primary transition-colors shrink-0">
                                <span className="material-symbols-outlined !text-3xl mb-2">add_photo_alternate</span>
                                <span className="text-xs font-medium">Upload Image</span>
                                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                            </label>
                        )}
                        <div className="flex-1 text-sm text-slate-500">
                            <ul className="list-disc list-inside space-y-1 text-slate-400"><li>Compressed to 800px automatically</li><li>Square ratios look best</li></ul>
                        </div>
                    </div>
                </div>

                {/* Gallery + Video */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-slate-100 dark:border-slate-800 pt-6 mt-2">
                    <div className="flex flex-col gap-4">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Additional Gallery Images</label>
                        <div className="flex flex-wrap gap-3">
                            {extraImages.map((img, i) => (
                                <div key={i} className="relative size-20 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 shrink-0">
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                    <button type="button" onClick={() => setExtraImages(extraImages.filter((_, idx) => idx !== i))} className="absolute top-1 right-1 size-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600">
                                        <span className="material-symbols-outlined !text-[12px]">close</span>
                                    </button>
                                </div>
                            ))}
                            <label className="cursor-pointer size-20 bg-slate-50 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg flex flex-col items-center justify-center text-slate-500 hover:border-primary hover:text-primary transition-colors shrink-0">
                                <span className="material-symbols-outlined !text-xl mb-1">add_circle</span>
                                <input type="file" accept="image/*" multiple className="hidden" onChange={handleExtraImagesUpload} />
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Product Video URL (Optional)</label>
                        <p className="text-xs text-slate-500">YouTube or MP4 link.</p>
                        <input type="url" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="https://youtube.com/watch?..." className={inp} />
                    </div>
                </div>

                <div className="pt-6 mt-2 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                    <button type="submit" disabled={isSubmitting} className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-xl transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                        {isSubmitting ? <><span className="material-symbols-outlined animate-spin !text-[20px]">sync</span>Creating...</> : <><span className="material-symbols-outlined !text-[20px]">add_circle</span>Create Product</>}
                    </button>
                </div>
            </form>
        </div>
    );
}
