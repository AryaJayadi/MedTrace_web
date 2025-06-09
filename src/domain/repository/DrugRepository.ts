import { Drug } from "../model/drug/Drug";
import { CreateDrugRequest } from "../model/drug/CreateDrugRequest";
import { BaseValueResponse } from "../model/response/BaseValueResponse";
import { BaseListResponse } from "../model/response/BaseListResponse";
import { HistoryDrug } from "../model/history/HistoryDrug";

export interface DrugRepository {
  createDrug(request: CreateDrugRequest): Promise<BaseValueResponse<Drug>>;
  getMyDrugs(): Promise<BaseListResponse<Drug>>;
  getDrug(drugID: string): Promise<BaseValueResponse<Drug>>;
  getDrugsByBatch(batchID: string): Promise<BaseListResponse<Drug>>;
  getDrugsByTransfer(transferID: string): Promise<BaseListResponse<Drug>>;
  getMyAvailDrugs(): Promise<BaseListResponse<Drug>>;
  getHistoryDrug(drugID: string): Promise<BaseListResponse<HistoryDrug>>;
} 
