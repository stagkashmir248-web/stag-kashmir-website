
import Link from "next/link";

export default function Home() {
    return (
        <>
            {/* Hero Section */}
            <section className="w-full px-4 md:px-10 py-6">
                <div className="relative w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden bg-gray-900 group">
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAnUnXrdAZJjAvr0csLJhKarsNLU7gohatrGCFW2bcSWEhEatKcZPrsadGdN5HDERjkusKt5iPjAnQLm1ziwZe_uewhpSUvqsWn4tQgjZXfi7zkKECaOFJUv6zdzSgqSvdrG1SESb2og9ZYf8gau5rKvzZ4IJ82I_4njNguNx0arLqdt8bXaXVMd7aWxbQg4mRew9PwOW7Glv28N7eYd3GfjOek7Ep_CSuThHmmqjaAu5l8gNR4dwfw-TZ1P_zMaF0PdnYfLIyOkkg7")' }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="relative h-full flex flex-col justify-end items-start p-8 md:p-16 max-w-3xl">
                        <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-white uppercase bg-primary rounded-full">Premium Series</span>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-4 tracking-tight">
                            Master Your Game
                        </h1>
                        <p className="text-gray-200 text-lg md:text-xl mb-8 max-w-lg font-light leading-relaxed">
                            Experience the power of authentic Kashmir Willow bats designed for champions. Crafted for precision, built for power.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/shop" className="px-8 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-primary/30 flex items-center justify-center gap-2">
                                Shop Collection
                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </Link>
                            <Link href="/custom-bat" className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2">
                                View Custom Bats
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Categories */}
            <section className="px-4 md:px-10 py-12 md:py-16 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight mb-2">Shop by Category</h2>
                        <p className="text-text-secondary-light dark:text-text-secondary-dark">Select your weapon of choice</p>
                    </div>
                    <Link href="/shop" className="text-primary font-medium hover:underline flex items-center gap-1">
                        View all categories
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link href="/shop" className="group relative flex flex-col gap-4">
                        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBGf79ikAZiHvi_hzdqzOCx8Fyt1DcRBzozhdkE-DnWJy5aWjczA7o_UngXH1P1S1FyRjHrALGPvJWEujtppIsus5WleQdrDlGvQHR6nEsUPy3hsUKqnMpdxhSQbISt5NQbAZyMjSanyExYITY0UgAxsqjAwiKMxvpsmtHB3IIG_P0uRMr-T-XZwvZ2uRGQ7tYGl8-x9bbXq5_QL1GgjpI75Fc7mkngID2ClIDpoGV1qwBOg-eeox8pAmg3kuj0byTV0S0ndjBD7xfL")' }}></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                            <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-black/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                                Best Seller
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">Hard Tennis Bats</h3>
                            <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">Engineered for power &amp; extreme durability.</p>
                        </div>
                    </Link>
                    <Link href="/shop" className="group relative flex flex-col gap-4">
                        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCerm1ewU9S3Ai1Ump-UD066Ua6DDjhe1uUmL9K2-bU23PENs7TohWmcS_6S3o3BeXGz5gdHWrN5k5E0A1dYxYQ5yPRuL4FyFsp2dK6RcgsV-i_trmGCv4krE8tDjxAxQ1QVmHm6RDLDXW2Lj9_3YuqAwQCbt-N79dBa3vALr1Ju4j6_PMjyoBACKNopGbMZV7CJvbFens5WoJQEmrR9qRkylSdOE7J4XQ5co0EDO7bCJ0L7LhgiXlxqAyY9JLKDiXLeoxccHvi4RcF")' }}></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">Soft Tennis Bats</h3>
                            <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">Lightweight control for technical play.</p>
                        </div>
                    </Link>
                    <Link href="/custom-bat" className="group relative flex flex-col gap-4">
                        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuARQcNUeC1cOzq6Gx4TwwwIgs2MOLHY-EQ1DhATnVIg9bwFthdE0TWZoEfJe1nfc_RWq3eDFOC55p6gSCjpQhN_s2peSNLUUQhq3CggyNW2Z4uAiOw7seyo6jqOS0R9SrvqiTRUR-pNSKg8doecxUvYC0y79Ac93sy2LWTrlGVd8pV0OTAqtWBPbjdNCxCOBjFDEbkmt22lXi-LYXAX-QehbrLOBow01J8-9EsDSgcellSzQQ9N165glDTwru5FsggkHFKOJdrYDBbO")' }}></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                            <div className="absolute bottom-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                                New Arrival
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">Custom Bats</h3>
                            <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">Tailored to your grip, weight, and style.</p>
                        </div>
                    </Link>
                </div>
            </section>

            {/* Featured Product Showcase */}
            <section className="bg-surface-light dark:bg-surface-dark py-16 md:py-24 border-y border-border-light dark:border-border-dark">
                <div className="max-w-7xl mx-auto px-4 md:px-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                        <div className="flex-1 w-full relative">
                            <div className="absolute -inset-4 bg-primary/5 rounded-full blur-3xl"></div>
                            <img alt="Premium cricket bat angled shot" className="relative w-full rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5JI6jCDohiSWbxgyviFK5lQcDpE61N5a4nfF3fzsvzPKnxUXzNkKuaQ8JHlUlsacxRYNWIOig4T0B92YmY4lvk0theppmz8-ypmf-3rGT9F_axc-9CAIJ22tYTP5XzxKouLRkO8LAK23SehHQkt-OURUic28jRU2626ITtMT1rD1iL9GuF8_108h36PWYN8wKizm6S1ZBfjOey6BhlTL4npgRsUBkzqOAT1MObQetz-C5vAHuzeRFrH1dpZEXqUb-4Dy9NdgM22WE" />
                        </div>
                        <div className="flex-1 flex flex-col gap-6">
                            <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-sm">
                                <span className="material-symbols-outlined text-lg">star</span> Editor's Choice
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-text-primary-light dark:text-text-primary-dark leading-tight">
                                The Beast: Edition 1
                            </h2>
                            <p className="text-text-secondary-light dark:text-text-secondary-dark text-lg leading-relaxed">
                                Our flagship Kashmir Willow bat. Hand-pressed for immediate playability and designed with an extended sweet spot for explosive power hitting.
                            </p>
                            <div className="flex gap-8 py-4 border-y border-border-light dark:border-border-dark">
                                <div>
                                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-1">Weight</p>
                                    <p className="font-bold text-lg">1150g - 1200g</p>
                                </div>
                                <div>
                                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-1">Grade</p>
                                    <p className="font-bold text-lg">Grade 1+</p>
                                </div>
                                <div>
                                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-1">Handle</p>
                                    <p className="font-bold text-lg">Singapore Cane</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6 mt-2">
                                <div className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark">
                                    ₹2,499
                                </div>
                                <button className="flex-1 bg-text-primary-light dark:bg-white text-white dark:text-background-dark hover:bg-primary dark:hover:bg-gray-200 py-4 px-8 rounded-lg font-bold transition-colors flex items-center justify-center gap-2">
                                    Add to Cart
                                    <span className="material-symbols-outlined">shopping_cart</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Badges Section */}
            <section className="py-16 px-4 md:px-10 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between mb-12">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl font-black mb-4">Why Choose Stag Kashmir?</h2>
                        <p className="text-text-secondary-light dark:text-text-secondary-dark text-lg">Authenticity and quality you can trust, delivered straight from the valley to your doorstep.</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col gap-4 p-6 rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark hover:border-primary/50 transition-colors group">
                        <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-2xl">verified_user</span>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold mb-2">Authentic Craftsmanship</h3>
                            <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm leading-relaxed">
                                Every bat is handcrafted by expert artisans in Kashmir using 100% genuine Kashmir Willow, ensuring superior stroke play.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 p-6 rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark hover:border-primary/50 transition-colors group">
                        <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-2xl">local_shipping</span>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold mb-2">PAN India Delivery</h3>
                            <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm leading-relaxed">
                                Fast, secure, and trackable shipping to every corner of India. We ensure your gear reaches you safely before match day.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 p-6 rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark hover:border-primary/50 transition-colors group">
                        <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-2xl">forest</span>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold mb-2">Premium Willow Sourcing</h3>
                            <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm leading-relaxed">
                                We source wood directly from the finest willow trees in the valley, selected for density and grain structure for optimal performance.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="px-4 md:px-10 py-12">
                <div className="w-full rounded-2xl bg-surface-dark dark:bg-surface-light text-white dark:text-background-dark p-8 md:p-16 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ea2a33 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-black mb-4">Join the Squad</h2>
                        <p className="text-gray-300 dark:text-gray-600 mb-8 text-lg">Subscribe for exclusive drops, early access to custom bats, and cricket tips from the pros.</p>
                        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <input className="flex-1 px-4 py-3 rounded-lg border-0 text-gray-900 focus:ring-2 focus:ring-primary" placeholder="Enter your email" required type="email" />
                            <button className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg transition-colors" type="submit">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}
