import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

// Allow self-signed certificates. DO NOT use in production
if (process.env.NODE_ENV === "development") {
  console.warn(
    "SSL certificate verification is disabled for local development"
  );
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

export default nextConfig;
