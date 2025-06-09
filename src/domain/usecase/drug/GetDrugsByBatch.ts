import { Drug } from "@/domain/model/drug/Drug";
import { BaseListResponse } from "@/domain/model/response/BaseListResponse";
import { DrugRepository } from "@/domain/repository/DrugRepository";

interface GetDrugsByBatchUseCase {
  execute(batchID: string): Promise<BaseListResponse<Drug>>;
}

export class GetDrugsByBatch implements GetDrugsByBatchUseCase {
  constructor(private readonly drugRepository: DrugRepository) { }

  async execute(batchID: string): Promise<BaseListResponse<Drug>> {
    return this.drugRepository.getDrugsByBatch(batchID);
  }
} 
