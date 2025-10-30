export type ChatMessageRequestDto = {
  messageText: string;
  sender: string;
  timeStamp: Date;
  lastUpdated: Date | null;
};
export type ChatMessageResponseDto = {
  id: number;
  sender: string;
  messageText: string;
  timeStamp: Date;
  lastUpdated: Date | null;
};
