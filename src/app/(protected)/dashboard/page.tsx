import { UserInfo } from "@/app/(protected)/dashboard/UserInfo";
import { requireAuth } from "@/lib/sharedActions";

export default async function DashboardPage() {
  // Redirect user if not authenticated
  await requireAuth();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <UserInfo />
    </div>
  );
}
