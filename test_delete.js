require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const p = await prisma.product.findFirst({
        where: { slug: 'test' }
    });
    if (p) {
        try {
            await prisma.product.delete({ where: { id: p.id } });
            console.log('Deleted Test');
        } catch (e) {
            console.log('Deletion Error for Test:', e.message);
        }
    } else {
        console.log('Test product not found');
    }

    const p2 = await prisma.product.findFirst({
        where: { name: { contains: 'Single Scoop' } }
    });
    if (p2) {
        try {
            await prisma.product.delete({ where: { id: p2.id } });
            console.log('Deleted Single Scoop');
        } catch (e) {
            console.log('Deletion Error for Single Scoop:', e.message);
        }
    } else {
        console.log('Single Scoop not found');
    }
}
main();
