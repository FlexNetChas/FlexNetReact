import { requireAuth } from "@/lib/sharedActions";
import Link from "next/link";

export default async function DashboardPage() {
  await requireAuth();

  return (
    <div className="min-h-screen mx-5">
      {/* Hero Section */}
      <div className="text-center mb-12 pt-8">
        <h1 className="mb-4">Welcome Back</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Ready to continue your learning journey? Pick up where you left off or
          start something new
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Acess previously chatt sessions */}
        <Link
          href="/chat"
          className="glass p-6 rounded-xl cursor-pointer no-underline hover:no-underline hover:scale-101 transition-transform"
        >
          <div className="text-2xl font-bold mb-2 text-white">
            Continue Learning
          </div>
          <p>Pick up from your last session</p>
        </Link>

        {/* Start a new chat session */}
        <Link
          href="/chat"
          className="glass p-6 rounded-xl cursor-pointer no-underline hover:no-underline hover:scale-101 transition-transform"
        >
          <div className="text-2xl font-bold mb-2 text-white">New Project</div>
          <p>Start a fresh conversation</p>
        </Link>
      </div>
    </div>
  );
}
