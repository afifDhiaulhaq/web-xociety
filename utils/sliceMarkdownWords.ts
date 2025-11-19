export function sliceMarkdownWords(markdown: string, maxWords = 30) {
    if (!markdown) return "";

    // Hapus semua formatting markdown (#, *, _, >, dll)
    const cleanText = markdown
        .replace(/[\#\*\_\>\`\-]/g, "") // hapus simbol markdown
        .replace(/\!\[.*?\]\(.*?\)/g, "") // hapus gambar
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // hapus link, sisakan teks
        .trim();

    const words = cleanText.split(/\s+/);

    if (words.length <= maxWords) {
        return cleanText;
    }

    return words.slice(0, maxWords).join(" ") + " ...";
}
