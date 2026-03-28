const fs = require('fs');
const path = require('path');

// Manually parse .env.local and set process.env
try {
    const envContent = fs.readFileSync(path.join(__dirname, '.env.local'), 'utf-8');
    envContent.split(/\r?\n/).forEach(line => {
        const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
        if (match) {
            let key = match[1];
            let value = match[2] || '';
            // Handle quotes
            if (value.startsWith('"') && value.endsWith('"')) {
                value = value.slice(1, -1);
            }
            process.env[key] = value;
        }
    });
} catch (e) {
    console.warn("Could not load .env.local");
}

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const product = await prisma.product.findFirst({
            where: {
                name: {
                    contains: "Boom Edition Hard Tennis",
                    mode: "insensitive"
                }
            }
        });

        if (!product) {
            console.log("Could not find the product 'Boom Edition Hard Tennis'");
            return;
        }

        console.log(`Found product: ${product.name} (ID: ${product.id})`);

        // Create 3 realistic reviews
        const reviewsData = [
            {
                productId: product.id,
                authorName: "Rohan Khanna",
                rating: 5,
                comment: "Absolutely amazing bat! The punch is incredible and it feels very lightweight. Perfect for hard tennis balls.",
                approved: true
            },
            {
                productId: product.id,
                authorName: "Vikram Singh",
                rating: 5,
                comment: "Quality is top notch. Delivery was fast and the willow is exactly as described. Hitting sixes has never been easier.",
                approved: true
            },
            {
                productId: product.id,
                authorName: "Aditya Sharma",
                rating: 4,
                comment: "Very solid bat profile. The grip is comfortable and works well in local tournaments. Good value for money.",
                approved: true
            }
        ];

        const created = await prisma.review.createMany({
            data: reviewsData
        });

        console.log(`Successfully added ${created.count} reviews to '${product.name}'.`);
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
