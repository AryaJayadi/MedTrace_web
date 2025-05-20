export interface UpdateBatchRequest {
  DrugName: string;
  ExpiryDate: string; // string to match Batch model and Go's time.Time
  ID: string;
  ProductionDate: string; // string to match Batch model and Go's time.Time
} 