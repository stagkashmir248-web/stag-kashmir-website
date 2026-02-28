require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const p = await prisma.product.findFirst({
        where: { slug: 'test' },
        include: { orderItems: true }
    });

    if (!p) {
        console.log('Product "test" not found');
        return;
    }

    const orderIds = p.orderItems.map(item => item.orderId);
    const uniqueOrderIds = [...new Set(orderIds)];

    console.log(`Found ${uniqueOrderIds.length} orders containing "test" product. Deleting them...`);

    for (const oid of uniqueOrderIds) {
        // Delete order items first
        await prisma.orderItem.deleteMany({ where: { orderId: oid } });
        // Delete order
        await prisma.order.delete({ where: { id: oid } });
        console.log(`Deleted order ${oid}`);
    }

    console.log('Successfully cleared all test orders! You can now delete the product from the UI.');
}
main();
