"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { login } from "@/lib/api/actions/authActions";

function LoginForm() {
  // Take a server action (login from authActions.ts) and return a action property (loginAction)
  const [state, loginAction] = useActionState(login, undefined);

  return (
    <>
      <div className="px-6 md:px-8 lg:px-12 py-6 md:py-8 bg-form/80 rounded-2xl shadow-lg w-full max-w-md mx-auto">
        <Image
          src="/Logo.svg"
          alt="FlexNet Logo"
          width={120}
          height={120}
          className="mx-auto w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32"
          priority
        />

        <form
          action={loginAction}
          className="flex flex-col gap-3 md:gap-4 w-full"
        >
          <h1 className="text-2xl md:text-3xl">Login</h1>
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            className="border border-form-foreground rounded-lg p-3 text-sm md:text-base"
          />
          {/* Display form and backend http errors */}
          {state?.errors?.form && (
            <p className="text-red-600 text-sm">{state.errors.form[0]}</p>
          )}

          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            className="border border-form-foreground rounded-lg p-3 text-sm md:text-base"
          />
          {/* Display form and backend http errors */}
          {state?.errors?.password && (
            <p className="text-red-500 text-sm">{state.errors.password}</p>
          )}
          <SubmitButton />
        </form>
        <p className="text-xs md:text-sm mt-4 text-center">
          Don&apos;t have an account yet? &nbsp;
          <Link href="/register" className="text-xs md:text-sm">
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
