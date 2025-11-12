import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, DollarSign, UserCog } from "lucide-react";
import { AnimatedText } from "@/components/ui/animated-text";

function Hero() {
  return (
    <section className="flex flex-col justify-center items-center text-center relative min-h-screen">
      {/* <Image
        src="/Hero.png"
        alt="Group of people looking at the camera"
        width={200}
        height={200}
        className="mb-8 rounded-lg shadow-lg"
        priority
      /> */}
      <video
        src="/3d-assets/2d-animated.webm"
        className="mb-8 max-w-[25%] max-h-[50%] w-auto h-auto"
        autoPlay
        loop
        muted
      />
      <AnimatedText
        text="Welcome to Your Journey"
        gradientColors="linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)"
        gradientAnimationDuration={3}
        hoverEffect={true}
        className="py-4"
        textClassName="text-center"
      />
      <div className="flex flex-col items-center">
        <p className="text-xl text-muted-foreground mb-5">
          Find your path. Shape your future.
        </p>
        <Link href="/register" className="block w-8/10">
          <Button
            size="lg"
            variant="default"
            neon={true}
            className="w-full mb-2 font-mono"
            aria-label="Register"
          >
            Get Started
          </Button>
        </Link>
      </div>
      {/* Badges */}
      <div className="absolute top-4 left-4 md:top-10 md:left-10 flex flex-col gap-3 md:gap-5 items-center z-10">
        <Badge className="flex items-center gap-2 rounded-full border border-green-500 bg-background/10 p-2 md:p-3 animate-fade-in animate-delay-1 text-xs md:text-sm">
          <DollarSign className="!h-4 !w-4 md:!h-5 md:!w-5 text-green-500" />
          <span>Free Registration</span>
        </Badge>
        <Badge className="flex items-center gap-2 rounded-full border border-pink-500 bg-background/10 p-2 md:p-3 animate-fade-in animate-delay-2 text-xs md:text-sm">
          <UserCog className="!h-4 !w-4 md:!h-5 md:!w-5 text-pink-500" />
          <span>Customizable Avatars</span>
        </Badge>
        <Badge className="flex items-center gap-2 rounded-full border border-blue-500 bg-background/10 p-2 md:p-3 animate-fade-in animate-delay-3 text-xs md:text-sm">
          <Sparkles className="!h-4 !w-4 md:!h-5 md:!w-5 text-blue-500 animate-pulse" />
          <span>AI-Powered Conversations</span>
        </Badge>
      </div>
    </section>
  );
}

export default Hero;
