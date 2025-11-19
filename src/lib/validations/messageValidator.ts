import { Input } from "@/components/ui/input";
import { z } from "zod";

export const messageSchema = z.object({
  message: z.string().max(1000, "Message cannot exceed 1000 characters"),
});

export type MessageInput = z.infer<typeof messageSchema>;
