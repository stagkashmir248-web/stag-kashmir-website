"use client";

import { createContext, useContext, useEffect, useRef, useState, useCallback, ReactNode } from "react";
import { getAdminCounts } from "@/actions/admin-notifications";
import toast from "react-hot-toast";

type Counts = {
    orders: number;
    inquiries: number;
    newsletter: number;
};

type AdminNotificationContextType = {
    counts: Counts;
    refreshCounts: () => Promise<void>;
};

const defaultCounts: Counts = { orders: 0, inquiries: 0, newsletter: 0 };

const AdminNotificationContext = createContext<AdminNotificationContextType>({
    counts: defaultCounts,
    refreshCounts: async () => { },
});

export function useAdminNotifications() {
    return useContext(AdminNotificationContext);
}

export default function AdminNotificationProvider({ children }: { children: ReactNode }) {
    const [counts, setCounts] = useState<Counts>(defaultCounts);
    const previousCounts = useRef<Counts>(defaultCounts);

    const refreshCounts = useCallback(async () => {
        const result = await getAdminCounts();
        if (!result.success || !result.data) return;

        const newCounts = result.data;

        // Trigger toasts if the counts increased
        if (newCounts.orders > previousCounts.current.orders) {
            toast.success("New Order received!", { icon: "📦", duration: 5000 });
        }
        if (newCounts.inquiries > previousCounts.current.inquiries) {
            toast.success("New Contact Message!", { icon: "📬", duration: 5000 });
        }
        if (newCounts.newsletter > previousCounts.current.newsletter) {
            toast.success("New Newsletter Subscriber!", { icon: "✨", duration: 5000 });
        }

        previousCounts.current = newCounts;
        setCounts(newCounts);
    }, []);

    useEffect(() => {
        let isMounted = true;

        async function checkCounts() {
            if (!isMounted) return;
            await refreshCounts();
        }

        // Check immediately
        checkCounts();

        // Poll every 60 seconds (was 15s — too aggressive, caused DB overload)
        const interval = setInterval(checkCounts, 60000);

        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, []);

    return (
        <AdminNotificationContext.Provider value={{ counts, refreshCounts }}>
            {children}
        </AdminNotificationContext.Provider>
    );
}
