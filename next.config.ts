import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone-сборка: ONREZA автоопределяет её и запускает .next/standalone/server.js.
  output: "standalone",
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "image.pollinations.ai" },
      { protocol: "https", hostname: "pollinations.ai" },
    ],
  },
};

export default nextConfig;
