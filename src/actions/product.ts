// Server-only data fetching utilities (no "use server" — these are not Server Actions)

import { prisma } from "@/lib/prisma";

import { unstable_cache } from "next/cache";

// Fetch all products for the shop page
export const getProducts = unstable_cache(
    async () => {
        try {
            const products = await prisma.product.findMany({
                where: { isArchived: false },
                orderBy: { createdAt: "desc" },
                include: {
                    variations: true,
                    reviews: { where: { approved: true }, select: { rating: true } },
                    _count: { select: { reviews: { where: { approved: true } } } }
                }
            });
            return products.map(p => ({
                ...p,
                reviewCount: p._count?.reviews ?? 0,
                avgRating: p.reviews.length > 0
                    ? p.reviews.reduce((s: number, r: { rating: number }) => s + r.rating, 0) / p.reviews.length
                    : 0,
            }));
        } catch (error) {
            console.error("Failed to fetch products:", error);
            return [];
        }
    },
    ["website-products"],
    {
        revalidate: 3600,
        tags: ["products"]
    }
);

// Lightweight fetch for homepage featured section — avoids the 2MB cache limit
// Only selects the fields actually rendered in the product cards
export const getFeaturedProducts = unstable_cache(
    async (limit = 4) => {
        try {
            const products = await prisma.product.findMany({
                where: { isArchived: false },
                orderBy: { createdAt: "desc" },
                take: limit,
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    price: true,
                    compareAtPrice: true,
                    imageUrl: true,
                    images: true,
                    stock: true,
                    createdAt: true,
                    _count: { select: { reviews: { where: { approved: true } } } },
                    reviews: { where: { approved: true }, select: { rating: true } },
                },
            });
            return products.map(p => ({
                ...p,
                reviewCount: p._count?.reviews ?? 0,
                avgRating: (p as any).reviews?.length > 0
                    ? (p as any).reviews.reduce((s: number, r: { rating: number }) => s + r.rating, 0) / (p as any).reviews.length
                    : 0,
            }));
        } catch (error) {
            console.error("Failed to fetch featured products:", error);
            return [];
        }
    },
    ["website-featured-products"],
    {
        revalidate: 3600,
        tags: ["products"]
    }
);

// Fetch a single product by its slug
export const getProductBySlug = unstable_cache(
    async (slug: string) => {
        try {
            const product = await prisma.product.findFirst({
                where: { slug, isArchived: false },
                include: { variations: true }
            });
            return product;
        } catch (error) {
            console.error(`Failed to fetch product ${slug}:`, error);
            return null;
        }
    },
    ["website-product-by-slug"],
    {
        revalidate: 3600,
        tags: ["products"]
    }
);

// Fetch related products (same category, excluding current product)
export const getRelatedProducts = unstable_cache(
    async (currentProductId: string, category: string | null, limit = 4) => {
        try {
            const where: any = { id: { not: currentProductId }, isArchived: false };
            if (category) where.category = category;
            const sharedSelect = {
                id: true, slug: true, name: true, price: true, compareAtPrice: true,
                imageUrl: true, stock: true, category: true,
                _count: { select: { reviews: { where: { approved: true } } } },
                reviews: { where: { approved: true }, select: { rating: true } },
            };
            const products = await (prisma.product as any).findMany({
                where, take: limit, orderBy: { createdAt: "desc" }, select: sharedSelect
            });
            // If same-category doesn't fill limit, backfill with random products
            if (products.length < limit) {
                const extras = await (prisma.product as any).findMany({
                    where: { isArchived: false, id: { not: currentProductId }, ...(products.length > 0 ? { NOT: { id: { in: products.map((p: any) => p.id) } } } : {}) },
                    take: limit - products.length,
                    orderBy: { createdAt: "desc" },
                    select: sharedSelect
                });
                return [...products, ...extras].map((p: any) => ({
                    ...p,
                    reviewCount: p._count?.reviews ?? 0,
                    avgRating: p.reviews?.length > 0 ? p.reviews.reduce((s: number, r: { rating: number }) => s + r.rating, 0) / p.reviews.length : 0,
                }));
            }
            return products.map((p: any) => ({
                ...p,
                reviewCount: p._count?.reviews ?? 0,
                avgRating: p.reviews?.length > 0 ? p.reviews.reduce((s: number, r: { rating: number }) => s + r.rating, 0) / p.reviews.length : 0,
            }));
        } catch (error) {
            console.error("Failed to fetch related products:", error);
            return [];
        }
    },
    ["website-related-products"],
    {
        revalidate: 3600,
        tags: ["products"]
    }
);

// Fetch products based on search query for live suggestions
export const searchProducts = async (query: string, limit = 5) => {
    try {
        if (!query.trim()) return [];
        const products = await prisma.product.findMany({
            where: {
                isArchived: false,
                OR: [
                    { name: { contains: query, mode: "insensitive" } },
                    { category: { contains: query, mode: "insensitive" } }
                ]
            },
            take: limit,
            select: {
                id: true,
                slug: true,
                name: true,
                price: true,
                imageUrl: true,
                category: true,
            }
        });
        return products;
    } catch (error) {
        console.error("Failed to search products:", error);
        return [];
    }
};
