import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ── Simple in-memory rate limiter ────────────────────────────────────────────
// Limit: 10 requests per 60 seconds per IP
// Works perfectly for single-server VPS deployments (Coolify)
const RATE_LIMIT = 10;
const WINDOW_MS = 60 * 1000; // 60 seconds

const requestLog = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const entry = requestLog.get(ip);

    if (!entry || now > entry.resetAt) {
        requestLog.set(ip, { count: 1, resetAt: now + WINDOW_MS });
        return false;
    }

    if (entry.count >= RATE_LIMIT) {
        return true;
    }

    entry.count++;
    return false;
}

// Clean up old entries every 5 minutes to prevent memory leak
setInterval(() => {
    const now = Date.now();
    requestLog.forEach((entry, ip) => {
        if (now > entry.resetAt) requestLog.delete(ip);
    });
}, 5 * 60 * 1000);

// ── Route handler ─────────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
    // Get real IP (Coolify / nginx passes it via x-forwarded-for)
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
        ?? req.headers.get("x-real-ip")
        ?? "unknown";

    if (isRateLimited(ip)) {
        return NextResponse.json(
            { error: "Too many requests. Please wait a minute and try again." },
            { status: 429, headers: { "Retry-After": "60" } }
        );
    }

    const phone = req.nextUrl.searchParams.get("phone")?.trim();
    const code = req.nextUrl.searchParams.get("code")?.trim().toUpperCase();

    if (!phone || !code) {
        return NextResponse.json({ error: "Phone and tracking code are required." }, { status: 400 });
    }

    // Basic sanity checks to stop obvious probing
    if (phone.length > 20 || code.length > 10) {
        return NextResponse.json({ error: "Invalid input." }, { status: 400 });
    }

    try {
        const order = await (prisma.order as any).findFirst({
            where: {
                phone: { contains: phone.replace(/\s/g, "").replace("+91", "").slice(-10) },
                trackingCode: code,
            },
            include: {
                items: {
                    include: {
                        product: { select: { name: true, imageUrl: true, slug: true } },
                    },
                },
            },
        });

        if (!order) {
            return NextResponse.json(
                { error: "No order found. Check your phone number and tracking code." },
                { status: 404 }
            );
        }

        return NextResponse.json({ order });
    } catch (err) {
        console.error("[track-order]", err);
        return NextResponse.json({ error: "Server error. Please try again." }, { status: 500 });
    }
}
