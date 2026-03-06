import { getAbandonedCarts } from "@/actions/abandoned-cart";
import AbandonedCartsClient from "./AbandonedCartsClient";

export const dynamic = "force-dynamic";

export default async function AbandonedCartsPage() {
    const carts = await getAbandonedCarts();
    return <AbandonedCartsClient carts={carts} />;
}
