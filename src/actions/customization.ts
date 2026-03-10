"use server";

import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/mail";
import { ADMIN_EMAIL } from "@/lib/constants";

export async function submitCustomBatInquiry(data: {
    name: string; email: string; phone: string; address: string; city: string; state: string; pincode: string; landmark: string; specs: string;
}) {
    const { name, email, phone, address, city, state, pincode, landmark, specs } = data;

    // We will save this in the Inquiry table, but prefix the subject so it's clear it's a Custom Bat Order.
    const fullMessage = `
📞 Phone: ${phone}
📍 Shipping Address: 
${address}, ${city}, ${state} - ${pincode}
Landmark: ${landmark || 'None'}

🏏 Specifications:
${specs.split(' | ').join('\n')}
    `.trim();

    await prisma.inquiry.create({
        data: {
            name,
            email,
            subject: "New Custom Bat Request",
            message: fullMessage,
        }
    });

    // Notify Admin
    await sendEmail({
        to: ADMIN_EMAIL,
        subject: `🏏 New Custom Bat Request from ${name}`,
        replyTo: email,
        html: `
<div style="font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.6;">
    <p>You have received a new <strong>Custom Bat Request</strong>.</p>
    <p>
        <strong>Name:</strong> ${name}<br/>
        <strong>Email:</strong> <a href="mailto:${email}">${email}</a><br/>
        <strong>Phone (WhatsApp):</strong> ${phone}
    </p>
    <div style="background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
        <h4 style="margin-top: 0; color: #0f172a;">Shipping Details:</h4>
        <p style="margin: 0;">${address}, ${city}, ${state} - ${pincode}<br/>Landmark: ${landmark || 'None'}</p>
    </div>
    <div style="background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0;">
        <h4 style="margin-top: 0; color: #0f172a;">Bat Specifications:</h4>
        <pre style="white-space: pre-wrap; font-family: inherit; margin: 0;">${specs.split(' | ').join('<br/>')}</pre>
    </div>
    <p style="font-size: 12px; color: #999; margin-top: 20px;">
        Reply to this email to contact ${name}, or message them on WhatsApp at ${phone}.<br/>
        <a href="https://stagkashmir.com/admin/inquiries" style="color: #999;">View in Admin Panel</a>
    </p>
</div>
        `
    });

    // Notify Customer
    await sendEmail({
        to: email,
        subject: `Your Custom Bat Request is Confirmed! 🏏`,
        html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h2 style="color: #D4AF37;">We received your Custom Bat Request, ${name}!</h2>
    <p>Thank you for choosing Stag Kashmir. Our master craftsmen will review your custom specifications shortly.</p>
    <p><strong>What happens next?</strong><br/>
    We will calculate the final cost and contact you on WhatsApp (${phone}) with a payment link and your estimated build timeline.</p>
    
    <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 25px 0; border: 1px solid #e2e8f0;">
        <h4 style="margin-top: 0; color: #0f172a; border-bottom: 1px solid #cbd5e1; padding-bottom: 10px;">Your Specifications:</h4>
        <div style="font-size: 13px; color: #334155; line-height: 1.8;">
            ${specs.split(' | ').map(s => `<div>${s}</div>`).join('')}
        </div>
    </div>
    <p style="margin-top: 30px; font-size: 12px; color: #64748b;">If you need to make any changes to your request, simply reply to this email.</p>
</div>
        `
    });

    return { success: true };
}
