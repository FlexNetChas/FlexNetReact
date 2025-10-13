import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t blurred-container">
      {/* First Row - Grid Layout */}
      <section className="container mx-auto py-8">
        <div className="grid gap-10 grid-cols-3">
          {/* Col 1 */}
          <div className="space-y-3">
            <h4>Discover FlexNet</h4>
            <p>
              Welcome to FlexNet, your personal chat assistant powered by
              intelligent AI for meaningful and personal conversations.
              <Link href="/">&nbsp;Watch</Link>
            </p>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <h4>Make FlexNet yours</h4>
            <p className="text-muted-foreground">
              Create your own chat sessions with a customized AI avatar designed
              to deliver the best solutions for you.
              <Link href="/">&nbsp;Explore</Link>
            </p>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <h4>Explore your membership</h4>
            <p>
              Thank you for being a member of FlexNet. Enjoy unlimited access to
              insightful conversations and personalized support.
              <Link href="/">&nbsp;Browse</Link>
            </p>
          </div>
        </div>
      </section>

      {/* Second row */}
      <section className="w-full border-t">
        <div className="container mx-auto h-20 flex flex-row justify-between items-center gap-4">
          {/* Left */}
          <p className="text-lg text-foreground">
            &copy; {currentYear} FlexNet
          </p>

          {/* Right */}
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="/about">About</Link>
            <Link href="/privacy">Privacy</Link>
          </div>
        </div>
      </section>
    </footer>
  );
}
