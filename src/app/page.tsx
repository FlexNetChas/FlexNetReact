import Hero from "@/components/Hero";
import AuroraEffect from "@/components/AuroraEffect";

export default function LandingPage() {
  return (
    <div className="flex flex-col relative">
      <AuroraEffect />
      <div className="relative z-10">
        <Hero />
      </div>
    </div>
  );
}
