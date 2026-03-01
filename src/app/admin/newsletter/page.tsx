import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { format } from "date-fns";
import DownloadCsvButton from "./DownloadCsvButton";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = { title: "Newsletter Subscribers | Admin" };

export default async function AdminNewsletterPage() {
    const session = await auth();
    if (session?.user?.email !== "stagkashmir248@gmail.com") {
        return <div className="p-8 text-center text-red-500">Access Denied</div>;
    }

    const subscribers = await prisma.newsletterSubscriber.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8">
            <div className="flex flex-col md:flex-row items-start justify-between gap-4 mb-8">
                <div>
                    <Link href="/admin" className="flex items-center text-sm text-gray-400 hover:text-white mb-4 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Newsletter Subscribers</h1>
                    <p className="text-gray-400 mt-2">Manage and export your mailing list for marketing campaigns.</p>
                </div>
                <div className="flex gap-4 items-center">
                    <div className="bg-[#1A1A1A] px-4 py-2 rounded-lg border border-[#333] hidden md:block">
                        <span className="text-gray-400 text-sm">Total Subscribers:</span>
                        <span className="text-emerald-400 ml-2 font-mono font-bold">{subscribers.length}</span>
                    </div>
                    {subscribers.length > 0 && <DownloadCsvButton />}
                </div>
            </div>

            <div className="bg-[#1A1A1A] border border-[#333] rounded-xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-300">
                        <thead className="text-xs uppercase bg-[#222] text-gray-400 border-b border-[#333]">
                            <tr>
                                <th className="px-6 py-4 font-semibold tracking-wider">Email Address</th>
                                <th className="px-6 py-4 font-semibold tracking-wider text-right">Subscribed On</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#333]">
                            {subscribers.length === 0 ? (
                                <tr>
                                    <td colSpan={2} className="px-6 py-12 text-center text-gray-500 italic">
                                        No subscribers yet. They will appear here when people sign up on the homepage.
                                    </td>
                                </tr>
                            ) : (
                                subscribers.map((sub) => (
                                    <tr key={sub.id} className="hover:bg-[#252525] transition-colors group">
                                        <td className="px-6 py-4 font-medium text-white group-hover:text-emerald-400 transition-colors">
                                            {sub.email}
                                        </td>
                                        <td className="px-6 py-4 text-gray-400 font-mono text-right">
                                            {format(new Date(sub.createdAt), "MMM d, yyyy • h:mm a")}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
