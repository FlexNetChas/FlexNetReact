import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, DollarSign, UserCog } from "lucide-react";

function Hero() {
  return (
    <section className="flex flex-col justify-center items-center text-center mt-10">
      <img
        src="/Hero.png"
        alt="Group of people looking at the camera"
        width={200}
        height={200}
        className="mb-8 rounded-lg shadow-lg"
      />

      <h1 className="gradient-text text-5xl">Welcome to Your Journey</h1>

      <div className="flex flex-col items-center">
        <img src="/Logo.svg" alt="FlexNet Logo" width={150} height={150} />
        <p className="text-xl text-muted-foreground mb-5">
          Find your path. Shape your future.
        </p>
        <Link href="/register" className="block w-8/10">
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

      {/* Badges */}
      <div className="absolute bottom-10 right-10 flex flex-col gap-5 items-center">
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
    </section>
  );
}

export default Hero;
