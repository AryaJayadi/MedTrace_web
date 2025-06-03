import { LedgerRepository } from "@/domain/repository/LedgerRepository";
import { BaseValueResponse } from "@/domain/model/response/BaseValueResponse";
import { LedgerDataSource } from "../datasource/LedgerDataSource";

export class LedgerRepositoryDataSource implements LedgerRepository {
  constructor(private readonly ledgerApiDataSource: LedgerDataSource) { }

  async initLedger(): Promise<BaseValueResponse<string>> {
    return this.ledgerApiDataSource.initLedger();
  }
} 
