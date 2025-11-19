export function markdownToDescription(md: string, maxLength: number = 160) {
    if (!md) return "";

    // Hapus gambar ![alt](url)
    let text = md.replace(/\!\[.*?\]\(.*?\)/g, "");

    // Hapus link [text](url) → text
    text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

    // Hapus simbol markdown (#, *, _, >, -, `)
    text = text.replace(/[#*>_\-`]/g, "");

    // Hapus banyak spasi
    text = text.replace(/\s+/g, " ").trim();

    // Ambil maksimal X karakter
    if (text.length > maxLength) {
    text = text.substring(0, maxLength).trim() + "...";
    }

    return text;
}
