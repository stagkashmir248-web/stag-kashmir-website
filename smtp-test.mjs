import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function testMail() {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.hostinger.com",
        port: Number(process.env.SMTP_PORT) || 465,
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    try {
        console.log("Verifying...");
        await transporter.verify();
        console.log("Verified. Sending...");

        const info = await transporter.sendMail({
            from: `"Stag Kashmir Test" <${process.env.SMTP_USER}>`,
            to: "sofisuhail007@gmail.com",
            subject: "Test Welcome Email",
            text: "This is a test to check if SMTP works.",
        });

        console.log("Success! Message ID:", info.messageId);
    } catch (e) {
        console.error("Error:", e);
    }
}

testMail();
