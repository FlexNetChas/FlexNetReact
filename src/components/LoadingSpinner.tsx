import React from "react";

export default function LoadingSpinner({}) {
  return (
    // We take advantage of tailwind css inbuilt spinner classes
    <div className="flex min-h-screen items-center justify-center">
      <div className="border-primary size-12 animate-spin rounded-full border-t-4 border-b-4"></div>
    </div>
  );
}
