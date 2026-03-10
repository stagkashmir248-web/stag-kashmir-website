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
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0f172a;">
<div style="max-width:540px;margin:0 auto;background:#1a2235;font-family:Arial,sans-serif;border-radius:12px;overflow:hidden;">
  <div style="background:#F5A714;padding:18px 24px;">
    <p style="margin:0;font-size:11px;text-transform:uppercase;letter-spacing:2px;color:#000;font-weight:bold;">Stag Kashmir · Contact Form</p>
    <h1 style="margin:6px 0 0;font-size:20px;color:#000;">New Message Received 📬</h1>
  </div>
  <div style="padding:22px 24px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:8px;overflow:hidden;border:1px solid #1e293b;margin-bottom:20px;">
      <tr style="background:#0f172a;">
        <td style="padding:8px 14px;color:#64748b;font-size:12px;width:30%;">From</td>
        <td style="padding:8px 14px;color:#fff;font-weight:bold;">${name}</td>
      </tr>
      <tr style="background:#1a2235;">
        <td style="padding:8px 14px;color:#64748b;font-size:12px;">Email</td>
        <td style="padding:8px 14px;"><a href="mailto:${email}" style="color:#60a5fa;">${email}</a></td>
      </tr>
      <tr style="background:#0f172a;">
        <td style="padding:8px 14px;color:#64748b;font-size:12px;">Subject</td>
        <td style="padding:8px 14px;color:#fff;">${subject}</td>
      </tr>
    </table>

    <h3 style="color:#fff;margin:0 0 10px;font-size:14px;">Message</h3>
    <div style="background:#0f172a;border:1px solid #1e293b;border-radius:8px;padding:16px;color:#cbd5e1;font-size:14px;line-height:1.6;white-space:pre-wrap;margin-bottom:20px;">${message}</div>

    <a href="mailto:${email}?subject=Re: ${subject}" style="display:inline-block;background:#F5A714;color:#000;font-weight:bold;padding:12px 24px;border-radius:8px;text-decoration:none;font-size:14px;">Reply to ${name} →</a>
    <a href="https://stagkashmir.com/admin/inquiries" style="display:inline-block;background:transparent;color:#60a5fa;font-weight:bold;padding:12px 20px;border-radius:8px;text-decoration:none;font-size:13px;border:1px solid #1e293b;margin-left:8px;">View in Admin →</a>

    <p style="color:#334155;font-size:11px;margin-top:20px;">Sent to ${ADMIN_EMAIL}. You can reply directly to this email.</p>
  </div>
</div>
</body>
</html>`,
        });


        revalidatePath("/admin/inquiries");
        return { success: true };
    } catch (error) {
        console.error("Failed to submit inquiry:", error);
        return { success: false, error: "Failed to submit. Please try again later." };
    }
}
