"use server";

import { z } from "zod";
import { userDescriptionService } from "@/lib/api/services/userDescriptionService";
import { cache } from "react";
import { UserDescription, UserDescriptionState } from "@/types/userDescription";
import { userDescriptionSchema } from "@/lib/validations/userDescriptionValidators";
import { extractBackendErrors } from "@/lib/api/errors";

export const getUserDescription = cache(
  async (userId: number): Promise<UserDescription | null> => {
    try {
      return await userDescriptionService.get(userId);
    } catch {
      return null;
    }
  }
);

// Type for field values
type FieldValue = string | number | null | undefined;

// Check if value changed (treats empty string, null, undefined as same)
// Return newValue if changed, otherwise return oldValue
function hasChanged(oldValue: FieldValue, newValue: FieldValue): boolean {
  const validateInput = (inputValue: FieldValue) =>
    inputValue === "" || inputValue === null || inputValue === undefined
      ? null
      : inputValue;
  return validateInput(oldValue) !== validateInput(newValue);
}

// Compare initial data with new data and return only changed fields
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

  /* Validate client input in frontend before sending a API request to backend. This will reduce API calls */
  if (!result.success) {
    return {
      errors: z.flattenError(result.error).fieldErrors,
    };
  }

  const changedFields = getChangedFields(currentData, formDataObject);

  /* If client validation surpasses zod schema. Proceed to login.
   * Backend will validate again, both i application and infrastructure layer */
  try {
    if (Object.keys(changedFields).length === 0) {
      return {
        success: true,
        updatedData: currentData || undefined,
      };
    }

    const updatedFromServer = await userDescriptionService.patch(
      userId,
      changedFields
    );

    return {
      success: true,
      updatedData: updatedFromServer,
    };
  } catch (backendBody: unknown) {
    // If backend returns an error code/message. Pass the error Title and Message to frontend
    const errorMessages = extractBackendErrors(backendBody);
    return { errors: { form: errorMessages } };
  }
}

export async function deleteAccount(id: any): Promise<{
  success?: true;
  errors?: { form: string[] };
}> {
  try {
    // Todo: Delete the user account. Then remove tokens and log out the user

    return { success: true };
  } catch {
    return { errors: { form: ["Server error"] } };
  }
}
