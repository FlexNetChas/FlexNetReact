import React from "react";
import { UserDescriptionForm } from "./UserDescriptionForm";
import { RemoveAccount } from "./RemoveAccount";
import { UserDescription } from "@/types/userDescription";
import { SessionUser } from "@/types/user";

export default function UserProfileContent({
  user,
  userDescription,
}: {
  user: SessionUser;
  userDescription: UserDescription;
}) {
  async function formAction(formData: FormData) {
    // Todo: Implement account deletion logic when backend is ready
    try {
      alert("Account deleted");
    } catch {}
  }

  return (
    <div className="space-y-8">
      {/* Personal Information Section */}
      <section className="grid grid-cols-[35%_65%]  ">
        <div className="p-6">
          <h3 className="text-lg text-primary-foreground">
            Personalize your experience{" "}
          </h3>
          <p className="mt-2">
            Share optional info to get more relevant and personalized
            suggestions.
          </p>
        </div>
        <div className="p-6">
          <UserDescriptionForm userId={user.id} initialData={userDescription} />
        </div>
      </section>

      {/* Section Divider */}
      <div className="border-t border-border -mx-5" />

      {/* Danger Zone */}
      <section className="grid grid-cols-[35%_65%] ">
        <div className="p-6">
          <h3 className="text-lg text-primary-foreground">Danger Zone</h3>
          <p className="mt-2">
            Permanently delete your account and all associated data. This action
            cannot be undone.
          </p>
          <div className="flex items-start gap-3 mt-2 ">
            <div className="size-1.5 bg-error rounded-full mt-2" />
            <p>
              If you have any questions, please contact our support team first
            </p>
          </div>
        </div>
        <div className="p-6">
          <RemoveAccount formAction={formAction} />
        </div>
      </section>
    </div>
  );
}
