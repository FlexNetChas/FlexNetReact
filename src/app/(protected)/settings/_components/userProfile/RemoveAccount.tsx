"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DeleteAccountDialogProps {
  formAction: (formData: FormData) => void;
  isPending?: boolean;
}

export function RemoveAccount({ formAction }: DeleteAccountDialogProps) {
  const [confirmText, setConfirmText] = useState("");
  const isConfirmValid = confirmText.toLowerCase() === "delete";

  return (
    <form action={formAction} className=" space-y-8">
      <label>
        To confirm, type <span className="font-bold text-red-500">DELETE</span>{" "}
        below:
      </label>
      <Input
        type="text"
        value={confirmText}
        onChange={(e) => setConfirmText(e.target.value)}
        className="w-full border rounded-lg p-2 bg-[#1c2433] border-form-foreground mt-2"
        autoComplete="off"
      />
      <DeleteButton disabled={!isConfirmValid} />
    </form>
  );
}

interface DeleteButtonProps {
  disabled: boolean;
  isPending?: boolean;
}

function DeleteButton({ disabled, isPending }: DeleteButtonProps) {
  const { pending } = useFormStatus();
  const isLoading = pending || isPending;

  return (
    <Button
      type="submit"
      disabled={disabled || isLoading}
      className="mb-2 font-mono disabled:opacity-50"
      variant="default"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 size-4 animate-spin" />
          Deleting...
        </>
      ) : (
        "Delete"
      )}
    </Button>
  );
}
