import nodemailer from "nodemailer";

interface SendEmailParams {
    to: string;
    subject: string;
    text?: string;   // Plain text body
    html?: string;   // HTML body
    replyTo?: string;
}

/**
 * Global utility to send emails via Hostinger SMTP.
 * Requires SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD in env.
 */
export async function sendEmail({ to, subject, text, html, replyTo }: SendEmailParams) {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "smtp.hostinger.com",
            port: Number(process.env.SMTP_PORT) || 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        // Verify connection configuration (optional, removes silent failures)
        await transporter.verify();

        const info = await transporter.sendMail({
            from: `"Stag Kashmir" <${process.env.SMTP_USER}>`, // sender address
            to,       // list of receivers
            subject,  // Subject line
            text,     // plain text body
            html,     // html body
            replyTo: replyTo || "stagkashmir248@gmail.com",
        });

        console.log("[v] Message sent: %s", info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("[x] Error sending email: ", error);
        return { success: false, error };
    }
}
