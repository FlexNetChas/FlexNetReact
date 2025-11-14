import Hero from "@/components/Hero";
import Reviews from "@/components/Reviews";
import About from "@/components/About";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <div className="border-b border-border"></div>
      <About />
      <div className="border-b border-border"></div>
      <Reviews />
    </>
  );
}
