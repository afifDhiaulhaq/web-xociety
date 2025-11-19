// app/article/[slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import MarkdownRenderer from "@/component/MarkdownRenderer";
import { markdownToDescription } from "@/utils/markdownToDescription";
import BackButton from "@/component/BackButton";


interface ArticleAttributes {
    tittle: string;
    autor: string;
    body: [];
    createdAt: string;
    image?: { url: string } | null;
    slug: string;
    bodyArticle : string;
}

interface ArticleResponse {
    id: number;
    attributes: ArticleAttributes;
}

interface Props {
    params: { slug: string };
}

// Server-side function untuk metadata dinamis
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;

    const res = await fetch(
        `http://localhost:1337/api/articles?filters[slug][$eq]=${slug}&populate=*`,
        { cache: "no-store" }
    );

    if (!res.ok) return { title: "Article Not Found" };

    const json = await res.json();
    const data = json?.data?.[0];
    if (!data) return { title: "Article Not Found" };

    const imageUrl = data.image?.url ? `http://localhost:1337${data.image.url}` : undefined;
    const description = markdownToDescription(data.bodyArticle, 160);


    return {
        title: data.tittle,
        description,
        openGraph: {
            title: data.tittle,
            description,
            type: "article",
            url: `http://localhost:3000/article/${slug}`,
            images: imageUrl ? [{ url: imageUrl }] : undefined,
        },
        twitter: {
            card: "summary_large_image",
            title: data.tittle,
            description,
            images: imageUrl ? [{ url: imageUrl }] : undefined,
        },
    };
    }

// Server Component page.tsx langsung async
export default async function ArticlePage({ params }: Props) {
    const { slug } = await params;

    const res = await fetch(
        `http://localhost:1337/api/articles?filters[slug][$eq]=${slug}&populate=*`,
        { cache: "no-store" }
    );

    if (!res.ok) return notFound();

    const json = await res.json();
    const data = json?.data?.[0];
    if (!data) return notFound();

    let imageObj: { url: string } | null = null;
    if (data.image?.url) {
        imageObj = { url: data.image.url };
    }

    const formatDate = (date?: string) => {
        if (!date) return "";
        return new Date(date).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    const article: ArticleAttributes = {
        tittle: data.tittle ?? "No Title",
        body:  Array.isArray(data.body) ? data.body : [],
        bodyArticle :data.bodyArticle,
        image: imageObj,
        autor: data.autor,
        createdAt: data.createdAt,
        slug : data.slug
    };

    // JSON-LD structured data
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.tittle,
        author: {
        "@type": "Person",
        name: article.autor,
        },
        datePublished: article.createdAt,
        image:imageObj,
        mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://yourxociety.com/article/${article.slug}`,
        },
    };

    return (
        <main className="flex-grow">
        <div className="relative h-[40vh] md:h-[50vh] lg:h-[60vh] w-full flex items-center justify-center">
            {article.image?.url ? (
            <img
            alt={article.tittle || "Article Image"}
            src={`http://localhost:1337${article.image.url}`}
                className="absolute inset-0 w-full h-full object-cover"
            />
            ) : (
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg">
                <span className="text-gray-700">No Image</span>
            </div>
            )}
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="max-w-6xl mx-auto">
                    <BackButton />

            <h2 className="text-3xl md:text-4xl font-normal tracking-wider mb-4 font-body">
                {article.tittle || "No Title"}
            </h2>
            <p className="text-sm text-gray-500 mb-8">
                {formatDate(article.createdAt)} | By {article.autor || "Unknown"}
            </p>
            <div className="space-y-6 text-gray-600 leading-relaxed text-justify text-justify-inter-word">
                <MarkdownRenderer content={article.bodyArticle} />
            </div>
            </div>
        </div>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        </main>
    );
}
