import type { NextConfig } from "next";

const nextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    formats: ["image/avif", "image/webp"],
  },

  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-select",
      "@radix-ui/react-tooltip",
      "framer-motion",
    ],
  },
} as const satisfies NextConfig;

if (process.env.NODE_ENV === "development") {
  console.warn(
    "SSL certificate verification is disabled for local development",
  );
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

export default nextConfig;

/*  Optimize package imports for smaller bundle sizes
 *  https://nextjs.org/docs/app/api-reference/config/next-config-js/optimizePackageImports
 */
