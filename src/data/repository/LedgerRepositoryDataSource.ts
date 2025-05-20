import { LedgerRepository } from "@/domain/repository/LedgerRepository";
import { BaseValueResponse } from "@/domain/model/response/BaseValueResponse";
import { LedgerApiDataSource } from "../datasource/api/LedgerApiDataSource"; // Adjust path if needed

export class LedgerRepositoryDataSource implements LedgerRepository {
  constructor(private readonly ledgerApiDataSource: LedgerApiDataSource) {}

  async initLedger(): Promise<BaseValueResponse<string>> {
    return this.ledgerApiDataSource.initLedger();
  }
} 