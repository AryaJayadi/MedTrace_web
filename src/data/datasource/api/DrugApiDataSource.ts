import { DrugDataSource } from "../DrugDataSource";
import { Drug } from "@/domain/model/drug/Drug";
import { CreateDrugRequest } from "@/domain/model/dto/CreateDrugRequest";
import { BaseListResponse } from "@/domain/model/response/BaseListResponse";
import { BaseValueResponse } from "@/domain/model/response/BaseValueResponse";
import apiClient from "./axiosInstance"; // Import the global axios instance

const DRUGS_API_PATH = "drugs"; // Define the specific path for drugs

export class DrugApiDataSource implements DrugDataSource {

  async createDrug(request: CreateDrugRequest): Promise<BaseValueResponse<Drug>> {
    const response = await apiClient.post<BaseValueResponse<Drug>>(DRUGS_API_PATH, request);
    return response.data;
  }

  async getMyDrugs(): Promise<BaseListResponse<Drug>> {
    const response = await apiClient.get<BaseListResponse<Drug>>(`${DRUGS_API_PATH}/my`);
    return response.data;
  }

  // This method was named getDrugByID in a previous version, aligning with interface as getDrug
  async getDrug(drugID: string): Promise<BaseValueResponse<Drug>> {
    const response = await apiClient.get<BaseValueResponse<Drug>>(`${DRUGS_API_PATH}/${drugID}`);
    return response.data;
  }

  async getDrugsByBatch(batchID: string): Promise<BaseListResponse<Drug>> {
    const response = await apiClient.get<BaseListResponse<Drug>>(`${DRUGS_API_PATH}/batch/${batchID}`);
    return response.data;
  }

  async getMyAvailDrugs(): Promise<BaseListResponse<Drug>> {
    const response = await apiClient.get<BaseListResponse<Drug>>(`${DRUGS_API_PATH}/my/available`);
    return response.data;
  }

  // The following methods were in a previous version of DrugApiDataSource but not in the interface:
  // They are kept here, commented out, in case they are needed or the interface is incomplete.
  /*
  async getAllDrugs(): Promise<BaseListResponse<Drug>> {
    const response = await apiClient.get<BaseListResponse<Drug>>(DRUGS_API_PATH);
    return response.data;
  }

  async drugExists(drugID: string): Promise<BaseValueResponse<boolean>> {
    const response = await apiClient.get<BaseValueResponse<boolean>>(`${DRUGS_API_PATH}/${drugID}/exists`);
    return response.data;
  }
  */
} 