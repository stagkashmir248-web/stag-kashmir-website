"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { sendEmail } from "@/lib/mail";

const ADMIN_EMAIL = "stagkashmir248@gmail.com";

async function requireAdmin() {
    const session = await auth();
    if (session?.user?.email !== ADMIN_EMAIL) {
        throw new Error("Unauthorized");
    }
}

export async function subscribeNewsletter(formData: FormData) {
    const email = (formData.get("email") as string)?.trim().toLowerCase();
    const token = formData.get("recaptchaToken") as string;

    if (!email || !email.includes("@") || email.length > 254) {
        return { success: false, error: "Please enter a valid email address." };
    }

    // Verify reCAPTCHA v3 token
    try {
        const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
        });
        const data = await res.json();
        if (!data.success || (data.score ?? 0) < 0.5) {
            return { success: false, error: "Security check failed. Please try again." };
        }
    } catch {
        return { success: false, error: "Could not verify security token. Please try again." };
    }

    try {
        await prisma.newsletterSubscriber.upsert({
            where: { email },
            update: {},
            create: { email }
        });

        // Send the Welcome Email
        const welcomeHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <img src="https://stagkashmir.com/Assets/Staglogo.png" alt="Stag Kashmir" style="max-height: 80px;" />
                </div>
                <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; border-top: 4px solid #C4A15A;">
                    <h1 style="color: #333; font-size: 24px; margin-top: 0;">Welcome to the Family! 🏏</h1>
                    <p style="color: #555; font-size: 16px; line-height: 1.6;">
                        Thank you for subscribing to the Stag Kashmir newsletter. You are now officially on the list to receive our latest updates, exclusive discounts, and early access to our premium handcrafted willow bats.
                    </p>
                    <div style="text-align: center; margin-top: 30px;">
                        <a href="https://stagkashmir.com/shop" style="display: inline-block; background-color: #333; color: #fff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; letter-spacing: 1px;">SHOP NOW</a>
                    </div>
                </div>
                <div style="text-align: center; margin-top: 20px; color: #888; font-size: 12px;">
                    <p>Handcrafted in Kashmir. Played Worldwide.</p>
                    <p>© ${new Date().getFullYear()} Stag Kashmir.</p>
                </div>
            </div>
        `;

        await sendEmail({
            to: email,
            subject: "Welcome to Stag Kashmir! 🏏",
            text: "Welcome to Stag Kashmir! You are now subscribed to our newsletter.",
            html: welcomeHtml,
        });

        return { success: true };
    } catch (err: any) {
        console.error("[Newsletter] Error saving subscriber:", err);
        return { success: false, error: "A server error occurred, please try again." };
    }
}

// ADMIN ACTION: Export to CSV
export async function getNewsletterCsv() {
    await requireAdmin();
    const subs = await prisma.newsletterSubscriber.findMany({
        orderBy: { createdAt: 'desc' }
    });

    const header = "Email,Subscribed On\n";
    const rows = subs.map(s => `${s.email},"${s.createdAt.toISOString()}"`).join("\n");

    return header + rows;
}
