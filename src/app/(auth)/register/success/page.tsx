"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CheckCircle, Mail, User, ArrowRight, Check } from "lucide-react";

function RegistrationSuccessPage() {
  return (
    <div className="min-h-screen bg-[#0a1628] flex items-center justify-center p-4">
      <div className="w-full max-w-md border-2 border-cyan-400 p-8 rounded-sm text-center">
        {/* Success Icon */}
        <div className="mb-6">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
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
          <h1 className="text-2xl font-bold text-white mb-2">
            Registration Successful!
          </h1>
          <p className="text-gray-400 text-sm">
            Welcome to FlexNet! Your account has been created successfully.
          </p>
        </div>

        {/* Success Details */}
        <div className="bg-[#1a2332] rounded-lg p-4 mb-6 text-left">
          <h3 className="text-white font-medium mb-3">What's Next?</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <Check className="w-4 h-4 text-green-500 mr-3" />
              <span className="text-gray-300 text-sm">Account created successfully</span>
            </div>
            <div className="flex items-center">
              <Check className="w-4 h-4 text-green-500 mr-3" />
              <span className="text-gray-300 text-sm">You're automatically logged in</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-4 h-4 text-cyan-400 mr-3" />
              <span className="text-gray-300 text-sm">Check your email for verification</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            asChild
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
          >
            <Link href="/dashboard">
              Go to Dashboard
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          
          <Button
            asChild
            variant="outline"
            className="w-full border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white"
          >
            <Link href="/">
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Additional Info */}
        <p className="text-xs text-gray-500 mt-6">
          You can now log in with your credentials to access all features.
        </p>
      </div>
    </div>
  );
}

export default RegistrationSuccessPage;
