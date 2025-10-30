import { ChatMessageResponseDto } from "./chatMessage";

export type CompactChatSessionResponseDto = {
  id: number;
  summary: string | null;
  startedTime: string;
  endedTime: string | null;
};

export type CompleteChatSessionResponseDto = {
  id: number;
  userId: number;
  summary: string | null;
  startedTime: Date;
  endedTime: Date | null;
  chatMessages: ChatMessageResponseDto[];
};

export type CreateChatSessionRequestDto = {
  summary: string | null;
  startedTime: Date;
  endedTime: Date | null;
  chatMessages: ChatMessageResponseDto[];
};

export type UpdateChatSessionsRequestDto = {
  sessionId: number;
  summary?: string | null;
  startedTime: Date;
  endedTime?: Date | null;
  chatMessages: ChatMessageResponseDto[];
};
