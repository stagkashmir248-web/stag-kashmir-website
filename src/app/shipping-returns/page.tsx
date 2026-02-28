import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Shipping & Returns | Stag Kashmir",
    description: "Stag Kashmir Shipping and Returns Information",
};

export default function ShippingReturnsPage() {
    return (
        <div className="flex flex-1 justify-center py-16 px-6 md:px-12 bg-background-dark min-h-screen">
            <div className="max-w-4xl w-full flex flex-col gap-8">
                <div>
                    <h1 className="text-3xl md:text-5xl font-black text-white mb-4">Shipping &amp; Returns</h1>
                    <p className="text-slate-400 text-sm">Everything you need to know about getting your Stag Kashmir gear.</p>
                </div>

                <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 md:p-10 text-slate-300 leading-relaxed space-y-6">
                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">1. Order Processing Time</h2>
                        <p>
                            All orders are processed within 1 to 2 business days (excluding weekends and holidays) after receiving your order confirmation email. You will receive another notification when your order has shipped containing your tracking number.
                        </p>
                        <p className="mt-2">
                            <em>Note: Custom-made or specially knocked-in bats may require an additional 3-5 business days for preparation before dispatch.</em>
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">2. Domestic Shipping Rates and Estimates (India)</h2>
                        <p>
                            We offer standard and express shipping options across India:
                        </p>
                        <ul className="list-disc pl-5 mt-3 space-y-2 text-slate-400">
                            <li><strong>Standard Shipping:</strong> 5-7 Business Days (Free for orders over ₹1,000)</li>
                            <li><strong>Express Shipping:</strong> 2-4 Business Days (Calculated at checkout)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">3. International Shipping</h2>
                        <p>
                            We proudly ship our premium Kashmir willow globally. International shipping rates and delivery times vary by destination and are calculated at checkout. Please note that international orders may be subject to import duties and taxes (including VAT), which vary by country. Stag Kashmir is not responsible for these charges if they are applied.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">4. How do I check the status of my order?</h2>
                        <p>
                            When your order has shipped, you will receive an email notification from us which will include a tracking number you can use to check its status. Please allow 48 hours for the tracking information to become available.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">5. Returns</h2>
                        <p>
                            We accept returns up to 7 days after delivery if the item is unused and in its original condition. We will refund the full order amount minus the return shipping costs. For full details, please view our <a href="/refund-policy" className="text-primary hover:underline">Refund Policy</a>.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
