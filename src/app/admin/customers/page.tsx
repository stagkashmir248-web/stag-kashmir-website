import { prisma } from "@/lib/prisma";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

export default async function AdminCustomersPage() {
    const users = await prisma.user.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            accounts: true,
            sessions: true
        }
    });

    return (
        <div className="flex flex-col gap-8 w-full max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Registered Customers</h1>
                    <p className="text-slate-500 mt-2">View all users who have signed into your store.</p>
                </div>
                <div className="bg-primary/10 text-primary px-4 py-2 rounded-full font-bold text-sm">
                    {users.length} Total Users
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                            <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-slate-500">Customer</th>
                            <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-slate-500">Authentication</th>
                            <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-slate-500">Joined Date</th>
                            <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-slate-500 text-center">Active Sessions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="py-12 text-center text-slate-500">
                                    No customers found.
                                </td>
                            </tr>
                        ) : users.map((user) => (
                            <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-4">
                                        <div className="size-10 bg-slate-100 rounded-full border border-slate-200 overflow-hidden shrink-0">
                                            {user.image ? (
                                                <img src={user.image} alt={user.name || "User"} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold">
                                                    {user.name?.charAt(0) || "U"}
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-slate-900 dark:text-white">{user.name || "Unknown"}</span>
                                            <a href={`mailto:${user.email}`} className="text-sm text-slate-500 hover:text-primary transition-colors">{user.email}</a>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-2">
                                        {user.accounts.length > 0 ? (
                                            user.accounts.map(acc => (
                                                <span key={acc.id} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200 shadow-sm">
                                                    {acc.provider === 'google' && (
                                                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" /></svg>
                                                    )}
                                                    {acc.provider}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-xs text-slate-400 italic">No linked providers</span>
                                        )}
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    <span className="text-slate-600 dark:text-slate-300 font-medium">
                                        {format(new Date(user.createdAt), "MMM d, yyyy")}
                                    </span>
                                </td>
                                <td className="py-4 px-6 text-center">
                                    <span className={`inline-flex items-center justify-center size-8 rounded-full text-sm font-bold ${user.sessions.length > 0 ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                                        {user.sessions.length}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
