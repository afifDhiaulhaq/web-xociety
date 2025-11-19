"use client";

import React, { useState, useEffect } from "react";

interface LinkSubItem {
  name: string;
  link: string;
}

interface LinkItem {
  contactList: LinkSubItem[];
  marketPlace: LinkSubItem[];
}

export default function Footer() {
  const [link, setLink] = useState<LinkItem>({
    contactList: [],
    marketPlace: [],
  });

  useEffect(() => {
  async function fetchContact() {
    try {
      const res = await fetch("http://localhost:1337/api/contact?populate=*");
      const json = await res.json();

      console.log("Strapi response:", json);

      if (!json?.data) return;

      const data = json.data;

      setLink({
        contactList: Array.isArray(data.contactList?.contactList)
          ? data.contactList.contactList
          : [],
        marketPlace: Array.isArray(data.marketPlace?.marketPlace)
          ? data.marketPlace.marketPlace
          : [],
      });
    } catch (error) {
      console.error("Fetch contact error:", error);
    }
  }

  fetchContact();
}, []);

  return (
   <footer className="bg-black text-white font-sans">
  <div className="container mx-auto px-6 lg:px-12 py-16">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">

      {/* BRAND */}
      <div>
        <img src="/logo.png" alt="" className="w-50 h-auto"/>
      </div>

      {/* CONTACT */}
      <div>
        <h3 className="font-bold tracking-wider mb-4 text-lg md:text-xl">
          CONTACT US
        </h3>
        <ul className="space-y-2 text-sm md:text-base">
          {link.contactList.map((item, idx) => (
            <li key={idx}>
              <a href={item.link} className="hover:underline">
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* MARKETPLACE */}
      <div>
        <h3 className="font-bold tracking-wider mb-4 text-lg md:text-xl">
          MARKETPLACE
        </h3>
        <ul className="space-y-2 text-sm md:text-base">
          {link.marketPlace.map((item, idx) => (
            <li key={idx}>
              <a href={item.link} className="hover:underline">
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

    </div>

    <div className="mt-12 text-center text-xs md:text-sm text-gray-400">
      &copy; {new Date().getFullYear()} YOURXOCIETY. All rights reserved.
    </div>
  </div>
</footer>

  );
}
