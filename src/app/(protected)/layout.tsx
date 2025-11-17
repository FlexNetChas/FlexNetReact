import { getCurrentUser } from "@/lib/sharedActions";
import PreviousChatSessions from "@/components/Sidebar/Sidebar";
import { PageContainer } from "@/components/layout/PageContainer";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <div className="flex bg-secondary">
      <PreviousChatSessions />
      <main className="flex-1 overflow-auto">
        <PageContainer size="lg" padding="sm" className="py-6">
          {children}
        </PageContainer>
      </main>
    </div>
  );
}
