import { DrugRepository } from "@/domain/repository/DrugRepository";
import { Drug } from "@/domain/model/drug/Drug";
import { BaseListResponse } from "@/domain/model/response/BaseListResponse";

export interface GetMyDrugsUseCase {
  execute(): Promise<BaseListResponse<Drug>>;
}

export class GetMyDrugs implements GetMyDrugsUseCase {
  constructor(private readonly drugRepository: DrugRepository) {}

  async execute(): Promise<BaseListResponse<Drug>> {
    return this.drugRepository.getMyDrugs();
  }
} 