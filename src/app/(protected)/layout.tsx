import { getCurrentUser } from "@/lib/sharedActions";
import { ProtectedLayoutWrapper } from "./ProtectedLayoutWrapper";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  // Client wrapper for framer-motion animations
  return <ProtectedLayoutWrapper>{children}</ProtectedLayoutWrapper>;
}
