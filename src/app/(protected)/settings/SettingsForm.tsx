"use client";

import React, { useState, useEffect } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
      // Auto-hide success message after 5 seconds
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [state]);

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="px-8 py-6 bg-form/80 rounded-2xl w-full max-w-2xl">
        <div className="text-center mb-6">
          <h1 className="text-3xl mb-2">Settings</h1>
          <p className="text-muted-foreground text-sm">
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

        <form
          action={formAction}
          className="flex flex-col gap-4 max-w-xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Age */}
            <div className="space-y-2">
              <label htmlFor="age">Age</label>
              <Input
                id="age"
                name="age"
                type="number"
                min="1"
                max="100"
                placeholder="Enter your age"
                value={formValues.age || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormValues((prev) => ({
                    ...prev,
                    age: value ? parseInt(value, 10) : 0,
                  }));
                }}
                className="border-form-foreground"
              />
              {state?.errors?.age && (
                <p className="text-error text-sm">{state.errors.age[0]}</p>
              )}
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <label htmlFor="gender">Gender</label>
              <Select
                name="gender"
                value={formValues.gender}
                onValueChange={(value) => {
                  setFormValues((prev) => ({
                    ...prev,
                    gender: value,
                  }));
                }}
              >
                <SelectTrigger
                  id="gender"
                  className="border-form-foreground bg-background text-sm h-10"
                >
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent className="min-w-full">
                  <SelectItem value="Man">Man</SelectItem>
                  <SelectItem value="Woman">Woman</SelectItem>
                  <SelectItem value="Prefer not to say">
                    Prefer not to say
                  </SelectItem>
                </SelectContent>
              </Select>
              {state?.errors?.gender && (
                <p className="text-error text-sm">{state.errors.gender[0]}</p>
              )}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-2">
            <label htmlFor="education">Education</label>
            <Select
              name="education"
              value={formValues.education}
              onValueChange={(value) => {
                setFormValues((prev) => ({
                  ...prev,
                  education: value,
                }));
              }}
            >
              <SelectTrigger
                id="education"
                className="border-form-foreground bg-background text-sm h-10"
              >
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent className="min-w-full">
                <SelectItem value="Primary school">Primary school</SelectItem>
                <SelectItem value="High school">High school</SelectItem>
                <SelectItem value="University">University</SelectItem>
                <SelectItem value="Master's degree">Master's degree</SelectItem>
                <SelectItem value="Doctorate">Doctorate</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            {state?.errors?.education && (
              <p className="text-error text-sm">{state.errors.education[0]}</p>
            )}
          </div>

          {/* Purpose */}
          <div className="space-y-2">
            <label htmlFor="purpose">What do you hope to achieve?</label>
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
              className="w-full border border-form-foreground rounded-lg p-3 bg-background text-foreground min-h-[120px] resize-y placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
            {state?.errors?.purpose && (
              <p className="text-error text-sm">{state.errors.purpose[0]}</p>
            )}
          </div>

          <SubmitButton />
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
      className="glass text-primary-foreground mt-2"
      variant="outline"
    >
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}

export default SettingsForm;
