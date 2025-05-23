import { DrugRepository } from "@/domain/repository/DrugRepository";
import { Drug } from "@/domain/model/drug/Drug";
import { BaseListResponse } from "@/domain/model/response/BaseListResponse";

export interface GetMyAvailDrugsUseCase {
  execute(): Promise<BaseListResponse<Drug>>;
}

export class GetMyAvailDrugs implements GetMyAvailDrugsUseCase {
  constructor(private readonly drugRepository: DrugRepository) {}

  async execute(): Promise<BaseListResponse<Drug>> {
    return this.drugRepository.getMyAvailDrugs();
  }
} 