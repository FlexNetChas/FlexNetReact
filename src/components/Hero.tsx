import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, DollarSign, UserCog } from "lucide-react";

function Hero() {
  return (
    <section className="flex flex-col justify-center items-center text-center mt-0 md:mt-10">
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

      <h1 className="gradient-text text-5xl">Welcome to Your Journey</h1>

      <div className="flex flex-col items-center">
        <Image src="/Logo.svg" alt="FlexNet Logo" width={150} height={150} />{" "}
        <p className="text-xl text-muted-foreground mb-5">
          Find your path. Shape your future.
        </p>
        <Link href="/register" className="block w-8/10">
          <Button
            size="lg"
            className="glass text-primary-foreground w-full mb-2"
            variant="outline"
            aria-label="Register"
          >
            Get Started
          </Button>
        </Link>
      </div>

      {/* Badges */}
      <div className="absolute bottom-100 right-10 flex flex-col gap-5 items-center">
        <Badge className="hidden md:flex items-center gap-2 rounded-full border border-blue-500 bg-background/10 p-2 animate-fade-in animate-delay-1">
          <Sparkles className="!h-5 !w-5 text-blue-500 animate-pulse" />
          <span className="">AI-Powered Conversations</span>
        </Badge>

        <Badge className="hidden md:flex items-center gap-2 rounded-full border border-green-500 bg-background/10 p-2 animate-fade-in animate-delay-2">
          <DollarSign className="!h-5 !w-5 text-green-500" />
          <span className="hidden md:inline">Free Registration</span>
        </Badge>

        <Badge className="hidden md:flex items-center gap-2 rounded-full border border-pink-500 bg-background/10 p-2 animate-fade-in animate-delay-3">
          <UserCog className="!h-5 !w-5 text-pink-500" />
          <span className="hidden md:inline">Customizable Avatars</span>
        </Badge>
      </div>
    </section>
  );
}

export default Hero;
