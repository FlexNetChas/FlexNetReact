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
import { Label } from "@radix-ui/react-label";

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
    <form action={formAction} className="space-y-5">
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Age */}
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
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
              className={`bg-input rounded-lg w-full h-10 mt-2  ${
                hasError("age")
                  ? "border-error focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none"
                  : "border-border"
              }`}
            />
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
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
                className={`bg-input rounded-lg w-full h-10 mt-2  ${
                  hasError("gender")
                    ? "border-error focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none"
                    : "border-border"
                }`}
              >
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent className="min-w-full bg-secondary">
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
            <Label htmlFor="education">Education</Label>
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
                className={`bg-input rounded-lg w-full h-10 mt-2  ${
                  hasError("education")
                    ? "border-error focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none"
                    : "border-border"
                }`}
              >
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent className="min-w-full bg-secondary">
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
        <div className="space-y-2 relative">
          <Label htmlFor="purpose">What do you hope to achieve?</Label>
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
            className={`bg-input rounded-lg w-full h-10 mt-2 resize-y p-2 ${
              hasError("purpose")
                ? "border-error focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none"
                : "border-border"
            }`}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();

                const form = e.currentTarget.form;
                if (form && form.reportValidity()) {
                  form.requestSubmit();
                }
              }
            }}
          />
          {/* Character counter */}
          <span
            className={`absolute bottom-0 right-3 text-xs ${
              formValues.purpose.length > 50
                ? "text-error font-semibold"
                : "text-muted-foreground"
            }`}
          >
            {formValues.purpose.length}/50
          </span>

          {formValues.purpose.length > 50 && (
            <p className="text-error text-xs mt-1">Max characters reached</p>
          )}
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
      className="w-2/10 "
    >
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}
