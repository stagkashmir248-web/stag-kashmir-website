"use client";

import { useRef } from "react";
import Image from "next/image";

interface PrintShippingLabelButtonProps {
    order: {
        id: string;
        createdAt: Date;
        customer: string;
        email: string;
        phone: string | null;
        address: string | null;
        city: string | null;
        state: string | null;
        pincode: string | null;
        landmark: string | null;
        total: number;
        paymentType: "FULL" | "PARTIAL" | string | null;
        amountPaid?: number | null;
    };
}

export default function PrintShippingLabelButton({ order }: PrintShippingLabelButtonProps) {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const handlePrint = () => {
        const iframe = iframeRef.current;
        if (!iframe) return;

        const doc = iframe.contentWindow?.document;
        if (!doc) return;

        // Calculate if there's cash to collect
        const paymentTypeUpper = (order.paymentType || "").toUpperCase();
        let amountToCollect = 0;
        let paymentBadgeText = "PREPAID";
        let paymentBadgeBg = "#10b981"; // Emerald 500

        if (paymentTypeUpper === "PARTIAL" || paymentTypeUpper === "COD") {
            const paid = order.amountPaid || 0;
            amountToCollect = Math.max(0, order.total - paid);
            if (amountToCollect > 0) {
                paymentBadgeText = `CASH ON DELIVERY: ₹${amountToCollect.toLocaleString("en-IN")}`;
                paymentBadgeBg = "#f59e0b"; // Amber 500
            }
        }

        const dateFormatted = new Date(order.createdAt).toLocaleDateString("en-IN", {
            day: "2-digit", month: "short", year: "numeric"
        });

        // Generate the print-only HTML content
        const printContent = `
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Shipping Label - ${order.id}</title>
                    <style>
                        @page { size: 4in 6in; margin: 0; }
                        * { box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
                        body { margin: 0; padding: 20px; color: #000; font-size: 14px; line-height: 1.4; }
                        .label-container { border: 2px solid #000; border-radius: 8px; padding: 20px; height: calc(100vh - 40px); display: flex; flex-direction: column; }
                        
                        /* Header: SENDER */
                        .sender-section { display: flex; align-items: flex-start; justify-content: space-between; border-bottom: 2px solid #000; padding-bottom: 15px; margin-bottom: 15px; }
                        .sender-info { font-size: 12px; }
                        .sender-info strong { font-size: 16px; text-transform: uppercase; letter-spacing: 1px; }
                        
                        /* Order Meta */
                        .order-meta { display: flex; justify-content: space-between; font-weight: bold; font-size: 12px; margin-bottom: 20px; }
                        
                        /* Receiver Section */
                        .receiver-title { font-weight: bold; text-transform: uppercase; font-size: 14px; margin-bottom: 5px; text-decoration: underline; }
                        .receiver-name { font-size: 24px; font-weight: 900; margin: 0 0 5px 0; text-transform: uppercase; }
                        .receiver-address { font-size: 18px; margin: 0 0 15px 0; }
                        .receiver-phone { font-size: 18px; font-weight: bold; padding: 8px; border: 2px dashed #000; display: inline-block; margin-bottom: auto; }
                        
                        /* Footer / Badge */
                        .footer-section { margin-top: auto; border-top: 2px solid #000; padding-top: 15px; }
                        .payment-badge { background-color: ${paymentBadgeBg}; color: #fff; padding: 15px; text-align: center; font-size: 26px; font-weight: 900; border-radius: 6px; text-transform: uppercase; border: 2px solid #000;}
                        .payment-badge.prepaid { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                        .return-address { font-size: 10px; text-align: center; margin-top: 10px; color: #555; }
                    </style>
                </head>
                <body>
                    <div class="label-container">
                        <div class="sender-section">
                            <div class="sender-info">
                                <strong>Stag Kashmir</strong><br/>
                                Premium English Willow<br/>
                                Anantnag, Jammu & Kashmir<br/>
                                192101, India<br/>
                                +91 7006883204
                            </div>
                            <div style="text-align: right; font-weight: bold; font-size: 24px;">
                                SHIP TO
                            </div>
                        </div>
                        
                        <div class="order-meta">
                            <span>ORDER: #${order.id.slice(-8).toUpperCase()}</span>
                            <span>DATE: ${dateFormatted}</span>
                        </div>

                        <div class="receiver-title">DELIVER TO:</div>
                        <h1 class="receiver-name">${order.customer}</h1>
                        
                        <div class="receiver-address">
                            ${order.address || "No Address Provided"}<br/>
                            ${order.landmark ? `Landmark: ${order.landmark}<br/>` : ""}
                            ${order.city}, ${order.state}<br/>
                            <strong>PIN: ${order.pincode}</strong>
                        </div>

                        ${order.phone ? `<div class="receiver-phone">Phone: ${order.phone}</div>` : ''}
                        
                        <div class="footer-section">
                            <div class="payment-badge prepaid">${paymentBadgeText}</div>
                            <div class="return-address">If undelivered, please return to sender address above.</div>
                        </div>
                    </div>
                </body>
            </html>
        `;

        // Write to iframe and print
        doc.open();
        doc.write(printContent);
        doc.close();

        // Wait a tiny bit for render, then print
        setTimeout(() => {
            iframe.contentWindow?.focus();
            iframe.contentWindow?.print();
        }, 250);
    };

    return (
        <>
            <button
                onClick={handlePrint}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-blue-900/20"
            >
                <span className="material-symbols-outlined !text-[20px]">print</span>
                Print Shipping Label
            </button>
            <iframe
                ref={iframeRef}
                style={{ display: "none", width: "0", height: "0" }}
                title="Shipping Label Print Frame"
            />
        </>
    );
}
