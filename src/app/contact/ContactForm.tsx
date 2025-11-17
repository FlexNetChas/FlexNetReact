"use client";

import React, { useState } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { submitContact } from "@/app/contact/actions";
import { useToasts } from "@/hooks/useToasts";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

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

function ContactForm() {
  const [state, submitAction] = useActionState(submitContact, undefined);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useToasts(state, {
    successMessage: "Message sent successfully! We'll get back to you soon.",
    duration: 5000,
  });

  const hasError = (fieldName: keyof typeof formData) => {
    if (state?.errors?.[fieldName] && state.errors[fieldName]!.length > 0) {
      return true;
    }
    return false;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  React.useEffect(() => {
    if (state?.success) {
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }
  }, [state?.success]);

  return (
    <form action={submitAction} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="name" className="text-sm">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={handleInputChange}
            className={`bg-input rounded-lg border p-2 text-sm ${
              hasError("name")
                ? "border-error focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none"
                : "border-border"
            }`}
            required
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-sm">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="put.email@example.com"
            value={formData.email}
            onChange={handleInputChange}
            className={`bg-input rounded-lg border p-2 text-sm ${
              hasError("email")
                ? "border-error focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none"
                : "border-border"
            }`}
            required
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="subject" className="text-sm">Subject</Label>
        <Input
          id="subject"
          name="subject"
          type="text"
          placeholder="What is this regarding?"
          value={formData.subject}
          onChange={handleInputChange}
          className={`bg-input rounded-lg border p-2 text-sm ${
            hasError("subject")
              ? "border-error focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none"
              : "border-border"
          }`}
          required
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="message" className="text-sm">Message</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us more about your inquiry..."
          value={formData.message}
          onChange={handleInputChange}
          rows={4}
          className={`bg-input rounded-lg border p-2 text-sm resize-none ${
            hasError("message")
              ? "border-error focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none"
              : "border-border"
          }`}
          required
        />
      </div>

      <div className="flex justify-center pt-2">
        <SubmitButton />
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant="default"
      className="w-9/10"
      disabled={pending}
      aria-label="Send message"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 size-4 animate-spin" />
          Sending...
        </>
      ) : (
        "Send Message"
      )}
    </Button>
  );
}

export default ContactForm;

