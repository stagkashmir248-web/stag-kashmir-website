
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-border-light dark:border-border-dark bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-sm px-4 md:px-10 py-3">
            <Link to="/" className="flex items-center gap-4">
                <div className="size-8 text-primary">
                    <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"></path>
                    </svg>
                </div>
                <h2 className="text-xl font-black tracking-tight text-text-primary-light dark:text-text-primary-dark">Stag Kashmir</h2>
            </Link>

            <nav className="hidden md:flex items-center gap-8 ml-auto mr-8">
                <Link className="text-sm font-medium hover:text-primary transition-colors" to="/shop">Shop</Link>
                <Link className="text-sm font-medium hover:text-primary transition-colors" to="/custom-bat">Custom Bats</Link>
                <Link className="text-sm font-medium hover:text-primary transition-colors" to="/about">About Us</Link>
                <Link className="text-sm font-medium hover:text-primary transition-colors" to="/dashboard">Account</Link>
            </nav>

            <div className="flex gap-2">
                <button className="flex size-10 items-center justify-center rounded-lg bg-background-light dark:bg-background-dark hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors text-text-primary-light dark:text-text-primary-dark">
                    <span className="material-symbols-outlined text-[20px]">search</span>
                </button>
                <Link to="/cart" className="flex size-10 items-center justify-center rounded-lg bg-background-light dark:bg-background-dark hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors text-text-primary-light dark:text-text-primary-dark relative">
                    <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                    <span className="absolute top-2 right-2 size-2 bg-primary rounded-full"></span>
                </Link>
                <button className="md:hidden flex size-10 items-center justify-center rounded-lg bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark">
                    <span className="material-symbols-outlined text-[20px]">menu</span>
                </button>
            </div>
        </header>
    );
}
