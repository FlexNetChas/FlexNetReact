import React from "react";
import { requireAuth } from "@/lib/api/actions/authActions";
import { getUserDescription } from "@/lib/api/actions/userDescriptionActions";
import SettingsForm from "./SettingsForm";

//Fetches user description data server-side before rendering the form and ensures user is authenticated
async function SettingsPage() {
  const user = await requireAuth();

  // Fetch user:s existing userDescription from backend
  // If no user description exists, this will be null
  // The form will handle this case by treating null value as a new user
  const userDescription = await getUserDescription(user.id);

  return <SettingsForm userId={user.id} initialData={userDescription} />;
}

export default SettingsPage;
