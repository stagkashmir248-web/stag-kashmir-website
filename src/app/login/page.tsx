import { signIn, signOut, auth } from "@/auth"
import Link from "next/link"

export default async function LoginPage(props: {
    searchParams: Promise<{ error?: string }>
}) {
    const searchParams = await props.searchParams;
    const session = await auth();

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
                <div className="text-center flex flex-col items-center">
                    <img src="/Stag_logo-removebg-preview.png" alt="Stag Kashmir" className="w-[140px] h-auto object-contain mb-4" />
                    <h2 className="text-2xl font-extrabold text-slate-900">
                        Admin Login
                    </h2>
                    <p className="mt-2 text-sm text-slate-600">
                        Only authorized administrators can access this area.
                    </p>
                </div>

                {searchParams?.error === "AccessDenied" && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded-r">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <span className="material-symbols-outlined text-red-500">error</span>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">
                                    Access denied. You do not have permission to view this page.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {session?.user ? (
                    <div className="mt-8 space-y-6 text-center">
                        <p className="text-sm text-slate-600 bg-slate-100 p-3 rounded-md">
                            Currently signed in as <br /><strong>{session.user.email}</strong>
                        </p>
                        <form
                            action={async () => {
                                "use server"
                                await signOut({ redirectTo: "/login" })
                            }}
                        >
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-all shadow-sm"
                            >
                                Sign Out & Try Different Account
                            </button>
                        </form>
                    </div>
                ) : (
                    <form
                        action={async () => {
                            "use server"
                            await signIn("google", { redirectTo: "/admin" })
                        }}
                        className="mt-8 space-y-6"
                    >
                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-3 px-4 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all shadow-sm"
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <svg className="h-5 w-5 text-slate-500" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                                    </svg>
                                </span>
                                Sign in with Google
                            </button>
                        </div>
                    </form>
                )}

                <div className="mt-6">
                    <Link href="/" className="w-full flex justify-center py-2 px-4 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
                        &larr; Return to main site
                    </Link>
                </div>
            </div>
        </div>
    )
}
