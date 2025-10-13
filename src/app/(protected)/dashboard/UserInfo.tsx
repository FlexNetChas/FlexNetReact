"use client";

import { useUser } from "@/context/UserContext";

export function UserInfo() {
  const user = useUser();

  if (!user) return null;

  return (
    <div className="bg-form/40 p-10 rounded-2xl mb-6">
      <h2>Welcome {user.firstName}! </h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}
