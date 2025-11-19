export interface ProductItem {
    documentId: string;
    tittle: string;
    description?: string;
    notes: string[];
    tag?: string;
    isNew?: boolean;
    imageCatalog?: { url: string } | null;
    size : string;
    slug : string;
    type : string;
}