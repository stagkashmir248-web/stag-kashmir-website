import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-[#0b0d11] border-t border-white/5 pt-16 pb-8">
            <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="md:col-span-1">
                        <Link href="/" className="relative flex items-center justify-start gap-2 transition-all cursor-pointer group mb-6 w-fit">
                            {/* Soft ambient glow behind the logo */}
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10 blur-2xl rounded-full opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
                            <Image
                                src="/Stag_logo-removebg-preview.png"
                                alt="Stag Kashmir"
                                width={160}
                                height={60}
                                className="relative z-10 w-[140px] h-auto object-contain brightness-0 invert opacity-90 group-hover:opacity-100 transition-all duration-300 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                            />
                        </Link>
                        <p className="text-slate-500 text-sm leading-relaxed mb-6">
                            Crafting premium authentic Kashmir willow bats. We are dedicated to providing cricketers with equipment that enhances their performance and style.
                        </p>
                        <div className="flex gap-4">
                            <a className="hover:opacity-80 transition-opacity" href="https://www.instagram.com/stag.kashmir" target="_blank" rel="noopener noreferrer">
                                <span className="sr-only">Instagram</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 fill-slate-400 hover:fill-primary transition-colors" aria-label="Instagram">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                </svg>
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
                            Near Masjid Abu Bakar Peer Mohalla<br />
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
