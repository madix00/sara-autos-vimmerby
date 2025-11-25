import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "i.blocketcdn.se",
      },
      {
        protocol: "https",
        hostname: "images.blocketcdn.se",
      },
    ],
  },
};

export default nextConfig;
