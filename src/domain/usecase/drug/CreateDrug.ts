import { DrugRepository } from "@/domain/repository/DrugRepository";
import { CreateDrugRequest } from "@/domain/model/dto/CreateDrugRequest";
import { Drug } from "@/domain/model/drug/Drug";
import { BaseValueResponse } from "@/domain/model/response/BaseValueResponse";

export interface CreateDrugUseCase {
  execute(request: CreateDrugRequest): Promise<BaseValueResponse<Drug>>;
}

export class CreateDrug implements CreateDrugUseCase {
  constructor(private readonly drugRepository: DrugRepository) {}

  async execute(request: CreateDrugRequest): Promise<BaseValueResponse<Drug>> {
    return this.drugRepository.createDrug(request);
  }
} 