import { Metadata } from "next";
import Image from "next/image";
import React from "react";

export const metadata: Metadata = {
  title: "YOURXOCIETY - About",
  description: "Learn more about YOURXOCIETY, our vision, mission, and what we do.",
};

export default function AboutPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center p-4 bg-black text-white">
      <div className="mb-8 flex flex-col items-center">
        {/* Logo sebagai gambar */}
        <Image
          src="/logo.png" // ganti dengan path logo utama
          alt="XØCIETY"
          width={300}
          height={100}
          priority
        />
      </div>

      <p className="max-w-xl text-sm md:text-base leading-relaxed text-gray-300">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde illo dolore dolor. Dolorem laudantium facilis voluptate ab dolor mollitia doloribus, dicta aperiam soluta, facere sequi tempora fugiat inventore tempore. Quas!
      </p>
    </main>
  );
}
