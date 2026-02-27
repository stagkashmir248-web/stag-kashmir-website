import { prisma } from "@/lib/prisma";
import AdminOrdersClient from "./AdminOrdersClient";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
    const orders = await prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            items: {
                include: {
                    product: {
                        select: { name: true, imageUrl: true },
                    },
                },
            },
        },
    });

    // Serialize for client (dates become strings)
    const serialized = orders.map(o => ({
        ...o,
        createdAt: o.createdAt.toISOString(),
        updatedAt: o.updatedAt.toISOString(),
    }));

    return <AdminOrdersClient orders={serialized as any} />;
}
