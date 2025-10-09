"use client";

import { createContext, useContext, ReactNode } from "react";
import { SessionUser } from "@/types/user";

const UserContext = createContext<SessionUser | null>(null);

export function UserProvider({
  user,
  children,
}: {
  user: SessionUser | null;
  children: React.ReactNode;
}) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  return context;
}
