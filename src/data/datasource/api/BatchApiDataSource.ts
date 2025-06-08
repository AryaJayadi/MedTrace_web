import { BatchDataSource } from "../BatchDataSource";
import { Batch } from "@/domain/model/batch/Batch";
import { BaseValueResponse } from "@/domain/model/response/BaseValueResponse";
import { BaseListResponse } from "@/domain/model/response/BaseListResponse";
import { CreateBatchRequest } from "../../../domain/model/batch/CreateBatchRequest";
import { UpdateBatchRequest } from "@/domain/model/batch/UpdateBatchRequest";
import axiosInstance from "./axiosInstance";

const BATCHES_API_PATH = "batches"; // Define the specific path for batches

export class BatchApiDataSource implements BatchDataSource {
  async createBatch(request: CreateBatchRequest): Promise<BaseValueResponse<Batch>> {
    const response = await axiosInstance.post<BaseValueResponse<Batch>>(BATCHES_API_PATH, request);
    return response.data;
  }

  async updateBatch(request: UpdateBatchRequest): Promise<BaseValueResponse<Batch>> {
    // Assuming the UpdateBatchRequest contains the ID or the API endpoint implies it.
    // If batch ID needs to be part of the URL: `${BATCHES_API_PATH}/${request.id}`
    const response = await axiosInstance.patch<BaseValueResponse<Batch>>(`${BATCHES_API_PATH}/${request.ID}`, request);
    return response.data;
  }

  async getAllBatches(): Promise<BaseListResponse<Batch>> {
    const response = await axiosInstance.get<BaseListResponse<Batch>>(BATCHES_API_PATH);
    return response.data;
  }

  async getBatchByID(batchID: string): Promise<BaseValueResponse<Batch>> {
    const response = await axiosInstance.get<BaseValueResponse<Batch>>(`${BATCHES_API_PATH}/${batchID}`);
    return response.data;
  }

  async batchExists(batchID: string): Promise<BaseValueResponse<boolean>> {
    const response = await axiosInstance.get<BaseValueResponse<boolean>>(`${BATCHES_API_PATH}/${batchID}/exists`);
    return response.data;
  }
}
