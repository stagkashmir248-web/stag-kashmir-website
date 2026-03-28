"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

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
    
    const thumbsRef = useRef<HTMLDivElement>(null);

    // Scroll active thumbnail into view
    useEffect(() => {
        if (!thumbsRef.current) return;
        const activeThumb = thumbsRef.current.children[activeIndex] as HTMLElement;
        if (activeThumb) {
            // Check if mobile (horizontal scroll) or desktop (vertical scroll)
            const isDesktop = window.innerWidth >= 768;
            if (isDesktop) {
                const containerHeight = thumbsRef.current.clientHeight;
                const thumbTop = activeThumb.offsetTop;
                if (thumbTop < thumbsRef.current.scrollTop || thumbTop > thumbsRef.current.scrollTop + containerHeight - 80) {
                    thumbsRef.current.scrollTo({ top: thumbTop - 40, behavior: 'smooth' });
                }
            } else {
                const containerWidth = thumbsRef.current.clientWidth;
                const thumbLeft = activeThumb.offsetLeft;
                if (thumbLeft < thumbsRef.current.scrollLeft || thumbLeft > thumbsRef.current.scrollLeft + containerWidth - 80) {
                    thumbsRef.current.scrollTo({ left: thumbLeft - 40, behavior: 'smooth' });
                }
            }
        }
    }, [activeIndex]);

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

    // Auto-scroll logic
    useEffect(() => {
        if (allImages.length <= 1 || zoomed) return;
        const timer = setInterval(() => setActiveIndex(i => (i + 1) % allImages.length), 6000);
        return () => clearInterval(timer);
    }, [allImages.length, zoomed, activeIndex]);

    return (
        <>
            <div className="flex flex-col-reverse md:flex-row gap-3 w-full">
                
                {/* ── THUMBNAILS (Horizontal on Mobile, Vertical on Desktop) ── */}
                {allImages.length > 1 && (
                    <div 
                        ref={thumbsRef}
                        className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto md:w-20 lg:w-24 shrink-0 pb-2 md:pb-0 md:pr-1 custom-scrollbar"
                        style={{ maxHeight: "calc(100vw - 2rem)", mdMaxHeight: "500px" } as any}
                    >
                        {allImages.map((img, i) => (
                            <button 
                                key={i} 
                                onClick={() => setActiveIndex(i)}
                                className={`relative shrink-0 size-16 md:w-full md:h-20 lg:h-24 rounded-lg overflow-hidden bg-white border-2 transition-all duration-200 ${
                                    i === activeIndex 
                                        ? 'border-primary shadow-[0_0_10px_rgba(212,175,55,0.3)]' 
                                        : 'border-slate-200/20 opacity-55 hover:opacity-90 hover:border-white/30'
                                }`}
                                aria-label={`View image ${i + 1}`}
                            >
                                <Image src={img} alt={`Thumbnail ${i + 1}`} fill className="object-contain p-1" sizes="96px" />
                            </button>
                        ))}
                    </div>
                )}
                
                {/* ── MAIN IMAGE PANE ── */}
                <div className="relative overflow-hidden rounded-xl bg-white border border-white/10 group aspect-square flex-1 w-full shrink-0">
                    <div className="absolute inset-4 flex items-center justify-center">
                        <Image 
                            key={activeImg} 
                            src={activeImg} 
                            alt={productName} 
                            fill 
                            className="object-contain transition-all duration-300" 
                            sizes="(max-width: 768px) 100vw, 50vw" 
                            priority={true} 
                        />
                    </div>
                    
                    {outOfStock && (
                        <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide border border-white/10">
                            Sold Out
                        </div>
                    )}
                    
                    {allImages.length > 1 && (
                        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md text-white text-xs font-medium px-2 py-0.5 rounded-full border border-white/10">
                            {activeIndex + 1} / {allImages.length}
                        </div>
                    )}
                    
                    <button onClick={() => setZoomed(true)}
                        className="absolute bottom-3 right-3 size-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:text-primary hover:bg-black/60 transition-all border border-white/10 opacity-0 group-hover:opacity-100 focus:opacity-100">
                        <span className="material-symbols-outlined !text-[20px]">zoom_in</span>
                    </button>
                    
                    {allImages.length > 1 && (
                        <>
                            <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 size-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-all border border-white/10 opacity-0 group-hover:opacity-100 focus:opacity-100">
                                <span className="material-symbols-outlined !text-[24px]">chevron_left</span>
                            </button>
                            <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 size-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-all border border-white/10 opacity-0 group-hover:opacity-100 focus:opacity-100">
                                <span className="material-symbols-outlined !text-[24px]">chevron_right</span>
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* LIGHTBOX */}
            {zoomed && (
                <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setZoomed(false)}>
                    <div className="relative max-w-4xl w-full h-[95vh] flex items-center justify-center" onClick={e => e.stopPropagation()}>
                        <div className="relative w-full h-full">
                            <Image 
                                src={activeImg} 
                                alt={productName} 
                                fill
                                className="object-contain" 
                                sizes="100vw"
                            />
                        </div>
                        <button onClick={() => setZoomed(false)} className="absolute top-0 right-0 z-10 size-12 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-white/20 border border-white/10 transition-colors">
                            <span className="material-symbols-outlined !text-[24px]">close</span>
                        </button>
                        
                        {allImages.length > 1 && (
                            <>
                                <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-0 top-1/2 -translate-y-1/2 size-12 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all border border-white/10">
                                    <span className="material-symbols-outlined !text-[30px]">chevron_left</span>
                                </button>
                                <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-0 top-1/2 -translate-y-1/2 size-12 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all border border-white/10">
                                    <span className="material-symbols-outlined !text-[30px]">chevron_right</span>
                                </button>
                                
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2 pb-2">
                                    {allImages.map((_, i) => (
                                        <button key={i} onClick={(e) => { e.stopPropagation(); setActiveIndex(i); }}
                                            className={`h-2.5 rounded-full transition-all ${i === activeIndex ? 'bg-primary w-6' : 'bg-white/40 w-2.5 hover:bg-white/80'}`} />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
