import { Drug } from "@/domain/model/drug/Drug";
import { BaseListResponse } from "@/domain/model/response/BaseListResponse";
import { DrugRepository } from "@/domain/repository/DrugRepository";

interface GetDrugsByTransferUseCase {
  execute(transferID: string): Promise<BaseListResponse<Drug>>;
}

export class GetDrugsByTransfer implements GetDrugsByTransferUseCase {
  constructor(private readonly drugRepository: DrugRepository) { }

  async execute(transferID: string): Promise<BaseListResponse<Drug>> {
    return this.drugRepository.getDrugsByTransfer(transferID)
  }
}
