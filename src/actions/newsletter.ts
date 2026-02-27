"use server";

export async function subscribeNewsletter(formData: FormData) {
    const email = (formData.get("email") as string)?.trim().toLowerCase();
    const token = formData.get("recaptchaToken") as string;

    if (!email || !email.includes("@")) {
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

    // TODO: save email to your DB or a mailing list service (Mailchimp, etc.)
    // For now we just log it safely server-side
    console.log("[Newsletter] New subscriber:", email);

    return { success: true };
}
