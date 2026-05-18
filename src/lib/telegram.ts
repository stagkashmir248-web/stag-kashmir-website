export async function sendTelegramOrderNotification({
    orderId,
    trackingCode,
    customer,
    items,
    serverTotal,
    amountPaid,
}: {
    orderId: string;
    trackingCode: string;
    customer: {
        name: string;
        email: string;
        phone: string;
        address: string;
        city: string;
        state: string;
        pincode: string;
        landmark?: string | null;
        paymentType: string;
    };
    items: { productId: string; quantity: number; price: number }[];
    serverTotal: number;
    amountPaid?: number | null;
}) {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
        console.warn("Telegram bot token or chat ID is missing. Order notification not sent.");
        return;
    }

    const itemRows = items.map(item => {
        return `• ${item.productId.slice(-8).toUpperCase()} (x${item.quantity}) - ₹${(item.price * item.quantity).toLocaleString("en-IN")}`;
    }).join("\n");

    // Clean up the phone number for the WhatsApp link (assuming India +91 if length is 10)
    const cleanPhone = customer.phone.replace(/\D/g, "");
    const waPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;

    const message = `
🎉 <b>New Order Received</b> 🎉

<b>Order ID:</b> #${orderId.slice(-8).toUpperCase()}
<b>Tracking:</b> ${trackingCode}
<b>Payment:</b> ${customer.paymentType} — Paid ₹${(amountPaid || 0).toLocaleString("en-IN")} / ₹${serverTotal.toLocaleString("en-IN")}

👤 <b>Customer Details</b>
<b>Name:</b> ${customer.name}
<b>Email:</b> ${customer.email}
<b>Phone:</b> ${customer.phone}
<b>Address:</b> ${customer.address}, ${customer.city}, ${customer.state} – ${customer.pincode}${customer.landmark ? ` (${customer.landmark})` : ""}

🛍️ <b>Items Ordered</b>
${itemRows}

💰 <b>Total: ₹${serverTotal.toLocaleString("en-IN")}</b>
    `;

    try {
        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: "💬 WhatsApp Customer", url: `https://wa.me/${waPhone}` }
                        ]
                    ]
                }
            }),
        });

        if (!response.ok) {
            console.error("Failed to send Telegram notification:", await response.text());
        }
    } catch (error) {
        console.error("Error sending Telegram notification:", error);
    }
}

export async function sendTelegramLowStockAlert(productName: string, stock: number) {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!botToken || !chatId) return;

    const message = `
⚠️ <b>Low Stock Warning</b> ⚠️

<b>Product:</b> ${productName}
<b>Remaining:</b> ${stock} units

Please restock soon to avoid missing out on orders.
    `;

    try {
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: "HTML" }),
        });
    } catch (e) {
        console.error("Error sending telegram low stock alert:", e);
    }
}

export async function sendTelegramOutOfStockAlert(productName: string) {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!botToken || !chatId) return;

    const message = `
🚫 <b>Out of Stock Alert</b> 🚫

<b>Product:</b> ${productName}

This product is now completely out of stock and has been automatically hidden from purchase options.
    `;

    try {
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: "HTML" }),
        });
    } catch (e) {
        console.error("Error sending telegram out of stock alert:", e);
    }
}
