import { getDiscountCodes } from "@/actions/coupon";
import CouponsClient from "./CouponsClient";

export default async function CouponsPage() {
    const coupons = await getDiscountCodes();
    return <CouponsClient coupons={coupons} />;
}
