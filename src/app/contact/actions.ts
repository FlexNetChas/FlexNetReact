"use server";

import { z } from "zod";

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z
    .string()
    .min(3, "Subject must be at least 3 characters")
    .max(200, "Subject must be less than 200 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters"),
});

interface ContactFormState {
  errors?: {
    name?: string[];
    email?: string[];
    subject?: string[];
    message?: string[];
    form?: string[];
  };
  success?: boolean;
}

export async function submitContact(
  prevState: ContactFormState | undefined,
  formData: FormData
): Promise<ContactFormState> {
  const result = contactSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: z.flattenError(result.error).fieldErrors,
      success: false,
    };
  }

  try {
    
    console.log("Contact form submission:", result.data);

    return {
      success: true,
    };
  } catch (error) {
    return {
      errors: {
        form: ["Failed to send message. Please try again later."],
      },
      success: false,
    };
  }
}

