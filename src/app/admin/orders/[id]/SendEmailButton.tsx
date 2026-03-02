"use client";

import { useTransition } from "react";
import { sendOrderUpdateEmail } from "@/actions/admin-order";
import toast from "react-hot-toast";

export default function SendEmailButton({ orderId }: { orderId: string }) {
    const [isPending, startTransition] = useTransition();

    const handleSend = () => {
        if (!window.confirm("Send standard order update email to customer with current status and tracking?")) return;

        startTransition(async () => {
            const result = await sendOrderUpdateEmail(orderId);
            if (result.success) {
                toast.success("Order update email sent!");
            } else {
                toast.error(result.error || "Failed to send email");
            }
        });
    };

    return (
        <button
            onClick={handleSend}
            disabled={isPending}
            className="w-full flex items-center justify-center gap-2 bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-600/30 font-bold py-3 px-4 rounded-xl transition-all shadow-lg text-sm mt-4"
        >
            <span className="material-symbols-outlined !text-[20px]">{isPending ? "sync" : "forward_to_inbox"}</span>
            {isPending ? "Sending Email..." : "Send Status Update Email"}
        </button>
    );
}
