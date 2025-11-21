import type { NextConfig } from "next";

const nextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
} as const satisfies NextConfig;

if (process.env.NODE_ENV === "development") {
  console.warn(
    "SSL certificate verification is disabled for local development",
  );
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

export default nextConfig;
