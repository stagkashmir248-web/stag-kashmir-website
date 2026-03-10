"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { sendEmail } from "@/lib/mail";
import { ADMIN_EMAIL } from "@/lib/constants";


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

    // Fire & Forget — notify admin
    sendEmail({
      to: ADMIN_EMAIL,
      subject: `📬 New Contact Message: "${subject}" from ${name}`,
      replyTo: email,
      html: `
<div style="font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.6;">
    <p>You have received a new contact message from the Stag Kashmir website.</p>
    <p>
        <strong>Name:</strong> ${name}<br/>
        <strong>Email:</strong> <a href="mailto:${email}">${email}</a><br/>
        <strong>Subject:</strong> ${subject}
    </p>
    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
    <p style="white-space: pre-wrap; font-family: inherit;">${message}</p>
    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
    <p style="font-size: 12px; color: #999;">
        To reply to ${name}, simply hit <strong>Reply</strong> in your email client.<br/>
        <a href="https://stagkashmir.com/admin/inquiries" style="color: #999;">View all inquiries in Admin Panel</a>
    </p>
</div>
            `,
    });

    // Fire & Forget — notify customer
    sendEmail({
      to: email,
      subject: `We received your message: ${subject}`,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h2 style="color: #D4AF37;">Thank you for reaching out, ${name}!</h2>
    <p>We have successfully received your message regarding <strong>${subject}</strong>.</p>
    <p>Our team will get back to you as soon as possible. Usually, we reply within 24 hours.</p>
    <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0; border: 1px solid #e2e8f0;">
        <p style="margin: 0; font-size: 13px; color: #64748b; font-weight: bold; text-transform: uppercase;">Your Message:</p>
        <p style="margin: 10px 0 0; white-space: pre-wrap; color: #334155;">${message}</p>
    </div>
    <p style="margin-top: 30px; font-size: 12px; color: #64748b;">If you have any urgent questions, you can reply directly to this email or chat with us on WhatsApp.</p>
</div>
      `,
    });


    revalidatePath("/admin/inquiries");
    return { success: true };
  } catch (error) {
    console.error("Failed to submit inquiry:", error);
    return { success: false, error: "Failed to submit. Please try again later." };
  }
}
