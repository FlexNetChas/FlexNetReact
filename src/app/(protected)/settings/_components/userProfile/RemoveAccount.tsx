"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

interface DeleteAccountDialogProps {
  formAction: (formData: FormData) => void;
  isPending?: boolean;
}

export function RemoveAccount({ formAction }: DeleteAccountDialogProps) {
  const [confirmText, setConfirmText] = useState("");
  const isConfirmValid = confirmText.toLowerCase() === "delete";

  return (
    <form action={formAction} className="space-y-5">
      <Label>
        To confirm, type <span className="text-error font-bold">DELETE</span>
        &nbsp;below:
      </Label>
      <Input
        type="text"
        value={confirmText}
        onChange={(e) => setConfirmText(e.target.value)}
        className="bg-input border-border rounded-lg border p-3"
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
      variant="destructive"
      className="w-2/6 disabled:opacity-20"
      disabled={isLoading || disabled}
    >
      {pending ? (
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
