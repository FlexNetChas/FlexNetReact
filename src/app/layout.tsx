import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { UserProvider } from "@/context/UserContext";
import { Toaster } from "react-hot-toast";
import { getCurrentUser } from "@/lib/sharedActions";
import { ChatSessionsProvider } from "@/components/chat/ChatSessionContext";

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
    <html lang="en">
      <body className="antialiased">
        <UserProvider user={user}>
          <ChatSessionsProvider>
            {user ? (
              // Protected layout: Sidebar with chat sessions
              children
            ) : (
              // Public layout: Header and footer
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1 overflow-auto min-h-screen">
                  {children}
                </main>
                <Footer />
              </div>
            )}
          </ChatSessionsProvider>
          <Toaster position="top-right" />
        </UserProvider>
      </body>
    </html>
  );
}
