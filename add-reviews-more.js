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

function getRandomDate2026() {
    // Generate a random date between Jan 1, 2026 and Mar 28, 2026
    const start = new Date(2026, 0, 1).getTime();
    const end = new Date(2026, 2, 28).getTime(); // March is month index 2
    const randomTime = start + Math.random() * (end - start);
    return new Date(randomTime);
}

const names = ["Aarav Gupta", "Vihaan Patel", "Rohan Mehta", "Siddharth Verma", "Ishaan Singh", 
               "Karan Joshi", "Arnav Reddy", "Devansh Nair", "Rishi Kapoor", "Kabeer Das", 
               "Yuvan Choudhury", "Dhruv Malhotra", "Samir Roy", "Rahul Bhatia", "Akhil Kumar"];

const comments = [
    "Perfect bat for hard tennis. The sweep spot is huge!",
    "Lightweight and great balance. Would definitely recommend.",
    "The quality of the willow is top notch for the price. Very happy.",
    "Hits beautifully down the ground. The grip is also very solid.",
    "Took this to my local tournament and it performed exceptionally well.",
    "Decent bat. A little heavy for my liking, but the strokes are clear.",
    "Very powerful. Non scoop design actually gives it a better punch.",
    "Love the finishing on this bat. Stag Kashmir delivers again.",
    "I was skeptical but checking the reviews made me buy it. Totally worth it.",
    "Good value for money. Perfect for weekend games.",
    "Excellent strokeplay. The balance is just right for big hits.",
    "I have bought three bats from them, this is easily my favorite.",
    "The build feels premium and durable.",
    "Amazing bat! Smashed three boundaries in my first over with it.",
    "Very nice grip and good thick edges."
];

const ratings = [5, 4, 5, 5, 5, 4, 5, 5, 4, 4, 5, 5, 4, 5, 5];

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

        const reviewsData = names.map((name, i) => ({
            productId: product.id,
            authorName: name,
            rating: ratings[i],
            comment: comments[i],
            approved: true,
            createdAt: getRandomDate2026()
        }));

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
