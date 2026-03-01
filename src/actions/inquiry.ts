"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { sendEmail } from "@/lib/mail";

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

        // Length guards — prevent oversized payloads
        if (name.length > 120) return { success: false, error: "Name is too long." };
        if (subject.length > 200) return { success: false, error: "Subject is too long." };
        if (message.length > 3000) return { success: false, error: "Message must be under 3000 characters." };

        // Verify reCAPTCHA token
        if (!token || !(await verifyRecaptcha(token))) {
            return { success: false, error: "Security check failed. Please try again." };
        }

        await prisma.inquiry.create({
            data: { name, email, subject, message },
        });

        // Fire & Forget
        sendEmail({
            to: process.env.SMTP_USER || "support@stagkashmir.com",
            subject: `New Contact Inquiry: ${subject}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            replyTo: email,
        });

        revalidatePath("/admin/inquiries");
        return { success: true };
    } catch (error) {
        console.error("Failed to submit inquiry:", error);
        return { success: false, error: "Failed to submit. Please try again later." };
    }
}
