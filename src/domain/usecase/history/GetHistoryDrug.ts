import { HistoryDrug } from "@/domain/model/history/HistoryDrug";
import { BaseListResponse } from "@/domain/model/response/BaseListResponse";
import { DrugRepository } from "@/domain/repository/DrugRepository";

export interface GetHistoryDrugUseCase {
  execute(drugID: string): Promise<BaseListResponse<HistoryDrug>>;
}

export class GetHistoryDrug implements GetHistoryDrugUseCase {
  constructor(private readonly drugRepository: DrugRepository) { }

  async execute(drugID: string): Promise<BaseListResponse<HistoryDrug>> {
    return this.drugRepository.getHistoryDrug(drugID);
  }
}
