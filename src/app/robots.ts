// https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
// Generated at build time on server only.

import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = (
    process.env.NEXT_PUBLIC_DOMAIN_PAGE || "https://flexnetfrontend.netlify.app"
  ).replace(/\/$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/protected/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
