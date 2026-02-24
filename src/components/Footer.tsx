
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark pt-16 pb-8 px-4 md:px-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <div className="col-span-1 md:col-span-1">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="size-6 text-primary">
                            <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"></path>
                            </svg>
                        </div>
                        <h2 className="text-lg font-bold tracking-tight">Stag Kashmir</h2>
                    </div>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm mb-6">
                        Providing authentic cricket equipment to enthusiasts across India since 1995.
                    </p>
                    <div className="flex gap-4">
                        <a className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors" href="#">
                            <span className="material-symbols-outlined">social_leaderboard</span>
                        </a>
                        <a className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors" href="#">
                            <span className="material-symbols-outlined">photo_camera</span>
                        </a>
                        <a className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors" href="#">
                            <span className="material-symbols-outlined">alternate_email</span>
                        </a>
                    </div>
                </div>
                <div>
                    <h3 className="font-bold mb-4">Shop</h3>
                    <ul className="flex flex-col gap-2 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                        <li><Link className="hover:text-primary transition-colors" to="/shop">All Bats</Link></li>
                        <li><Link className="hover:text-primary transition-colors" to="/shop">Tennis Ball Bats</Link></li>
                        <li><Link className="hover:text-primary transition-colors" to="/shop">Leather Ball Bats</Link></li>
                        <li><Link className="hover:text-primary transition-colors" to="/shop">Accessories</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold mb-4">Support</h3>
                    <ul className="flex flex-col gap-2 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                        <li><Link className="hover:text-primary transition-colors" to="/dashboard">Track Order</Link></li>
                        <li><Link className="hover:text-primary transition-colors" to="/contact">Shipping Policy</Link></li>
                        <li><Link className="hover:text-primary transition-colors" to="/contact">Returns &amp; Exchanges</Link></li>
                        <li><Link className="hover:text-primary transition-colors" to="/contact">Contact Us</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold mb-4">Contact</h3>
                    <ul className="flex flex-col gap-2 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                        <li>support@stagkashmir.com</li>
                        <li>+91 98765 43210</li>
                        <li>Srinagar, Kashmir, India</li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-border-light dark:border-border-dark pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-secondary-light dark:text-text-secondary-dark">
                <p>© 2023 Stag Kashmir. All rights reserved.</p>
                <div className="flex gap-6">
                    <a className="hover:text-primary" href="#">Privacy Policy</a>
                    <a className="hover:text-primary" href="#">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
}
