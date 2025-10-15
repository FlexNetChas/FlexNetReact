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
      <div className="px-15 py-5 bg-form/80 rounded-2xl shadow-lg w-full ">
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
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            className="border border-form-foreground rounded-lg p-3"
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
            className="border border-form-foreground rounded-lg p-3"
          />
          {/* Display form and backend http errors */}
          {state?.errors?.password && (
            <p className=" text-red-500">{state.errors.password}</p>
          )}
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
