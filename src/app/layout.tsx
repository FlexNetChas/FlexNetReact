import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { UserProvider } from "@/context/UserContext";
import { getCurrentUser } from "@/lib/api/actions/authActions";
import PreviousChatSessions from "@/components/Sidebar/Sidebar";

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

  // SIDEBAR STYLED TO EXIST ON THE SIDE OF THE PAGE
  // return (
  //   <html lang="en">
  //     <body className="antialiased">
  //       {/* Client component can always access const user = useUser()
  //           getSession() is only called server and jsut provides user value to UserProvider */}
  //       <UserProvider user={user}>
  //         <div className="flex min-h-screen">
  //           {user && (
  //             <aside className="h-screen sticky top-0 overflow-y-auto">
  //               <PreviousChatSessions />
  //             </aside>
  //           )}
  //           <div className="flex flex-col flex-1 min-h-screen">
  //             <Header />
  //             <main className="flex-1 overflow-auto">{children}</main>
  //             <Footer />
  //           </div>
  //         </div>
  //       </UserProvider>
  //     </body>
  //   </html>
  // );

  // SIDEBAR STYLED TO EXIST BETWEEN HEADER AND FOOTER
  return (
    <html lang="en">
      <body className="antialiased">
        <UserProvider user={user}>
          <div className="flex flex-col min-h-screen">
            <Header />

            <div className="flex flex-1">
              {user && (
                <aside className="h-screen sticky top-0 overflow-y-auto">
                  <PreviousChatSessions />
                </aside>
              )}
              <main className="flex-1 overflow-auto min-h-screen">
                {children}
              </main>
            </div>

            <Footer />
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
