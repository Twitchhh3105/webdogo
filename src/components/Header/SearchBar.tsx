"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
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
};

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchProduct[]>([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const router = useRouter();

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const fetchResults = useCallback(async (q: string) => {
        if (!q.trim()) {
            setResults([]);
            setOpen(false);
            return;
        }
        setLoading(true);
        try {
            const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
            const data = await res.json();
            setResults(Array.isArray(data) ? data : []);
            setOpen(true);
        } catch {
            setResults([]);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setQuery(val);
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            fetchResults(val);
        }, 300);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && query.trim()) {
            setOpen(false);
            router.push(`/search?q=${encodeURIComponent(query.trim())}`);
        }
        if (e.key === "Escape") {
            setOpen(false);
        }
    };

    const handleResultClick = () => {
        setOpen(false);
        setQuery("");
        setResults([]);
    };

    return (
        <div ref={wrapperRef} className="relative w-full max-w-full">
            {/* Input wrapper */}
            <div className="flex items-center bg-gray-1 border border-gray-3 rounded-lg px-3 py-2 gap-2 focus-within:border-blue focus-within:ring-2 focus-within:ring-blue/10 transition-all duration-200">
                <svg
                    className="flex-shrink-0 text-dark-4"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C13.125 20 15.078 19.2635 16.6177 18.0319L20.2929 21.7071C20.6834 22.0976 21.3166 22.0976 21.7071 21.7071C22.0976 21.3166 22.0976 20.6834 21.7071 20.2929L18.0319 16.6177C19.2635 15.078 20 13.125 20 11C20 6.02944 15.9706 2 11 2ZM4 11C4 7.13401 7.13401 4 11 4C14.866 4 18 7.13401 18 11C18 14.866 14.866 18 11 18C7.13401 18 4 14.866 4 11Z"
                        fill="currentColor"
                    />
                </svg>
                <input
                    type="text"
                    value={query}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => results.length > 0 && setOpen(true)}
                    placeholder="Tìm kiếm sản phẩm..."
                    className="bg-transparent flex-1 text-sm text-dark placeholder-dark-4 outline-none"
                    aria-label="Tìm kiếm sản phẩm"
                />
                {loading && (
                    <svg
                        className="animate-spin flex-shrink-0 text-blue"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
                        <path d="M12 2C6.47715 2 2 6.47715 2 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                )}
                {query && !loading && (
                    <button
                        onClick={() => { setQuery(""); setResults([]); setOpen(false); }}
                        className="flex-shrink-0 text-dark-4 hover:text-dark transition-colors"
                        aria-label="Xóa tìm kiếm"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Dropdown results */}
            {open && (
                <div className="absolute left-0 top-full mt-2 w-full bg-white rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-gray-3 z-[9999] overflow-hidden">
                    {results.length === 0 ? (
                        <div className="px-4 py-5 text-center text-sm text-dark-4">
                            Không tìm thấy sản phẩm nào cho &quot;{query}&quot;
                        </div>
                    ) : (
                        <>
                            <div className="px-3 pt-3 pb-1.5 text-2xs font-semibold text-dark-4 uppercase tracking-wide">
                                Kết quả ({results.length})
                            </div>
                            <ul className="max-h-[340px] overflow-y-auto divide-y divide-gray-2">
                                {results.map((product) => (
                                    <li key={product._id}>
                                        <Link
                                            href={`/shop-details/${product._id}`}
                                            onClick={handleResultClick}
                                            className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-1 transition-colors"
                                        >
                                            {/* Thumbnail */}
                                            <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-gray-2 overflow-hidden">
                                                {product.imageUrl ? (
                                                    <Image
                                                        src={product.imageUrl}
                                                        alt={product.title}
                                                        width={44}
                                                        height={44}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-dark-4">
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
                                                            <path d="M3 15L7.5 10L11 14L14.5 10L21 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                            {/* Info */}
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-dark truncate">{product.title}</p>
                                                <span className="text-xs font-semibold text-blue">
                                                    {product.discountedPrice
                                                        ? formatCurrency(product.discountedPrice)
                                                        : formatCurrency(product.price)}
                                                </span>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            {/* Footer link to full search page */}
                            <div className="border-t border-gray-3 px-3 py-2.5">
                                <Link
                                    href={`/search?q=${encodeURIComponent(query)}`}
                                    onClick={handleResultClick}
                                    className="flex items-center justify-center gap-1.5 text-xs font-medium text-blue hover:underline"
                                >
                                    Xem tất cả kết quả cho &quot;{query}&quot;
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
