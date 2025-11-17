"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { useFormStatus } from "react-dom";
import { Settings } from "lucide-react";
import { logout } from "@/lib/sharedActions";

export function Header() {
  const user = useUser();

  return (
    <header className="sticky top-0 w-full border-b z-50 h-23">
      <nav className="blurred-container flex items-center justify-between px-4 md:px-10 ">
        <div className="mx-auto flex w-full items-center justify-between">
          {/* Logo and Navigation Links */}
          <div className="flex items-center gap-6">
            <Link href="/" className="transition-opacity hover:opacity-80">
              <Image
                src="/Logo.svg"
                alt="FlexNet Logo"
                width={90}
                height={90}
                priority
              />
            </Link>
            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/#our-story"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Our Story
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>
          {/* Auth Btn */}
          <div className="flex items-center gap-4">
            {!user ? (
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
            ) : (
              <>
                <span className="text-muted-foreground hidden sm:inline">
                  {user.firstName} {user.lastName}
                </span>
                <Link href="/settings">
                  <Button
                    variant="ghost"
                    size="icon"
                    title="Settings"
                    className="text-primary-foreground hover:text-primary"
                  >
                    <Settings className="h-5 w-5" />
                  </Button>
                </Link>
                <form action={logout}>
                  <LogoutButton />
                </form>
              </>
            )}
          </div>
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
