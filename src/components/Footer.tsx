import Link from "next/link";
import Image from "next/image";

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
                            <a className="hover:opacity-80 transition-opacity" href="https://www.instagram.com/stag.kashmir" target="_blank" rel="noopener noreferrer">
                                <span className="sr-only">Instagram</span>
                                <Image src="/instagram.png" alt="Instagram" width={24} height={24} className="h-6 w-6 object-contain" />
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
                        <a className="text-primary hover:underline text-sm font-medium block" href="mailto:info@stagkashmir.com">info@stagkashmir.com</a>
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
