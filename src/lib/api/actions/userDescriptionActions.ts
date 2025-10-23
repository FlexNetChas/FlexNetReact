"use server";

import { z } from "zod";
import { userDescriptionService } from "@/lib/api/services/userDescriptionService";
import { cache } from "react";
import { UserDescription, UserDescriptionState } from "@/types/userDescription";

// Validation schema
// Todo: Eveything is optional for now. Match backend validation rules later
const userDescriptionSchema = z.object({
  // Dropdown/select fields
  gender: z.string().optional(),
  education: z.string().optional(),
  // Text input fields
  age: z.coerce.number().optional(),
  purpose: z.string().optional(),
});

export const getUserDescription = cache(
  async (userId: number): Promise<UserDescription | null> => {
    try {
      return await userDescriptionService.get(userId);
    } catch (error) {
      return null;
    }
  }
);

// Check if value changed (treats empty string, null, undefined as same)
// Return newValue if changed, otherwise return oldValue
function hasChanged(oldValue: any, newValue: any): boolean {
  const validateInput = (inputValue: any) =>
    inputValue === "" || inputValue === null || inputValue === undefined
      ? null
      : inputValue;
  return validateInput(oldValue) !== validateInput(newValue);
}

// ompare initial data with new data and return only changed fields
function getChangedFields(
  initialData: UserDescription | null,
  newData: Partial<UserDescription>
): Partial<UserDescription> {
  const changes: Partial<UserDescription> = {};

  if (!initialData) {
    return newData;
  }

  if (newData.age !== undefined && hasChanged(initialData.age, newData.age)) {
    changes.age = newData.age;
  }

  if (
    newData.gender !== undefined &&
    hasChanged(initialData.gender, newData.gender)
  ) {
    changes.gender = newData.gender || null;
  }

  if (
    newData.education !== undefined &&
    hasChanged(initialData.education, newData.education)
  ) {
    changes.education = newData.education;
  }

  if (
    newData.purpose !== undefined &&
    hasChanged(initialData.purpose, newData.purpose)
  ) {
    changes.purpose = newData.purpose;
  }

  return changes;
}

export async function patchUserDescription(
  userId: number,
  currentData: UserDescription | null,
  _prevState: UserDescriptionState | undefined,
  formData: FormData
): Promise<UserDescriptionState> {
  const formDataObject = Object.fromEntries(formData);
  const result = userDescriptionSchema.safeParse(formDataObject);

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors as {
        age?: string[];
        gender?: string[];
        education?: string[];
        purpose?: string[];
      },
      success: false,
    };
  }

  const changedFields = getChangedFields(currentData, result.data);

  try {
    // If nothing changed, return current data
    if (Object.keys(changedFields).length === 0) {
      return {
        success: true,
        updatedData: currentData || undefined,
      };
    }

    // Send only changed fields to backend
    const updatedFromServer = await userDescriptionService.patch(
      userId,
      changedFields
    );

    return {
      success: true,
      updatedData: updatedFromServer,
    };
  } catch (error: unknown) {
    return {
      errors: {
        form: ["Could not save your changes. Please try again."],
      },
      success: false,
    };
  }
}
