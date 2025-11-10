import React from "react";

type Props = {};

export default function LoadingSpinner({}: Props) {
  return (
    // We take advantage of tailwind css inbuilt spinner classes
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary"></div>
    </div>
  );
}
