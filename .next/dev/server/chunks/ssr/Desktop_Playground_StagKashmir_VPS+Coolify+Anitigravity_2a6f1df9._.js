module.exports = [
"[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/actions/order.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"70cd94455380060f431b06371f961677d100c23dfc":"submitOrder"},"",""] */ __turbopack_context__.s([
    "submitOrder",
    ()=>submitOrder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/node_modules/@prisma/client)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
const prisma = new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]();
async function submitOrder(customer, items, total) {
    try {
        if (!customer.name || !customer.email || !customer.phone) {
            return {
                success: false,
                error: "All customer fields are required."
            };
        }
        if (!items || items.length === 0) {
            return {
                success: false,
                error: "Cannot submit an empty order."
            };
        }
        // Create the order and its items in a single transaction
        const order = await prisma.order.create({
            data: {
                customer: customer.name,
                email: customer.email,
                phone: customer.phone,
                total: total,
                status: "PENDING",
                items: {
                    create: items.map((item)=>({
                            quantity: item.quantity,
                            price: item.price,
                            product: {
                                connect: {
                                    id: item.productId
                                }
                            }
                        }))
                }
            }
        });
        console.log(`Order created successfully: ${order.id}`);
        // Optional: Revalidate the admin dashboard path later
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/orders");
        return {
            success: true,
            orderId: order.id
        };
    } catch (error) {
        console.error("Failed to submit order:", error);
        return {
            success: false,
            error: "An error occurred while submitting your order. Please try again."
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    submitOrder
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(submitOrder, "70cd94455380060f431b06371f961677d100c23dfc", null);
}),
"[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/.next-internal/server/app/checkout/page/actions.js { ACTIONS_MODULE0 => \"[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/actions/order.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$src$2f$actions$2f$order$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/actions/order.ts [app-rsc] (ecmascript)");
;
}),
"[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/.next-internal/server/app/checkout/page/actions.js { ACTIONS_MODULE0 => \"[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/actions/order.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "70cd94455380060f431b06371f961677d100c23dfc",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$src$2f$actions$2f$order$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["submitOrder"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f2e$next$2d$internal$2f$server$2f$app$2f$checkout$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$src$2f$actions$2f$order$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/.next-internal/server/app/checkout/page/actions.js { ACTIONS_MODULE0 => "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/actions/order.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$src$2f$actions$2f$order$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/actions/order.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=Desktop_Playground_StagKashmir_VPS%2BCoolify%2BAnitigravity_2a6f1df9._.js.map