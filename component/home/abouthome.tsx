"use client";

import React, { useEffect, useState } from "react";

interface AboutHomeData {
  tittle: string;
  description: string;
  image?: { url: string } | null;
}

export default function AboutHome() {
  const [data, setData] = useState<AboutHomeData | null>(null);

  useEffect(() => {
    const fetchAboutHome = async () => {
      try {
        const res = await fetch("https://deemed-preliminary-checked-roulette.trycloudflare.com/api/about-home?populate=image");
        const json = await res.json();

        console.log("Strapi response:", json);

        // Single Type v4: ambil data di json.data
        const attributes = json.data;

        if (attributes) {
          setData({
            tittle: attributes.tittle ?? "No Title",
            description: attributes.description ?? "No Description",
            image: attributes.image
              ? { url: attributes.image.url || "" } // kalau ada path langsung di image
              : null,
          });
        } else {
          setData({
            tittle: "No Title",
            description: "No Description",
            image: null,
          });
        }
      } catch (err) {
        console.error("Error fetching AboutHome:", err);
        setData({
          tittle: "No Title",
          description: "Failed to load",
          image: null,
        });
      }
    };

    fetchAboutHome();
  }, []);

  if (!data) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-white text-black">
        Loading...
      </section>
    );
  }

  return (
    <section className="flex min-h-screen items-center justify-center bg-white text-black">
      <div className="container mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-24 items-center">

          {/* IMAGE */}
          {data.image?.url ? (
            <div className="w-full">
              <img
                alt={data.tittle}
                className="w-full h-auto object-cover rounded-lg"
                src={`https://deemed-preliminary-checked-roulette.trycloudflare.com${data.image.url}`}
              />
            </div>
          ) : (
            <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">No Image</span>
            </div>
          )}

          {/* TEXT */}
          <div className="flex flex-col justify-center">
            <h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-widest mb-6"
              style={{ fontFamily: "Jost, sans-serif" }}
            >
              {data.tittle}
            </h1>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
              {data.description}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
