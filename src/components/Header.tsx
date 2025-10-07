import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 w-full blurred-container border-b">
      <nav
        className="container mx-auto flex h-20 items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link href="/" className="transition-opacity hover:opacity-80">
          <img src="/Logo.svg" alt="FlexNet Logo" width={90} height={90} />
        </Link>

        {/* Navigation Link */}
        <div className="flex items-center">
          <Link href="/login">
            <Button
              size="lg"
              className="glass text-primary-foreground"
              variant="outline"
              aria-label="Login"
            >
              Login
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
