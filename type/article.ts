export interface ArticleItem {
    documentId: string;
    tittle: string;
    bodyArticle?: string;
    imageCatalog?: { url: string } | null;
    autor: string;
    createdAt?: string;
    slug: string; 
}
