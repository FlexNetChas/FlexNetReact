import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, DollarSign, UserCog } from "lucide-react";

function Hero() {
  return (
    <section className="flex flex-col justify-center items-center text-center mt-4 md:mt-10 px-4 md:px-6 relative pb-10">
      <Image
        src="/Hero.png"
        alt="Group of people looking at the camera"
        width={200}
        height={200}
        className="mb-6 md:mb-8 rounded-lg shadow-lg w-32 h-32 md:w-48 md:h-48 lg:w-52 lg:h-52"
        priority
      />

      <h1 className="gradient-text text-3xl md:text-4xl lg:text-5xl px-2">Welcome to Your Journey</h1>

      <div className="flex flex-col items-center w-full max-w-md px-4">
        <Image src="/Logo.svg" alt="FlexNet Logo" width={150} height={150} className="w-28 h-28 md:w-36 md:h-36 lg:w-40 lg:h-40" />{" "}
        <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-4 md:mb-5">
          Find your path. Shape your future.
        </p>
        <Link href="/register" className="block w-full max-w-xs">
          <Button
            size="lg"
            className="glass text-primary-foreground w-full"
            variant="outline"
            aria-label="Register"
          >
            Get Started
          </Button>
        </Link>
      </div>

      {/* Badges - Hidden on mobile, shown on larger screens */}
      <div className="hidden lg:flex absolute bottom-10 right-10 flex-col gap-5 items-center">
        <Badge className="flex items-center gap-2 rounded-full border border-blue-500 bg-background/10 p-2 animate-fade-in animate-delay-1">
          <Sparkles className="!h-5 !w-5 text-blue-500 animate-pulse" />
          <span>AI-Powered Conversations</span>
        </Badge>

        <Badge className="flex items-center gap-2 rounded-full border border-green-500 bg-background/10 p-2 animate-fade-in animate-delay-2">
          <DollarSign className="!h-5 !w-5 text-green-500" />
          <span>Free Registration</span>
        </Badge>

        <Badge className="flex items-center gap-2 rounded-full border border-pink-500 bg-background/10 p-2 animate-fade-in animate-delay-3">
          <UserCog className="!h-5 !w-5 text-pink-500" />
          <span>Customizable Avatars</span>
        </Badge>
      </div>
      
      {/* Badges for mobile - shown below content */}
      <div className="flex lg:hidden flex-col gap-3 items-center mt-8 w-full px-4">
        <Badge className="flex items-center gap-2 rounded-full border border-blue-500 bg-background/10 p-2 animate-fade-in animate-delay-1 text-xs">
          <Sparkles className="!h-4 !w-4 text-blue-500 animate-pulse" />
          <span>AI-Powered Conversations</span>
        </Badge>

        <Badge className="flex items-center gap-2 rounded-full border border-green-500 bg-background/10 p-2 animate-fade-in animate-delay-2 text-xs">
          <DollarSign className="!h-4 !w-4 text-green-500" />
          <span>Free Registration</span>
        </Badge>

        <Badge className="flex items-center gap-2 rounded-full border border-pink-500 bg-background/10 p-2 animate-fade-in animate-delay-3 text-xs">
          <UserCog className="!h-4 !w-4 text-pink-500" />
          <span>Customizable Avatars</span>
        </Badge>
      </div>
    </section>
  );
}

export default Hero;
