import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "pub-904deb9e5417466f977f64b246d8ada0.r2.dev",
      },
    ],
  },
};

export default nextConfig;
