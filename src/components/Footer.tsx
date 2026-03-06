import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-[#0b0d11] border-t border-white/5 pt-16 pb-8">
            <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-2 text-white mb-6">
                            <span className="material-symbols-outlined !text-[28px]">sports_cricket</span>
                            <h2 className="text-lg font-bold uppercase tracking-wider">Stag Kashmir</h2>
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed mb-6">
                            Crafting premium authentic Kashmir willow bats. We are dedicated to providing cricketers with equipment that enhances their performance and style.
                        </p>
                        <div className="flex gap-4">
                            <a className="text-slate-400 hover:text-white transition-colors" href="https://www.instagram.com/stag.kashmir" target="_blank" rel="noopener noreferrer">
                                <span className="sr-only">Instagram</span>
                                <svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path clipRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465C9.673 2.013 10.03 2 12.48 2h-.165zm-2.347 5.833a4.057 4.057 0 00-4.053 4.053 4.057 4.057 0 004.053 4.053 4.057 4.057 0 004.053-4.053 4.057 4.057 0 00-4.053-4.053zm0 6.64a2.587 2.587 0 110-5.174 2.587 2.587 0 010 5.174zm5.105-6.72a.965.965 0 110 1.93.965.965 0 010-1.93z" fillRule="evenodd"></path></svg>
                            </a>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-white font-bold mb-6">Shop</h3>
                        <ul className="flex flex-col gap-3">
                            <li><Link className="text-slate-500 hover:text-primary transition-colors text-sm" href="/shop?category=season-bats">Season Bats</Link></li>
                            <li><Link className="text-slate-500 hover:text-primary transition-colors text-sm" href="/shop?category=hard-tennis">Hard Tennis</Link></li>
                            <li><Link className="text-slate-500 hover:text-primary transition-colors text-sm" href="/shop?category=soft-tennis">Soft Tennis</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-bold mb-6">Support</h3>
                        <ul className="flex flex-col gap-3">
                            <li><Link className="text-slate-500 hover:text-primary transition-colors text-sm" href="/contact">Contact Us</Link></li>
                            <li><Link className="text-slate-500 hover:text-primary transition-colors text-sm" href="/shipping-returns">Shipping &amp; Returns</Link></li>
                            <li><Link className="text-slate-500 hover:text-primary transition-colors text-sm" href="/care-guide">Bat Care Guide</Link></li>
                            <li><Link className="text-slate-500 hover:text-primary transition-colors text-sm" href="/warranty-policy">Warranty Policy</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-bold mb-6">Visit Us</h3>
                        <p className="text-slate-500 text-sm leading-relaxed mb-4">
                            Ground floor Busserbugh Alesteng,<br />
                            Near MAsjid Abu Bakar Peer Mohalla<br />
                            Ganderbal, Jammu and Kashmir 191201
                        </p>
                        <a className="text-primary hover:underline text-sm font-medium block" href="mailto:support@stagkashmir.com">support@stagkashmir.com</a>
                        <a className="text-primary hover:underline text-sm font-medium mt-1 block" href="tel:+919469886630">+91 94698 86630</a>
                    </div>
                </div>
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex flex-col md:flex-row items-center gap-1 text-slate-600 text-xs text-center md:text-left">
                        <span>© 2026 Stag Kashmir. All rights reserved.</span>
                        <span className="hidden md:inline">|</span>
                        <span className="flex items-center gap-1">
                            Handcrafted with <span className="material-symbols-outlined text-red-500 animate-pulse !text-[14px] fill-current">favorite</span> by
                            <a href="https://wa.me/917006604148" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Frixl</a>
                        </span>
                    </div>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link className="text-slate-600 hover:text-slate-400 text-xs" href="/privacy-policy">Privacy Policy</Link>
                        <Link className="text-slate-600 hover:text-slate-400 text-xs" href="/refund-policy">Refund Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
