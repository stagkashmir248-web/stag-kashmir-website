import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import AdminOrdersClient from "./AdminOrdersClient";
import MarkViewedEffect from "@/components/MarkViewedEffect";

export const dynamic = "force-dynamic";

// Cache the orders query for 30 seconds so cold DB connections don't block
// every single page load. Revalidated on-demand when an order status changes.
const getCachedOrders = unstable_cache(
    async () => {
        const orders = await prisma.order.findMany({
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                customer: true,
                email: true,
                phone: true,
                address: true,
                city: true,
                state: true,
                pincode: true,
                total: true,
                amountPaid: true,
                paymentType: true,
                status: true,
                createdAt: true,
                updatedAt: true,
                items: {
                    select: {
                        id: true,
                        quantity: true,
                        price: true,
                        product: {
                            select: { name: true, imageUrl: true },
                        },
                    },
                },
            },
        });

        return orders.map(o => ({
            ...o,
            createdAt: o.createdAt.toISOString(),
            updatedAt: o.updatedAt.toISOString(),
        }));
    },
    ["admin-orders"],
    { revalidate: 30, tags: ["admin-orders"] }
);

export default async function AdminOrdersPage() {
    const orders = await getCachedOrders();

    return (
        <>
            <MarkViewedEffect type="orders" />
            <AdminOrdersClient orders={orders as any} />
        </>
    );
}
