"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CheckCircle, Mail, Check } from "lucide-react";

function RegistrationSuccessPage() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <div className="border-border w-full max-w-md rounded-sm border-2 p-8 text-center">
        {/* Success Icon */}
        <div className="mb-6">
          <CheckCircle className="mx-auto size-13 text-green-500" />
        </div>

        {/* Logo */}
        <Image
          src="/Logo.svg"
          alt="FlexNet Logo"
          width={80}
          height={80}
          className="mx-auto mb-6"
          priority
        />

        {/* Success Message */}
        <div className="mb-8">
          <h1 className="mb-2 text-2xl font-bold">Registration Successful!</h1>
          <p className="text-muted-foreground text-sm">
            Welcome to FlexNet! Your account has been created successfully.
          </p>
        </div>

        {/* Success Details */}
        <div className="bg-background mb-6 rounded-lg p-4 text-left">
          <h3 className="mb-3 font-medium">What&apos;s Next?</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <Check className="mr-3 size-4 text-green-500" />
              <span className="text-muted-foreground text-sm">
                Account created successfully
              </span>
            </div>
            <div className="flex items-center">
              <Check className="mr-3 size-4 text-green-500" />
              <span className="text-muted-foreground text-sm">
                You&apos;re automatically logged in
              </span>
            </div>
            <div className="flex items-center">
              <Mail className="text-primary mr-3 size-4" />
              <span className="text-muted-foreground text-sm">
                Check your email for verification
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button asChild variant="default" className="w-full">
            <Link href="/settings">Update Profile</Link>
          </Button>

          <Button asChild variant="default" className="w-full">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>

        {/* Additional Info */}
        <p className="text-muted-foreground mt-6 text-xs">
          You can now log in with your credentials to access all features.
        </p>
      </div>
    </div>
  );
}

export default RegistrationSuccessPage;
