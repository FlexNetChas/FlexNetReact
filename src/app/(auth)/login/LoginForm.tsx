"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { login } from "@/app/(auth)/login/actions";
import { useToasts } from "@/hooks/useToasts";
import { Input } from "@/components/ui/input";

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
      <div className="px-15 py-5 bg-form/80 rounded-2xl shadow-lg w-full max-w-md mx-auto mt-20">
        <Image
          src="/Logo.svg"
          alt="FlexNet Logo"
          width={120}
          height={120}
          className="mx-auto"
          priority
        />
        <form
          action={loginAction}
          className="flex flex-col gap-2 max-w-[300px]"
        >
          <h1 className="text-3xl">Login</h1>
          <label htmlFor="email">Email</label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className={`border rounded-lg p-3 ${
              hasError("email")
                ? "border-error focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                : "border-form-foreground "
            } `}
            required
          />

          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <input
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
          <SubmitButton />
        </form>
        <p className="text-xs mt-4">
          Don&apos;t have an account yet? &nbsp;
          <Link href="/register" className="text-xs">
            Register for free
          </Link>
        </p>
      </div>
    </>
  );
}

// Seperate function so we can use useFormStatus hook for accessing pending state
// useFormStatus access the state of form action={loginAction}
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      type="submit"
      size="lg"
      className="glass text-primary-foreground mt-2"
      variant="outline"
      aria-label="Login"
    >
      {pending ? "Signing in..." : "Sign in"}
    </Button>
  );
}

export default LoginForm;
