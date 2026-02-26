require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const newProducts = [
    {
        name: 'Gorilla Edition Hard Tennis Bat',
        slug: 'gorilla-edition-hard-tennis-bat',
        description: 'Premium heavyweight hard tennis bat designed for maximum boundary hitting.',
        price: 2499,
        stock: 50,
        imageUrl: '/Gorilla%20Edition%20Hard%20Tennis%20Bat.webp',
    },
    {
        name: 'Thala Edition Hard Tennis Bat',
        slug: 'thala-edition-hard-tennis-bat',
        description: 'Elite grade hard tennis bat with a mid-high sweet spot, inspired by legendary finishers.',
        price: 2999,
        stock: 100,
        imageUrl: '/Thala%20Edition%20Hard%20Tennis%20Bat.webp',
    },
    {
        name: 'Wolverine Gold Edition Hard Tennis Bat',
        slug: 'wolverine-gold-edition',
        description: 'Exclusive Gold Edition Wolverine series. Perfectly balanced for all formats.',
        price: 3499,
        stock: 25,
        imageUrl: '/Wolverine%20Hard%20Tennis%20Bat%20Gold%20Edition.webp',
    },
    {
        name: 'Wolverine Hard Tennis Bat',
        slug: 'wolverine-hard-tennis',
        description: 'Standard Wolverine series hard tennis bat, offering superior pickup and durability.',
        price: 1899,
        stock: 75,
        imageUrl: '/Wolverine%20Hard%20Tennis%20Bat.webp',
    }
];

async function main() {
    console.log(`Start seeding new bats ...`);
    for (const p of newProducts) {
        const product = await prisma.product.upsert({
            where: { slug: p.slug },
            update: p,
            create: p,
        });
        console.log(`Created/Updated product: ${product.name}`);
    }
    console.log(`Seeding finished successfully.`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
