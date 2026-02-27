import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
    const phone = req.nextUrl.searchParams.get("phone")?.trim();
    const code = req.nextUrl.searchParams.get("code")?.trim().toUpperCase();

    if (!phone || !code) {
        return NextResponse.json({ error: "Phone and tracking code are required." }, { status: 400 });
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
            return NextResponse.json({ error: "No order found. Check your phone number and tracking code." }, { status: 404 });
        }

        return NextResponse.json({ order });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Server error." }, { status: 500 });
    }
}
