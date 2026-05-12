import { getAnalyticsData } from "@/actions/admin-dashboard";
import { unstable_cache } from "next/cache";
import AnalyticsClient from "./AnalyticsClient";

export const dynamic = "force-dynamic";

const getCachedAnalytics = unstable_cache(
    () => getAnalyticsData(30),
    ["admin-analytics"],
    { revalidate: 60, tags: ["admin-analytics"] }
);

export default async function AnalyticsPage() {
    const data = await getCachedAnalytics();
    return <AnalyticsClient data={data} />;
}
