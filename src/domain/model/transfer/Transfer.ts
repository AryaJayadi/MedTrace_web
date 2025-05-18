export interface Transfer {
  ID: string;
  isAccepted: boolean;
  ReceiveDate?: string;
  ReceiverID: string;
  SenderID: string;
  TransferDate?: string;
}
