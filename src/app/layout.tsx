import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "FlexNet! Your AI Study Guidance Companion",
  description:
    "FlexNet is a personalized AI avatar. Created to help you navigate your academic journey. From choosing the right path to achieving study goals, FlexNet is here to assist you every step of the way",
  authors: [{ name: "FlexNet Team" }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN_PAGE!),

  // Todo:  Metadata Open Graph / Twitter Cards
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="flex flex-col">
          <Header />
          <main className="mx-auto min-h-screen">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
