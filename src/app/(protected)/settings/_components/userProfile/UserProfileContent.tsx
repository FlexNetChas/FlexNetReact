import { UserDescriptionForm } from "./UserDescriptionForm";
import { RemoveAccount } from "./RemoveAccount";
import { UserDescription } from "@/types/userDescription";
import { SessionUser } from "@/types/user";
import { deleteAccount } from "../../actions";
import { useState } from "react";

export default function UserProfileContent({
  user,
  userDescription,
}: {
  user: SessionUser;
  userDescription: UserDescription;
}) {
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  async function formAction(formData: FormData) {
    setIsDeleting(true);
    setDeleteError(null);

    try {
      const result = await deleteAccount(user.id);

      if (result.errors) {
        setDeleteError(result.errors.form.join(", "));
      } else if (result.success) {
        // Redirect hanteras nu i deleteAccount funktionen
        return;
      }
    } catch (error) {
      setDeleteError("An unexpected error occurred");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Personal Information Section */}
      <section className="flex flex-col md:grid md:grid-cols-[35%_65%]">
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
      <section className="flex flex-col md:grid md:grid-cols-[35%_65%]">
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
          {/* Visa felmeddelande om det finns */}
          {deleteError && (
            <div className="mb-4 p-3 bg-error/20 border border-error rounded-md">
              <p className="text-error text-sm">{deleteError}</p>
            </div>
          )}
          <RemoveAccount formAction={formAction} isPending={isDeleting} />{" "}
        </div>
      </section>
    </div>
  );
}
