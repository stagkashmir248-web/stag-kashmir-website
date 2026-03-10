import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts } from "@/actions/product";
import { getReviewsForProduct } from "@/actions/review";
import ProductCartOptions from "./ProductCartOptions";
import ProductGallery from "./ProductGallery";
import ProductReviews from "./ProductReviews";
import ShareButtons from "./ShareButtons";
import RelatedProducts from "./RelatedProducts";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const product = await getProductBySlug(resolvedParams.slug);
    if (!product) return { title: 'Product Not Found' };

    const siteUrl = 'https://stagkashmir.com';
    const productUrl = `${siteUrl}/shop/${product.slug}`;
    const image = (product as any).imageUrl || (product as any).images?.[0];
    const description = product.description.length > 155
        ? product.description.slice(0, 152) + '...'
        : product.description;

    return {
        title: `${product.name} — Buy Online`,
        description,
        keywords: [
            product.name,
            'Kashmir willow cricket bat',
            'buy cricket bat online',
            (product as any).category ?? '',
            (product as any).willowType ?? '',
        ].filter(Boolean),
        alternates: { canonical: productUrl },
        openGraph: {
            title: `${product.name} | Stag Kashmir`,
            description,
            url: productUrl,
            type: 'website',
            images: image ? [{ url: image, width: 800, height: 800, alt: product.name }] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${product.name} | Stag Kashmir`,
            description,
            images: image ? [image] : [],
        },
    };
}


export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const product = await getProductBySlug(resolvedParams.slug);

    if (!product) notFound();

    const [reviews, relatedProducts] = await Promise.all([
        getReviewsForProduct(product.id),
        getRelatedProducts(product.id, (product as any).category ?? null),
    ]);
    const avgRating = reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;
    const productUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://stagkashmir.com"}/shop/${product.slug}`;

    // Schema.org structured data for Google rich results
    const schemaOrg = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "description": product.description,
        "image": product.imageUrl || product.images?.[0],
        "url": productUrl,
        "brand": { "@type": "Brand", "name": "Stag Kashmir" },
        "offers": {
            "@type": "Offer",
            "priceCurrency": "INR",
            "price": product.price,
            "availability": product.stock > 0
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
            "url": productUrl,
            "seller": { "@type": "Organization", "name": "Stag Kashmir" }
        },
        ...(reviews.length > 0 && {
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": avgRating.toFixed(1),
                "reviewCount": reviews.length,
                "bestRating": 5,
                "worstRating": 1
            }
        })
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
            />
            <main className="flex-1 flex justify-center py-8 px-4 sm:px-8 lg:px-12">
                <div className="flex flex-col w-full max-w-[1280px]">
                    {/* Breadcrumb */}
                    <div className="flex flex-wrap items-center gap-2 pb-6 text-sm">
                        <Link className="text-slate-400 hover:text-primary font-medium transition-colors" href="/">Home</Link>
                        <span className="text-slate-600">/</span>
                        <Link className="text-slate-400 hover:text-primary font-medium transition-colors" href="/shop">Cricket Bats</Link>
                        <span className="text-slate-600">/</span>
                        <span className="text-white font-semibold">{product.name}</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16">
                        {/* Image Gallery */}
                        <div className="lg:col-span-6">
                            <ProductGallery
                                mainImage={product.imageUrl}
                                extraImages={product.images || []}
                                productName={product.name}
                                outOfStock={product.stock <= 0}
                            />
                        </div>

                        {/* Product Info */}
                        <div className="lg:col-span-6 flex flex-col h-full">
                            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-2">{product.name}</h1>

                            {/* Rating row */}
                            <div className="flex items-center gap-3 mb-3">
                                <div className="flex items-center gap-0.5">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <span key={i} className={`material-symbols-outlined !text-[18px] ${Math.round(avgRating) >= i ? "text-yellow-400" : "text-slate-600"}`}
                                            style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                    ))}
                                </div>
                                {reviews.length > 0 && (
                                    <span className="text-sm text-slate-400">{avgRating.toFixed(1)} ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})</span>
                                )}
                                <span className="h-4 w-px bg-white/10"></span>
                                <span className={`text-sm font-medium flex items-center gap-1 ${product.stock > 0 ? "text-green-500" : "text-red-500"}`}>
                                    <span className="material-symbols-outlined !text-[16px]">{product.stock > 0 ? "check_circle" : "cancel"}</span>
                                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                                </span>
                            </div>

                            {/* Stock urgency */}
                            {product.stock > 0 && product.stock <= 5 && (
                                <div className="flex items-center gap-2 mb-4 px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-lg w-fit">
                                    <span className="material-symbols-outlined !text-[16px] text-red-400 animate-pulse">warning</span>
                                    <span className="text-red-400 text-sm font-semibold">Only {product.stock} left in stock — order soon!</span>
                                </div>
                            )}

                            <div className="space-y-6 flex-1 mt-4">
                                <ProductCartOptions product={{
                                    id: product.id,
                                    name: product.name,
                                    price: product.price,
                                    compareAtPrice: (product as any).compareAtPrice,
                                    stock: product.stock,
                                    imageUrl: product.imageUrl,
                                    variations: product.variations
                                }} />

                                {/* COD + Payment badges — tile style */}
                                <div className="border border-white/8 rounded-xl overflow-hidden divide-x divide-white/8 flex flex-wrap">
                                    <div className="flex items-center gap-2 px-4 py-3 flex-1 min-w-[130px]">
                                        <span className="material-symbols-outlined !text-[20px] text-green-400">payments</span>
                                        <span className="text-xs font-semibold text-white leading-tight">Cash on<br />Delivery</span>
                                    </div>
                                    <div className="flex items-center gap-2 px-4 py-3 flex-1 min-w-[120px] border-l border-white/8">
                                        <span className="material-symbols-outlined !text-[20px] text-blue-400">smartphone</span>
                                        <span className="text-xs font-semibold text-white leading-tight">UPI<br />Accepted</span>
                                    </div>
                                    <div className="flex items-center gap-2 px-4 py-3 flex-1 min-w-[100px] border-l border-white/8">
                                        <span className="material-symbols-outlined !text-[20px] text-purple-400">credit_card</span>
                                        <span className="text-xs font-semibold text-white leading-tight">All<br />Cards</span>
                                    </div>
                                    <div className="flex items-center gap-2 px-4 py-3 flex-1 min-w-[120px] border-l border-white/8">
                                        <span className="material-symbols-outlined !text-[20px] text-yellow-400">lock</span>
                                        <span className="text-xs font-semibold text-white leading-tight">Secure<br />Checkout</span>
                                    </div>
                                </div>

                                {/* Share buttons */}
                                <ShareButtons productName={product.name} productUrl={productUrl} />
                            </div>
                        </div>

                        {/* Description + Specs Section */}
                        <div className="mt-8 lg:col-span-12">
                            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

                                {/* LEFT: Description */}
                                <div className="lg:col-span-3 flex flex-col gap-6">
                                    <div className="flex items-center gap-3">
                                        <span className="w-1 h-6 bg-primary rounded-full inline-block"></span>
                                        <h2 className="text-xl font-bold text-white tracking-tight">About this Bat</h2>
                                    </div>
                                    <p className="text-slate-300 leading-relaxed text-base font-light border-l-2 border-primary/30 pl-5">
                                        {product.description}
                                    </p>
                                    {(product as any).features?.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {(product as any).features.map((f: string) => (
                                                <span key={f} className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-white/5 text-slate-300 border border-white/10">
                                                    <span className="material-symbols-outlined !text-[14px] text-primary">check_circle</span>
                                                    {f}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* RIGHT: Specs */}
                                {(() => {
                                    const p = product as any;
                                    const specRows = [
                                        { icon: "nature", label: "Willow Type", value: p.willowType },
                                        { icon: "workspace_premium", label: "Grade", value: p.grade },
                                        { icon: "straighten", label: "Blade", value: p.blade },
                                        { icon: "sports_cricket", label: "Ball Type", value: p.ballType },
                                        { icon: "verified", label: "Warranty", value: p.warranty },
                                    ].filter(r => r.value);
                                    const customRows = Array.isArray(p.customSpecs)
                                        ? p.customSpecs.filter((r: any) => r.label && r.value)
                                        : [];
                                    const allRows = [...specRows, ...customRows];
                                    if (allRows.length === 0) return null;
                                    return (
                                        <div className="lg:col-span-2 flex flex-col gap-4">
                                            <div className="flex items-center gap-3">
                                                <span className="w-1 h-6 bg-primary rounded-full inline-block"></span>
                                                <h2 className="text-xl font-bold text-white tracking-tight">Technical Specs</h2>
                                            </div>
                                            <div className="bg-white/[0.03] border border-white/8 rounded-2xl overflow-hidden divide-y divide-white/5">
                                                {allRows.map(({ icon, label, value }: { icon: string; label: string; value: string }) => (
                                                    <div key={label} className="flex items-center justify-between px-5 py-3.5 hover:bg-white/[0.03] transition-colors group">
                                                        <div className="flex items-center gap-3">
                                                            <span className="material-symbols-outlined !text-[18px] text-primary/70 group-hover:text-primary transition-colors">{icon}</span>
                                                            <span className="text-sm text-slate-400">{label}</span>
                                                        </div>
                                                        <span className="text-sm font-semibold text-white">{value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })()}
                            </div>
                        </div>

                        {/* Reviews Section */}
                        <ProductReviews
                            productId={product.id}
                            productSlug={product.slug}
                            reviews={reviews}
                        />

                        {/* Related Products */}
                        <RelatedProducts
                            products={relatedProducts}
                            currentCategory={(product as any).category ?? null}
                        />
                    </div>
                </div>
            </main>
        </>
    );
}
