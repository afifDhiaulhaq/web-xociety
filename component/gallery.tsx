"use client";

import React, { useState } from "react";

interface GalleryProps {
  title?: string;
  productName?: string;
  gallery?: {
    url: string;
    formats?: {
      thumbnail?: { url: string };
    };
  }[] | null;
}

const Gallery: React.FC<GalleryProps> = ({ gallery, productName = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  const openModal = (img: string) => {
    setCurrentImage(img);
    setIsOpen(true);
  };

  const closeModal = () => {
    setCurrentImage(null);
    setIsOpen(false);
  };

  if (!gallery || gallery.length === 0) return null;

  // Map gallery ke array URL full
 const BASE_URL = "http://localhost:1337";

const galleryUrls = gallery.map(
  (item) => `${BASE_URL}${item.url}`
);
  return (
    // {/* Gallery Wrapper */}
    <div className="mt-12 bg-background-light dark:bg-background-dark py-12 sm:py-16">

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* MOBILE = horizontal scroll */}
        <div className="flex sm:hidden space-x-4 overflow-x-auto no-scrollbar">
          {galleryUrls.map((img, idx) => (
            <div
              key={idx}
              className="min-w-[140px] aspect-square rounded-lg overflow-hidden cursor-pointer"
              onClick={() => openModal(img)}
            >
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* DESKTOP = grid */}
        <div className="hidden sm:grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {galleryUrls.map((img, idx) => (
            <div
              key={idx}
              className="aspect-square rounded-lg overflow-hidden cursor-pointer"
              onClick={() => openModal(img)}
            >
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover hover:scale-105 transition-all duration-300"
              />
            </div>
          ))}
        </div>

      </div>


      {/* Modal */}
      {isOpen && currentImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="relative max-w-3xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-white text-2xl font-bold"
              onClick={closeModal}
            >
              &times;
            </button>
            <img
              src={currentImage}
              alt={productName}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}

    </div>

  );
};

export default Gallery;
