"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import PreviousChatSessions from "@/components/Sidebar/Sidebar";
import { PageContainer } from "@/components/layout/PageContainer";

interface ProtectedLayoutWrapperProps {
  children: React.ReactNode;
}

export function ProtectedLayoutWrapper({
  children,
}: ProtectedLayoutWrapperProps) {
  const pathname = usePathname()?.toLowerCase() ?? "";

  return (
    <div className="bg-secondary flex">
      <PreviousChatSessions />
      {/* Subtile fade in animation for child components */}
      <motion.main
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.4,
          ease: "easeInOut",
        }}
        className="flex-1 overflow-auto"
      >
        <PageContainer size="lg" padding="sm" className="py-6">
          {children}
        </PageContainer>
      </motion.main>
    </div>
  );
}
