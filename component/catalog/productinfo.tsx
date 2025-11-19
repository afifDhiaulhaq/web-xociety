"use client";

import React, { useState } from "react";

// Tambahkan interface ProductDetail
interface ProductInfoProps {
  product: any,
  onlineStore?: Store[];
  offlineStore?: Store[];
}

interface Store {
  name: string;
  link: string;
}


const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <header className="text-left text-left sm:text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-black-900 dark:text-black tracking-tight">
          The Ultimate Elegance On the Daily Basis
        </h1>
      </header>

      <main className="max-w-6xl mx-auto">
        {/* Product Details Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-24">

          {/* Left */}
          <div className="flex flex-col justify-center text-left sm:text-center text-lg text-white-600 dark:text-white-400 space-y-3">
            <p><span className="font-bold">Sillage :</span> {product.sillage}</p>
            <p><span className="font-bold">Longevity :</span> {product.longevity}</p>
            <p><span className="font-bold">Projectile :</span> {product.projectile}</p>
          </div>

          {/* Middle */}
          <div className="relative flex flex-col justify-center text-left sm:text-center">

            {/* Left divider */}
            <div className="absolute inset-y-0 left-0 w-px bg-black/20 dark:bg-white/20 hidden md:block"></div>

            <div className="text-left sm:text-center text-lg">
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-black mb-1">Top:</h3>
                  <p className="text-black/90">{product.top}</p>
                </div>
                <div>
                  <h3 className="font-bold text-black mb-1">Middle:</h3>
                  <p className="text-black/90">{product.middle}</p>
                </div>
                <div>
                  <h3 className="font-bold text-black mb-1">Base:</h3>
                  <p className="text-black/90">{product.base}</p>
                </div>
              </div>
            </div>

            {/* Right divider */}
            <div className="absolute inset-y-0 right-0 w-px bg-black/20 dark:bg-white/20 hidden md:block"></div>
          </div>

          {/* Right */}
          <div className="flex flex-col justify-center text-left sm:text-center text-lg text-white-600 dark:text-white-400 space-y-3">
            <p><span className="font-bold">Gender :</span> {product.gender}</p>
            <p>{product.size}</p>
            <p>{product.type}</p>
          </div>
        </section>


        {/* Online Stores */}
      {product.onlineStore?.length > 0 && (
        <section className="text-center mb-16">
          <h2 className="text-2xl font-semibold mb-6">Online Stores</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto justify-center">
            {product.onlineStore.map((store : Store, idx : number) => (
              <a
                key={idx}
                href={store.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-left sm:text-center py-3 px-6 
                  border border-gray-300 dark:border-gray-700 
                  rounded-lg 
                  text-black dark:text-black 
                  hover:bg-black hover:text-white 
                  transition-colors duration-200"
                  >
                {store.name}
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Offline Stores */}
      {product.offlineStore?.length > 0 && (
        <section className="text-center mb-16">
          <h2 className="text-2xl font-semibold mb-6">Offline Stores</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {product.offlineStore.map((store: Store, idx : number) => (
              <a
                key={idx}
                href={store.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-left sm:text-center py-3 px-6 
                border border-gray-300 dark:border-gray-700 
                rounded-lg 
                text-black dark:text-black 
                hover:bg-black hover:text-white 
                transition-colors duration-200"
                >
                {store.name}
              </a>
            ))}
          </div>
        </section>
      )}

      </main>
    </div>
  );
};

export default ProductInfo;
