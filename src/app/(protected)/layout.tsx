import { ProtectedLayoutWrapper } from "./ProtectedLayoutWrapper";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Client wrapper for framer-motion animations
  return <ProtectedLayoutWrapper>{children}</ProtectedLayoutWrapper>;
}
