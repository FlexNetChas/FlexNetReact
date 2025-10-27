import Script from "next/script";

export default function Head() {
  return (
    <>
      <Script
        id="cookieyes"
        type="text/javascript"
        src="https://cdn-cookieyes.com/client_data/ce717a8065509bba92ea7b32/script.js"
        strategy="beforeInteractive"
      />
    </>
  );
}
