"use client";
import dynamic from "next/dynamic";

// Dynamically import Scene so it only renders on client
const Scene = dynamic(() => import("./Scene"), { ssr: false });

export default function SceneWithContextProvider() {
  return <Scene />;
}
