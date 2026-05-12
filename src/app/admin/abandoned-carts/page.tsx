import { getAbandonedCarts } from "@/actions/abandoned-cart";
import { unstable_cache } from "next/cache";
import AbandonedCartsClient from "./AbandonedCartsClient";

export const dynamic = "force-dynamic";

const getCachedAbandonedCarts = unstable_cache(
    () => getAbandonedCarts(),
    ["admin-abandoned-carts"],
    { revalidate: 60, tags: ["admin-abandoned-carts"] }
);

export default async function AbandonedCartsPage() {
    const carts = await getCachedAbandonedCarts();
    return <AbandonedCartsClient carts={carts} />;
}
