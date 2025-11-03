import React from "react";
import { requireAuth } from "@/lib/sharedActions";
import { getUserDescription } from "./_components/user-description/actions";
import { UserDescriptionForm } from "./_components/user-description/UserDescriptionForm";

async function SettingsPage() {
  const user = await requireAuth();
  const userDescription = await getUserDescription(user.id);

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-4xl space-y-4 mt-10">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-4xl mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </header>

        {/* Sections */}
        <div className="space-y-2">
          {/* User Description Section */}
          <section className="flex items-center justify-center mt-10">
            <UserDescriptionForm
              userId={user.id}
              initialData={userDescription}
            />
          </section>

          {/* Feautures settings */}
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
