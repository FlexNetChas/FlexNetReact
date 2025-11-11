import { getCurrentUser } from "@/lib/sharedActions";
import PreviousChatSessions from "@/components/Sidebar/Sidebar";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <div className="flex bg-[#101828]">
      <PreviousChatSessions />
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto ">{children}</div>
      </main>
    </div>
  );
}
