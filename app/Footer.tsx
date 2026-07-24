// components/Footer.tsx
"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full mt-0.5 bg-gray-100 border-t border-gray-300">
      <div className="max-w-7l mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600">
        <p className="text-center sm:text-right">
          {/* Replace this with actual copyright info */}
          © {new Date().getFullYear()} [REDACTED FOR PRIVACY]'s Electronics Store. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
