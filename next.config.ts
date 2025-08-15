import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
    domains: [process!.env!.NEXT_PUBLIC_APP_URL!],
       remotePatterns: [
 {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
      },
    ]
    }
};

export default nextConfig;
