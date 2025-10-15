"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { register } from "@/lib/api/actions/authActions";

function RegisterForm() {
  // Take a server action (register from authActions.ts) and return a action property (registerAction)
  const [state, registerAction] = useActionState(register, undefined);

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
                className="border border-form-foreground rounded-lg p-3"
                required
              />
              {state?.errors?.firstName && (
                <p className="text-red-600 text-sm">{state.errors.firstName[0]}</p>
              )}
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
                className="border border-form-foreground rounded-lg p-3"
                required
              />
              {state?.errors?.lastName && (
                <p className="text-red-600 text-sm">{state.errors.lastName[0]}</p>
              )}
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
              className="border border-form-foreground rounded-lg p-3"
              required
            />
            {state?.errors?.email && (
              <p className="text-red-600 text-sm">{state.errors.email[0]}</p>
            )}
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
              className="border border-form-foreground rounded-lg p-3"
              required
            />
            {state?.errors?.password && (
              <p className="text-red-600 text-sm">{state.errors.password[0]}</p>
            )}
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
              className="border border-form-foreground rounded-lg p-3"
              required
            />
            {state?.errors?.confirmPassword && (
              <p className="text-red-600 text-sm">{state.errors.confirmPassword[0]}</p>
            )}
          </div>

          {/* Display form and backend http errors */}
          {state?.errors?.form && (
            <p className="text-red-600 text-sm text-center">{state.errors.form[0]}</p>
          )}

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
