"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ProductItem } from "@/type/product";


export default function Catalog({ products }: { products: ProductItem[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((p) =>
    p.tittle?.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <> 
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 space-y-12 py-5">
        {/* Search */}
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Search product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-1/2 lg:w-1/3 px-4 py-2 border border-gray-300 rounded-lg text-black"
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.documentId}
                className="group relative overflow-hidden rounded-2xl cursor-pointer"
              >
                <Link
                  href={`/products/${product.slug}`}
                  className="absolute inset-0 z-10"
                />

                {/* ✅ imageCatalog */}
                {product.imageCatalog?.url ? (
                  <img
                    alt={product.tittle}
                    src={`https://cornwall-journals-eddie-decor.trycloudflare.com${product.imageCatalog.url}`}
                    className="w-full h-full object-cover rounded-2xl aspect-square group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 rounded-2xl flex items-center justify-center">
                    <span className="text-gray-400">No imageCatalog</span>
                  </div>
                )}

                {/* ✅ NEW BADGE */}
                {product.isNew && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    NEW
                  </div>
                )}

                {/* Title & Description */}
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-bold text-lg">{product.tittle}</h3>
                  {product.type && (
                    <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      {product.type}
                    </p>
                  )}
                </div>

                {/* Notes */}
                {product.notes?.length > 0 && (
                  <div className="absolute top-4 left-4 text-white text-sm">
                    {product.notes.join("| ")}
                  </div>
                )}

                {/* Tag */}
                {product.tag && (
                  <div className="absolute top-4 right-4 text-red-500 text-xs">
                    {product.tag}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No products found.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
