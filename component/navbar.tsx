"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface LinkSubItem {
  name: string;
  link: string;
}

interface LinkItem {
  contactList: LinkSubItem[];
}

const NAV_ITEMS = [
  { label: "CATALOG", href: "/products" },
  { label: "ARTICLE", href: "/article" },
  { label: "ABOUT", href: "/about" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [link, setLink] = useState<LinkItem>({
    contactList: [],
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    async function fetchContact() {
      try {
        const res = await fetch("https://deemed-preliminary-checked-roulette.trycloudflare.com/api/contact?populate=*");
        const json = await res.json();

        console.log("Strapi response:", json);

        if (!json?.data) return;

        const data = json.data;

        setLink({
          contactList: Array.isArray(data?.contactList?.contactList)
            ? data?.contactList?.contactList
            : [],
        });
      } catch (error) {
        console.error("Fetch contact error:", error);
      }
    }

    fetchContact();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const baseNavClass =
    "text-sm tracking-widest uppercase text-white hover:text-[#b99158] transition-all duration-300";

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b
        ${
          isScrolled
            ? "bg-black border-black shadow-lg"
            : "bg-black/20 backdrop-blur-md border-transparent"
        }
      `}
    >
      <div className="container mx-auto px-4 sm:px-6 py-3 transition-all duration-500">
        <nav className="relative flex items-center justify-between">
          {/* MOBILE TOGGLE */}
          <button
            className="md:hidden text-sm px-3 py-2 transition"
            onClick={() => setMobileMenu((s) => !s)}
          >
            <Image src="/burger-menu.png" alt="menu" width={22} height={22} />
          </button>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map(({ label, href }) => (
              <Link key={label} href={href} className={baseNavClass}>
                {label}
              </Link>
            ))}
          </div>

          {/* CENTER LOGO */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 flex items-center"
          >
            <Image
              src="/logo.png"
              alt="logo"
              width={210}
              height={50}
              className="object-contain"
              priority
            />
          </Link>

          {/* RIGHT contact icon */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen((v) => !v)}
              className="p-2 rounded-md hover:bg-white/10 transition-all duration-300"
            >
              <Image src="/globe.svg" alt="Contact" width={22} height={22} />
            </button>

            {open && (
              <div className="absolute top-full right-0 mt-2 w-44 bg-black/80 text-white border border-gray-800 rounded-lg shadow-lg py-2 animate-fadeIn backdrop-blur-sm">
                {link.contactList.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.link}
                    className="block px-3 py-1 hover:bg-white/10"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* MOBILE NAV */}
      {mobileMenu && (
        <div className="md:hidden px-6 pb-4 animate-fadeDown">
          <div className="bg-black/20 backdrop-blur-md py-4 flex flex-col space-y-3 transition-all duration-300 rounded-b-lg">
            {NAV_ITEMS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-sm tracking-widest uppercase text-white hover:text-[#b99158] transition-all duration-300 text-center py-2"
                onClick={() => setMobileMenu(false)}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
