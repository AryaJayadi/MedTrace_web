import { DrugRepository } from "@/domain/repository/DrugRepository";
import { Drug } from "@/domain/model/drug/Drug";
import { CreateDrugRequest } from "@/domain/model/drug/CreateDrugRequest";
import { BaseValueResponse } from "@/domain/model/response/BaseValueResponse";
import { BaseListResponse } from "@/domain/model/response/BaseListResponse";
import { DrugDataSource } from "../datasource/DrugDataSource";
import { HistoryDrug } from "@/domain/model/history/HistoryDrug";

export class DrugRepositoryDataSource implements DrugRepository {
  constructor(private readonly drugApiDataSource: DrugDataSource) { }

  async createDrug(request: CreateDrugRequest): Promise<BaseValueResponse<Drug>> {
    return this.drugApiDataSource.createDrug(request);
  }

  async getMyDrugs(): Promise<BaseListResponse<Drug>> {
    return this.drugApiDataSource.getMyDrugs();
  }

  async getDrug(drugID: string): Promise<BaseValueResponse<Drug>> {
    return this.drugApiDataSource.getDrug(drugID);
  }

  async getDrugsByBatch(batchID: string): Promise<BaseListResponse<Drug>> {
    return this.drugApiDataSource.getDrugsByBatch(batchID);
  }

  async getDrugsByTransfer(transferID: string): Promise<BaseListResponse<Drug>> {
    return this.drugApiDataSource.getDrugsByTransfer(transferID)
  }

  async getMyAvailDrugs(): Promise<BaseListResponse<Drug>> {
    return this.drugApiDataSource.getMyAvailDrugs();
  }

  async getHistoryDrug(drugID: string): Promise<BaseListResponse<HistoryDrug>> {
    return this.drugApiDataSource.getHistoryDrug(drugID);
  }
} 
