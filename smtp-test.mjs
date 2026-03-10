import nodemailer from "nodemailer";

async function testEmail() {
    console.log("Testing Resend SMTP Connection...");

    const transporter = nodemailer.createTransport({
        host: "smtp.resend.com",
        port: 465,
        secure: true,
        auth: {
            user: "resend",
            pass: "re_X3mbddyt_5ynu2CCpbohMh29UEavcnDUM",
        },
    });

    try {
        await transporter.verify();
        console.log("✅ Credentials verified! Connection to Resend successful.");

        const info = await transporter.sendMail({
            from: '"Stag Kashmir Testing" <info@stagkashmir.com>',
            to: "stagkashmir248@gmail.com",
            subject: "✅ Resend SMTP is Working!",
            text: "If you are reading this email, your Resend API Key works perfectly and the website is ready to use Resend.",
        });

        console.log("✅ Test email sent successfully! Message ID:", info.messageId);
    } catch (error) {
        console.error("❌ Failed to send email via Resend:", error);
    }
}

testEmail();
