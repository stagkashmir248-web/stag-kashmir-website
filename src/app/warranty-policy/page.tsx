import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Warranty Policy | Stag Kashmir",
    description: "Stag Kashmir Bat Warranty Policy",
};

export default function WarrantyPolicyPage() {
    return (
        <div className="flex flex-1 justify-center py-16 px-6 md:px-12 bg-background-dark min-h-screen">
            <div className="max-w-4xl w-full flex flex-col gap-8">
                <div>
                    <h1 className="text-3xl md:text-5xl font-black text-white mb-4">Warranty Policy</h1>
                    <p className="text-slate-400 text-sm">Our commitment to quality and your peace of mind.</p>
                </div>

                <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 md:p-10 text-slate-300 leading-relaxed space-y-6">
                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">1. Standard Warranty Coverage</h2>
                        <p>
                            All Stag Kashmir cricket bats come with a standard <strong>6-month limited warranty</strong> from the date of purchase. This warranty covers manufacturing defects, including issues with the handle, major internal splits, or fundamental structural failures.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">2. What is NOT Covered</h2>
                        <p>
                            Cricket is a high-impact sport, and willow is a natural material. Therefore, the following are not considered manufacturing defects and are not covered under our warranty:
                        </p>
                        <ul className="list-disc pl-5 mt-3 space-y-2 text-slate-400">
                            <li>Surface cracks, edge cracks, or toe damage due to impact with the ball (especially yorkers).</li>
                            <li>Damage resulting from the use of poor quality or waterlogged cricket balls.</li>
                            <li>Damage caused by lack of proper preparation (insufficient knocking-in or oiling).</li>
                            <li>Damage caused by excessive oiling or inappropriate moisture exposure (e.g., damp conditions).</li>
                            <li>Any modifications, repairs, or alterations made by a third party.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">3. Claiming Warranty</h2>
                        <p>
                            To make a warranty claim, please email us at <a href="mailto:stagkashmir248@gmail.com" className="text-primary hover:underline">stagkashmir248@gmail.com</a> with your original order number, proof of purchase, and clear photographs of the damage from several angles (including the face, edges, and toe).
                        </p>
                        <p className="mt-2">
                            Our master bat-makers will physically or visually assess the damage. If deemed a manufacturing fault, we will either repair or replace the bat free of charge. If the damage is deemed normal wear-and-tear or due to misuse, we may offer a paid repair service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">4. Return Shipping for Warranty</h2>
                        <p>
                            If you are requested to return the bat for inspection, the cost of return shipping is borne by the customer. If the warranty claim is approved, we will ship the repaired or replaced bat back to you at our expense.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
