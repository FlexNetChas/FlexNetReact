import { UserDescriptionForm } from "./UserDescriptionForm";
import { RemoveAccount } from "./RemoveAccount";
import { UserDescription } from "@/types/userDescription";
import { SessionUser } from "@/types/user";
import { deleteAccount } from "../../actions";
import { useState } from "react";
import { Section } from "@/components/layout/Section";
import { Circle } from "lucide-react";
import { useToasts } from "@/hooks/useToasts";

export default function UserProfileContent({
  user,
  userDescription,
}: {
  user: SessionUser;
  userDescription: UserDescription;
}) {
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  async function formAction() {
    setIsDeleting(true);
    setDeleteError(null);

    try {
      const result = await deleteAccount(user.id);

      if (result.errors) {
        setDeleteError(result.errors.form.join(", "));
      } else if (result.success) {
        return;
      }
    } catch {
      setDeleteError("An unexpected error occurred");
    } finally {
      setIsDeleting(false);
    }
  }

  useToasts(deleteError ? { errors: { form: [deleteError] } } : undefined, {
    duration: 5000,
  });

  return (
    <>
      {/* Account Overview Section */}
      <Section spacing="xs" className="setting-section-layout">
        <div className="p-6">
          <h3>Personalize your experience </h3>
          <p className="mt-2">
            Share optional info to get more relevant and personalized
            suggestions.
          </p>
        </div>
        <UserDescriptionForm userId={user.id} initialData={userDescription} />
      </Section>

      {/* Section Divider */}
      <div className="border-border -mx-6 border-t" />

      {/* Danger Zone */}
      <Section spacing="xs" className="setting-section-layout">
        <div className="p-6">
          <h3>Danger Zone</h3>
          <p className="text-muted-foreground mt-2">
            Permanently delete your account and all associated data. This action
            cannot be undone.
          </p>
          <div className="mt-2 flex items-start gap-3">
            <Circle size={8} className="text-error mt-2" />
            <p>
              If you have any questions, please contact our support team first
            </p>
          </div>
        </div>
        <RemoveAccount formAction={formAction} isPending={isDeleting} />
      </Section>
    </>
  );
}
