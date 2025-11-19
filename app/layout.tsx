import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/component/navbar";
import Footer from "@/component/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YOURXOCIETY - Discover Products & Experiences",
  description: "Connect with YOURXOCIETY, explore products, discover experiences, and join the xociety community.",
  keywords: ["YOURXOCIETY", "products", "discover", "xociety", "online marketplace"],
  authors: [{ name: "YOURXOCIETY Team", url: "https://yourxociety.com" }],
  icons: {
    icon: "/logoTab.png", // favicon utama
  },
  openGraph: {
    title: "YOURXOCIETY - Discover Products & Experiences",
    description: "Connect with YOURXOCIETY, explore products, discover experiences, and join the xociety community.",
    url: "https://yourxociety.com",
    siteName: "YOURXOCIETY",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YOURXOCIETY - Discover Products & Experiences",
    description: "Connect with YOURXOCIETY, explore products, discover experiences, and join the xociety community.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={montserrat.variable}>
        <body
        className={`flex flex-col min-h-screen ${montserrat.variable} antialiased`}
      >
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />

      </body>
    </html>
  );
}
