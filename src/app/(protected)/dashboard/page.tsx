import { requireAuth } from "@/lib/sharedActions";
import Link from "next/link";
import ContinueLearningButton from "./ContinueLearningButton";
import { AnimatedText } from "@/components/ui/animated-text";
import { Section } from "@/components/layout/Section";

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

        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Ready to continue your learning journey? Pick up where you left off or
          start something new
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto w-full">
        {/* Access previously chat sessions */}
        <ContinueLearningButton />

        {/* Start a new chat session */}
        <Link
          href="/chat"
          className="linear-card-gradient p-6 rounded-xl cursor-pointer no-underline hover:no-underline hover:scale-101 transition-transform"
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
