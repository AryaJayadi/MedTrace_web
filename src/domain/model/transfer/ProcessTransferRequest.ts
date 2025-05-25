export interface ProcessTransferRequest {
  transferID: string;
  ReceiveDate?: string; // Corresponds to *time.Time
} 