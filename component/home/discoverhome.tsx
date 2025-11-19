"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface DiscoverData {
  tittle: string; // Sesuai Strapi typo
  description1: string;
  description2: string;
  image1?: { url: string } | null;
  image2?: { url: string } | null;
  buttonText?: string;
  buttonLink?: string;

}

export default function DiscoverHome() {
  const [data, setData] = useState<DiscoverData | null>(null);

  useEffect(() => {
    const fetchDiscover = async () => {
      const baseUrl = "https://deemed-preliminary-checked-roulette.trycloudflare.com";
      try {
        const res = await fetch(`${baseUrl}/api/discover?populate=*`);
        const json = await res.json();

        console.log("Strapi response:", json);

        const attributes = json.data;

        if (attributes) {
          setData({
            tittle: attributes.tittle ?? "No Title",
            description1: attributes.description1 ?? "No Description",
            description2: attributes.description2 ?? "No Description",
            image1: attributes.image1
              ? { url: attributes.image1.url ? baseUrl + attributes.image1.url : "" }
              : null,
            image2: attributes.image2
              ? { url: attributes.image2.url ? baseUrl + attributes.image2.url : "" }
              : null,
              buttonLink: attributes.buttonLink || "#",
              buttonText: attributes.buttonText || "I'M READY",


          });
        } else {
          setData({
            tittle: "No Title",
            description1: "No Description",
            description2: "No Description",
            image1: null,
            image2: null,
          });
        }
      } catch (err) {
        console.error("Error fetching Discover:", err);
        setData({
          tittle: "No Title",
          description1: "Failed to load",
          description2: "Failed to load",
          image1: null,
          image2: null,
        });
      }
    };

    fetchDiscover();
  }, []);

  if (!data) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-white text-black">
        Loading...
      </section>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="container mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* LEFT COLUMN: Title + Description + Button + Image */}
          <div className="flex flex-col space-y-8">
            <div className="flex flex-col space-y-6">
              <h1
                className="text-3xl md:text-4xl font-bold tracking-wide text-black"
                style={{ fontFamily: "Jost, sans-serif" }}
              >
                {data.tittle.split(" : ").map((line, idx) => (
                  <React.Fragment key={idx}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </h1>
              <p className="text-base text-gray-600 leading-relaxed max-w-md">
                {data.description1}
              </p>
              <div className="pt-2">
                {/* <button className="bg-black text-white py-3 px-8 text-sm font-semibold tracking-wider"> */}
                  {data.buttonText && (
                      <Link
                        href={`/products/${data.buttonLink || "#"}`}
                        className="inline-block bg-gray-200 text-black font-body text-xs tracking-widest uppercase py-3 px-8 rounded-sm hover:bg-gray-300 transition-colors"
                      >
                        {data.buttonText}
                      </Link>
                    )}
                {/* </button> */}
              </div>
            </div>

            {data.image1?.url && (
              <div className="w-full">
                <img
                  alt="Discover Image 1"
                  className="w-full h-auto object-cover rounded-2xl"
                  src={data.image1.url}
                />
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Image + Description */}
          <div className="flex flex-col justify-start space-y-8">
            {data.image2?.url && (
              <div className="w-full">
                <img
                  alt="Discover Image 2"
                  className="w-full h-auto object-cover rounded-2xl"
                  src={data.image2.url}
                />
              </div>
            )}
            <p className="text-base text-gray-600 leading-relaxed max-w-md">
              {data.description2}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
