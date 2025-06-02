import { DrugDataSource } from "../DrugDataSource";
import { Drug } from "@/domain/model/drug/Drug";
import { CreateDrugRequest } from "@/domain/model/drug/CreateDrugRequest";
import { BaseListResponse } from "@/domain/model/response/BaseListResponse";
import { BaseValueResponse } from "@/domain/model/response/BaseValueResponse";
import axiosInstance from "./axiosInstance"; // Import the global axios instance

const DRUGS_API_PATH = "drugs"; // Define the specific path for drugs

export class DrugApiDataSource implements DrugDataSource {

  async createDrug(request: CreateDrugRequest): Promise<BaseValueResponse<Drug>> {
    const response = await axiosInstance.post<BaseValueResponse<Drug>>(DRUGS_API_PATH, request);
    return response.data;
  }

  async getMyDrugs(): Promise<BaseListResponse<Drug>> {
    const response = await axiosInstance.get<BaseListResponse<Drug>>(`${DRUGS_API_PATH}/my`);
    return response.data;
  }

  // This method was named getDrugByID in a previous version, aligning with interface as getDrug
  async getDrug(drugID: string): Promise<BaseValueResponse<Drug>> {
    const response = await axiosInstance.get<BaseValueResponse<Drug>>(`${DRUGS_API_PATH}/${drugID}`);
    return response.data;
  }

  async getDrugsByBatch(batchID: string): Promise<BaseListResponse<Drug>> {
    const response = await axiosInstance.get<BaseListResponse<Drug>>(`${DRUGS_API_PATH}/batch/${batchID}`);
    return response.data;
  }

  async getMyAvailDrugs(): Promise<BaseListResponse<Drug>> {
    const response = await axiosInstance.get<BaseListResponse<Drug>>(`${DRUGS_API_PATH}/my/available`);
    return response.data;
  }

} 
