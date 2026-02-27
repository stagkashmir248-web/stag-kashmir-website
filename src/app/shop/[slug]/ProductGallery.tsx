"use client";

import { useState, useEffect, useCallback } from "react";

interface ProductGalleryProps {
    mainImage: string | null;
    extraImages: string[];
    productName: string;
    outOfStock?: boolean;
}

export default function ProductGallery({ mainImage, extraImages, productName, outOfStock }: ProductGalleryProps) {
    const allImages = [mainImage, ...extraImages].filter((img): img is string => Boolean(img));
    const [activeIndex, setActiveIndex] = useState(0);
    const [zoomed, setZoomed] = useState(false);

    if (allImages.length === 0) {
        return (
            <div className="aspect-square w-full rounded-xl bg-neutral-800 border border-white/5 flex items-center justify-center text-slate-600">
                <span className="material-symbols-outlined !text-5xl">image_not_supported</span>
            </div>
        );
    }

    const activeImg = allImages[activeIndex];
    const prev = useCallback(() => setActiveIndex(i => (i - 1 + allImages.length) % allImages.length), [allImages.length]);
    const next = useCallback(() => setActiveIndex(i => (i + 1) % allImages.length), [allImages.length]);

    // Auto-scroll every 8 seconds; resets on manual navigation
    useEffect(() => {
        if (allImages.length <= 1 || zoomed) return;
        const timer = setInterval(() => setActiveIndex(i => (i + 1) % allImages.length), 8000);
        return () => clearInterval(timer);
    }, [allImages.length, zoomed, activeIndex]);


    const mainPane = (cls = "") => (
        <div className={`relative overflow-hidden rounded-xl bg-white border border-white/10 group aspect-square ${cls}`}>
            <div className="absolute inset-0 flex items-center justify-center p-4">
                <img key={activeImg} src={activeImg} alt={productName} className="w-full h-full object-contain transition-all duration-300" />
            </div>
            {outOfStock && (
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide border border-white/10">Sold Out</div>
            )}
            {allImages.length > 1 && (
                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md text-white text-xs font-medium px-2 py-0.5 rounded-full border border-white/10">
                    {activeIndex + 1} / {allImages.length}
                </div>
            )}
            <button onClick={() => setZoomed(true)}
                className="absolute bottom-3 right-3 size-9 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:text-primary hover:bg-black/60 transition-all border border-white/10 opacity-0 group-hover:opacity-100">
                <span className="material-symbols-outlined !text-[18px]">zoom_in</span>
            </button>
            {allImages.length > 1 && (
                <>
                    <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 size-9 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-all border border-white/10 opacity-0 group-hover:opacity-100">
                        <span className="material-symbols-outlined !text-[20px]">chevron_left</span>
                    </button>
                    <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 size-9 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-all border border-white/10 opacity-0 group-hover:opacity-100">
                        <span className="material-symbols-outlined !text-[20px]">chevron_right</span>
                    </button>
                </>
            )}
        </div>
    );

    return (
        <>
            {/* ── DESKTOP (md+): vertical left thumbs + main image ── */}
            <div className="hidden md:flex gap-3 w-full">
                {allImages.length > 1 && (
                    <div className="flex flex-col items-center gap-2 shrink-0">
                        <button onClick={prev} className="flex justify-center py-1 text-slate-400 hover:text-white transition-colors">
                            <span className="material-symbols-outlined !text-[20px]">keyboard_arrow_up</span>
                        </button>
                        {allImages.map((img, i) => (
                            <button key={i} onClick={() => setActiveIndex(i)}
                                className={`w-16 h-16 lg:w-20 lg:h-20 shrink-0 rounded-lg overflow-hidden bg-white border-2 transition-all duration-200 ${i === activeIndex ? 'border-primary shadow-[0_0_10px_rgba(212,175,55,0.3)]' : 'border-slate-200/20 opacity-55 hover:opacity-90 hover:border-white/30'
                                    }`}>
                                <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-contain p-1" />
                            </button>
                        ))}
                        <button onClick={next} className="flex justify-center py-1 text-slate-400 hover:text-white transition-colors">
                            <span className="material-symbols-outlined !text-[20px]">keyboard_arrow_down</span>
                        </button>
                    </div>
                )}
                {mainPane("flex-1")}
            </div>

            {/* ── MOBILE: main image + horizontal scroll thumbs ── */}
            <div className="flex md:hidden flex-col gap-3 w-full">
                {mainPane("w-full")}
                {allImages.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-1">
                        {allImages.map((img, i) => (
                            <button key={i} onClick={() => setActiveIndex(i)}
                                className={`shrink-0 size-16 rounded-lg overflow-hidden bg-white border-2 transition-all duration-200 ${i === activeIndex ? 'border-primary' : 'border-transparent opacity-55 hover:opacity-90'
                                    }`}>
                                <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-contain p-1" />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Lightbox */}
            {zoomed && (
                <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setZoomed(false)}>
                    <div className="relative max-w-3xl w-full" onClick={e => e.stopPropagation()}>
                        <img src={activeImg} alt={productName} className="w-full h-auto object-contain max-h-[90vh] rounded-xl" />
                        <button onClick={() => setZoomed(false)} className="absolute -top-4 -right-4 size-10 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-white/20 border border-white/20">
                            <span className="material-symbols-outlined !text-[20px]">close</span>
                        </button>
                        {allImages.length > 1 && (
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                {allImages.map((_, i) => (
                                    <button key={i} onClick={() => setActiveIndex(i)}
                                        className={`h-2 rounded-full transition-all ${i === activeIndex ? 'bg-white w-5' : 'bg-white/40 w-2 hover:bg-white/60'}`} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
