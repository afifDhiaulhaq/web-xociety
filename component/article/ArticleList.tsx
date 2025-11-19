"use client";

import { useState } from "react";
import Link from "next/link";
import { ArticleItem } from "@/type/article";
import MarkdownRenderer from "@/component/MarkdownRenderer";
import { sliceMarkdownWords } from "@/utils/sliceMarkdownWords";



export default function ArticleList({ articles }: { articles: ArticleItem[] }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 5;

    const formatDate = (date?: string) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    };

    // Search
    const filtered = articles.filter((p) =>
    p.tittle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination
    const indexOfLast = currentPage * articlesPerPage;
    const indexOfFirst = indexOfLast - articlesPerPage;
    const currentArticles = filtered.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filtered.length / articlesPerPage);

    return (
    <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-0 sm:py-0">
        {/* Title + Search */}
        <div className="text-center mb-16">
            <div className="flex justify-center">
            <input
                type="text"
                placeholder="Search Article..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-1/2 lg:w-1/3 px-4 py-2 border border-gray-300 rounded-lg text-black"
            />
            </div>
        </div>

        {/* Hero Article */}
        <div className="flex flex-col gap-12">
            {currentArticles.length > 0 ? (
            currentArticles.map((article : any) => (
                <div
                key={article.documentId}
                className="flex flex-col lg:flex-row items-stretch gap-8"
                >
                {/* Right Image */}
                {article?.image?.url ? (
                    <div className="w-full h-70 lg:w-1/2 order-first lg:order-last">
                    <img
                        alt={article.tittle}
                        src={`https://reminder-resulting-conservative-dubai.trycloudflare.com${article.image.url}`}
                        className="w-full h-full object-cover rounded-lg"
                    />
                    </div>
                ) : (
                    <div className="w-full lg:w-1/2 bg-gray-200 rounded-lg flex items-center justify-center order-first lg:order-last">
                    <span className="text-gray-400">No Image</span>
                    </div>
                )}

                {/* Left Text */}
                <div className="flex flex-col w-full lg:w-1/2 justify-between">
                    <div>
                    <h2
                        className="text-3xl md:text-4xl font-normal tracking-wider mb-6"
                        style={{ fontFamily: "Jost, sans-serif" }}
                    >
                        {article.tittle}
                    </h2>
                    <MarkdownRenderer content={sliceMarkdownWords(article.bodyArticle, 60)} />
                    </div>

                    <div>
                    <p className="text-sm text-gray-500 mb-4">
                        {formatDate(article.createdAt)} | By {article.autor}
                    </p>

                    <Link
                        className="inline-block px-6 py-2 border border-gray-400 text-gray-700 rounded-md text-sm hover:bg-gray-100 transition"
                        href={`/article/${article.slug}`}
                    >
                        Read More
                    </Link>
                    </div>
                </div>
                </div>
            ))
            ) : (
            <p className="text-center text-gray-500">No articles found.</p>
            )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
            <div className="flex justify-center mt-12 gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
                <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 border rounded-md ${
                    currentPage === i + 1
                    ? "bg-gray-800 text-white border-gray-800"
                    : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                }`}
                >
                {i + 1}
                </button>
            ))}
            </div>
        )}
        </div>
    </main>
    );
}
