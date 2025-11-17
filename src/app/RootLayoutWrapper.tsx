"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Footer from "@/components/Footer";
import { Header } from "@/components/Header";
import { motion } from "framer-motion";

interface RootLayoutWrapperProps {
  children: ReactNode;
}

export function RootLayoutWrapper({ children }: RootLayoutWrapperProps) {
  // Client-side routing
  const pathname = usePathname()?.toLowerCase() ?? "";

  const isProtectedRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/avatar") ||
    pathname.startsWith("/chat") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/settings");

  const isAuthRoute = pathname === "/login" || pathname === "/register";
  const showNavigationBar = !isProtectedRoute;
  const showFooter = !isProtectedRoute && !isAuthRoute;

  return (
    <>
      {showNavigationBar && <Header />}

      {/* Subtile fade in animation for child components */}
      <motion.main
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.6,
          ease: "easeInOut",
        }}
        className="flex-1"
      >
        {children}
      </motion.main>

      {showFooter && <Footer />}
    </>
  );
}
