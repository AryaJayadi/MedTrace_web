import { BaseValueResponse } from "@/domain/model/response/BaseValueResponse";

export interface LedgerDataSource {
  initLedger(): Promise<BaseValueResponse<string>>; // Assuming a simple string message on success
} 