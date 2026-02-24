const fs = require('fs');
const path = require('path');

const moves = [
    ['src/pages/Home.tsx', 'src/app/page.tsx'],
    ['src/pages/Shop.tsx', 'src/app/shop/page.tsx'],
    ['src/pages/ProductDetail.tsx', 'src/app/shop/[slug]/page.tsx'],
    ['src/pages/CartReview.tsx', 'src/app/checkout/page.tsx'],
    ['src/pages/Dashboard.tsx', 'src/app/dashboard/page.tsx'],
    ['src/pages/CustomBat.tsx', 'src/app/custom-bat/page.tsx'],
    ['src/pages/CareGuide.tsx', 'src/app/care-guide/page.tsx'],
    ['src/pages/About.tsx', 'src/app/about/page.tsx'],
    ['src/pages/Contact.tsx', 'src/app/contact/page.tsx'],
    ['src/pages/AdminInventory.tsx', 'src/app/admin/inventory/page.tsx'],
    ['src/pages/AdminVariations.tsx', 'src/app/admin/variations/page.tsx'],
];

fs.mkdirSync('src/app/shop/[slug]', { recursive: true });

for (const [src, dest] of moves) {
    if (fs.existsSync(src)) {
        const destDir = path.dirname(dest);
        if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
        fs.renameSync(src, dest);
    }
}

function replaceInDir(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir, { withFileTypes: true });
    for (const file of files) {
        const fullPath = path.join(dir, file.name);
        if (file.isDirectory()) {
            replaceInDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');

            let newContent = content.replace(/import\s+\{\s*Link\s*\}\s+from\s+['"]react-router-dom['"];/g, 'import Link from "next/link";');
            newContent = newContent.replace(/<Link\s+to=/g, '<Link href=');

            if (content !== newContent) {
                fs.writeFileSync(fullPath, newContent);
            }
        }
    }
}

replaceInDir('src/app');
replaceInDir('src/components');

if (fs.existsSync('src/index.css')) {
    fs.copyFileSync('src/index.css', 'src/app/globals.css');
}
console.log('Migration script complete.');
