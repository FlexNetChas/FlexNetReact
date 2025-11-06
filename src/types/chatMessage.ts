export type ChatMessageRequestDto = {
  messageText: string;
  role: string;
  timeStamp: Date;
  lastUpdated: Date | null;
};
export type ChatMessageResponseDto = {
  id?: number;
  role: string;
  messageText: string;
  timeStamp: Date;
  lastUpdated: Date | null;
};
