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
      className="min-h-[calc(100vh-50px)] relative overflow-hidden"
    >
      <Meteors number={200} />

      <PageContainer className="flex items-center relative z-10">
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
                  className="sm:px-6 sm:py-6 px-4 py-4 font-semibold border-4 border-blue-600/60 dark:border-blue-500/40 bg-blue-500/10 dark:bg-blue-500/5 text-blue-700 dark:text-foreground"
                >
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative h-40 lg:h-50 w-full mt-10 md:mb-15 max-w-md mx-auto aspect-square flex items-center justify-center">
            <video
              src="/3d-assets/2d-animateda.webm"
              className="w-full h-full object-contain rounded-2xl"
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
