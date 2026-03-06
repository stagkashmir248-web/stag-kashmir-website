"use client";

import { useEffect } from "react";
import { markOrdersAsViewed, markInquiriesAsViewed, markNewsletterAsViewed } from "@/actions/admin-notifications";
import { useAdminNotifications } from "@/components/AdminNotificationProvider";

type NotificationType = "orders" | "inquiries" | "newsletter";

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
            } else if (type === "newsletter") {
                result = await markNewsletterAsViewed();
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
