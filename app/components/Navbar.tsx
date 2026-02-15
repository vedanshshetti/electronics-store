"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "@/locales";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { locale } = useParams() as {locale: string};
  const translations: any = useLocale();

  const handleLocaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    const segments = pathname.split("/");
    segments[1] = newLocale; // Replace the locale
    const newPath = segments.join("/");
    router.push(newPath + "?" + searchParams.toString());
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between p-4 bg-gray-800 text-white shadow-md">
      <div className="flex text-md gap-4 xs:text-xs">
        <Link href={`/${locale ?? "en-US"}`}>Home</Link>
        <Link href={`/${locale ?? "en-US"}/view`}>{translations.viewpage.view[locale ?? "en-US"]}</Link>
        <Link href={`/${locale ?? "en-US"}/ai`}>{translations.navbar.aiChat[locale ?? "en-US"]}</Link>
        <Link href={`/${locale ?? "en-US"}/wishlist`}>{translations.navbar.wishlist[locale ?? "en-US"]}</Link>
      </div>

      <select
        className="bg-gray-700 px-2 py-1 rounded text-white"
        value={locale}
        onChange={handleLocaleChange}
      >
        <option value="en-US">{translations.common.allLanguages.english[locale ?? "en-US"]}</option>
        <option value="de-DE">{translations.common.allLanguages.german[locale ?? "en-US"]}</option>
        <option value="fr-FR">{translations.common.allLanguages.french[locale ?? "en-US"]}</option>
        <option value="hi-IN">{translations.common.allLanguages.hindi[locale ?? "en-US"]}</option>
        <option value="kn-IN">{translations.common.allLanguages.kannada[locale ?? "en-US"]}</option>
        <option value="es-ES">{translations.common.allLanguages.spanish[locale ?? "en-US"]}</option>
        <option value="it-IT">{translations.common.allLanguages.italian[locale ?? "en-US"]}</option>
      </select>
    </nav>
  );
};

export default Navbar;