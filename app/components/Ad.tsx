'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Ad: React.FC = () => {
  const ads = [
    {
      title: "Samsung Galaxy S24 Ultra",
      link: "/en/view/14",
      img: "/ad-images/samsung-galaxy-s24-ultra.jpg"
    },
    {
      title: "Apple MacBook Air M3",
      link: "/en/view/34",
      img: "/ad-images/macbook-air-m3.jpg" 
    },
    {
      title: "Xiaomi Redmi Buds 6 Play",
      link: "/en/view/147",
      img: "/ad-images/redmi-buds-6-play.jpg" 
    },
    {
      title: "Samsung Galaxy S25 Ultra",
      link: "/en/view/33",
      img: "/ad-images/samsung-galaxy-s25-ultra.jpg"
    },
  ];

  const [currentAd, setCurrentAd] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % ads.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [ads.length]);

  const { title, link, img } = ads[currentAd];

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6 max-w-screen-lg mx-auto text-center">
      <h3 className="text-xl font-bold mb-2">
      <Link
        href={link}
        onClick={() => {
          fetch('/api/links/adLink', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ adName: title })
          });
        }}
        className="hover:underline"
>
  {title}
</Link>
      </h3>
      {img ? (
        <Image
        src={img}
        alt="Product Image"
        width={1200}
        height={400} // Still helps Next.js optimize
        style={{
          width: 'calc(90vw - 1cm)',
          height: 'auto',
          maxHeight: '300px', // Set a reasonable max height
          objectFit: 'contain'
        }}
        className="shadow-sm"
      />
      ) : (
        <div className="text-gray-500 italic">Image loading...</div>
      )}
    </div>
  );
};

export default Ad;