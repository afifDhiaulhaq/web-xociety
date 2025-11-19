import Catalog from "@/component/catalog/catalogList";
import { ProductItem } from "@/type/product";

async function getProduct(): Promise<ProductItem[]>{
  const res = await fetch(
    "http://localhost:1337/api/products-lists?sort[0]=createdAt:desc&populate=*",
    { next: { revalidate: 60 } } // ISR → refresh setiap 60 detik
  );
  const json = await res.json();

  if (!json.data) return [];


  return json.data.map((item: any) => ({
    documentId: item.documentId,
    tittle: item.tittle ?? "No Title",
    description: item.description ?? "",
    size: item.size ?? null,
    notes: item?.notes?.note ?? [],
    tag: item.tag ?? "",
    isNew: item.isNew ?? false,
    imageCatalog: item.imageCatalog?.url ? { url: item.imageCatalog.url } : null,
    slug: item.slug,
    type: item.type,
  }));

}

export const metadata = {
  title: "Catalog - YOURXOCIETY",
  description: "Explore premium fragrances crafted with elegance and modern identity.",
  icons: { icon: "/logoTab.png" },

  alternates: {
    canonical: "https://yourxociety.com/catalog",
  },

  openGraph: {
    title: "Catalog - YOURXOCIETY",
    description:
      "Explore premium fragrances crafted with elegance and modern identity.",
    url: "https://yourxociety.com/catalog",
    siteName: "YOURXOCIETY",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Catalog - YOURXOCIETY",
    description:
      "Discover our curated fragrance catalog designed with timeless character.",
  },
};



export default async function Page() {
  const products = await getProduct();
  return (
    <section className="bg-white py-30">
      {/* Tittle */}
      <div className="flex flex-col text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold tracking-widest text-black">
          CAPTURING ESSENCE<br/>REFLECTING SOCIETY
        </h1>
        <p className="mt-4 text-sm text-gray-600 tracking-wider">
          DISCOVERED OUR FRAGRANCES:
        </p>
        <Catalog products={products} />
      </div>
    </section>
  );
}
