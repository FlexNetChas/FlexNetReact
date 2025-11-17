"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { login } from "@/app/(auth)/login/actions";
import { useToasts } from "@/hooks/useToasts";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

function LoginForm() {
  // Take a server action (login from authActions.ts) and return a action property (loginAction)
  const [state, loginAction] = useActionState(login, undefined);

  // Save clients input data to preserve values after a validation error
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      email: prev.email,
      password: prev.password,
      [name]: value,
    }));
  };

  return (
    <>
      {/* <Image
          src="/Logo.svg"
          alt="FlexNet Logo"
          width={120}
          height={120}
          className="mx-auto"
          priority
        /> */}

      <form action={loginAction} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="email"
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
        {/* Row 2. Password */}
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
        <div className="flex justify-center">
          <SubmitButton />
        </div>
      </form>
      <p className="mt-4 text-center text-sm ">
        Don&apos;t have an account yet?
        <br />
        <Link href="/register" className="text-sm">
          Register for free
        </Link>
      </p>
    </>
  );
}

// Seperate function so we can use useFormStatus hook for accessing pending state
// useFormStatus access the state of form action={loginAction}
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant="default"
      className="w-9/10"
      disabled={pending}
      aria-label="Login"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 size-4 animate-spin" />
          Signing in...
        </>
      ) : (
        "Sign In"
      )}
    </Button>
  );
}

export default LoginForm;
