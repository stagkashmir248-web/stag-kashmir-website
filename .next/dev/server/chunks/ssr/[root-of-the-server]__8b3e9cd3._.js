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
"[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/orders/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminOrdersPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/node_modules/@prisma/client)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$date$2d$fns$2f$formatDistanceToNow$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/node_modules/date-fns/formatDistanceToNow.js [app-rsc] (ecmascript)");
;
;
;
const prisma = new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]();
async function AdminOrdersPage() {
    const orders = await prisma.order.findMany({
        orderBy: {
            createdAt: "desc"
        },
        include: {
            items: {
                include: {
                    product: true
                }
            }
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
                            children: "Order Inquiries"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/orders/page.tsx",
                            lineNumber: 23,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-slate-500 mt-2",
                            children: "Manage incoming checkout submissions awaiting payment."
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/orders/page.tsx",
                            lineNumber: 24,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/orders/page.tsx",
                    lineNumber: 22,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/orders/page.tsx",
                lineNumber: 21,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: "w-full text-left border-collapse",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                className: "border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "py-4 px-6 font-bold text-xs uppercase tracking-wider text-slate-500",
                                        children: "Order ID & Date"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/orders/page.tsx",
                                        lineNumber: 32,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "py-4 px-6 font-bold text-xs uppercase tracking-wider text-slate-500",
                                        children: "Customer Info"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/orders/page.tsx",
                                        lineNumber: 33,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "py-4 px-6 font-bold text-xs uppercase tracking-wider text-slate-500",
                                        children: "Items"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/orders/page.tsx",
                                        lineNumber: 34,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "py-4 px-6 font-bold text-xs uppercase tracking-wider text-slate-500 text-right",
                                        children: "Total"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/orders/page.tsx",
                                        lineNumber: 35,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "py-4 px-6 font-bold text-xs uppercase tracking-wider text-slate-500 text-center",
                                        children: "Status"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/orders/page.tsx",
                                        lineNumber: 36,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/orders/page.tsx",
                                lineNumber: 31,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/orders/page.tsx",
                            lineNumber: 30,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            className: "divide-y divide-slate-100 dark:divide-slate-800",
                            children: orders.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    colSpan: 5,
                                    className: "py-12 text-center text-slate-500",
                                    children: "No pending orders yet."
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/orders/page.tsx",
                                    lineNumber: 42,
                                    columnNumber: 33
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/orders/page.tsx",
                                lineNumber: 41,
                                columnNumber: 29
                            }, this) : orders.map((order)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: "hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "py-4 px-6",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-mono text-sm font-bold text-primary",
                                                        children: order.id.slice(0, 8).toUpperCase()
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/orders/page.tsx",
                                                        lineNumber: 50,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs text-slate-500",
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$date$2d$fns$2f$formatDistanceToNow$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatDistanceToNow"])(order.createdAt, {
                                                            addSuffix: true
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/orders/page.tsx",
                                                        lineNumber: 51,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/orders/page.tsx",
                                                lineNumber: 49,
                                                columnNumber: 37
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/orders/page.tsx",
                                            lineNumber: 48,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "py-4 px-6",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-medium text-slate-900 dark:text-white text-sm",
                                                        children: order.customer
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/orders/page.tsx",
                                                        lineNumber: 56,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2 text-xs text-slate-500",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "material-symbols-outlined !text-[14px]",
                                                                children: "mail"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/orders/page.tsx",
                                                                lineNumber: 58,
                                                                columnNumber: 45
                                                            }, this),
                                                            " ",
                                                            order.email
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/orders/page.tsx",
                                                        lineNumber: 57,
                                                        columnNumber: 41
                                                    }, this),
                                                    order.phone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2 text-xs text-slate-500",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "material-symbols-outlined !text-[14px]",
                                                                children: "call"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/orders/page.tsx",
                                                                lineNumber: 62,
                                                                columnNumber: 49
                                                            }, this),
                                                            " ",
                                                            order.phone
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/orders/page.tsx",
                                                        lineNumber: 61,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/orders/page.tsx",
                                                lineNumber: 55,
                                                columnNumber: 37
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/orders/page.tsx",
                                            lineNumber: 54,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "py-4 px-6",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col gap-2",
                                                children: order.items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "size-8 bg-slate-100 rounded overflow-hidden",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                    src: item.product?.imageUrl || '/placeholder.jpg',
                                                                    alt: "",
                                                                    className: "w-full h-full object-cover"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/orders/page.tsx",
                                                                    lineNumber: 72,
                                                                    columnNumber: 53
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/orders/page.tsx",
                                                                lineNumber: 71,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex flex-col",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-sm font-medium text-slate-900 dark:text-white line-clamp-1",
                                                                        children: item.product?.name || "Unknown Product"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/orders/page.tsx",
                                                                        lineNumber: 75,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs text-slate-500",
                                                                        children: [
                                                                            "Qty: ",
                                                                            item.quantity
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/orders/page.tsx",
                                                                        lineNumber: 76,
                                                                        columnNumber: 53
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/orders/page.tsx",
                                                                lineNumber: 74,
                                                                columnNumber: 49
                                                            }, this)
                                                        ]
                                                    }, item.id, true, {
                                                        fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/orders/page.tsx",
                                                        lineNumber: 70,
                                                        columnNumber: 45
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/orders/page.tsx",
                                                lineNumber: 68,
                                                columnNumber: 37
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/orders/page.tsx",
                                            lineNumber: 67,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "py-4 px-6 text-right",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-bold text-slate-900 dark:text-white",
                                                children: [
                                                    "₹",
                                                    order.total.toLocaleString("en-IN")
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/orders/page.tsx",
                                                lineNumber: 83,
                                                columnNumber: 37
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/orders/page.tsx",
                                            lineNumber: 82,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "py-4 px-6 align-middle text-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
                                                children: order.status
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/orders/page.tsx",
                                                lineNumber: 86,
                                                columnNumber: 37
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/orders/page.tsx",
                                            lineNumber: 85,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, order.id, true, {
                                    fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/orders/page.tsx",
                                    lineNumber: 47,
                                    columnNumber: 29
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/orders/page.tsx",
                            lineNumber: 39,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/orders/page.tsx",
                    lineNumber: 29,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/orders/page.tsx",
                lineNumber: 28,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/orders/page.tsx",
        lineNumber: 20,
        columnNumber: 9
    }, this);
}
}),
"[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/orders/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/admin/orders/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__8b3e9cd3._.js.map