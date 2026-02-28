import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const authors = [
        "Ravi Kumar", "Amit Sharma", "Sandeep Singh", "Vikash Patel",
        "Rohit Verma", "Manoj Tiwari", "Anil Desai", "Deepak Gupta",
        "Prakash Reddy", "Kiran Joshi", "Suresh Menon", "Gaurav Malhotra",
        "Rajesh Nair", "Nitish Jha", "Arjun Das"
    ];

    console.log("Randomizing dates for 15 reviews...");

    // Find the reviews by these authors for the specific product
    const reviews = await prisma.review.findMany({
        where: {
            authorName: { in: authors }
        }
    });

    console.log(`Found ${reviews.length} reviews to update.`);

    for (const review of reviews) {
        // Generate random date within the last 3 years (1095 days)
        const daysToSubtract = Math.floor(Math.random() * 1095);
        const randomDate = new Date();
        randomDate.setDate(randomDate.getDate() - daysToSubtract);

        await prisma.review.update({
            where: { id: review.id },
            data: {
                createdAt: randomDate
            }
        });

        console.log(`Updated review by ${review.authorName} to date: ${randomDate.toDateString()}`);
    }

    console.log("All review dates randomized successfully!");
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
