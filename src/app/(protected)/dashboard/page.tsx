import { requireAuth } from "@/lib/sharedActions";
import Link from "next/link";
import ContinueLearningButton from "./ContinueLearningButton";
import { AnimatedText } from "@/components/ui/animated-text";
import { Section } from "@/components/layout/Section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Your personalized dashboard to continue your learning journey with FlexNet.",
};

export default async function DashboardPage() {
  await requireAuth();

  return (
    <Section
      spacing="sm"
      className="flex flex-col items-center justify-between space-y-12"
    >
      {/* Hero Section */}
      <div className="text-center">
        <AnimatedText
          text="Welcome Back"
          gradientColors="linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)"
          gradientAnimationDuration={3}
          hoverEffect={true}
          textClassName="!text-5xl md:!text-6xl !p-0 !m-0"
        />

        <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
          Ready to continue your learning journey? Pick up where you left off or
          start something new
        </p>
      </div>

      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
        {/* Access previously chat sessions */}
        <ContinueLearningButton />

        {/* Start a new chat session */}
        <Link
          href="/chat"
          className="linear-card-gradient cursor-pointer rounded-xl p-6 no-underline transition-transform hover:scale-101 hover:no-underline"
        >
          <div className="space-y-2">
            <p className="text-2xl font-bold">New Project</p>
            <p>Start a fresh conversation</p>
          </div>
        </Link>
      </div>
    </Section>
  );
}
