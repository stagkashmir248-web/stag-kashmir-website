"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function getUserAddresses(userId: string) {
    return prisma.address.findMany({
        where: { userId },
        orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
    });
}

export async function saveAddress(data: {
    name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    landmark?: string;
}) {
    const session = await auth();
    if (!session?.user?.id) throw new Error("Unauthorized");
    const userId = session.user.id;

    const count = await prisma.address.count({ where: { userId } });
    await prisma.address.create({
        data: { ...data, userId, isDefault: count === 0 },
    });
    revalidatePath("/dashboard");
}

export async function updateAddress(
    id: string,
    data: {
        name: string;
        phone: string;
        address: string;
        city: string;
        state: string;
        pincode: string;
        landmark?: string;
    }
) {
    const session = await auth();
    if (!session?.user?.id) throw new Error("Unauthorized");
    await prisma.address.update({ where: { id }, data });
    revalidatePath("/dashboard");
}

export async function deleteAddress(id: string) {
    const session = await auth();
    if (!session?.user?.id) throw new Error("Unauthorized");
    const userId = session.user.id;

    const addr = await prisma.address.findUnique({ where: { id } });
    await prisma.address.delete({ where: { id } });

    // If it was default, promote the next most recent
    if (addr?.isDefault) {
        const next = await prisma.address.findFirst({
            where: { userId },
            orderBy: { createdAt: "desc" },
        });
        if (next) await prisma.address.update({ where: { id: next.id }, data: { isDefault: true } });
    }
    revalidatePath("/dashboard");
}

export async function setDefaultAddress(id: string) {
    const session = await auth();
    if (!session?.user?.id) throw new Error("Unauthorized");
    const userId = session.user.id;

    await prisma.address.updateMany({ where: { userId }, data: { isDefault: false } });
    await prisma.address.update({ where: { id }, data: { isDefault: true } });
    revalidatePath("/dashboard");
}
