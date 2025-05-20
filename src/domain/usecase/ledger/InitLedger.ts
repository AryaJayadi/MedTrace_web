import { LedgerRepository } from "@/domain/repository/LedgerRepository";
import { BaseValueResponse } from "@/domain/model/response/BaseValueResponse";

export interface InitLedgerUseCase {
  execute(): Promise<BaseValueResponse<string>>;
}

export class InitLedger implements InitLedgerUseCase {
  constructor(private readonly ledgerRepository: LedgerRepository) {}

  async execute(): Promise<BaseValueResponse<string>> {
    return this.ledgerRepository.initLedger();
  }
} 