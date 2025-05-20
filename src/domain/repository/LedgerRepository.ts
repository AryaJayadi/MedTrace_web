import { BaseValueResponse } from "../model/response/BaseValueResponse";

export interface LedgerRepository {
  initLedger(): Promise<BaseValueResponse<string>>;
} 