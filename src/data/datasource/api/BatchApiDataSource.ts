import { BatchDataSource } from "../BatchDataSource";
import { Batch } from "@/domain/model/batch/Batch";
import { BaseValueResponse } from "@/domain/model/response/BaseValueResponse";
import { BaseListResponse } from "@/domain/model/response/BaseListResponse";
import { CreateBatchRequest } from "../../../domain/model/batch/CreateBatchRequest";
import apiClient from "./axiosInstance"; // Import the global axios instance
import { UpdateBatchRequest } from "@/domain/model/batch/UpdateBatchRequest";

// Note: The BASE_URL for batches is different, this needs to be handled.
// Option 1: The apiClient's baseURL is just the domain, and paths are full here.
// Option 2: Create a separate apiClient instance for /batches if many endpoints share it.
// For now, assuming full paths or adjustment in how apiClient is used for batches.
const BATCHES_API_PATH = "batches"; // Define the specific path for batches

export class BatchApiDataSource implements BatchDataSource {
  // private axiosInstance = axios.create({ ... }); // Removed old instance

  async createBatch(request: CreateBatchRequest): Promise<BaseValueResponse<Batch>> {
    const response = await apiClient.post<BaseValueResponse<Batch>>(BATCHES_API_PATH, request);
    return response.data;
  }

  async updateBatch(request: UpdateBatchRequest): Promise<BaseValueResponse<Batch>> {
    // Assuming the UpdateBatchRequest contains the ID or the API endpoint implies it.
    // If batch ID needs to be part of the URL: `${BATCHES_API_PATH}/${request.id}`
    const response = await apiClient.patch<BaseValueResponse<Batch>>(BATCHES_API_PATH, request);
    return response.data;
  }

  async getAllBatches(): Promise<BaseListResponse<Batch>> {
    const response = await apiClient.get<BaseListResponse<Batch>>(BATCHES_API_PATH);
    return response.data;
  }

  async getBatchByID(batchID: string): Promise<BaseValueResponse<Batch>> {
    const response = await apiClient.get<BaseValueResponse<Batch>>(`${BATCHES_API_PATH}/${batchID}`);
    return response.data;
  }

  async batchExists(batchID: string): Promise<BaseValueResponse<boolean>> {
    const response = await apiClient.get<BaseValueResponse<boolean>>(`${BATCHES_API_PATH}/${batchID}/exists`);
    return response.data;
  }
}
