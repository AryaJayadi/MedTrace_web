export interface Drug {
  ID: string;
  BatchID: string;
  OwnerID: string;
  Location: string;
  isTransferred: boolean;
  TransferID?: string;
}
