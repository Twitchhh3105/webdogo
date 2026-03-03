import { client } from "@/sanity/client";
import SearchPageClient from "./SearchPageClient";

interface SearchPageProps {
    searchParams: Promise<{ q?: string }>;
}

async function searchProducts(q: string) {
    if (!q || q.trim().length < 1) return [];

    const query = `*[_type == "product" && title match $pattern]{
    _id,
    title,
    price,
    discountedPrice,
    "imageUrl": images[0].asset->url,
    "categoryTitle": category->title
  } | order(_createdAt desc)`;

    try {
        return await client.fetch(query, { pattern: `*${q.trim()}*` });
    } catch {
        return [];
    }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const params = await searchParams;
    const q = params.q || "";
    const products = await searchProducts(q);

    return <SearchPageClient q={q} products={products} />;
}

export function generateMetadata({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
    return {
        title: `Tìm kiếm sản phẩm | Neuronest`,
        description: `Kết quả tìm kiếm sản phẩm trên Neuronest`,
    };
}
