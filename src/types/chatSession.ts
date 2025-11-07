import { ChatMessageResponseDto } from "./chatMessage";

export type CompactChatSessionResponseDto = {
  Id: number;
  Summary: string | null;
  StartedTime: Date;
  EndedTime: Date | null;
};

export type CompleteChatSessionResponseDto = {
  Id: number;
  UserId: number;
  Summary: string | null;
  StartedTime: Date;
  EndedTime: Date | null;
  ChatMessages: ChatMessageResponseDto[];
};

export type CreateChatSessionRequestDto = {
  Summary: string | null;
  StartedTime: Date;
  EndedTime: Date | null;
  ChatMessages: ChatMessageResponseDto[];
};

export type UpdateChatSessionsRequestDto = {
  SessionID: number;
  Summary?: string | null;
  StartedTime: Date;
  EndedTime?: Date | null;
  ChatMessages: ChatMessageResponseDto[];
};
