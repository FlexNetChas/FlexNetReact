"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AnimatedText } from "@/components/ui/animated-text";
import { Section } from "./layout/Section";
import { PageContainer } from "./layout/PageContainer";
import { Meteors } from "./ui/shadcn-io/meteors";

function Hero() {
  return (
    <Section
      spacing="sm"
      className="relative min-h-[calc(100vh-50px)] overflow-hidden"
    >
      <Meteors number={200} />

      <PageContainer className="relative z-10 flex items-center">
        <div className="grid w-full grid-cols-1 items-center gap-0 md:gap-16 lg:grid-cols-2">
          <div className="space-y-8">
            <AnimatedText
              text="Welcome to Your Journey"
              gradientColors="linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)"
              gradientAnimationDuration={3}
              hoverEffect={true}
              textClassName="!text-4xl sm:!text-5xl md:!text-6xl !p-0 !m-0"
            />

            <h3 className="text-xl sm:text-3xl lg:text-4xl">
              Find your path. Shape your your future
            </h3>
            <div className="flex flex-wrap gap-4">
              <Link href="/register">
                <Button
                  variant="default"
                  className="dark:text-foreground border-4 border-blue-600/60 bg-blue-500/10 px-4 py-4 font-semibold text-blue-700 sm:px-6 sm:py-6 dark:border-blue-500/40 dark:bg-blue-500/5"
                >
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative mx-auto mt-10 flex aspect-square h-40 w-full max-w-md items-center justify-center bg-transparent md:mb-15 lg:h-50">
            <video
              src="/3d-assets/2d-animateda.webm"
              className="h-full w-full rounded-2xl bg-transparent object-contain"
              autoPlay
              loop
              muted
              playsInline
              aria-label="Animated illustration of a person exploring different paths and options"
            />
          </div>
        </div>
      </PageContainer>
    </Section>
  );
}

export default Hero;
