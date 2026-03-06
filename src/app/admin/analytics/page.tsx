import { getAnalyticsData } from "@/actions/admin-dashboard";
import AnalyticsClient from "./AnalyticsClient";

export const dynamic = "force-dynamic";

export default async function AnalyticsPage() {
    const data = await getAnalyticsData(30);
    return <AnalyticsClient data={data} />;
}
