"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AnimatedText } from "@/components/ui/animated-text";
import { Section } from "./layout/Section";
import { PageContainer } from "./layout/PageContainer";
import { lazy, Suspense } from "react";

// Lazy load AuroraEffect
const AuroraEffect = lazy(() => import("./AuroraEffect"));

function Hero() {
  return (
    <Section className="min-h-[calc(100vh-50px)] relative ">
      {/* Lazy load med Suspense */}
      <Suspense
        fallback={
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-950/20 to-purple-950/20" />
        }
      >
        <AuroraEffect />
      </Suspense>

      <PageContainer className="flex items-center relative z-10">
        <div className="grid w-full grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div className="space-y-8">
            <AnimatedText
              text="Welcome to Your Journey"
              gradientColors="linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)"
              gradientAnimationDuration={3}
              hoverEffect={true}
              textClassName="!text-5xl md:!text-6xl !p-0 !m-0"
            />

            <h3 className="text-2xl sm:text-3xl lg:text-4xl">
              Find your path. Shape your your future
            </h3>
            <div className="flex flex-wrap gap-4">
              <Link href="/register">
                <Button
                  variant="default"
                  className="sm:px-6 sm:py-6 px-7 py-5 font-semibold "
                >
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative w-full max-w-md mx-auto aspect-square flex items-center justify-center">
            <video
              src="/3d-assets/2d-animated.webm"
              className="w-auto h-auto max-w-full max-h-full"
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
