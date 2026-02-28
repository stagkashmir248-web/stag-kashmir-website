import fs from 'fs';

let source = fs.readFileSync('src/app/admin/products/[id]/EditProductForm.tsx', 'utf-8');

// Use createProduct
source = source.replace('import { updateProduct } from "@/actions/admin-product";', 'import { createProduct } from "@/actions/admin-product";\nimport Link from "next/link";');
source = source.replace('import DeleteProductButton from "../DeleteProductButton";', '');

// Rename function
source = source.replace('export default function EditProductForm({ product }: { product: ProductWithVariations }) {', 'export default function NewProductPage() {');

// Remove prop dependencies
source = source.replace(/const \[name, setName\] = useState\(product\.name\);/g, 'const [name, setName] = useState("");');
source = source.replace(/const \[slug, setSlug\] = useState\(product\.slug\);/g, 'const [slug, setSlug] = useState("");');
source = source.replace(/const \[description, setDescription\] = useState\(product\.description \|\| ""\);/g, 'const [description, setDescription] = useState("");');
source = source.replace(/const \[price, setPrice\] = useState\(product\.price\.toString\(\)\);/g, 'const [price, setPrice] = useState("");');
source = source.replace(/const \[compareAtPrice, setCompareAtPrice\] = useState\(\(product as any\)\.compareAtPrice\?\.toString\(\) \|\| ""\);/g, 'const [compareAtPrice, setCompareAtPrice] = useState("");');
source = source.replace(/const \[stock, setStock\] = useState\(product\.stock\.toString\(\)\);/g, 'const [stock, setStock] = useState("");');
source = source.replace(/const \[imagePreview, setImagePreview\] = useState<string \| null>\(product\.imageUrl\);/g, 'const [imagePreview, setImagePreview] = useState<string | null>(null);');
source = source.replace(/const \[videoUrl, setVideoUrl\] = useState\(product\.videoUrl \|\| ""\);/g, 'const [videoUrl, setVideoUrl] = useState("");');
source = source.replace(/const \[extraImages, setExtraImages\] = useState<string\[\]>\(product\.images \|\| \[\]\);/g, 'const [extraImages, setExtraImages] = useState<string[]>([]);');

// Variations state
source = source.replace(/const \[variations, setVariations\] = useState<VariationRow\[\]>\([\s\S]*?\}\)\n    \);/g, 'const [variations, setVariations] = useState<VariationRow[]>([]);');

source = source.replace(/const \[willowType, setWillowType\] = useState\(\(product as any\)\.willowType \|\| ""\);/g, 'const [willowType, setWillowType] = useState("");');
source = source.replace(/const \[grade, setGrade\] = useState\(\(product as any\)\.grade \|\| ""\);/g, 'const [grade, setGrade] = useState("");');
source = source.replace(/const \[blade, setBlade\] = useState\(\(product as any\)\.blade \|\| ""\);/g, 'const [blade, setBlade] = useState("");');
source = source.replace(/const \[ballType, setBallType\] = useState\(\(product as any\)\.ballType \|\| ""\);/g, 'const [ballType, setBallType] = useState("");');
source = source.replace(/const \[warranty, setWarranty\] = useState\(\(product as any\)\.warranty \|\| ""\);/g, 'const [warranty, setWarranty] = useState("");');
source = source.replace(/const \[features, setFeatures\] = useState<string\[\]>\(\(product as any\)\.features \|\| \[\]\);/g, 'const [features, setFeatures] = useState<string[]>([]);');
source = source.replace(/const \[category, setCategory\] = useState\(\(product as any\)\.category \|\| ""\);/g, 'const [category, setCategory] = useState("");');

source = source.replace(/const \[genDefaultPrice, setGenDefaultPrice\] = useState\(price \|\| "0"\);/g, 'const [genDefaultPrice, setGenDefaultPrice] = useState("");');

const oldSubmit = `        try {
            const result = await updateProduct(product.id, {
                name, slug, description, price: Number(price), compareAtPrice: compareAtPrice ? Number(compareAtPrice) : undefined, stock: Number(stock),
                imageUrl: base64Image, images: extraImages, videoUrl: videoUrl || undefined,
                willowType: willowType || undefined, grade: grade || undefined, blade: blade || undefined,
                ballType: ballType || undefined, warranty: warranty || undefined, features,
                category: category || undefined,
                variations: variations.map(v => { const parts = [v.size, v.weight, v.extra].filter(p => p.trim()); return { id: v.id, name: parts.join(" | "), price: Number(v.price), compareAtPrice: v.compareAtPrice ? Number(v.compareAtPrice) : undefined, stock: Number(v.stock) }; })
            });`;

const newSubmit = `        if (!base64Image) { setErrorMsg("Please upload a product image."); setIsSubmitting(false); return; }
        try {
            const result = await createProduct({
                name, slug, description, price: Number(price), compareAtPrice: compareAtPrice ? Number(compareAtPrice) : undefined, stock: Number(stock),
                imageUrl: base64Image, images: extraImages, videoUrl: videoUrl || undefined,
                willowType: willowType || undefined, grade: grade || undefined, blade: blade || undefined,
                ballType: ballType || undefined, warranty: warranty || undefined, features,
                category: category || undefined,
                variations: variations.map(v => { const parts = [v.size, v.weight, v.extra].filter(p => p.trim()); return { name: parts.join(" | "), price: Number(v.price), compareAtPrice: v.compareAtPrice ? Number(v.compareAtPrice) : undefined, stock: Number(v.stock) }; })
            });`;
source = source.replace(oldSubmit, newSubmit);

// Form and container
source = source.replace('<form onSubmit={handleSubmit} className="flex flex-col gap-6">', `<div className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-2">
                <Link href="/admin/products" className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-500 hover:text-white">
                    <span className="material-symbols-outlined !text-[24px]">arrow_back</span>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-white">Add New Product</h1>
                    <p className="text-slate-500 mt-1">Fill in the details below to add a new bat to your store.</p>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">`);

// Remove Live URL bar entirely
const liveUrlBar = `{/* Live URL bar */}
            <a href={\`/shop/\${slug}\`} target="_blank" rel="noopener noreferrer"
                className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-700 bg-slate-800 hover:border-primary/50 transition-colors">
                <span className="material-symbols-outlined !text-[16px] text-slate-400">link</span>
                <span className="text-xs text-slate-400">Live URL:</span>
                <span className="text-xs text-primary font-medium group-hover:underline">/shop/{slug}</span>
                <span className="material-symbols-outlined !text-[14px] text-slate-500 ml-auto">open_in_new</span>
            </a>`;
source = source.replace(liveUrlBar, '');

// Remove DeleteProductButton from Save Bar (since we added it to EditProductForm)
source = source.replace(/<DeleteProductButton productId={product\.id} productName={name} \/>/g, '');

source = source.replace('Save Product', 'Create Product');

// Close the wrapper div
source = source.replace('</form>\n    );\n}', '</form>\n        </div>\n    );\n}');

fs.writeFileSync('src/app/admin/products/new/page.tsx', source);
console.log("Rewrite complete.");
