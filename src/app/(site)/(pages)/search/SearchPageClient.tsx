"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/utils/formatCurrency";

type SearchProduct = {
    _id: string;
    title: string;
    price: number;
    discountedPrice?: number;
    imageUrl?: string;
    categoryTitle?: string;
};

interface SearchPageClientProps {
    q: string;
    products: SearchProduct[];
}

export default function SearchPageClient({ q, products }: SearchPageClientProps) {
    const [query, setQuery] = useState(q);
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <main className="min-h-screen bg-gray-1 pt-8 pb-16">
            <div className="max-w-[1170px] mx-auto px-4 sm:px-7.5 xl:px-0">

                {/* Search Header */}
                <div className="bg-white rounded-2xl px-6 py-8 mb-8 shadow-sm">
                    <h1 className="text-2xl font-bold text-dark mb-1">
                        {q
                            ? <>Kết quả tìm kiếm cho <span className="text-blue">&quot;{q}&quot;</span></>
                            : "Tìm kiếm sản phẩm"}
                    </h1>
                    {q && (
                        <p className="text-sm text-dark-4 mb-5">
                            {products.length > 0
                                ? `Tìm thấy ${products.length} sản phẩm`
                                : "Không tìm thấy sản phẩm nào"}
                        </p>
                    )}

                    {/* Search form */}
                    <form onSubmit={handleSearch} className="flex gap-3 max-w-[600px]">
                        <div className="flex-1 flex items-center gap-2 bg-gray-1 border border-gray-3 rounded-lg px-4 py-2.5 focus-within:border-blue transition-colors">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-dark-4 flex-shrink-0">
                                <path fillRule="evenodd" clipRule="evenodd" d="M11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C13.125 20 15.078 19.2635 16.6177 18.0319L20.2929 21.7071C20.6834 22.0976 21.3166 22.0976 21.7071 21.7071C22.0976 21.3166 22.0976 20.6834 21.7071 20.2929L18.0319 16.6177C19.2635 15.078 20 13.125 20 11C20 6.02944 15.9706 2 11 2ZM4 11C4 7.13401 7.13401 4 11 4C14.866 4 18 7.13401 18 11C18 14.866 14.866 18 11 18C7.13401 18 4 14.866 4 11Z" fill="currentColor" />
                            </svg>
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Tìm kiếm sản phẩm..."
                                className="flex-1 bg-transparent text-sm text-dark placeholder-dark-4 outline-none"
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-6 py-2.5 bg-blue text-white text-sm font-medium rounded-lg hover:bg-blue-dark transition-colors ease-out duration-200"
                        >
                            Tìm kiếm
                        </button>
                    </form>
                </div>

                {/* Results grid */}
                {q && products.length === 0 ? (
                    <div className="bg-white rounded-2xl px-6 py-16 text-center shadow-sm">
                        <div className="w-20 h-20 bg-gray-2 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-dark-4">
                                <path fillRule="evenodd" clipRule="evenodd" d="M11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C13.125 20 15.078 19.2635 16.6177 18.0319L20.2929 21.7071C20.6834 22.0976 21.3166 22.0976 21.7071 21.7071C22.0976 21.3166 22.0976 20.6834 21.7071 20.2929L18.0319 16.6177C19.2635 15.078 20 13.125 20 11C20 6.02944 15.9706 2 11 2ZM4 11C4 7.13401 7.13401 4 11 4C14.866 4 18 7.13401 18 11C18 14.866 14.866 18 11 18C7.13401 18 4 14.866 4 11Z" fill="currentColor" />
                            </svg>
                        </div>
                        <h2 className="text-lg font-semibold text-dark mb-2">
                            Không tìm thấy &quot;{q}&quot;
                        </h2>
                        <p className="text-sm text-dark-4 mb-6">
                            Thử tìm với từ khóa khác hoặc kiểm tra lại chính tả
                        </p>
                        <Link
                            href="/shop-with-sidebar"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-blue text-white text-sm font-medium rounded-lg hover:bg-blue-dark transition-colors"
                        >
                            Xem tất cả sản phẩm
                        </Link>
                    </div>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                        {products.map((product) => (
                            <Link
                                key={product._id}
                                href={`/shop-details/${product._id}`}
                                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
                            >
                                {/* Image */}
                                <div className="relative aspect-square bg-gray-2 overflow-hidden">
                                    {product.imageUrl ? (
                                        <Image
                                            src={product.imageUrl}
                                            alt={product.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-dark-4">
                                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
                                                <path d="M3 15L7.5 10L11 14L14.5 10L21 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                                            </svg>
                                        </div>
                                    )}
                                    {product.discountedPrice && (
                                        <span className="absolute top-2 left-2 bg-red text-white text-2xs font-semibold px-2 py-0.5 rounded-full">
                                            Sale
                                        </span>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="p-3">
                                    {product.categoryTitle && (
                                        <span className="text-2xs text-dark-4 uppercase tracking-wide mb-1 block">
                                            {product.categoryTitle}
                                        </span>
                                    )}
                                    <h3 className="text-sm font-medium text-dark line-clamp-2 mb-2 group-hover:text-blue transition-colors">
                                        {product.title}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-bold text-blue">
                                            {formatCurrency(product.discountedPrice ?? product.price)}
                                        </span>
                                        {product.discountedPrice && (
                                            <span className="text-xs text-dark-4 line-through">
                                                {formatCurrency(product.price)}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : null}
            </div>
        </main>
    );
}
