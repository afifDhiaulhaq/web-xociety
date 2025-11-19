
import React from "react";
import { notFound } from "next/navigation";
import ProductList from "@/component/catalog/productlist";
import Gallery from "@/component/gallery";
import ProductInfo from "@/component/catalog/productinfo";
import { Metadata } from "next";

interface ProductItem {
  id: number;
  documentId: string;
  tittle: string;
  description: string;
  type: string;
  notes: string[];
  tag?: string;
  size?: string | null;
  sillage?: string | null;
  longevity?: string | null;
  image?: { url: string } | null;
  background?: { url: string } | null;
  gallery?: { url: string; formats?: { thumbnail?: { url: string } } }[] | null;
  projectile: string;
  gender: string;
  top: string;
  middle: string;
  base: string;
  onlineStore?: Store[];
  offlineStore?: Store[];
  slug : string;
}

interface Store {
  name: string;
  link: string;
}

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const res = await fetch(
    "https://cornwall-journals-eddie-decor.trycloudflare.com/api/products-lists?sort[0]=createdAt:desc&populate=*",
    { cache: "no-store" }
  );

  const json = await res.json();
  const data = json?.data?.[0]?.attributes;

  if (!data) return {};

  const title = `${data.tittle} - YOURXOCIETY`;
  const description = data.description || `Discover ${data.tittle} fragrance.`;
  const image = data.image?.data?.attributes?.url
    ? process.env.NEXT_PUBLIC_STRAPI_URL + data.image.data.attributes.url
    : "/og-default.jpg";

  return {
    title,
    description,
    alternates: {
      canonical: `https://yourxociety.com/catalog/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://yourxociety.com/catalog/${slug}`,
      images: [{ url: image }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  // Fetch data by documentId
  const res = await fetch(
    `https://cornwall-journals-eddie-decor.trycloudflare.com/api/products-lists?filters[slug][$eq]=${slug}&populate=*`,
    { cache: "no-store" }
  );

  if (!res.ok) return notFound();

  const json = await res.json();
  const data = json?.data?.[0];
  if (!data) return notFound();

  // NOTES
  const notes: string[] = data.notes?.note ?? [];

  // Stores
  const onlineStore: Store[] = data.onlineStore ?? [];
  const offlineStore: Store[] = data.offlineStore ?? [];

  // IMAGE
  let imageObj: { url: string } | null = null;
  if (data.image?.url) {
    imageObj = { url: data.image.url };
  }
  // Backgorund

  let BgObj: { url: string } | null = null;
  if (data.background?.url) {
    BgObj = { url: data.background.url };
  }

  // GALLERY
  const galleryObjs =
    data.gallery?.map((item: any) => ({
      url: item.url,
      formats: item.formats ?? undefined,
    })) || null;

  const product: ProductItem = {
    id: data.id,
    documentId: data.documentId,
    type: data.type,
    tittle: data.tittle ?? "No Title",
    description: data.description ?? "",
    notes,
    tag: data.tag ?? "",
    size: data.size ?? null,
    sillage: data.sillage ?? null,
    longevity: data.longevity ?? null,
    image: imageObj,
    gallery: galleryObjs,
    projectile: data.projectile ?? "",
    gender: data.gender ?? "",
    top: data.top,
    middle: data.middle,
    base: data.base,
    background :BgObj,
    onlineStore: data.store?.onlineStore ?? [],
    offlineStore: data.store?.offlineStore ?? [],
    slug : data.slug,
  };

  return (
    <div className="min-h-screen bg-white text-black">
  <main>
    {/* Hero Section */}
    <div className="relative w-full">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: product.background?.url
            ? `url(https://cornwall-journals-eddie-decor.trycloudflare.com${product.background.url})`
            : undefined,
        }}
      ></div>

      {/* Optional overlay jika background terlalu terang/gelap */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* CONTENT */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 py-16 lg:py-24">

          {/* Image */}
          <div className="flex justify-center items-center">
            {product.image?.url ? (
              <img
                alt={product.tittle}
                className="max-w-xs md:max-w-sm lg:max-w-md w-full object-contain"
                src={`https://cornwall-journals-eddie-decor.trycloudflare.com${product.image.url}`}
              />
            ) : (
              <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg">
                <span className="text-gray-700">No Image</span>
              </div>
            )}
          </div>

          {/* Text */}
          <div className="flex flex-col space-y-6 text-left">

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-wider uppercase text-white">
              {product.tittle}
            </h1>

            <p className="text-lg text-white/90">{product.type}</p>

            {product.size && (
              <p className="text-base font-medium text-white/90">{product.size}</p>
            )}

            <p className="text-lg text-white/90">{product.description}</p>

            {/* notes */}
            {product.notes?.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-4">
                {product.notes.map((note, index) => (
                  <span
                    key={index}
                    className="border border-white/60 text-white/90 px-4 py-2 text-sm rounded-sm"
                  >
                    {note}
                  </span>
                ))}
              </div>
            )}

            {/* tag */}
            {product.tag && (
              <div className="flex gap-2 pt-4">
                <span className="border border-black/60 text-black/90 bg-white/80 px-4 py-2 text-sm rounded-sm">
                  {product.tag}
                </span>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>

    {/* Gallery Section */}
    <Gallery gallery={galleryObjs} productName={product.tittle} />

    {/* Product Info Section */}
    <ProductInfo product={product} />

    {/* ProductList Section */}
    <ProductList />

  </main>
</div>

  );
}
