"use client";
import dynamic from "next/dynamic";

//docs link https://nextjs.org/docs/pages/guides/lazy-loading#nextdynamic
// Dynamically import the Scene component with SSR disabled, e.g., only render on the client side.
const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => <p>Loading Scene...</p>,
});

export default function LazyScene() {
  return <Scene />;
}
