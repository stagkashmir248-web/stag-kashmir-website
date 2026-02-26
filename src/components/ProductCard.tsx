import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
    id: string;
    slug: string;
    name: string;
    category: string;
    price: number;
    originalPrice?: number;
    imageUrl: string;
    rating: number;
    reviewCount: number;
    tag?: string; // e.g. "10% OFF", "FEATURED"
    tagColor?: "green" | "yellow" | "blue" | "red";
}

const tagColors = {
    green: "bg-green-600 text-white",
    yellow: "bg-amber-500 text-white",
    blue: "bg-blue-600 text-white",
    red: "bg-red-600 text-white"
};

export default function ProductCard({
    slug,
    name,
    category,
    price,
    originalPrice,
    imageUrl,
    rating,
    reviewCount,
    tag,
    tagColor = "green"
}: ProductCardProps) {

    // Render static stars based on rating
    const renderStars = () => {
        return Array.from({ length: 5 }).map((_, i) => (
            <span
                key={i}
                className={`material-symbols-outlined text-[14px] ${i < rating ? 'text-amber-500' : 'text-gray-300 dark:text-gray-600'}`}
                style={{ fontVariationSettings: "'FILL' 1" }}
            >
                star
            </span>
        ));
    };

    return (
        <div className="group relative flex flex-col bg-transparent transition-all duration-300 w-full max-w-[280px] mx-auto">
            {/* Image Container */}
            <Link href={`/shop/${slug}`} className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#F8F9FA] dark:bg-gray-800 mb-4 flex items-center justify-center p-6">

                {/* Floating Tag */}
                {tag && (
                    <div className={`absolute top-3 left-3 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded ${tagColors[tagColor]} z-10 shadow-sm`}>
                        {tag}
                    </div>
                )}

                {/* Product Image */}
                <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-110">
                    <Image
                        src={imageUrl || "/placeholder.jpg"}
                        alt={name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain"
                    />
                </div>
            </Link>

            {/* Product Info */}
            <div className="flex flex-col gap-1 px-1">
                {/* Category Subtitle */}
                <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider font-medium">
                    {category}
                </span>

                {/* Product Title */}
                <Link href={`/shop/${slug}`}>
                    <h3 className="text-[15px] font-semibold text-text-primary-light dark:text-text-primary-dark line-clamp-2 hover:text-primary transition-colors leading-snug">
                        {name}
                    </h3>
                </Link>

                {/* Ratings */}
                <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="flex items-center">
                        {renderStars()}
                    </div>
                    <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                        ({reviewCount})
                    </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark">
                        ${price.toFixed(2)}
                    </span>
                    {originalPrice && (
                        <span className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark line-through">
                            ${originalPrice.toFixed(2)}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
