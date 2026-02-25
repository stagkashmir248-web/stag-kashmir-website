const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const products = [
    {
        name: 'Thunder Stroke Pro',
        slug: 'thunder-stroke-pro',
        description: 'Grade 1 Kashmir Willow, full profile with massive edges for power hitters.',
        price: 3499,
        stock: 50,
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdI1lC2XyHcHmFlSZUiw8Gp-ZOoNbFHmRyN5gb5CwYn9uHfTkN788evpse6D3BvcXcDmJbFjUo3fFn2KUQZaWhMpCDMsEmY320zqcMxPq9ikXc6TpB8tyF5tvPHBQFjz6jhJBRGyZbz3zKr7tXtswgXfpE-MPAQ-0Drr69WhOj95kAinT-r_80o5X7aI07-KL_tDzukEGJydAoGS0fycFMqsFguGqQVKRi24E4KDBlwb2Mn_E8Ow8WIWXeeOo-GkE1rQzG94sYExsM',
    },
    {
        name: 'Blaster Elite',
        slug: 'blaster-elite',
        description: 'Designed for hard tennis ball cricket, lightweight pickup and punchy drive.',
        price: 1899,
        stock: 100,
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZZJb2fWcuIS2u2slqv5ufy-ntfArx2xJPs1apEuMYitYn31YCNHfduApvWX802gZgxAzYU1jQ8VGx6KvGv3cBIrgLOI1hpaqJS-QWrWtDxjeIzutNaY7oovFNHT-rLbfP7Wx-LAroY2NPXOz9BphGB5vm8bRzr23Jc2lbufsYOgyxC2vUFNY-MUGNRGD-cXCLrBSEAc90zz4961wdESITNBrMhAfysBdcvTN15EzhTCJZIi6696mU2kBU21OLqDJfCoLHHMoyYziv',
    },
    {
        name: 'Stag Master Blaster',
        slug: 'master-blaster',
        description: 'Double blade technology for enhanced sweet spot. Ideal for advanced players.',
        price: 5299,
        stock: 25,
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDC9K1OzjZAlTnfTVEIbOFwd0V72lXTclOkHX9M4ek9QKKVzT_Mh588KhfvSTHVCmuq2juciFMfaN2u8Kf8ErrN1VFMJXYYqs04-6YSwrSNJGJJ8P0Ed35vKlGnqC8wPPsiaEZSs6okwTC8niRTccieVwQ4jYYkkLvk1aYOwNp6An2w8cXdc0hsblHehzPg_eI4X1NIQeig4EMxRkaTKHYOEtZijXl1H5jLiwf1BwXTmSh-NFhmDVn_y1wu5ATjzzEOyOSbfN9heWxV',
    },
    {
        name: 'Scoop Fire',
        slug: 'scoop-fire',
        description: 'Scoop design for lighter weight and faster bat swing speed.',
        price: 2199,
        stock: 0,
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdjTtEIsulLGarNtaimoE30fwVU9djU5tok4tL_Wu1dZNjRONQB44EvsoFfoEktg6eSroBxR9uPJnWIygvQhnh4lTiZ6VHGSGNcMDPy-icvhTxk_4Ry55lgUxxW0E_shPEMdMozzEoVEnyHXVt3X4Qj7QSDnrPg4BCji4Cngx0BZ9IS0WQWzms19RvyTJe6W6UQtH6rrZuuzPX4yzg8n_D458oMTA4KuZegJB-zym9V-1rg7MZHa-E6wZrVNFB6DsPkl-iyRJgwSJV',
    },
    {
        name: 'Classic Drive',
        slug: 'classic-drive',
        description: 'Traditional shape with a lower sweet spot, perfect for front-foot play.',
        price: 3899,
        stock: 30,
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2ky7oBKFBlMpMrY2gqBeL_nxW7D0sruP-PR7WNfFfuVXqCu7iNyUbQncAGuYzEYGH6h0NQlSowxW7984BLoPUxdiWn8RQqTi1CgHKJOhAgKtmreD8B_Iv7NJjIFx2yE64wpAiDw754jk0rTNBpPiBjuqbW38DeuZ7y284Dss_4QVN3jBdN632vCn7vZMnDHQLQxBjd9pc3raaVtpr3zCDnnkPL8WUC9wIPyJtMs71-sXqv_uKJ5dS4SpVTK4qloUF-bUfrA4azbGj',
    },
    {
        name: 'Limited Edition Willow',
        slug: 'limited-edition-willow',
        description: 'Hand-selected Grade 1+ willow. Only 50 pieces manufactured.',
        price: 8499,
        stock: 15,
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChIRFgHwo8NHN2m5nvuMh6FrWBRDS7wsci7j_0nqdlahZVGYN4kSCpvmPm5w6rObRl0kKa15-veumm3HGfccX1n-rkt2a639m5a4LoxM7B7cX0x5vOUEjjnGq_cksSzw93V7hF6_qxFmYG3CPtXpelW4N15Kq9YMmM4V-T9bh5ShVgTu9VSKI2a0BJQPw-t5SShK4Q5We-xVoj_APiu6BCKFtfO_sunhW1skud5jwPwPoNXNCSYNXxtPgAs0_Ly8CYtLFhmUOQqIjJ',
    },
];

async function main() {
    console.log(`Start seeding ...`);
    for (const p of products) {
        const product = await prisma.product.upsert({
            where: { slug: p.slug },
            update: {},
            create: p,
        });
        console.log(`Created product with id: ${product.id}`);
    }
    console.log(`Seeding finished.`);
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
