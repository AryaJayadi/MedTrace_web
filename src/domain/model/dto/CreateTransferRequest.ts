export interface CreateTransferRequest {
  DrugsID: string[];
  ReceiverID: string;
  TransferDate?: string; // Corresponds to *time.Time
} 