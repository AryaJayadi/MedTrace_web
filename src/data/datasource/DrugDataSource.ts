import { Drug } from "@/domain/model/drug/Drug";
import { CreateDrugRequest } from "@/domain/model/dto/CreateDrugRequest";
import { BaseValueResponse } from "@/domain/model/response/BaseValueResponse";
import { BaseListResponse } from "@/domain/model/response/BaseListResponse";

export interface DrugDataSource {
  createDrug(request: CreateDrugRequest): Promise<BaseValueResponse<Drug>>; // Assuming it returns the created drug
  getMyDrugs(): Promise<BaseListResponse<Drug>>;
  getDrug(drugID: string): Promise<BaseValueResponse<Drug>>;
  getDrugsByBatch(batchID: string): Promise<BaseListResponse<Drug>>;
} 