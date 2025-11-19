import type { Metadata } from "next";
import { ArticleItem } from "@/type/article";
import ArticleList from "@/component/article/ArticleList";


// SERVER FETCH
async function getArticles(): Promise<ArticleItem[]> {
    const res = await fetch(
        "https://cornwall-journals-eddie-decor.trycloudflare.com/api/articles?sort[0]=createdAt:desc&populate=*",
        { cache: "no-store" }
    );

    const json = await res.json();

    if (!json.data) return [];

    return json.data.map((item: any) => ({
        documentId: item.documentId,
        tittle: item.tittle ?? "No Title",
        // body:  Array.isArray(item.body) ? item.body : [], // ← penting!
        bodyArticle :item. bodyArticle,
        image: item.image?.url ? { url: item.image.url } : null,
        autor: item.autor,
        createdAt: item.createdAt,
        slug : item.slug
    }));
}

export const metadata: Metadata = {
    title: "Articles - YOURXOCIETY",
    description: "Latest articles, tips, and news from YOURXOCIETY.",
    icons: { icon: "/logoTab.png" },
    openGraph: {
        title: "Articles - YOURXOCIETY",
        description: "Latest articles from YOURXOCIETY.",
        url: "https://yourxociety.com/article",
        siteName: "YOURXOCIETY",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Articles - YOURXOCIETY",
        description: "Latest articles from YOURXOCIETY",
    },
};

export default async function Page() {
    const articles = await getArticles();

    return (
    <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
             <div className="flex flex-col text-center mb-16">
                <h1 className="text-3xl md:text-4xl font-bold tracking-widest text-black">
                ARTICLE
                </h1>
                <p className="mt-4 text-sm text-gray-600 tracking-wider">
                DISCOVERED OUR ARTICLE:
                </p>
            </div>
            <ArticleList articles={articles} />
        </div>
    </main>

    
    );
}
