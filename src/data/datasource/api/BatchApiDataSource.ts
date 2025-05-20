import axios from "axios";
import { BatchDataSource } from "../BatchDataSource";
import { Batch } from "@/domain/model/batch/Batch";
import { BaseValueResponse } from "@/domain/model/response/BaseValueResponse";
import { BaseListResponse } from "@/domain/model/response/BaseListResponse";
import { CreateBatchRequest } from "./request/CreateBatchRequest";
import { UpdateBatchRequest } from "@/domain/model/dto/UpdateBatchRequest";

const BASE_URL = import.meta.env.VITE_BACKEND_URL + "/batches";

export class BatchApiDataSource implements BatchDataSource {
  private axiosInstance = axios.create({
    baseURL: BASE_URL,
    transformResponse: [function (response) {
      let resp;

      try {
        resp = JSON.parse(response);
      } catch (error) {
        throw Error(`[requestClient] Error parsing response JSON data - ${JSON.stringify(error)}`);
      }

      if (resp) {
        return resp;
      }
    }]
  })

  async createBatch(request: CreateBatchRequest): Promise<BaseValueResponse<Batch>> {
    const response = await this.axiosInstance({
      method: "POST",
      url: "",
      data: request,
    })
    return response.data as BaseValueResponse<Batch>;
  }

  async updateBatch(request: UpdateBatchRequest): Promise<BaseValueResponse<Batch>> {
    const response = await this.axiosInstance.patch<BaseValueResponse<Batch>>("", request);
    return response.data;
  }

  async getAllBatches(): Promise<BaseListResponse<Batch>> {
    const response = await this.axiosInstance.get<BaseListResponse<Batch>>("");
    return response.data;
  }

  async getBatchByID(batchID: string): Promise<BaseValueResponse<Batch>> {
    const response = await this.axiosInstance.get<BaseValueResponse<Batch>>(`/${batchID}`);
    return response.data;
  }

  async batchExists(batchID: string): Promise<BaseValueResponse<boolean>> {
    const response = await this.axiosInstance.get<BaseValueResponse<boolean>>(`/${batchID}/exists`);
    return response.data;
  }
}
