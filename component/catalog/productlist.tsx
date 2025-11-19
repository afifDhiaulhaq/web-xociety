"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";


interface ProductItem {
  documentId: string;
  tittle: string;
  description?: string;
  notes: string[];
  tag?: string;
  isNew?: boolean;
  imageCatalog?: { url: string } | null;
  size : string;
}

export default function ProductList() {
    const [products, setProducts] = useState<ProductItem[]>([]);

     useEffect(() => {
        async function fetchProducts() {
          try {
            const res = await fetch(
              " https://logged-dolls-souls-abstracts.trycloudflare.com/api/products-lists?sort[0]=createdAt:desc&populate=*"
            );
            const json = await res.json();
            console.log("Strapi response:", json);
    
            if (!json.data) return;
    
            const mapped: ProductItem[] = json.data.map((item: any) => {
              const notes = item?.notes?.note ?? [];
    
              // ✅ Ambil imageCatalog langsung dari item.imageCatalog.url
              let imageCatalogObj = null;
              if (item?.imageCatalog?.url) {
                imageCatalogObj = { url: item.imageCatalog.url };
              }
    
              return {
                documentId: item.documentId,
                tittle: item.tittle ?? "No Title",
                description: item.description ?? "",
                size: item.size ?? null,
                notes,
                tag: item.tag ?? "",
                isNew: item.isNew ?? false,
                imageCatalog: imageCatalogObj,
              };
            });
    
            setProducts(mapped);
          } catch (error) {
            console.error("Fetch product error:", error);
          }
        }
    
        fetchProducts();
      }, []);
  
  return (
    <section className="flex items-center justify-center bg-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col text-center mb-12">
          <h1
            className="font-bold tracking-widest text-black"
            style={{
              fontFamily: "Jost, sans-serif",
              fontSize: "clamp(1.875rem, 5vw, 2.5rem)",
            }}
          >
            CAPTURING ESSENCE<br />REFLECTING SOCIETY
          </h1>
          <p
            className="mt-4 text-black tracking-wider"
            style={{ fontSize: "clamp(0.875rem, 3vw, 1rem)" }}
          >
            DISCOVERED OUR FRAGRANCES:
          </p>
        </div>

        {/* Horizontal Scroll Products */}
        <div className="flex overflow-x-auto space-x-6 py-4 snap-x snap-mandatory">
          {products.map((product) => (
            <div
              key={product.documentId}
              className="relative flex-shrink-0 w-full sm:w-80 md:w-1/3 lg:w-1/3 snap-start group"
            >
            <Link
                href={`/products/${product.documentId}`}
                className="absolute inset-0 z-10"
            />
              {product.imageCatalog?.url ? (
                <>
                  <img
                    alt={product.tittle}
                    src={` https://logged-dolls-souls-abstracts.trycloudflare.com${product.imageCatalog.url}`}
                    className="w-full h-auto object-cover rounded-2xl aspect-square"
                  />

                  {/* Bottom Left: Title selalu tampil */}
                  <div className="absolute bottom-4 left-4 text-white flex flex-col">
                    <h3 className="font-bold text-lg">{product.tittle}</h3>
                    {/* Description muncul saat hover */}
                    <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1">
                      {product.size}
                    </p>
                  </div>

                  {/* Top Left: Notes */}
                  {product.notes?.length > 0 && (
                    <div className="absolute top-4 left-4 text-white font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {product.notes.join(" | ")}
                    </div>
                  )}

                  {/* Top Right: Tag */}
                  {product.isNew && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      NEW
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full h-full bg-gray-100 rounded-2xl flex items-center justify-center aspect-square">
                  <span className="material-symbols-outlined text-gray-400 text-6xl">
                    imageCatalog
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
