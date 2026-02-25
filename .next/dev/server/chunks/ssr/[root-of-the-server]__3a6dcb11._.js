module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/inquiries/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminInquiriesPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/node_modules/@prisma/client)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$date$2d$fns$2f$formatDistanceToNow$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/node_modules/date-fns/formatDistanceToNow.js [app-rsc] (ecmascript)");
;
;
;
const prisma = new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]();
async function AdminInquiriesPage() {
    const inquiries = await prisma.inquiry.findMany({
        orderBy: {
            createdAt: "desc"
        }
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-8 w-full max-w-6xl",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-end justify-between",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-3xl font-bold text-slate-900 dark:text-white",
                            children: "Contact Messages"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/inquiries/page.tsx",
                            lineNumber: 15,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-slate-500 mt-2",
                            children: "View messages submitted through the Contact Us form."
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/inquiries/page.tsx",
                            lineNumber: 16,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/inquiries/page.tsx",
                    lineNumber: 14,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/inquiries/page.tsx",
                lineNumber: 13,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 gap-6",
                children: inquiries.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white dark:bg-slate-900 rounded-xl p-12 text-center border border-slate-200 dark:border-slate-800",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "material-symbols-outlined text-4xl text-slate-300 mb-4",
                            children: "mail"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/inquiries/page.tsx",
                            lineNumber: 23,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-medium text-slate-900 dark:text-white",
                            children: "No inquiries yet"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/inquiries/page.tsx",
                            lineNumber: 24,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-slate-500 text-sm mt-1",
                            children: "When customers contact you, their messages will appear here."
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/inquiries/page.tsx",
                            lineNumber: 25,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/inquiries/page.tsx",
                    lineNumber: 22,
                    columnNumber: 21
                }, this) : inquiries.map((inquiry)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute top-0 left-0 w-1 h-full bg-primary/20 group-hover:bg-primary transition-colors"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/inquiries/page.tsx",
                                lineNumber: 29,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-start",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "size-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center font-bold text-primary",
                                                children: inquiry.name.charAt(0).toUpperCase()
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/inquiries/page.tsx",
                                                lineNumber: 33,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "font-bold text-slate-900 dark:text-white text-lg",
                                                        children: inquiry.subject
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/inquiries/page.tsx",
                                                        lineNumber: 37,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3 text-xs text-slate-500 mt-0.5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-medium text-slate-700 dark:text-slate-300",
                                                                children: inquiry.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/inquiries/page.tsx",
                                                                lineNumber: 39,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "•"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/inquiries/page.tsx",
                                                                lineNumber: 40,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                href: `mailto:${inquiry.email}`,
                                                                className: "hover:text-primary transition-colors flex items-center gap-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "material-symbols-outlined !text-[12px]",
                                                                        children: "mail"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/inquiries/page.tsx",
                                                                        lineNumber: 42,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    " ",
                                                                    inquiry.email
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/inquiries/page.tsx",
                                                                lineNumber: 41,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/inquiries/page.tsx",
                                                        lineNumber: 38,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/inquiries/page.tsx",
                                                lineNumber: 36,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/inquiries/page.tsx",
                                        lineNumber: 32,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-medium text-slate-400 bg-slate-50 dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-100 dark:border-slate-700",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$date$2d$fns$2f$formatDistanceToNow$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatDistanceToNow"])(inquiry.createdAt, {
                                            addSuffix: true
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/inquiries/page.tsx",
                                        lineNumber: 47,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/inquiries/page.tsx",
                                lineNumber: 31,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-100 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap leading-relaxed",
                                children: inquiry.message
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/inquiries/page.tsx",
                                lineNumber: 52,
                                columnNumber: 25
                            }, this)
                        ]
                    }, inquiry.id, true, {
                        fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/inquiries/page.tsx",
                        lineNumber: 28,
                        columnNumber: 21
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/inquiries/page.tsx",
                lineNumber: 20,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/inquiries/page.tsx",
        lineNumber: 12,
        columnNumber: 9
    }, this);
}
}),
"[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/inquiries/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/inquiries/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__3a6dcb11._.js.map