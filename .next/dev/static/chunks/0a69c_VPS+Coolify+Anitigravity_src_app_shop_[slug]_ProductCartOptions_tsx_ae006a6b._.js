(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/shop/[slug]/ProductCartOptions.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProductCartOptions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$src$2f$store$2f$cart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/store/cart.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function ProductCartOptions({ product }) {
    _s();
    const [quantity, setQuantity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [selectedSize, setSelectedSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("34 inches");
    const addItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$src$2f$store$2f$cart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCartStore"])({
        "ProductCartOptions.useCartStore[addItem]": (state)=>state.addItem
    }["ProductCartOptions.useCartStore[addItem]"]);
    const handleAddToCart = ()=>{
        addItem({
            id: `${product.id}-${selectedSize}`,
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity,
            imageUrl: product.imageUrl || "/placeholder.jpg",
            size: selectedSize
        });
        // Optional: Add a toast notification here later
        alert("Added to cart!");
    };
    const handleDecreaseQuantity = ()=>{
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };
    const handleIncreaseQuantity = ()=>{
        if (quantity < product.stock) {
            setQuantity(quantity + 1);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center mb-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-sm font-bold text-text-main uppercase tracking-wide",
                                children: "Select Bat Size"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/shop/[slug]/ProductCartOptions.tsx",
                                lineNumber: 52,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "text-xs text-primary font-medium hover:underline",
                                children: "Size Guide"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/shop/[slug]/ProductCartOptions.tsx",
                                lineNumber: 55,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/shop/[slug]/ProductCartOptions.tsx",
                        lineNumber: 51,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-3",
                        children: [
                            "34 inches",
                            "35 inches"
                        ].map((size)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "cursor-pointer flex-1 min-w-[120px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "radio",
                                        name: "size",
                                        className: "peer sr-only",
                                        checked: selectedSize === size,
                                        onChange: ()=>setSelectedSize(size)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/shop/[slug]/ProductCartOptions.tsx",
                                        lineNumber: 62,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex h-14 items-center justify-center border-2 border-border-color bg-white px-4 text-base font-medium text-text-main peer-checked:border-primary transition-all hover:border-gray-400",
                                        children: size
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/shop/[slug]/ProductCartOptions.tsx",
                                        lineNumber: 69,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, size, true, {
                                fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/shop/[slug]/ProductCartOptions.tsx",
                                lineNumber: 61,
                                columnNumber: 25
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/shop/[slug]/ProductCartOptions.tsx",
                        lineNumber: 59,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/shop/[slug]/ProductCartOptions.tsx",
                lineNumber: 50,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-8 pt-6 border-t border-border-color flex flex-col gap-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex w-32 items-center rounded-lg border border-border-color bg-white",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleDecreaseQuantity,
                                    className: "flex h-full w-10 items-center justify-center text-text-secondary hover:text-primary transition-colors",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "material-symbols-outlined !text-lg",
                                        children: "remove"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/shop/[slug]/ProductCartOptions.tsx",
                                        lineNumber: 84,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/shop/[slug]/ProductCartOptions.tsx",
                                    lineNumber: 80,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    className: "h-full w-full border-none bg-transparent text-center font-medium text-text-main focus:ring-0",
                                    readOnly: true,
                                    type: "text",
                                    value: quantity
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/shop/[slug]/ProductCartOptions.tsx",
                                    lineNumber: 86,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleIncreaseQuantity,
                                    disabled: quantity >= product.stock,
                                    className: "flex h-full w-10 items-center justify-center text-text-secondary hover:text-primary transition-colors disabled:opacity-50",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "material-symbols-outlined !text-lg",
                                        children: "add"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/shop/[slug]/ProductCartOptions.tsx",
                                        lineNumber: 97,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/shop/[slug]/ProductCartOptions.tsx",
                                    lineNumber: 92,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/shop/[slug]/ProductCartOptions.tsx",
                            lineNumber: 79,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleAddToCart,
                            disabled: product.stock <= 0,
                            className: `flex-1 rounded-lg py-3.5 text-base font-bold text-white shadow-md transition-all flex items-center justify-center gap-2 ${product.stock > 0 ? "bg-primary shadow-primary/20 hover:bg-primary-dark hover:shadow-lg" : "bg-slate-300 cursor-not-allowed"}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "material-symbols-outlined",
                                    children: product.stock <= 0 ? "block" : "shopping_bag"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/shop/[slug]/ProductCartOptions.tsx",
                                    lineNumber: 108,
                                    columnNumber: 25
                                }, this),
                                product.stock <= 0 ? "Sold Out" : "Add to Cart"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/shop/[slug]/ProductCartOptions.tsx",
                            lineNumber: 100,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/shop/[slug]/ProductCartOptions.tsx",
                    lineNumber: 78,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/Playground_StagKashmir_VPS+Coolify+Anitigravity/src/app/shop/[slug]/ProductCartOptions.tsx",
                lineNumber: 77,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true);
}
_s(ProductCartOptions, "ShGERD0EdOd+Ss28g74jRgikhcM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Playground_StagKashmir_VPS$2b$Coolify$2b$Anitigravity$2f$src$2f$store$2f$cart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCartStore"]
    ];
});
_c = ProductCartOptions;
var _c;
__turbopack_context__.k.register(_c, "ProductCartOptions");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=0a69c_VPS%2BCoolify%2BAnitigravity_src_app_shop_%5Bslug%5D_ProductCartOptions_tsx_ae006a6b._.js.map