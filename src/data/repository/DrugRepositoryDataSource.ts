import { DrugRepository } from "@/domain/repository/DrugRepository";
import { Drug } from "@/domain/model/drug/Drug";
import { CreateDrugRequest } from "@/domain/model/dto/CreateDrugRequest";
import { BaseValueResponse } from "@/domain/model/response/BaseValueResponse";
import { BaseListResponse } from "@/domain/model/response/BaseListResponse";
import { DrugApiDataSource } from "../datasource/api/DrugApiDataSource"; // Adjust path if needed

export class DrugRepositoryDataSource implements DrugRepository {
  constructor(private readonly drugApiDataSource: DrugApiDataSource) {}

  async createDrug(request: CreateDrugRequest): Promise<BaseValueResponse<Drug>> {
    return this.drugApiDataSource.createDrug(request);
  }

  async getMyDrugs(): Promise<BaseListResponse<Drug>> {
    return this.drugApiDataSource.getMyDrugs();
  }

  async getDrug(drugID: string): Promise<BaseValueResponse<Drug>> {
    return this.drugApiDataSource.getDrug(drugID);
  }
} 