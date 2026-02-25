module.exports = [
"[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/actions/admin-product.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40eaa28daee12ba803b965525c203cfa04fff70859":"deleteProduct"},"",""] */ __turbopack_context__.s([
    "deleteProduct",
    ()=>deleteProduct
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/node_modules/@prisma/client)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
const prisma = new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]();
async function deleteProduct(productId) {
    try {
        // Note: In a real app we might prevent deletion if it's tied to an order, 
        // or use soft deletes. For this MVP, we allow raw deletion.
        await prisma.product.delete({
            where: {
                id: productId
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/products");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/shop");
        return {
            success: true
        };
    } catch (error) {
        console.error("Failed to delete product:", error);
        return {
            success: false,
            error: "Failed to delete product."
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    deleteProduct
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteProduct, "40eaa28daee12ba803b965525c203cfa04fff70859", null);
}),
"[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/.next-internal/server/app/admin/products/page/actions.js { ACTIONS_MODULE0 => \"[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/actions/admin-product.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$src$2f$actions$2f$admin$2d$product$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/actions/admin-product.ts [app-rsc] (ecmascript)");
;
}),
"[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/.next-internal/server/app/admin/products/page/actions.js { ACTIONS_MODULE0 => \"[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/actions/admin-product.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "40eaa28daee12ba803b965525c203cfa04fff70859",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$src$2f$actions$2f$admin$2d$product$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteProduct"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f2e$next$2d$internal$2f$server$2f$app$2f$admin$2f$products$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$src$2f$actions$2f$admin$2d$product$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/.next-internal/server/app/admin/products/page/actions.js { ACTIONS_MODULE0 => "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/actions/admin-product.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$src$2f$actions$2f$admin$2d$product$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/actions/admin-product.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=Desktop_Playground_StagKashmir_VPS%2BCoolify%2BAnitigravity_7eabae30._.js.map