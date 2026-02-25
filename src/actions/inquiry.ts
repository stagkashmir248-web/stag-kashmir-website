"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function submitInquiry(formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const subject = formData.get("subject") as string;
        const message = formData.get("message") as string;

        if (!name || !email || !subject || !message) {
            return { success: false, error: "All fields are required" };
        }

        await prisma.inquiry.create({
            data: {
                name,
                email,
                subject,
                message,
            },
        });

        return { success: true };
    } catch (error) {
        console.error("Failed to submit inquiry:", error);
        return { success: false, error: "Failed to submit inquiry. Please try again later." };
    }
}
