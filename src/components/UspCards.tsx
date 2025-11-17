import { Sparkles, DollarSign, UserCog } from "lucide-react";

const usp = [
  {
    icon: DollarSign,
    title: "Free",
    description: "Free Registration",
  },
  {
    icon: UserCog,
    title: "Avatars",
    description: "Customizable Avatars",
  },
  {
    icon: Sparkles,
    title: "AI Chat",
    description: "AI-Powered Conversations",
  },
];

export default function UspCards() {
  return (
    <div className="absolute top-0 right-0 left-0 z-10 -translate-y-1/2">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-3 gap-6">
          {usp.map((usp) => (
            <div
              key={usp.title}
              className="border-border linear-card-gradient flex max-w-32 flex-col items-center rounded-3xl border p-3 text-center backdrop-blur-md md:max-w-xs lg:p-5"
            >
              <div className="bg-primary/20 mb-3 rounded-xl p-2 md:p-4">
                <usp.icon className="text-primary size-6 md:h-8 md:w-8" />
              </div>
              <h3 className="text-card-foreground text-sm font-semibold sm:text-xl md:text-lg">
                {usp.title}
              </h3>
              <p className="text-muted-foreground mt-2 hidden text-sm lg:block">
                {usp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
