import { DrugRepository } from "@/domain/repository/DrugRepository";
import { Drug } from "@/domain/model/drug/Drug";
import { BaseValueResponse } from "@/domain/model/response/BaseValueResponse";

export interface GetDrugUseCase {
  execute(drugID: string): Promise<BaseValueResponse<Drug>>;
}

export class GetDrug implements GetDrugUseCase {
  constructor(private readonly drugRepository: DrugRepository) {}

  async execute(drugID: string): Promise<BaseValueResponse<Drug>> {
    return this.drugRepository.getDrug(drugID);
  }
} 