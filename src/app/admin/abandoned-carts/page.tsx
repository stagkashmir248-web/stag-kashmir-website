import { getAbandonedCarts } from "@/actions/abandoned-cart";
import AbandonedCartsClient from "./AbandonedCartsClient";

export const dynamic = "force-dynamic";

// Note: cannot use unstable_cache here — getAbandonedCarts() calls auth()
// which reads request-scoped cookies and cannot run inside a cache context.
export default async function AbandonedCartsPage() {
    const carts = await getAbandonedCarts();
    return <AbandonedCartsClient carts={carts} />;
}
