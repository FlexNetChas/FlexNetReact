import Link from "next/link";

import { PageContainer } from "@/components/layout/PageContainer";
import { InteractiveGlobe } from "./InteractiveGlobe";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const linkGroupsRow1 = [
    {
      title: "FlexNet",
      links: [
        { label: "Features", href: "/" },
        { label: "Security", href: "/" },
        { label: "About", href: "/" },
        { label: "Help Center", href: "/" },
        { label: "Contact", href: "/" },
      ],
    },
  ];
  const linkGroupsRow2 = [
    {
      title: "Legal",
      links: [
        { label: "Privacy policy", href: "/privacy" },
        { label: "Terms of service", href: "/terms" },
      ],
    },
  ];
  return (
    <footer className="border-border blurred-container border-t text-sm">
      <PageContainer className="py-14">
        {/* Row 1 */}
        <div className="grid grid-cols-1 items-start justify-between gap-10 md:grid-cols-[30%_60%]">
          {/* Link groups */}
          <div className="flex flex-col gap-8">
            {linkGroupsRow1.map(({ title, links }) => (
              <nav key={title} aria-label={`${title.toLowerCase()} links`}>
                <h3 className="text-primary mb-5 font-bold tracking-wide">
                  {title}
                </h3>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-muted-foreground hover:text-primary text-lg transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
          {/* Description */}
          <InteractiveGlobe className="h-full w-full" />
        </div>

        {/* Row 2 */}
        <div className="flex flex-col-reverse items-center justify-between gap-4 pt-10 sm:flex-row">
          <p className="text-muted-foreground mt-5 text-center text-sm sm:mt-0 sm:text-left">
            © FlexNet. All rights reserved {currentYear}
          </p>
          {linkGroupsRow2.map(({ title, links }) => (
            <nav key={title} aria-label={`${title.toLowerCase()} links`}>
              <ul className="flex flex-row gap-10">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </PageContainer>
    </footer>
  );
}
