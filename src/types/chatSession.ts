import { ChatMessageResponseDto } from "./chatMessage";

export type CompactChatSessionResponseDto = {
  id: number;
  summary: string | null;
  startedTime: string;
  endedTime: string | null;
  hasBeenDeleted?: boolean;
};

export type CompleteChatSessionResponseDto = {
  id: number;
  userId: number;
  summary: string | null;
  startedTime: string;
  endedTime: string | null;
  chatMessages: ChatMessageResponseDto[];
};

export type CreateChatSessionRequestDto = {
  summary: string | null;
  startedTime: string;
  endedTime: string | null;
  chatMessages: ChatMessageResponseDto[];
};

export type UpdateChatSessionsRequestDto = {
  sessionId: number;
  summary?: string | null;
  startedTime: string;
  endedTime?: string | null;
  chatMessages: ChatMessageResponseDto[];
};
