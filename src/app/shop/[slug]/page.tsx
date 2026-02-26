import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/actions/product";
import ProductCartOptions from "./ProductCartOptions";

export const dynamic = "force-dynamic";

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const product = await getProductBySlug(resolvedParams.slug);

    if (!product) {
        notFound();
    }

    return (
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
                    <div className="lg:col-span-7 flex flex-col gap-4">
                        <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-neutral-800 border border-white/5 p-8 relative group">
                            <img
                                alt={product.name}
                                className="h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-105 mix-blend-multiply"
                                style={{ mixBlendMode: product.imageUrl?.includes("placeholder") ? "normal" : "normal" }} // Assuming clear assets. Real shots don't need multiply unless they have white backgrounds.
                                src={product.imageUrl || "/placeholder.jpg"}
                            />
                            {product.stock <= 0 && (
                                <div className="absolute top-4 left-4 bg-slate-800 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                                    Sold Out
                                </div>
                            )}
                            <button className="absolute bottom-4 right-4 size-10 bg-white/10 backdrop-blur-md shadow-lg rounded-full flex items-center justify-center text-white hover:text-primary hover:bg-white/20 transition-all border border-white/10">
                                <span className="material-symbols-outlined">zoom_in</span>
                            </button>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="lg:col-span-5 flex flex-col h-full">
                        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-2">{product.name}</h1>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center gap-1 text-yellow-500">
                                <span className="material-symbols-outlined !text-[20px] fill-current">star</span>
                                <span className="material-symbols-outlined !text-[20px] fill-current">star</span>
                                <span className="material-symbols-outlined !text-[20px] fill-current">star</span>
                                <span className="material-symbols-outlined !text-[20px] fill-current">star</span>
                                <span className="material-symbols-outlined !text-[20px] fill-current">star</span>
                            </div>
                            <span className="text-sm font-medium text-slate-400 hover:text-primary transition-colors cursor-pointer">Reviews</span>
                            <span className="h-4 w-px bg-white/10"></span>
                            <span className={`text-sm font-medium flex items-center gap-1 ${product.stock > 0 ? "text-green-500" : "text-red-500"}`}>
                                <span className="material-symbols-outlined !text-[16px]">{product.stock > 0 ? "check_circle" : "cancel"}</span>
                                {product.stock > 0 ? "In Stock" : "Out of Stock"}
                            </span>
                        </div>
                        <div className="flex items-baseline gap-3 mb-8">
                            <span className="text-4xl font-bold text-white">₹{product.price.toLocaleString('en-IN')}</span>
                        </div>

                        <div className="space-y-6 flex-1">
                            <ProductCartOptions product={{
                                id: product.id,
                                name: product.name,
                                price: product.price,
                                stock: product.stock,
                                imageUrl: product.imageUrl
                            }} />
                            <div className="pt-4 text-slate-400">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="material-symbols-outlined !text-lg text-primary">local_shipping</span>
                                    <span>Free Expedited Shipping</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined !text-lg text-primary">verified_user</span>
                                    <span>1 Year Professional Warranty</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tabs Section */}
                    <div className="mt-20">
                        <div className="border-b border-white/10">
                            <nav aria-label="Tabs" className="-mb-px flex gap-8 overflow-x-auto">
                                <span className="border-b-2 border-primary py-4 px-1 text-sm font-bold text-primary cursor-pointer">
                                    Description
                                </span>
                                <span className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-slate-400 hover:border-white/20 hover:text-white transition-colors cursor-pointer">
                                    Specifications
                                </span>
                            </nav>
                        </div>
                        <div className="py-10 grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-6 text-slate-300">
                                <h3 className="text-xl font-bold text-white">{product.name}</h3>
                                <p className="leading-relaxed font-light">
                                    {product.description}
                                </p>
                            </div>
                            <div className="bg-card-dark rounded-2xl border border-white/5 p-6 md:p-8">
                                <h3 className="text-lg font-bold text-white mb-6">Technical Specs</h3>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 py-3 border-b border-white/5">
                                        <span className="text-slate-400">Willow Type</span>
                                        <span className="text-white font-medium text-right">Kashmir Willow</span>
                                    </div>
                                    <div className="grid grid-cols-2 py-3 border-b border-white/5">
                                        <span className="text-slate-400">Grade</span>
                                        <span className="text-white font-medium text-right">Premium</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
