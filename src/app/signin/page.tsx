import { signIn, auth } from "@/auth";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function SignInPage() {
    const session = await auth();
    if (session?.user) redirect("/dashboard");

    return (
        <main className="flex-1 flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-md flex flex-col items-center gap-8">
                {/* Logo */}
                <Link href="/" className="relative hover:opacity-80 transition-opacity group flex justify-center">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/40 to-white/30 blur-2xl rounded-full opacity-70 group-hover:opacity-100 transition-opacity" />
                    <img src="/Stag_logo-removebg-preview.png" alt="Stag Kashmir" className="relative z-10 w-[160px] h-auto object-contain drop-shadow-sm" />
                </Link>

                {/* Card */}
                <div className="w-full rounded-2xl border border-slate-700 bg-slate-900 overflow-hidden">
                    <div className="bg-gradient-to-r from-primary/10 to-transparent border-b border-slate-700 px-8 py-6 text-center">
                        <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
                        <p className="text-slate-400 text-sm mt-1.5">Sign in to track your orders, manage your profile, and more</p>
                    </div>

                    <div className="px-8 py-8 flex flex-col gap-4">
                        {/* Google sign in */}
                        <form action={async () => {
                            "use server";
                            await signIn("google", { redirectTo: "/dashboard" });
                        }}>
                            <button type="submit"
                                className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl border border-slate-600 bg-slate-800 hover:bg-slate-700 hover:border-slate-500 text-white font-semibold text-sm transition-all">
                                <svg className="size-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" fill="#4285F4" />
                                </svg>
                                Continue with Google
                            </button>
                        </form>

                        <div className="flex items-center gap-3">
                            <div className="flex-1 h-px bg-slate-700" />
                            <span className="text-xs text-slate-500 font-medium">OR</span>
                            <div className="flex-1 h-px bg-slate-700" />
                        </div>

                        {/* Guest order tracking */}
                        <Link href="/track-order"
                            className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/10 hover:border-amber-500/50 text-amber-300 font-semibold text-sm transition-all">
                            <span className="material-symbols-outlined !text-[18px]">manage_search</span>
                            Track an Order Without Signing In
                        </Link>
                    </div>

                    <div className="px-8 pb-6 text-center">
                        <p className="text-xs text-slate-500">
                            By signing in, you agree to our{" "}
                            <Link href="/care-guide" className="text-slate-400 hover:text-white underline transition-colors">Terms</Link>{" "}
                            and{" "}
                            <Link href="/care-guide" className="text-slate-400 hover:text-white underline transition-colors">Privacy Policy</Link>
                        </p>
                    </div>
                </div>

                <Link href="/" className="text-sm text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1">
                    <span className="material-symbols-outlined !text-[16px]">arrow_back</span>
                    Back to Home
                </Link>
            </div>
        </main>
    );
}
