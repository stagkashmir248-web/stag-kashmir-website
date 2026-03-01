"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { getNewsletterCsv } from "@/actions/newsletter";

export default function DownloadCsvButton() {
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = async () => {
        setIsDownloading(true);
        try {
            const csvText = await getNewsletterCsv();

            // Create a Blob from the CSV String
            const blob = new Blob([csvText], { type: "text/csv;charset=utf-8;" });

            // Create a link element, hide it, direct it towards the blob, and then 'click' it programmatically
            const link = document.createElement("a");
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", `stag-kashmir-newsletter-${new Date().toISOString().split('T')[0]}.csv`);
            link.style.visibility = "hidden";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        } catch (error) {
            console.error("Failed to download CSV:", error);
            alert("Failed to download CSV. Please try again.");
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex items-center gap-2 bg-[#F1DD00] hover:bg-[#D4C300] text-black px-4 py-2 rounded-lg font-semibold transition-colors disabled:opacity-75 disabled:cursor-not-allowed"
        >
            {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            Export CSV
        </button>
    );
}
