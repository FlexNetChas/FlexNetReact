"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { logout } from "@/lib/api/actions/authActions";
import { useFormStatus } from "react-dom";

export function Header() {
  const user = useUser();

  return (
    <header className="sticky top-0 w-full blurred-container border-b">
      <nav
        className="container mx-auto flex h-20 items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link href="/" className="transition-opacity hover:opacity-80">
          <Image
            src="/Logo.svg"
            alt="FlexNet Logo"
            width={90}
            height={90}
            priority
          />
        </Link>

        {/* Auth Btn */}
        <div className="flex items-center gap-4">
          {!user ? (
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
          ) : (
            <>
              <span className="text-muted-foreground">
                {user.firstName} {user.lastName}
              </span>
              <form action={logout}>
                <LogoutButton />
              </form>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

// Seperate function so we can use useFormStatus hook
function LogoutButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant="outline" disabled={pending}>
      {pending ? "Logging out..." : "Logout"}
    </Button>
  );
}
