'use client';

import { useLocale } from "@/locales/index";
import { redirect, useParams } from 'next/navigation';
import Ad from '../components/Ad';
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button";
import { useState } from "react";




export default function Home() {
  let { locale } = useParams() as { locale: string }; 
  const [search, setSearch]= useState(""); 
  const translations: any= useLocale();
  const rd= () => redirect("/" + locale + "/view?search=" + search);

  return (
    <div className='flex flex-col items-center text-center space-y-6 scale-[0.8] transform origin-top'>
      <h1 className='text-4xl font-semibold'>{translations.homepage.header[locale ?? "en-US"]}</h1>
      <p>{translations.homepage.tagline[locale ?? "en-US"]}</p>
      
      <div className="max-w-md w-full flex items-center space-x-2 p-2">
        <form onSubmit={(e)=>{
          e.preventDefault();
          rd()
        }} className="max-wd-md w-full flex items-center space-x-2 p-2">
          <Input
          className="grow px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          placeholder={translations.viewpage.search[locale ?? "en-US"] ?? "Search..."}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          onClick={rd}
          variant="outline"
          className="px-4 py-2"
        >
          {translations.viewpage.search[locale ?? "en-US"] ?? "Search..."}
        </Button>
        </form>
      </div>

      <Ad></Ad>
    </div>
  );
}