'use client';

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import Link from "next/link";
import React, { useState } from "react";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`fixed top-18 ${isOpen ? "left-12" : "left-2"} z-50 bg-gray-800 text-white p-2 rounded-md shadow-md focus:outline-none`}
      >
        {isOpen ? '✕' : '☰'}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 h-screen bg-gray-900 text-white shadow-lg z-40 overflow-y-auto transition-all duration-700
        ${isOpen ? 'w-24 p-2' : 'w-0 p-0 overflow-hidden'}`}
      >
        <div className="flex flex-col space-y-6">
          <Popover>
            <PopoverTrigger className="text-left w-full hover:text-blue-400 text-xs font-medium">
              Office
            </PopoverTrigger>
            <PopoverContent className="bg-gray-800 text-white rounded-lg p-4 w-48">
              <ul className="space-y-2">
                <li><Link href="/en-US/view?category=phones%26tablets">Phones & Tablets</Link></li>
                <li><Link href="/en-US/view?category=laptops%26pcs">Laptops & PCs</Link></li>
                <li><Link href="/en-US/view?category=printers%26scanners">Printers & Scanners</Link></li>
                <li><Link href="/en-US/view?category=storage%26media">Storage & Media</Link></li>
              </ul>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger className="text-left w-full hover:text-blue-400 text-xs font-medium">
              Entertainment
            </PopoverTrigger>
            <PopoverContent className="bg-gray-800 text-white rounded-lg p-4 w-48">
              <ul className="space-y-2">
                <li><Link href="/en-US/view?category=tvs%26hometheatres">TVs & Home Theatres</Link></li>
                <li><Link href="/en-US/view?category=gaming%26acessories">Gaming & Accessories</Link></li>
                <li><Link href="/en-US/view?category=audio%26soundgear">Audio & Soundgear</Link></li>
              </ul>
            </PopoverContent>
          </Popover>

          <Link href={"/en-US/view?category=ar%26vr"} className="text-left w-full hover:text-blue-400 text-xs font-medium">
            AR & VR
          </Link>

          <Link href={"/en-US/view?category=watches%26trackers"} className="text-left w-full hover:text-blue-400 text-xs font-medium">
            Smartwatces & Trackers
          </Link>

          <Popover>
            <PopoverTrigger className="text-left w-full hover:text-blue-400 text-xs font-medium">
              Home Appliances
            </PopoverTrigger>
            <PopoverContent className="bg-gray-800 text-white rounded-lg p-4 w-48">
              <ul className="space-y-2">
                <li><Link href="/en-US/view?category=kitchen_accessories">Kitchen Appliances</Link></li>
                <li><Link href="/en-US/view?category=home_decor">Home Decor</Link></li>
              </ul>
            </PopoverContent>
          </Popover>

        </div>
      </aside>
    </>
  );
};

export default Sidebar;