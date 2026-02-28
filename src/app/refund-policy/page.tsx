import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Refund Policy | Stag Kashmir",
    description: "Stag Kashmir Refund and Cancellation Policy",
};

export default function RefundPolicyPage() {
    return (
        <div className="flex flex-1 justify-center py-16 px-6 md:px-12 bg-background-dark min-h-screen">
            <div className="max-w-4xl w-full flex flex-col gap-8">
                <div>
                    <h1 className="text-3xl md:text-5xl font-black text-white mb-4">Refund Policy</h1>
                    <p className="text-slate-400 text-sm">Last updated: February 2026</p>
                </div>

                <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 md:p-10 text-slate-300 leading-relaxed space-y-6">
                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">1. Returns &amp; Exchanges</h2>
                        <p>
                            At Stag Kashmir, we take immense pride in the craftsmanship of our willow bats. If you are not entirely satisfied with your purchase, we're here to help.
                            You have <strong>7 calendar days</strong> to return an item from the date you received it.
                        </p>
                        <ul className="list-disc pl-5 mt-3 space-y-2 text-slate-400">
                            <li>To be eligible for a return, your bat or gear must be unused, un-knocked, and in the same condition that you received it.</li>
                            <li>Your item must be in the original packaging with all tags and protective films intact.</li>
                            <li>Your item needs to have the receipt or proof of purchase.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">2. Exceptions / Non-returnable Items</h2>
                        <p>
                            Certain types of items cannot be returned:
                        </p>
                        <ul className="list-disc pl-5 mt-3 space-y-2 text-slate-400">
                            <li>Custom-made or personalized bats engraved with your name.</li>
                            <li>Bats that have been oiled, knocked-in, or used in nets/matches.</li>
                            <li>Items purchased on clearance or end-of-season sales.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">3. Refunds Process</h2>
                        <p>
                            Once we receive your item, we will inspect it and notify you that we have received your returned item. We will immediately notify you on the status of your refund after inspecting the item.
                            <br /><br />
                            If your return is approved, we will initiate a refund to your credit card (or original method of payment). You will receive the credit within 5-7 business days, depending on your card issuer's policies.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">4. Shipping for Returns</h2>
                        <p>
                            You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">5. Contact Us</h2>
                        <p>
                            If you have any questions on how to return your item to us, contact us at <a href="mailto:stagkashmir248@gmail.com" className="text-primary hover:underline">stagkashmir248@gmail.com</a>.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
