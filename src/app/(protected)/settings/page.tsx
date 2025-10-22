import React from "react";
import { requireAuth } from "@/lib/api/actions/authActions";
import { getUserDescription } from "@/lib/api/actions/userDescriptionActions";
import SettingsForm from "./SettingsForm";

async function SettingsPage() {
  const user = await requireAuth();
  const userDescription = await getUserDescription(user.id);

  return <SettingsForm userId={user.id} initialData={userDescription} />;
}

export default SettingsPage;
