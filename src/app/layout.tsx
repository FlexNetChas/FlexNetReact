import type { Metadata } from "next";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";
import { Toaster } from "react-hot-toast";
import { getCurrentUser } from "@/lib/sharedActions";
import { ChatSessionsProvider } from "@/components/chat/ChatSessionContext";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import { RootLayoutWrapper } from "./RootLayoutWrapper";

export const metadata: Metadata = {
  title: "FlexNet! Your AI Study Guidance Companion",
  description:
    "FlexNet is a personalized AI avatar. Created to help you navigate your academic journey. From choosing the right path to achieving study goals, FlexNet is here to assist you every step of the way",
  authors: [{ name: "FlexNet Team" }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN_PAGE!),

  // Todo:  Metadata Open Graph / Twitter Cards
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
        <GoogleAnalytics gaId="G-TYVTBNZWKC" />
      </body>
    </html>
  );
}
