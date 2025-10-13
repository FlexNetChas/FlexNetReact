import { UserInfo } from "@/app/(protected)/dashboard/UserInfo";
import { requireAuth } from "@/lib/api/actions/authActions";

export default async function DashboardPage() {
  // Redirect user if not authenticated
  await requireAuth();

  return <UserInfo />;
}
