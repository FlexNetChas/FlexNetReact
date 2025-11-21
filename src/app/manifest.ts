import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FlexNet",
    short_name: "FlexNet",
    description: "AI Study Guidance Companion",
    start_url: "/",
    display: "standalone",
    background_color: "#0e1624",
    theme_color: "#99e2f7",
    icons: [
      {
        src: "/favicon/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
