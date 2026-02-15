import { NextConfig } from "next";

//! IMPORTANT Constants
const maxInactiveAge=5 * 60 * 1000;

const nextConfig: NextConfig = {
  devIndicators: false,
  onDemandEntries: {
    maxInactiveAge // Keep pages in memory for 5 mins
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'supabase/client', 'heroui/react'], // Smarter importing
  },
  compress: true,
  images: {
    remotePatterns: [
    {
      protocol: 'https',
      hostname: 'glqtdjktqfwdgfdbyzga.supabase.co',
      pathname: '/storage/v1/object/public/**',
}
]
  }
};

export default nextConfig;