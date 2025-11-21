import Hero from "@/components/Hero";
import Reviews from "@/components/Reviews";
import About from "@/components/About";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <div className="border-border border-b"></div>
      <About />
      <div className="border-border border-b"></div>
      <Reviews />
      <div className="border-border border-b"></div>
    </>
  );
}
