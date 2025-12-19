import type { NextConfig } from "next";

const isStaticExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  reactCompiler: true,
  trailingSlash: true,
  ...(isStaticExport && { output: "export" }),
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
      },
    ],
    ...(isStaticExport && { unoptimized: true }),
  },
};

export default nextConfig;
