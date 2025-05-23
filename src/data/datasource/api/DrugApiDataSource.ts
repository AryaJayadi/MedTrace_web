import axios from "axios";
import { DrugDataSource } from "../DrugDataSource";
import { Drug } from "@/domain/model/drug/Drug";
import { CreateDrugRequest } from "@/domain/model/dto/CreateDrugRequest";
import { BaseValueResponse } from "@/domain/model/response/BaseValueResponse";
import { BaseListResponse } from "@/domain/model/response/BaseListResponse";

const BASE_URL = import.meta.env.VITE_BACKEND_URL + "/drugs";

export class DrugApiDataSource implements DrugDataSource {
  private axiosInstance = axios.create({
    baseURL: BASE_URL,
    transformResponse: [function (response) {
      try {
        const resp = JSON.parse(response);
        return resp;
      } catch (error) {
        // console.error(`[requestClient] Error parsing response JSON data - ${JSON.stringify(error)}`);
        // Return original response if parsing fails, or handle as needed
        return response;
      }
    }]
  });

  async createDrug(request: CreateDrugRequest): Promise<BaseValueResponse<Drug>> {
    const response = await this.axiosInstance.post<BaseValueResponse<Drug>>("", request);
    return response.data;
  }

  async getMyDrugs(): Promise<BaseListResponse<Drug>> {
    const response = await this.axiosInstance.get<BaseListResponse<Drug>>("/my");
    return response.data;
  }

  async getDrug(drugID: string): Promise<BaseValueResponse<Drug>> {
    const response = await this.axiosInstance.get<BaseValueResponse<Drug>>(`/${drugID}`);
    return response.data;
  }

  async getDrugsByBatch(batchID: string): Promise<BaseListResponse<Drug>> {
    const response = await this.axiosInstance.get<BaseListResponse<Drug>>(`/batch/${batchID}`);
    return response.data;
  }

  async getMyAvailDrugs(): Promise<BaseListResponse<Drug>> {
    const response = await this.axiosInstance.get<BaseListResponse<Drug>>("/my/available");
    return response.data;
  }
} 