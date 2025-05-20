import { CreateBatchRequest } from "@/data/datasource/api/request/CreateBatchRequest";
import { UpdateBatchRequest } from "../model/dto/UpdateBatchRequest";
import { Batch } from "../model/batch/Batch";
import { BaseValueResponse } from "../model/response/BaseValueResponse";
import { BaseListResponse } from "../model/response/BaseListResponse";

export interface BatchRepository {
  createBatch(request: CreateBatchRequest): Promise<BaseValueResponse<Batch>>;
  updateBatch(request: UpdateBatchRequest): Promise<BaseValueResponse<Batch>>;
  getAllBatches(): Promise<BaseListResponse<Batch>>;
  getBatchByID(batchID: string): Promise<BaseValueResponse<Batch>>;
  batchExists(batchID: string): Promise<BaseValueResponse<boolean>>;
}
