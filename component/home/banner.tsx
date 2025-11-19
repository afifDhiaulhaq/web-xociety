"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface BannerData {
  tittle: string;
  description: string;
  mediaUrl?: string; // bisa video atau gambar
  buttonText?: string;
  buttonLink?: string;
}

export default function Banner() {
  const [slides, setSlides] = useState<BannerData[]>([]);
  const [current, setCurrent] = useState(0);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await fetch("https://cornwall-journals-eddie-decor.trycloudflare.com/api/banners?populate=*");
        const json = await res.json();
        console.log("Banner API response:", json);

        if (Array.isArray(json.data) && json.data.length > 0) {
          const banners: BannerData[] = json.data.map((item: any) => {
            const tittle = item.tittle || "No Title";
            const description = item.description || "No Description";

            const mediaUrl = item.media?.url
              ? `https://cornwall-journals-eddie-decor.trycloudflare.com${item.media.url}`
              : undefined;

            return {
              tittle,
              description,
              mediaUrl,
              buttonText: item.buttonText || "Learn More",
              buttonLink: item.buttonLink || "#",
            };
          });
          setSlides(banners);
        } else {
          console.warn("No banners found");
        }
      } catch (err) {
        console.error("Error fetching banner:", err);
      }
    };

    fetchBanner();
  }, []);

  const goToSlide = (index: number) => {
    setCurrent(index);
    wrapperRef.current?.scrollTo({
      left: index * window.innerWidth,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    if (!wrapperRef.current) return;
    const index = Math.round(wrapperRef.current.scrollLeft / window.innerWidth);
    if (index !== current) setCurrent(index);
  };

  if (slides.length === 0) {
    return (
      <section className="flex min-h-[80vh] items-center justify-center bg-black text-white">
        Loading...
      </section>
    );
  }

  return (
    <section className="relative w-full h-[100dvh] overflow-hidden">
      <div
        ref={wrapperRef}
        onScroll={handleScroll}
        className="flex overflow-x-scroll snap-x snap-mandatory w-full h-full scroll-smooth no-scrollbar"
      >
        {slides.map((slide, i) => {
          const isVideo = slide.mediaUrl?.endsWith(".mp4");
          return (
            <div key={i} className="relative w-screen h-full snap-start shrink-0">
              {slide.mediaUrl && isVideo ? (
                <video
                  src={slide.mediaUrl}
                  autoPlay
                  muted
                  loop
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : slide.mediaUrl ? (
                <img
                  src={slide.mediaUrl}
                  alt={slide.tittle}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 w-full h-full bg-gray-800" />
              )}

              {/* Konten tetap terlihat, tapi background tidak blur */}
              <div className="relative z-10 flex items-end lg:items-center h-full pb-10 lg:pb-0">
                <div className="container mx-auto px-6 lg:px-16">
                  <div className="p-5 md:p-8 rounded-lg max-w-md text-white bg-black/40">
                    <h1 className="font-display text-5xl md:text-6xl mb-6">
                      {slide.tittle}
                    </h1>

                    <p className="font-body text-base md:text-lg leading-relaxed mb-10">
                      {slide.description}
                    </p>

                    {slide.buttonText && (
                      <Link
                        href={`/${slide.buttonLink || "#"}`
                        }
                        className="inline-block bg-gray-200 text-black font-body text-sm tracking-widest uppercase py-4 px-10 rounded-sm hover:bg-gray-300 transition-colors"
                      >
                        {slide.buttonText}
                      </Link>
                    )}
                  </div>
                </div>
              </div>



            </div>
          );
        })}
      </div>
    </section>
  );
}
