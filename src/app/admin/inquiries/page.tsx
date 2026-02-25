import { prisma } from "@/lib/prisma";
import { formatDistanceToNow } from "date-fns";

export default async function AdminInquiriesPage() {
    const inquiries = await prisma.inquiry.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="flex flex-col gap-8 w-full max-w-6xl">
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Contact Messages</h1>
                    <p className="text-slate-500 mt-2">View messages submitted through the Contact Us form.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {inquiries.length === 0 ? (
                    <div className="bg-white dark:bg-slate-900 rounded-xl p-12 text-center border border-slate-200 dark:border-slate-800">
                        <span className="material-symbols-outlined text-4xl text-slate-300 mb-4">mail</span>
                        <h3 className="text-lg font-medium text-slate-900 dark:text-white">No inquiries yet</h3>
                        <p className="text-slate-500 text-sm mt-1">When customers contact you, their messages will appear here.</p>
                    </div>
                ) : inquiries.map((inquiry) => (
                    <div key={inquiry.id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1 h-full bg-primary/20 group-hover:bg-primary transition-colors"></div>

                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-4">
                                <div className="size-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center font-bold text-primary">
                                    {inquiry.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white text-lg">{inquiry.subject}</h3>
                                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                                        <span className="font-medium text-slate-700 dark:text-slate-300">{inquiry.name}</span>
                                        <span>•</span>
                                        <a href={`mailto:${inquiry.email}`} className="hover:text-primary transition-colors flex items-center gap-1">
                                            <span className="material-symbols-outlined !text-[12px]">mail</span> {inquiry.email}
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <span className="text-xs font-medium text-slate-400 bg-slate-50 dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-100 dark:border-slate-700">
                                {formatDistanceToNow(inquiry.createdAt, { addSuffix: true })}
                            </span>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-100 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                            {inquiry.message}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
