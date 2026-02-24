
import { Link } from "react-router-dom";

export default function Checkout() {
    return (
        <main className="flex-grow w-full px-4 md:px-10 py-8 mx-auto max-w-7xl">
            {/* Breadcrumbs */}
            <div className="flex flex-wrap items-center gap-2 mb-8 text-sm">
                <Link className="text-slate-500 dark:text-slate-400 hover:text-primary" to="/">Home</Link>
                <span className="text-slate-400 material-symbols-outlined !text-sm">chevron_right</span>
                <span className="text-slate-500 dark:text-slate-400">Cart</span>
                <span className="text-slate-400 material-symbols-outlined !text-sm">chevron_right</span>
                <span className="text-slate-900 dark:text-slate-100 font-medium">Checkout</span>
            </div>

            {/* Checkout Header */}
            <div className="mb-10">
                <h1 className="text-slate-900 dark:text-slate-100 text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-2">Secure Checkout</h1>
                <p className="text-slate-500 dark:text-slate-400 text-lg">Complete your order for premium Kashmir Willow</p>
            </div>

            <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-start">
                {/* Left Column: Forms */}
                <div className="lg:col-span-7 space-y-8">
                    {/* Shipping Address Section */}
                    <section className="bg-white dark:bg-slate-800/50 rounded-xl p-6 shadow-sm ring-1 ring-slate-100 dark:ring-slate-800">
                        <div className="flex items-center gap-3 mb-6 border-b border-slate-100 dark:border-slate-700 pb-4">
                            <span className="flex items-center justify-center size-8 rounded-full bg-primary/10 text-primary">
                                <span className="material-symbols-outlined !text-lg">local_shipping</span>
                            </span>
                            <h2 className="text-slate-900 dark:text-slate-100 text-xl font-bold">Shipping Address</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">First Name</label>
                                <input className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:border-primary focus:ring-primary" placeholder="Enter first name" type="text" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Last Name</label>
                                <input className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:border-primary focus:ring-primary" placeholder="Enter last name" type="text" />
                            </div>
                            <div className="md:col-span-2 space-y-1.5">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Address</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2.5 text-slate-400 material-symbols-outlined !text-xl">home</span>
                                    <input className="w-full pl-10 rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:border-primary focus:ring-primary" placeholder="Street address, apartment, suite, etc." type="text" />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">City</label>
                                <input className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:border-primary focus:ring-primary" placeholder="City" type="text" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">State / Province</label>
                                <select className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:border-primary focus:ring-primary">
                                    <option>Select State</option>
                                    <option>Jammu &amp; Kashmir</option>
                                    <option>Delhi</option>
                                    <option>Maharashtra</option>
                                    <option>Karnataka</option>
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Zip / Postal Code</label>
                                <input className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:border-primary focus:ring-primary" placeholder="190001" type="text" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Phone Number</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2.5 text-slate-400 material-symbols-outlined !text-xl">call</span>
                                    <input className="w-full pl-10 rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:border-primary focus:ring-primary" placeholder="+91 99999 99999" type="tel" />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Payment Method Section */}
                    <section className="bg-white dark:bg-slate-800/50 rounded-xl p-6 shadow-sm ring-1 ring-slate-100 dark:ring-slate-800">
                        <div className="flex items-center gap-3 mb-6 border-b border-slate-100 dark:border-slate-700 pb-4">
                            <span className="flex items-center justify-center size-8 rounded-full bg-primary/10 text-primary">
                                <span className="material-symbols-outlined !text-lg">credit_card</span>
                            </span>
                            <h2 className="text-slate-900 dark:text-slate-100 text-xl font-bold">Payment Method</h2>
                        </div>
                        <div className="space-y-3">
                            <label className="flex items-center justify-between p-4 rounded-lg border border-primary bg-primary/5 cursor-pointer transition-all">
                                <div className="flex items-center gap-3">
                                    <input defaultChecked className="text-primary focus:ring-primary border-slate-300" name="payment" type="radio" />
                                    <div className="flex flex-col">
                                        <span className="font-medium text-slate-900 dark:text-slate-100">Credit / Debit Card</span>
                                        <span className="text-xs text-slate-500 dark:text-slate-400">Secure transaction via Stripe</span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <span className="material-symbols-outlined text-slate-400">credit_card</span>
                                </div>
                            </label>
                            <label className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-all">
                                <div className="flex items-center gap-3">
                                    <input className="text-primary focus:ring-primary border-slate-300" name="payment" type="radio" />
                                    <div className="flex flex-col">
                                        <span className="font-medium text-slate-900 dark:text-slate-100">UPI / Net Banking</span>
                                        <span className="text-xs text-slate-500 dark:text-slate-400">Google Pay, PhonePe, Paytm</span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <span className="material-symbols-outlined text-slate-400">account_balance_wallet</span>
                                </div>
                            </label>
                            <label className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-all">
                                <div className="flex items-center gap-3">
                                    <input className="text-primary focus:ring-primary border-slate-300" name="payment" type="radio" />
                                    <div className="flex flex-col">
                                        <span className="font-medium text-slate-900 dark:text-slate-100">Cash on Delivery</span>
                                        <span className="text-xs text-slate-500 dark:text-slate-400">Pay when you receive</span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <span className="material-symbols-outlined text-slate-400">payments</span>
                                </div>
                            </label>
                        </div>

                        {/* Card Details Form */}
                        <div className="mt-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-700">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2 space-y-1.5">
                                    <label className="text-xs uppercase font-bold tracking-wide text-slate-500 dark:text-slate-400">Card Number</label>
                                    <div className="relative">
                                        <input className="w-full pl-10 rounded bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:border-primary focus:ring-primary" placeholder="0000 0000 0000 0000" type="text" />
                                        <span className="absolute left-3 top-2.5 text-slate-400 material-symbols-outlined !text-lg">credit_card</span>
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs uppercase font-bold tracking-wide text-slate-500 dark:text-slate-400">Expiry</label>
                                    <input className="w-full rounded bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:border-primary focus:ring-primary" placeholder="MM / YY" type="text" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs uppercase font-bold tracking-wide text-slate-500 dark:text-slate-400">CVC</label>
                                    <div className="relative">
                                        <input className="w-full pr-10 rounded bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:border-primary focus:ring-primary" placeholder="123" type="text" />
                                        <span className="absolute right-3 top-2.5 text-slate-400 material-symbols-outlined !text-lg">help</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Column: Order Summary */}
                <div className="lg:col-span-5 mt-8 lg:mt-0">
                    <div className="bg-white dark:bg-slate-800/50 rounded-xl p-6 shadow-lg shadow-slate-200/50 dark:shadow-black/20 ring-1 ring-slate-100 dark:ring-slate-800 sticky top-24">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-6 pb-4 border-b border-slate-100 dark:border-slate-700">Order Summary</h2>
                        <div className="flex flex-col gap-6 mb-8">
                            {/* Item 1 */}
                            <div className="flex gap-4">
                                <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEtes8Mqn5krzrEIqTkuM_fqU3HlD3dEQ4q_thTm1uskvQj14jOrDfvbf2BZLnaaTsifFSsxj2tA-NKSLkakilEqMoL7BAk2xVknr6NxH48GMI5PRYsY8u4tgvXwG5pfaecxrLwK1JX-Fiwey1O2gEUBCU8umk78V316RcZgs74GV55Ltyx8Cp6u2Q0uop34JgSUb20nRpTplWQVVP24MQNeQ6CpOtwQ3roCn4EECL58y6lbcLPte3yBKalo3BnihGhVbijDb1KcRB" alt="Stag Elite Kashmir Willow Bat" />
                                </div>
                                <div className="flex flex-col flex-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-slate-900 dark:text-slate-100 font-medium line-clamp-2">Stag Elite Kashmir Willow Bat</h3>
                                        <span className="text-slate-900 dark:text-slate-100 font-semibold ml-2">₹2,499</span>
                                    </div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Size: SH | Grade 1</p>
                                    <div className="flex items-center gap-2 mt-auto">
                                        <span className="text-xs text-slate-400">Qty: 1</span>
                                    </div>
                                </div>
                            </div>

                            {/* Item 2 */}
                            <div className="flex gap-4">
                                <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6jGiW1bNvcBG9a38EZRPoYs3C9QmExjtWNEgSPEkYtOAruAtvrPn2E3m521w4JCWk4E5gzQQaRib2LoafyNVW3h4KNYazYUx_mRPV4QerYsP8KHkISrSKv5vaaJWvhlsGUJJfi3THumDNze-6PYhZ8eqKsDhKrLNc2S_JeHOy2ycSBBEP1-gu_pHNeozQxMuKUVuTp5_NQEgj2DrNpt4XVT1Sxzsr5Tl5ADl3M-XMRUJ6A210o2naOPDBYZoBYfMQWusxszRFOyEq" alt="Stag Pro Leather Ball" />
                                </div>
                                <div className="flex flex-col flex-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-slate-900 dark:text-slate-100 font-medium line-clamp-2">Stag Pro Leather Ball</h3>
                                        <span className="text-slate-900 dark:text-slate-100 font-semibold ml-2">₹899</span>
                                    </div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Color: Red | Pack of 1</p>
                                    <div className="flex items-center gap-2 mt-auto">
                                        <span className="text-xs text-slate-400">Qty: 2</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-700">
                            <div className="flex justify-between text-slate-600 dark:text-slate-400">
                                <span>Subtotal</span>
                                <span>₹3,398.00</span>
                            </div>
                            <div className="flex justify-between text-slate-600 dark:text-slate-400">
                                <span>Shipping</span>
                                <span className="text-green-600 dark:text-green-400 font-medium">Free</span>
                            </div>
                            <div className="flex justify-between text-slate-600 dark:text-slate-400">
                                <span>Tax (18% GST)</span>
                                <span>₹611.64</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-100 dark:border-slate-700">
                            <span className="text-lg font-bold text-slate-900 dark:text-slate-100">Total</span>
                            <div className="text-right">
                                <span className="text-2xl font-bold text-primary">₹4,009.64</span>
                                <p className="text-xs text-slate-400 mt-0.5">Including all taxes</p>
                            </div>
                        </div>

                        <button className="w-full mt-8 bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/30 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 group">
                            Confirm Order
                            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </button>

                        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
                            <span className="material-symbols-outlined !text-sm">lock</span>
                            Secure SSL Encrypted Transaction
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
