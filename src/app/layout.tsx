import type { Metadata } from "next";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";
import { Toaster } from "react-hot-toast";
import { getCurrentUser } from "@/lib/sharedActions";
import { ChatSessionsProvider } from "@/components/chat/ChatSessionContext";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import { RootLayoutWrapper } from "./RootLayoutWrapper";
import { siteConfig } from "@/lib/config/site";
import { ThemeProvider } from "@/components/providers/theme-provider";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url || ""),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [siteConfig.author],
  creator: siteConfig.author.name,
  robots: { index: true, follow: true },

  icons: {
    icon: "/favicon/favicon.ico",
    shortcut: "/favicon/favicon-96x96.png",
    apple: "/favicon/apple-touch-icon.png",
  },

  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/favicon/web-app-manifest-512x512.png",
        width: 512,
        height: 512,
        alt: siteConfig.title,
      },
    ],
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/favicon/web-app-manifest-512x512.png"],
    creator: "@flexnet",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch current user for UserContext (client component)
  const user = await getCurrentUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex h-full min-h-screen flex-col antialiased">
        <Script
          id="cookieyes"
          src="https://cdn-cookieyes.com/client_data/ce717a8065509bba92ea7b32/script.js"
          strategy="beforeInteractive"
        />
        <ThemeProvider>
          <UserProvider user={user}>
            <ChatSessionsProvider>
              {user ? (
                children
              ) : (
                /* Sense we had to check if root layout is auth or protected route do we had
                 * to create a wrapper component to handle the conditional rendering of Header/Footer
                 * We dont need to show footer on auth routes like login/register
                 */
                <RootLayoutWrapper>{children}</RootLayoutWrapper>
              )}
            </ChatSessionsProvider>
            <Toaster position="top-right" />
          </UserProvider>
        </ThemeProvider>

        <GoogleAnalytics gaId="G-TYVTBNZWKC" />
      </body>
    </html>
  );
}
