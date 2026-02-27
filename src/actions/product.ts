"use server";

import { prisma } from "@/lib/prisma";

// Fetch all products for the shop page
export async function getProducts() {
    try {
        const products = await prisma.product.findMany({
            orderBy: { createdAt: "desc" },
            include: { variations: true }
        });
        return products;
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return [];
    }
}

// Fetch a single product by its slug
export async function getProductBySlug(slug: string) {
    try {
        const product = await prisma.product.findUnique({
            where: { slug },
            include: { variations: true }
        });
        return product;
    } catch (error) {
        console.error(`Failed to fetch product ${slug}:`, error);
        return null;
    }
}

// Fetch related products (same category, excluding current product)
export async function getRelatedProducts(currentProductId: string, category: string | null, limit = 4) {
    try {
        const where: any = { id: { not: currentProductId } };
        if (category) where.category = category;
        const products = await (prisma.product as any).findMany({
            where,
            take: limit,
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                slug: true,
                name: true,
                price: true,
                compareAtPrice: true,
                imageUrl: true,
                stock: true,
                category: true,
            }
        });
        // If same-category doesn't fill limit, backfill with random products
        if (products.length < limit) {
            const extras = await (prisma.product as any).findMany({
                where: { id: { not: currentProductId }, ...(products.length > 0 ? { NOT: { id: { in: products.map((p: any) => p.id) } } } : {}) },
                take: limit - products.length,
                orderBy: { createdAt: "desc" },
                select: { id: true, slug: true, name: true, price: true, compareAtPrice: true, imageUrl: true, stock: true, category: true }
            });
            return [...products, ...extras] as any[];
        }
        return products as any[];
    } catch (error) {
        console.error("Failed to fetch related products:", error);
        return [];
    }
}
