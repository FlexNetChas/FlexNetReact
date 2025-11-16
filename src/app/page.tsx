import Hero from "@/components/Hero";
import Reviews from "@/components/Reviews";
import About from "@/components/About";
// import { InteractiveGlobe } from "@/components/Test";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <div className="border-b border-border"></div>
      <About />
      <div className="border-b border-border"></div>
      <Reviews />
      <div className="border-b border-border"></div>
      {/* <InteractiveGlobe />
      <div className="border-b border-border"></div> */}
    </>
  );
}
