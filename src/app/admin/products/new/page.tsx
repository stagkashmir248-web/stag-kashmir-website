"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct } from "@/actions/admin-product";
import Link from "next/link";
import { Product, ProductVariation } from "@prisma/client";


type ProductWithVariations = Product & { variations: ProductVariation[] };

type VariationRow = {
    id?: string;
    size: string;
    weight: string;
    extra: string;
    price: string;
    compareAtPrice: string;
    stock: string;
};

const COMMON_SIZES = ["34 inches", "34.5 inches", "35 inches", "35.5 inches"];
const COMMON_WEIGHTS = ["950-1050 grams", "1050-1100 grams", "1100-1150 grams"];
const COMMON_EXTRAS = ["English Willow", "Kashmir Willow", "Premium Grade 1", "Standard"];

// ─── Reusable primitives ──────────────────────────────────────────────────────
const inp = "w-full px-4 py-3 rounded-xl border border-slate-600 bg-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-sm";
const sel = "w-full px-4 py-3 rounded-xl border border-slate-600 bg-slate-800 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-sm";

function SectionCard({ icon, title, subtitle, children }: { icon: string; title: string; subtitle?: string; children: React.ReactNode }) {
    return (
        <div className="rounded-2xl border border-slate-700 bg-slate-900 overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-700 bg-slate-800/50">
                <span className="material-symbols-outlined !text-[20px] text-primary">{icon}</span>
                <div>
                    <h3 className="font-bold text-white text-sm">{title}</h3>
                    {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
                </div>
            </div>
            <div className="p-6">{children}</div>
        </div>
    );
}

function Label({ children }: { children: React.ReactNode }) {
    return <label className="block text-sm font-semibold text-slate-200 mb-1.5">{children}</label>;
}

export default function NewProductPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [compareAtPrice, setCompareAtPrice] = useState("");
    const [stock, setStock] = useState("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [base64Image, setBase64Image] = useState<string | undefined>(undefined);
    const [videoUrl, setVideoUrl] = useState("");
    const [extraImages, setExtraImages] = useState<string[]>([]);
    const [variations, setVariations] = useState<VariationRow[]>([]);

    const [willowType, setWillowType] = useState("");
    const [grade, setGrade] = useState("");
    const [blade, setBlade] = useState("");
    const [ballType, setBallType] = useState("");
    const [warranty, setWarranty] = useState("");
    const [features, setFeatures] = useState<string[]>([]);
    const [category, setCategory] = useState("");
    const [newFeature, setNewFeature] = useState("");
    const addFeature = () => { if (newFeature.trim()) { setFeatures(f => [...f, newFeature.trim()]); setNewFeature(""); } };
    const removeFeature = (i: number) => setFeatures(f => f.filter((_, idx) => idx !== i));

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
        const newRows: VariationRow[] = [];
        for (const s of sArr) for (const w of wArr) for (const e of extras) {
            if (!variations.some(v => v.size === s && v.weight === w && v.extra === e)) {
                newRows.push({ size: s, weight: w, extra: e, price: genDefaultPrice, compareAtPrice: "", stock: genDefaultStock });
            }
        }
        setVariations(prev => [...prev, ...newRows]);
        setGenSizes([]); setGenWeights([]); setGenExtras([]); setGenCustomSize(""); setGenCustomWeight(""); setShowGen(false);
    };

    const addVariation = () => setVariations([...variations, { size: "", weight: "", extra: "", price: price || "0", compareAtPrice: "", stock: "0" }]);
    const updateVariation = (i: number, field: string, val: string) => { const n = [...variations]; n[i] = { ...n[i], [field]: val }; setVariations(n); };
    const removeVariation = (i: number) => setVariations(variations.filter((_, idx) => idx !== i));

    const compressImage = (file: File, cb: (b64: string) => void) => {
        if (!file.type.startsWith("image/")) return;
        const r = new FileReader();
        r.onload = ev => { const img = new Image(); img.onload = () => { const c = document.createElement("canvas"); const MAX = 800; let w = img.width, h = img.height; if (w > MAX) { h = Math.round(h * MAX / w); w = MAX; } c.width = w; c.height = h; const ctx = c.getContext("2d"); if (!ctx) return; ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, w, h); ctx.drawImage(img, 0, 0, w, h); cb(c.toDataURL("image/webp", 0.8)); }; img.src = ev.target?.result as string; };
        r.readAsDataURL(file);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => { const f = e.target.files?.[0]; if (f) compressImage(f, b64 => { setBase64Image(b64); setImagePreview(b64); }); };
    const handleExtraImagesUpload = (e: React.ChangeEvent<HTMLInputElement>) => Array.from(e.target.files || []).forEach(f => compressImage(f, b64 => setExtraImages(p => [...p, b64])));
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => { setName(e.target.value); setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")); };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); setErrorMsg(""); setIsSubmitting(true);
        if (!base64Image) { setErrorMsg("Please upload a cover image."); setIsSubmitting(false); return; }
        try {
            const result = await createProduct({
                name, slug, description, price: Number(price), compareAtPrice: compareAtPrice ? Number(compareAtPrice) : undefined, stock: Number(stock),
                imageUrl: base64Image, images: extraImages, videoUrl: videoUrl || undefined,
                willowType: willowType || undefined, grade: grade || undefined, blade: blade || undefined,
                ballType: ballType || undefined, warranty: warranty || undefined, features,
                category: category || undefined,
                variations: variations.map(v => { const parts = [v.size, v.weight, v.extra].filter(p => p.trim()); return { name: parts.join(" | "), price: Number(v.price), compareAtPrice: v.compareAtPrice ? Number(v.compareAtPrice) : undefined, stock: Number(v.stock) }; })
            });
            if (result.success) router.push("/admin/products");
            else { setErrorMsg(result.error || "Failed to save"); setIsSubmitting(false); }
        } catch { setErrorMsg("Unexpected error."); setIsSubmitting(false); }
    };

    const chip = (active: boolean) => `px-3 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer transition-all select-none ${active ? "bg-primary text-black border-primary" : "bg-slate-800 border-slate-600 text-slate-300 hover:border-primary/60 hover:text-primary"}`;
    const genCount = Math.max(1, genSizes.length + (genCustomSize.trim() ? 1 : 0)) * Math.max(1, genWeights.length + (genCustomWeight.trim() ? 1 : 0)) * Math.max(1, genExtras.length);

    return (
        <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-2">
                <Link href="/admin/products" className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-500 hover:text-white">
                    <span className="material-symbols-outlined !text-[24px]">arrow_back</span>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-white">Add New Product</h1>
                    <p className="text-slate-500 mt-1">Fill in the details below to add a new bat to your store.</p>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Live URL bar */}
                <a href={`/shop/${slug}`} target="_blank" rel="noopener noreferrer"
                    className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-700 bg-slate-800 hover:border-primary/50 transition-colors">
                    <span className="material-symbols-outlined !text-[16px] text-slate-400">link</span>
                    <span className="text-xs text-slate-400">Live URL:</span>
                    <span className="text-xs text-primary font-medium group-hover:underline">/shop/{slug}</span>
                    <span className="material-symbols-outlined !text-[14px] text-slate-500 ml-auto">open_in_new</span>
                </a>

                {errorMsg && (
                    <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                        <span className="material-symbols-outlined !text-[18px] shrink-0 mt-0.5">error</span>
                        {errorMsg}
                    </div>
                )}

                {/* ── Basic Info ── */}
                <SectionCard icon="edit_square" title="Basic Information" subtitle="Product name, slug and description">
                    <div className="flex flex-col gap-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <Label>Product Name</Label>
                                <input required type="text" value={name} onChange={handleNameChange} className={inp} placeholder="e.g. Wolverine Hard Tennis Bat" />
                            </div>
                            <div>
                                <Label>URL Slug</Label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm select-none">/shop/</span>
                                    <input required type="text" value={slug} onChange={e => setSlug(e.target.value)}
                                        className={`${inp} pl-16`} placeholder="wolverine-hard-tennis" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <Label>Description</Label>
                            <textarea required rows={4} value={description} onChange={e => setDescription(e.target.value)}
                                className={`${inp} resize-y`} placeholder="Describe the product…" />
                        </div>
                    </div>
                </SectionCard>

                {/* ── Pricing & Stock ── */}
                <SectionCard icon="payments" title="Pricing & Stock" subtitle="Set selling price, MRP and available inventory">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        <div>
                            <Label>Selling Price (₹)</Label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold">₹</span>
                                <input required type="number" min="0" value={price} onChange={e => setPrice(e.target.value)}
                                    className={`${inp} pl-8`} placeholder="eg. 2499" />
                            </div>
                        </div>
                        <div>
                            <Label>Regular / MRP (₹) <span className="text-slate-600 font-normal normal-case">— strikethrough</span></Label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold">₹</span>
                                <input type="number" min="0" value={compareAtPrice} onChange={e => setCompareAtPrice(e.target.value)}
                                    className={`${inp} pl-8`} placeholder="eg. 3499" />
                            </div>
                        </div>
                        <div>
                            <Label>Stock Quantity</Label>
                            <input required type="number" min="0" value={stock} onChange={e => setStock(e.target.value)} className={inp} placeholder="eg. 50" />
                        </div>
                    </div>
                    {price && compareAtPrice && Number(compareAtPrice) > Number(price) && (
                        <div className="mt-4 inline-flex items-center gap-2 text-xs text-green-400 bg-green-400/10 border border-green-400/20 px-3 py-1.5 rounded-full">
                            <span className="material-symbols-outlined !text-[14px]">local_offer</span>
                            {Math.round(((Number(compareAtPrice) - Number(price)) / Number(compareAtPrice)) * 100)}% discount · Saves ₹{(Number(compareAtPrice) - Number(price)).toLocaleString("en-IN")}
                        </div>
                    )}
                </SectionCard>

                {/* ── Images & Media ── */}
                <SectionCard icon="photo_library" title="Images & Media" subtitle="Cover image, gallery photos and product video">
                    <div className="flex flex-col gap-6">
                        {/* Cover image */}
                        <div>
                            <Label>Cover Image</Label>
                            <div className="flex items-start gap-5">
                                {imagePreview ? (
                                    <div className="relative size-36 rounded-xl overflow-hidden border border-slate-600 shrink-0 bg-slate-800">
                                        <img src={imagePreview} alt="Cover" className="w-full h-full object-cover" />
                                        <button type="button" onClick={() => { setImagePreview(null); setBase64Image(undefined); }}
                                            className="absolute top-2 right-2 size-7 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 shadow-md">
                                            <span className="material-symbols-outlined !text-[14px]">close</span>
                                        </button>
                                    </div>
                                ) : (
                                    <label className="cursor-pointer size-36 border-2 border-dashed border-slate-600 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:border-primary hover:text-primary transition-colors shrink-0">
                                        <span className="material-symbols-outlined !text-3xl mb-1">add_photo_alternate</span>
                                        <span className="text-[11px] font-medium">Upload Image</span>
                                        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                                    </label>
                                )}
                                <div className="text-xs text-slate-400 leading-relaxed pt-1">
                                    <p className="font-semibold text-slate-300 mb-1">Tips for cover image</p>
                                    <ul className="space-y-1 list-disc list-inside">
                                        <li>Square ratio (1:1) looks best on product cards</li>
                                        <li>Auto-compressed to 800px WebP</li>
                                        <li>Leave empty to keep current image</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Gallery */}
                        <div>
                            <Label>Gallery Images <span className="text-slate-600 font-normal normal-case">— multiple angles</span></Label>
                            <div className="flex flex-wrap gap-3">
                                {extraImages.map((img, i) => (
                                    <div key={i} className="relative size-20 rounded-xl overflow-hidden border border-slate-600 bg-slate-800 shrink-0">
                                        <img src={img} alt="Gallery" className="w-full h-full object-cover" />
                                        <button type="button" onClick={() => setExtraImages(extraImages.filter((_, idx) => idx !== i))}
                                            className="absolute top-1 right-1 size-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600">
                                            <span className="material-symbols-outlined !text-[11px]">close</span>
                                        </button>
                                    </div>
                                ))}
                                <label className="cursor-pointer size-20 border-2 border-dashed border-slate-600 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:border-primary hover:text-primary transition-colors shrink-0">
                                    <span className="material-symbols-outlined !text-xl">add_circle</span>
                                    <input type="file" accept="image/*" multiple className="hidden" onChange={handleExtraImagesUpload} />
                                </label>
                            </div>
                        </div>

                        {/* Video */}
                        <div>
                            <Label>Product Video URL <span className="text-slate-600 font-normal normal-case">— YouTube or MP4</span></Label>
                            <input type="url" value={videoUrl} onChange={e => setVideoUrl(e.target.value)}
                                placeholder="https://youtube.com/watch?v=..." className={inp} />
                        </div>
                    </div>
                </SectionCard>

                {/* ── Product Variations ── */}
                <SectionCard icon="layers" title="Product Variations" subtitle="Each row = one Size + Weight combination with its own price & stock">
                    <div className="flex flex-col gap-4">
                        {/* Action buttons */}
                        <div className="flex gap-3 flex-wrap">
                            <button type="button" onClick={() => setShowGen(g => !g)}
                                className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm rounded-xl transition-all shadow-lg shadow-amber-500/20">
                                <span className="material-symbols-outlined !text-[18px]">auto_awesome</span>
                                Generate Combinations
                            </button>
                            <button type="button" onClick={addVariation}
                                className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 border border-slate-600 hover:border-primary/60 text-slate-300 hover:text-primary font-semibold text-sm rounded-xl transition-all">
                                <span className="material-symbols-outlined !text-[18px]">add</span>
                                Add One
                            </button>
                        </div>

                        {/* Generator Panel */}
                        {showGen && (
                            <div className="rounded-xl border border-amber-500/30 bg-slate-800 p-5 flex flex-col gap-5">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined !text-[18px] text-amber-400">auto_awesome</span>
                                        <h4 className="font-bold text-white text-sm">Variation Generator</h4>
                                        <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">Pick options → Generate</span>
                                    </div>
                                    <button type="button" onClick={() => setShowGen(false)} className="text-slate-500 hover:text-slate-300 p-1 rounded-lg hover:bg-white/5">
                                        <span className="material-symbols-outlined !text-[18px]">close</span>
                                    </button>
                                </div>

                                <div>
                                    <Label>Bat Sizes</Label>
                                    <div className="flex flex-wrap gap-2 mb-2">{COMMON_SIZES.map(s => <span key={s} className={chip(genSizes.includes(s))} onClick={() => toggle(genSizes, s, setGenSizes)}>{s}</span>)}</div>
                                    <input type="text" placeholder="+ Custom size (e.g. 36 inches)" value={genCustomSize} onChange={e => setGenCustomSize(e.target.value)} className={`${inp} max-w-xs`} />
                                </div>
                                <div>
                                    <Label>Weights</Label>
                                    <div className="flex flex-wrap gap-2 mb-2">{COMMON_WEIGHTS.map(w => <span key={w} className={chip(genWeights.includes(w))} onClick={() => toggle(genWeights, w, setGenWeights)}>{w}</span>)}</div>
                                    <input type="text" placeholder="+ Custom weight (e.g. 1150-1200 grams)" value={genCustomWeight} onChange={e => setGenCustomWeight(e.target.value)} className={`${inp} max-w-xs`} />
                                </div>
                                <div>
                                    <Label>Willow / Other <span className="text-slate-600 font-normal normal-case">(optional)</span></Label>
                                    <div className="flex flex-wrap gap-2">{COMMON_EXTRAS.map(e => <span key={e} className={chip(genExtras.includes(e))} onClick={() => toggle(genExtras, e, setGenExtras)}>{e}</span>)}</div>
                                </div>
                                <div className="flex flex-wrap gap-4">
                                    <div><Label>Default Sale Price (₹)</Label><input type="number" value={genDefaultPrice} onChange={e => setGenDefaultPrice(e.target.value)} className={`${inp} w-32`} /></div>
                                    <div><Label>Default Stock</Label><input type="number" value={genDefaultStock} onChange={e => setGenDefaultStock(e.target.value)} className={`${inp} w-28`} /></div>
                                </div>
                                <div className="flex items-center gap-3 pt-2 border-t border-amber-500/20 flex-wrap">
                                    <button type="button" onClick={generateCombinations}
                                        className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-bold px-5 py-2.5 rounded-xl text-sm shadow-lg shadow-amber-500/20">
                                        <span className="material-symbols-outlined !text-[18px]">auto_awesome</span>
                                        Generate {genCount} Combination{genCount !== 1 ? "s" : ""}
                                    </button>
                                    <span className="text-xs text-slate-500">Skips duplicates already in the table.</span>
                                </div>
                            </div>
                        )}

                        {/* Table */}
                        {variations.length > 0 ? (
                            <div className="flex flex-col gap-2">
                                <div className="hidden md:grid grid-cols-[1fr_1fr_1fr_100px_100px_80px_36px] gap-2 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                    <span>Size</span><span>Weight</span><span>Willow / Other</span><span>Sale ₹</span><span>Regular ₹</span><span>Stock</span><span />
                                </div>
                                {variations.map((v, i) => (
                                    <div key={i} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_100px_100px_80px_36px] items-center gap-2 bg-white/[0.03] border border-white/8 px-4 py-3 rounded-xl hover:border-white/15 transition-colors">
                                        <input type="text" list="sz-opts" placeholder="Size" value={v.size} onChange={e => updateVariation(i, "size", e.target.value)} className={inp} />
                                        <input type="text" list="wt-opts" placeholder="Weight" value={v.weight} onChange={e => updateVariation(i, "weight", e.target.value)} className={inp} />
                                        <input type="text" list="ex-opts" placeholder="Willow (Opt)" value={v.extra} onChange={e => updateVariation(i, "extra", e.target.value)} className={inp} />
                                        <input required type="number" placeholder="Sale ₹" value={v.price} onChange={e => updateVariation(i, "price", e.target.value)} className={inp} />
                                        <input type="number" placeholder="Reg ₹" value={v.compareAtPrice} onChange={e => updateVariation(i, "compareAtPrice", e.target.value)} className={inp} />
                                        <input required type="number" placeholder="Stock" value={v.stock} onChange={e => updateVariation(i, "stock", e.target.value)} className={inp} />
                                        <button type="button" onClick={() => removeVariation(i)} className="size-9 flex items-center justify-center text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                                            <span className="material-symbols-outlined !text-[18px]">delete</span>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-3 py-10 border-2 border-dashed border-white/10 rounded-xl text-slate-500">
                                <span className="material-symbols-outlined !text-4xl text-slate-600">layers</span>
                                <p className="text-sm">No variations yet.</p>
                                <p className="text-xs text-slate-600">Click <strong className="text-slate-400">Generate Combinations</strong> to create size×weight rows at once.</p>
                            </div>
                        )}
                        <datalist id="sz-opts">{COMMON_SIZES.map(s => <option key={s} value={s} />)}</datalist>
                        <datalist id="wt-opts">{COMMON_WEIGHTS.map(w => <option key={w} value={w} />)}</datalist>
                        <datalist id="ex-opts">{COMMON_EXTRAS.map(e => <option key={e} value={e} />)}</datalist>
                    </div>
                </SectionCard>

                {/* ── Technical Specs ── */}
                <SectionCard icon="tune" title="Technical Specs & Category" subtitle="Displayed in the Tech Specs card on the product page">
                    <div className="flex flex-col gap-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            <div>
                                <Label>Category <span className="text-primary">*</span></Label>
                                <select value={category} onChange={e => setCategory(e.target.value)} className={sel}>
                                    <option value="">— Uncategorised —</option>
                                    <option value="Hard Tennis Bats">Hard Tennis Bats</option>
                                    <option value="Soft Tennis Bats">Soft Tennis Bats</option>
                                    <option value="Season Bats">Season Bats</option>
                                    <option value="Kids Bats">Kids Bats</option>
                                </select>
                            </div>
                            <div>
                                <Label>Willow Type</Label>
                                <input type="text" value={willowType} onChange={e => setWillowType(e.target.value)} placeholder="e.g. Kashmir Willow" className={inp} />
                            </div>
                            <div>
                                <Label>Grade</Label>
                                <input type="text" value={grade} onChange={e => setGrade(e.target.value)} placeholder="e.g. Premium" className={inp} />
                            </div>
                            <div>
                                <Label>Blade</Label>
                                <input type="text" value={blade} onChange={e => setBlade(e.target.value)} placeholder="e.g. Full Size" className={inp} />
                            </div>
                            <div>
                                <Label>Ball Type</Label>
                                <input type="text" value={ballType} onChange={e => setBallType(e.target.value)} placeholder="e.g. Hard Tennis / Leather" className={inp} />
                            </div>
                            <div>
                                <Label>Warranty</Label>
                                <input type="text" value={warranty} onChange={e => setWarranty(e.target.value)} placeholder="e.g. 1 Year" className={inp} />
                            </div>
                        </div>

                        {/* Feature badges */}
                        <div>
                            <Label>Feature Badges <span className="text-slate-600 font-normal normal-case">— pill chips on the product page</span></Label>
                            {features.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {features.map((f, i) => (
                                        <span key={i} className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full border border-primary/20">
                                            {f}
                                            <button type="button" onClick={() => removeFeature(i)} className="text-primary/50 hover:text-red-400 transition-colors">
                                                <span className="material-symbols-outlined !text-[13px]">close</span>
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}
                            <div className="flex gap-2">
                                <input type="text" value={newFeature} onChange={e => setNewFeature(e.target.value)}
                                    onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addFeature(); } }}
                                    placeholder="Type a feature and press Enter…" className={`${inp} flex-1`} />
                                <button type="button" onClick={addFeature}
                                    className="px-5 py-3 bg-primary/10 text-primary border border-primary/20 rounded-xl text-sm font-bold hover:bg-primary/20 transition-colors shrink-0">
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                </SectionCard>

                {/* ── Save Bar ── */}
                <div className="flex items-center justify-between gap-4 px-6 py-4 rounded-2xl border border-slate-700 bg-slate-900">
                    <p className="text-sm text-slate-300">
                        <span className="font-semibold text-white">{name || "Product"}</span>
                        <span className="mx-2 text-slate-500">/</span>
                        <span className="text-slate-400 text-xs">/shop/{slug}</span>
                    </p>
                    <div className="flex items-center gap-3">

                        <button type="button" onClick={() => router.push("/admin/products")}
                            className="px-5 py-2.5 rounded-xl border border-slate-600 text-slate-300 hover:text-white hover:border-slate-400 text-sm font-semibold transition-colors">
                            Cancel
                        </button>
                        <button type="submit" disabled={isSubmitting}
                            className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-amber-400 text-black font-bold rounded-xl text-sm transition-all shadow-lg shadow-primary/20 disabled:opacity-60 disabled:cursor-not-allowed">
                            {isSubmitting
                                ? <><span className="material-symbols-outlined animate-spin !text-[18px]">sync</span>Saving…</>
                                : <><span className="material-symbols-outlined !text-[18px]">save</span>Create Product</>}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
