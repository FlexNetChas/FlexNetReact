"use client";

import React, { useState, useEffect, useRef } from "react";
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
import { patchUserDescription } from "@/app/(protected)/settings/actions";
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

  // Ref for textarea to adjust height dynamically
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  // Auto-resize textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = Math.max(textarea.scrollHeight, 40) + "px";
    }
  }, [formValues.purpose]);

  return (
    <form action={formAction} className="space-y-6">
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              className={`mt-2 w-full bg-[#1c2433] h-10 ${
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
                className={`mt-2 w-full bg-[#1c2433] h-10 ${
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
                className={`mt-2 w-full bg-[#1c2433] h-10 ${
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
        </div>

        {/* Purpose */}
        <div className="space-y-2">
          <label htmlFor="purpose">What do you hope to achieve?</label>
          <textarea
            ref={textareaRef}
            id="purpose"
            name="purpose"
            value={formValues.purpose}
            onChange={(e) => {
              setFormValues((prev) => ({
                ...prev,
                purpose: e.target.value,
              }));
            }}
            placeholder="I want guidance on choosing the right educational path"
            className={`mt-2 w-full border rounded-lg p-2 bg-[#1c2433] resize-y  ${
              hasError("purpose")
                ? "border-error focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                : "border-form-foreground"
            }`}
          />
        </div>
      </div>
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      type="submit"
      variant="default"
      className="w-2/10 mb-2 font-mono"
    >
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}
