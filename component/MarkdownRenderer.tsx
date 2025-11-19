"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
    content: string;
}

export default function MarkdownRenderer({ content }: Props) {
    if (!content) return null;

    return (
        <div className="prose prose-lg max-w-none">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    // 👉 DETEKSI p yang berisi gambar ATAU node berikutnya juga gambar
                    p: ({ node, children }) => {
                        const childNodes: any[] = (node as any)?.children || [];

                        const containsImage = childNodes.some(
                            (child) =>
                                child.type === "element" &&
                                child.tagName === "img"
                        );

                        // Ambil node berikutnya
                        const nextNode = (node as any)?.position?.end?.next;

                        const nextIsImage =
                            nextNode &&
                            nextNode.type === "element" &&
                            nextNode.tagName === "img";

                        // Jika paragraf ini gambar atau berikutnya gambar → jadikan flex
                        if (containsImage || nextIsImage) {
                            return (
                                <div className="flex justify-center my-6">
                                    {children}
                                </div>
                            );
                        }

                        return <p>{children}</p>;
                    },

                    img: ({ src, alt }) => {
                        if (!src || typeof src !== "string") return null;

                        const finalSrc = src.startsWith("http")
                            ? src
                            : `http://localhost:1337${src}`;

                        return (
                            <img
                                src={finalSrc}
                                alt={alt || ""}
                                className="mx-auto"
                            />
                        );
                    },
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
