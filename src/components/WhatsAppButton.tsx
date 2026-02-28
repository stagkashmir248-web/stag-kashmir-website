"use client";

export default function WhatsAppButton() {
    return (
        <a
            href="https://wa.me/919469886630"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-transform hover:scale-110"
            aria-label="Chat with us on WhatsApp"
        >
            <img
                src="/whatsappicon.png"
                alt="WhatsApp"
                width={32}
                height={32}
                className="object-contain"
            />
        </a>
    );
}
