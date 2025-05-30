import { Drug } from "../model/drug/Drug";
import { CreateDrugRequest } from "../model/drug/CreateDrugRequest";
import { BaseValueResponse } from "../model/response/BaseValueResponse";
import { BaseListResponse } from "../model/response/BaseListResponse";

export interface DrugRepository {
  createDrug(request: CreateDrugRequest): Promise<BaseValueResponse<Drug>>;
  getMyDrugs(): Promise<BaseListResponse<Drug>>;
  getDrug(drugID: string): Promise<BaseValueResponse<Drug>>;
  getDrugsByBatch(batchID: string): Promise<BaseListResponse<Drug>>;
  getMyAvailDrugs(): Promise<BaseListResponse<Drug>>;
} 
