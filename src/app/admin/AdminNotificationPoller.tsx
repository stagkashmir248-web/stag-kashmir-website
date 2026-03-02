"use client";

import { useEffect, useRef } from "react";
import { getAdminCounts } from "@/actions/admin-notifications";
import toast from "react-hot-toast";

type Counts = {
    orders: number;
    inquiries: number;
    newsletter: number;
};

export default function AdminNotificationPoller() {
    const previousCounts = useRef<Counts | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function checkCounts() {
            const result = await getAdminCounts();
            if (!isMounted || !result.success || !result.data) return;

            const newCounts = result.data;

            if (previousCounts.current) {
                const prev = previousCounts.current;

                if (newCounts.orders > prev.orders) {
                    toast.success("New Order received!", { icon: "📦", duration: 5000 });
                }

                if (newCounts.inquiries > prev.inquiries) {
                    toast.success("New Contact Message!", { icon: "📬", duration: 5000 });
                }

                if (newCounts.newsletter > prev.newsletter) {
                    toast.success("New Newsletter Subscriber!", { icon: "✨", duration: 5000 });
                }
            }

            // Always update our ref so the next poll compares against the absolute latest
            previousCounts.current = newCounts;
        }

        // Check immediately on mount to establish a baseline
        checkCounts();

        // Then start polling every 15 seconds
        const interval = setInterval(checkCounts, 15000);

        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, []);

    return null; // This component handles side-effects only, no UI.
}
