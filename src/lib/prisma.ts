import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// connection_limit keeps pool small on a single-server VPS;
// pool_timeout=10 fails fast instead of queuing for 20+ seconds.
function createPrismaClient() {
    const baseUrl = process.env.DATABASE_URL ?? "";
    // Only append pool params if not already present
    const url = baseUrl.includes("connection_limit")
        ? baseUrl
        : `${baseUrl}${baseUrl.includes("?") ? "&" : "?"}connection_limit=5&pool_timeout=10`;

    return new PrismaClient({
        datasources: { db: { url } },
        log: process.env.NODE_ENV === "development" ? ["query", "warn", "error"] : ["warn", "error"],
    });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
