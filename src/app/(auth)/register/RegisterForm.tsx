"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToasts } from "@/hooks/useToasts";
import { register } from "./actions";
import { Label } from "@radix-ui/react-label";
import { Loader2 } from "lucide-react";

function RegisterForm() {
  // Take a server action (register from authActions.ts) and return a action property (registerAction)
  const [state, registerAction] = useActionState(register, undefined);

  // Save clients input data to preserve values after a validation error
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  /* Toast will handle all errors and success messages
   * Thought to further improve UI/UX will we display a red border inline around invalid input fields */
  useToasts(state, {
    successMessage: " Account created successfully! ",
    duration: 5000,
  });

  // Helper function to check if field has error
  const hasError = (fieldName: keyof typeof formData) => {
    if (state?.errors?.[fieldName] && state.errors[fieldName].length > 0) {
      return true;
    } else {
      return false;
    }
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      firstName: prev.firstName,
      lastName: prev.lastName,
      email: prev.email,
      password: prev.password,
      confirmPassword: prev.confirmPassword,
      [name]: value,
    }));
  };

  return (
    /* <Image
          src="/Logo.svg"
          alt="FlexNet Logo"
          width={120}
          height={120}
          className="mx-auto"
          priority
        /> */

    <form action={registerAction} className="space-y-4">
      {/* First Name and Last Name */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="John"
            value={formData.firstName}
            onChange={handleInputChange}
            className={`bg-input rounded-lg border p-3 ${
              hasError("firstName")
                ? "border-error focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none"
                : "border-border"
            } `}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Doe"
            value={formData.lastName}
            onChange={handleInputChange}
            className={`bg-input rounded-lg border p-3 ${
              hasError("lastName")
                ? "border-error focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none"
                : "border-border"
            } `}
            required
          />
        </div>
      </div>
      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="john@example.com"
          value={formData.email}
          onChange={handleInputChange}
          className={`bg-input rounded-lg border p-3 ${
            hasError("email")
              ? "border-error focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none"
              : "border-border"
          } `}
          required
        />
      </div>
      {/* Password */}
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          className={`bg-input rounded-lg border p-3 ${
            hasError("password")
              ? "border-error focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none"
              : "border-border"
          } `}
          required
        />
      </div>
      {/* Confirm Password */}
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          className={`bg-input rounded-lg border p-3 ${
            hasError("confirmPassword")
              ? "border-error focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none"
              : "border-border"
          } `}
          required
        />
      </div>

      <div className="mt-10 flex justify-center">
        <SubmitButton />
      </div>
      <p className="text-center text-sm">
        Already have an account? &nbsp;
        <Link href="/login" className="text-sm">
          Sign in here
        </Link>
      </p>
    </form>
  );
}

{
  /* Separate function so we can use useFormStatus hook for accessing pending state
 useFormStatus access the state of form action={registerAction} */
}
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="default"
      className="w-9/10"
      disabled={pending}
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Creating account...
        </>
      ) : (
        "Create Account"
      )}
    </Button>
  );
}

export default RegisterForm;
