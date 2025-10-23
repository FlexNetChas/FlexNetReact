"use client";

import React, { useState, useEffect } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { patchUserDescription } from "@/lib/api/actions/userDescriptionActions";
import type {
  UserDescriptionState,
  UserDescription,
} from "@/types/userDescription";
import { CircleCheck, CircleX } from "lucide-react";

interface SettingsFormProps {
  userId: number;
  initialData: UserDescription | null;
}

// Convert null value to strings to avoid select/dropdown not recognizing null values
function normalizeFormValue(value: string | null | undefined): string {
  return value ?? "";
}

function SettingsForm({ userId, initialData }: SettingsFormProps) {
  const [currentSavedData, setCurrentSavedData] =
    useState<UserDescription | null>(initialData);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form field values
  const [formValues, setFormValues] = useState({
    age: initialData?.age ?? 0,
    gender: normalizeFormValue(initialData?.gender),
    education: normalizeFormValue(initialData?.education),
    purpose: normalizeFormValue(initialData?.purpose),
  });

  // Handle form submission - ONLY call server action, don't update state here
  // Updating states here would cause double renders, race conditions ect
  const [state, formAction] = useActionState(
    async (
      prevState: UserDescriptionState,
      formData: FormData
    ): Promise<UserDescriptionState> => {
      return await patchUserDescription(
        userId,
        currentSavedData,
        prevState,
        formData
      );
    },
    { success: false }
  );

  // Update states after server action is sucess and only when action state changes
  // UseEffect will run whenever 'state' from useActionState changes
  useEffect(() => {
    if (state?.success && state.updatedData) {
      setCurrentSavedData(state.updatedData);
      setFormValues({
        age: state.updatedData.age ?? 0,
        gender: normalizeFormValue(state.updatedData.gender),
        education: normalizeFormValue(state.updatedData.education),
        purpose: normalizeFormValue(state.updatedData.purpose),
      });

      setSuccessMessage("Your settings have been updated successfully!");
      // Auto-hide success message after 3 seconds
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [state]);

  return (
    <div className="flex items-center justify-center mt-20 px-4">
      <div className="px-8 py-6 bg-form/80 rounded-2xl w-full max-w-2xl">
        <div className="text-center mb-6">
          <h1 className="text-4xl mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Help us personalize your experience by telling us a bit about
            yourself. All fields are optional
          </p>
        </div>

        {/* Success message */}
        {successMessage && (
          <div className="p-2 rounded-lg">
            <p className="text-center flex items-center justify-center gap-2 font-semibold">
              <CircleCheck className="text-green-500 w-5 h-5" />
              {successMessage}
            </p>
          </div>
        )}

        {/* Error message */}
        {state?.errors?.form && (
          <div className="p-2 rounded-lg">
            <p className="text-center flex items-center justify-center gap-2 font-semibold">
              <CircleX className="text-red-500 w-5 h-5" />
              {state.errors.form[0]}
            </p>
          </div>
        )}

        <form action={formAction} className="max-w-xl mx-auto space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Age */}
            <div className="space-y-2 p-2">
              <label htmlFor="age" className="text-sm font-medium">
                Age
              </label>
              <Input
                id="age"
                name="age"
                type="number"
                min="1"
                max="100"
                value={formValues.age || ""}
                // Get new value (string) and convert input to a integer. Default to 0 if empty
                onChange={(e) => {
                  const value = e.target.value;
                  setFormValues((prev) => ({
                    ...prev,
                    age: value ? parseInt(value, 10) : 0,
                  }));
                }}
                className="border border-form-foreground rounded-lg p-3"
              />
              {state?.errors?.age && (
                <p className="text-error text-sm">{state.errors.age[0]}</p>
              )}
            </div>

            {/* Gender */}
            <div className="space-y-2 p-2">
              <label htmlFor="gender" className="text-sm font-medium">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formValues.gender}
                onChange={(e) => {
                  setFormValues((prev) => ({
                    ...prev,
                    gender: e.target.value,
                  }));
                }}
                className="w-full border border-form-foreground rounded-lg p-3 bg-background text-foreground"
              >
                <option value="">Select gender</option>
                <option value="Man">Man</option>
                <option value="Woman">Woman</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
              {state?.errors?.gender && (
                <p className="text-error text-sm">{state.errors.gender[0]}</p>
              )}
            </div>

            {/* Education */}
            <div className="space-y-2 p-2 mb-4">
              <label htmlFor="education" className="text-sm font-medium">
                Education
              </label>
              <select
                id="education"
                name="education"
                value={formValues.education}
                onChange={(e) => {
                  setFormValues((prev) => ({
                    ...prev,
                    education: e.target.value,
                  }));
                }}
                className="w-full border border-form-foreground rounded-lg p-3 bg-background text-foreground"
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
            <label htmlFor="purpose" className="text-sm font-medium">
              What do you hope to achieve?
            </label>
            <textarea
              id="purpose"
              name="purpose"
              value={formValues.purpose}
              onChange={(e) => {
                setFormValues((prev) => ({
                  ...prev,
                  purpose: e.target.value,
                }));
              }}
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

// Submit button component
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
