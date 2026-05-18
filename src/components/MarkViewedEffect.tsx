"use client";

import { useEffect } from "react";
import { markOrdersAsViewed, markInquiriesAsViewed, markNewsletterAsViewed, markCustomBatsAsViewed, markWhatsAppLeadsAsViewed } from "@/actions/admin-notifications";
import { useAdminNotifications } from "@/components/AdminNotificationProvider";

type NotificationType = "orders" | "inquiries" | "newsletter" | "customBat" | "whatsapp";

export default function MarkViewedEffect({ type }: { type: NotificationType }) {
    const { refreshCounts } = useAdminNotifications();

    useEffect(() => {
        let isMounted = true;

        async function markAsViewed() {
            let result;
            if (type === "orders") {
                result = await markOrdersAsViewed();
            } else if (type === "inquiries") {
                result = await markInquiriesAsViewed();
            } else if (type === "customBat") {
                result = await markCustomBatsAsViewed();
            } else if (type === "newsletter") {
                result = await markNewsletterAsViewed();
            } else if (type === "whatsapp") {
                result = await markWhatsAppLeadsAsViewed();
            }

            // If successfully marked viewed on server, refresh our context counts instantly
            if (isMounted && result?.success) {
                refreshCounts();
            }
        }

        markAsViewed();

        return () => {
            isMounted = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type]); // ← Do NOT include refreshCounts here — it changes on every render and causes an infinite loop

    return null; // Invisible component that just triggers the effect
}
