'use client';

import { useLocale } from "@/locales/index";
import { useParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import Ad from "../components/Ad";
import Link from "next/link";




export default function Home() {
  let { locale } = useParams() as { locale: string }; 
  const translations: {
    [key: string]: any
  }= useLocale();

  return (
    <div className='flex flex-col items-center text-center space-y-6 scale-[0.8] transform origin-top'>
      <h1 className='text-4xl font-semibold'>{translations.homepage.header[locale ?? "en-US"]}</h1>
      <p>{translations.homepage.tagline[locale ?? "en-US"]}</p>
      
      <div className="max-w-md w-full flex items-center space-x-2 p-2">
        <Link href={`/${locale}/home`}>
             <Button
                  variant="outline"
                  className="px-4 py-2"
            >
                {translations.homepage.getStarted[locale ?? "en-US"] ?? "Click to get started!"}
            </Button>
        </Link>
      </div>

      <Ad></Ad>
    </div>
  );
}