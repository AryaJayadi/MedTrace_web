export interface Drug {
  ID: string;
  BatchID: string;
  OwnerID: string;
  isTransferred: boolean;
  TransferID?: string;
}
