"use client";

import React, { useState } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { patchUserDescription } from "@/lib/api/actions/userDescriptionActions";
import type { UserDescriptionState } from "@/types/userDescription";
import { UserDescription } from "@/types/userDescription";

interface SettingsFormProps {
  userId: number;
  initialData: UserDescription | null;
}

function SettingsForm({ userId, initialData }: SettingsFormProps) {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [state, formAction] = useActionState<
    UserDescriptionState | undefined,
    FormData
  >(async (prevState, formData) => {
    const result = await patchUserDescription(userId, prevState, formData);
    if (result?.success) {
      setSuccessMessage("Dina inställningar har uppdaterats!");
      setTimeout(() => setSuccessMessage(null), 5000);
    }
    return result;
  }, undefined);

  return (
    <div className="flex items-center justify-center mt-20 px-4">
      <div className="px-8 py-6 bg-form/80 rounded-2xl w-full max-w-2xl">
        <div className="text-center mb-6">
          <h1 className="text-4xl mb-2">Settings </h1>
          <p className="text-muted-foreground">
            Help us personalize your experience by telling us a bit about
            yourself
          </p>
        </div>

        {successMessage && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg">
            <p className="text-green-400 text-center">{successMessage}</p>
          </div>
        )}

        <form action={formAction} className="max-w-xl mx-auto space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Age */}
            <div className="space-y-2 p-2">
              <label htmlFor="age">Age</label>
              <Input
                id="age"
                name="age"
                type="number"
                className="border border-form-foreground rounded-lg p-3"
              />
              {state?.errors?.age && (
                <p className="text-error text-sm">{state.errors.age[0]}</p>
              )}
            </div>

            {/* Gender */}
            <div className="space-y-2 p-2">
              <label htmlFor="gender">Gender (optional)</label>
              <select
                id="gender"
                name="gender"
                className="w-full border border-form-foreground rounded-lg p-3 bg-background text-foreground"
                defaultValue=""
              >
                <option value="">Select gender</option>
                <option value="Man">Man</option>
                <option value="Woman">Woman</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>

            {/* Education */}
            <div className="space-y-2 p-2 mb-4">
              <label htmlFor="education">Education</label>
              <select
                id="education"
                name="education"
                className="w-full border border-form-foreground rounded-lg p-3 bg-background text-foreground"
                defaultValue=""
              >
                <option value="">Select level</option>
                <option value="Primary school">Primary school</option>
                <option value="High school">High school</option>
                <option value="University">University</option>
                <option value="Master's degree">Master's degree</option>
                <option value="Doctorate">Doctorate</option>
                <option value="Other">Other</option>
              </select>
              {state?.errors?.education && (
                <p className="text-error text-sm">
                  {state.errors.education[0]}
                </p>
              )}
            </div>
          </div>

          {/* Purpose */}
          <div className="space-y-2 p-2">
            <label htmlFor="purpose">What do you hope to achieve?</label>
            <textarea
              id="purpose"
              name="purpose"
              placeholder="E.g. I want guidance on choosing the right educational path"
              className="w-full border border-form-foreground rounded-lg p-3 bg-background text-foreground min-h-[120px] resize-y"
            />
            {state?.errors?.purpose && (
              <p className="text-error text-sm">{state.errors.purpose[0]}</p>
            )}
          </div>
          <div className="flex mt-4">
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      type="submit"
      size="lg"
      className="glass text-primary-foreground flex-1"
      variant="outline"
    >
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}

export default SettingsForm;
