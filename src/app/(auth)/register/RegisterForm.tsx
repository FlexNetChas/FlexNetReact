"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToasts } from "@/hooks/useToasts";
import { register } from "./actions";

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
    <>
      <div className="px-15 py-5 bg-form/80 rounded-2xl shadow-lg w-full max-w-md">
        <Image
          src="/Logo.svg"
          alt="FlexNet Logo"
          width={120}
          height={120}
          className="mx-auto"
          priority
        />

        <form
          action={registerAction}
          className="flex flex-col gap-4 max-w-[400px] mx-auto"
        >
          <h1 className="text-3xl text-center">Create Account</h1>

          {/* First Name and Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="firstName" className="text-sm font-medium">
                First Name
              </label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="John"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`border rounded-lg p-3 ${
                  hasError("firstName")
                    ? "border-error focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                    : "border-form-foreground "
                } `}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="lastName" className="text-sm font-medium">
                Last Name
              </label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`border rounded-lg p-3 ${
                  hasError("lastName")
                    ? "border-error focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                    : "border-form-foreground "
                } `}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleInputChange}
              className={`border rounded-lg p-3 ${
                hasError("email")
                  ? "border-error focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                  : "border-form-foreground "
              } `}
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className={`border rounded-lg p-3 ${
                hasError("password")
                  ? "border-error focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                  : "border-form-foreground "
              } `}
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium">
              Confirm Password
            </label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={`border rounded-lg p-3 ${
                hasError("confirmPassword")
                  ? "border-error focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                  : "border-form-foreground "
              } `}
              required
            />
          </div>
          <SubmitButton />
        </form>

        <p className="text-xs mt-4 text-center">
          Already have an account? &nbsp;
          <Link href="/login" className="text-xs">
            Sign in here
          </Link>
        </p>
      </div>
    </>
  );
}

// Separate function so we can use useFormStatus hook for accessing pending state
// useFormStatus access the state of form action={registerAction}
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      type="submit"
      size="lg"
      className="glass text-primary-foreground mt-2"
      variant="outline"
      aria-label="Register"
    >
      {pending ? "Creating account..." : "Create Account"}
    </Button>
  );
}

export default RegisterForm;
