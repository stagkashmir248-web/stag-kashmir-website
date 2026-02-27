"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

async function verifyRecaptcha(token: string): Promise<boolean> {
    try {
        const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
        });
        const data = await res.json();
        // v3 returns a score 0.0–1.0. 0.5+ = likely human
        return data.success === true && (data.score ?? 0) >= 0.5;
    } catch {
        return false;
    }
}

export async function submitInquiry(formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const subject = formData.get("subject") as string;
        const message = formData.get("message") as string;
        const token = formData.get("recaptchaToken") as string;

        if (!name || !email || !subject || !message) {
            return { success: false, error: "All fields are required." };
        }

        // Verify reCAPTCHA token
        if (!token || !(await verifyRecaptcha(token))) {
            return { success: false, error: "Security check failed. Please try again." };
        }

        await prisma.inquiry.create({
            data: { name, email, subject, message },
        });

        revalidatePath("/admin/inquiries");
        return { success: true };
    } catch (error) {
        console.error("Failed to submit inquiry:", error);
        return { success: false, error: "Failed to submit. Please try again later." };
    }
}
