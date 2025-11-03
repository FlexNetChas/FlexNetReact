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
import { patchUserDescription } from "@/app/(protected)/settings/_components/user-description/actions";
import type {
  UserDescriptionState,
  UserDescription,
} from "@/types/userDescription";
import { useToasts } from "@/hooks/useToasts";

interface UserDescriptionFormProps {
  userId: number;
  initialData: UserDescription | null;
}

// Convert null value to strings to avoid select/dropdown not recognizing null values
function normalizeFormValue(value: string | null | undefined): string {
  return value ?? "";
}

export function UserDescriptionForm({
  userId,
  initialData,
}: UserDescriptionFormProps) {
  const [currentSavedData, setCurrentSavedData] =
    useState<UserDescription | null>(initialData);

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

  // Use generic toast hook instead of inline success message
  useToasts(state, {
    successMessage: "Your settings have been updated successfully!",
    duration: 5000,
  });

  // Helper function to check if field has error
  const hasError = (fieldName: keyof typeof formValues) => {
    if (state?.errors?.[fieldName] && state.errors[fieldName].length > 0) {
      return true;
    } else {
      return false;
    }
  };

  // Update states after server action is success and only when action state changes
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
    }
  }, [state]);

  return (
    <div className="px-8 py-6 bg-form/80 rounded-2xl w-full max-w-2xl">
      <div className="text-center mb-6">
        <h1 className="text-3xl mb-2">Settings</h1>
        <p className="text-muted-foreground text-sm">
          Help us personalize your experience by telling us a bit about
          yourself. All fields are optional
        </p>
      </div>

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
              className={`${
                hasError("age")
                  ? "border-error focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                  : "border-form-foreground"
              }`}
            />
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
                className={`bg-background text-sm h-10 ${
                  hasError("gender")
                    ? "border-error focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                    : "border-form-foreground"
                }`}
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
              className={`bg-background text-sm h-10 ${
                hasError("education")
                  ? "border-error focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                  : "border-form-foreground"
              }`}
            >
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent className="min-w-full">
              <SelectItem value="Primary school">Primary school</SelectItem>
              <SelectItem value="High school">High school</SelectItem>
              <SelectItem value="University">University</SelectItem>
              <SelectItem value="Master's degree">
                Master&apos;s degree
              </SelectItem>
              <SelectItem value="Doctorate">Doctorate</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
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
            className={`w-full border rounded-lg p-3 bg-background text-foreground min-h-[120px] resize-y placeholder:text-muted-foreground ${
              hasError("purpose")
                ? "border-error focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                : "border-form-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            }`}
          />
        </div>

        <SubmitButton />
      </form>
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
