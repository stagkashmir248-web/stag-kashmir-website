import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const reviewsData = [
    { authorName: "Ravi Kumar", rating: 5, comment: "Amazing bat, great balance and ping! The scoop really lightens the weight.", approved: true },
    { authorName: "Amit Sharma", rating: 5, comment: "Perfect for hard tennis cricket. Huge hitting area.", approved: true },
    { authorName: "Sandeep Singh", rating: 4, comment: "Good quality Kashmir willow. Worth the price. Pickup is smooth.", approved: true },
    { authorName: "Vikash Patel", rating: 5, comment: "The single scoop design is a game changer. Super light feel.", approved: true },
    { authorName: "Rohit Verma", rating: 4, comment: "Solid bat, edges are thick and hits the ball miles.", approved: true },
    { authorName: "Manoj Tiwari", rating: 5, comment: "Best bat I have bought for tennis cricket tournaments.", approved: true },
    { authorName: "Anil Desai", rating: 5, comment: "Delivery was fast, bat is exactly as described. Love the Stag Kashmir quality.", approved: true },
    { authorName: "Deepak Gupta", rating: 4, comment: "Handle grip is very comfortable. Stroke is excellent.", approved: true },
    { authorName: "Prakash Reddy", rating: 5, comment: "Very powerful strokes. The ball flies off the middle.", approved: true },
    { authorName: "Kiran Joshi", rating: 5, comment: "Highly recommended for professional hard tennis players.", approved: true },
    { authorName: "Suresh Menon", rating: 4, comment: "Good balance, though it took a couple of days to get used to the scoop design.", approved: true },
    { authorName: "Gaurav Malhotra", rating: 5, comment: "Exceptional craftsmanship. The wood quality is top notch.", approved: true },
    { authorName: "Rajesh Nair", rating: 5, comment: "Value for money. Plays beautifully against heavy tennis balls.", approved: true },
    { authorName: "Nitish Jha", rating: 4, comment: "Nice weight distribution. Feels effortless to swing.", approved: true },
    { authorName: "Arjun Das", rating: 5, comment: "A beast of a bat! Have been scoring heavily since I started using it.", approved: true }
];

async function main() {
    console.log("Searching for product 'Single Scoop Hard Tennis'...");
    const products = await prisma.product.findMany({
        where: { name: { contains: "Single Scoop Hard Tennis", mode: "insensitive" } }
    });

    if (products.length === 0) {
        console.error("Could not find a product matching 'Single Scoop Hard Tennis'");
        return;
    }

    const product = products[0];
    console.log(`Found product: ${product.name} (ID: ${product.id})`);

    let count = 0;
    for (const data of reviewsData) {
        await prisma.review.create({
            data: {
                productId: product.id,
                authorName: data.authorName,
                rating: data.rating,
                comment: data.comment,
                approved: data.approved
            }
        });
        count++;
    }

    console.log(`Successfully added ${count} reviews to '${product.name}'!`);
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
