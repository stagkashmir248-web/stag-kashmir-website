"use server";

import { prisma } from "@/lib/prisma";

// Fetch all products for the shop page
export async function getProducts() {
    try {
        const products = await prisma.product.findMany({
            orderBy: { createdAt: "desc" },
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
        });
        return product;
    } catch (error) {
        console.error(`Failed to fetch product ${slug}:`, error);
        return null;
    }
}
