export type ChatMessageRequestDto = {
  MessageText: string;
  TimeStamp: Date;
  LastUpdated: Date | null;
};
export type ChatMessageResponseDto = {
  Id: number;
  MessageText: string;
  TimeStamp: Date;
  LastUpdated: Date | null;
};
