import { BaseValueResponse } from "@/domain/model/response/BaseValueResponse";
import { BaseListResponse } from "@/domain/model/response/BaseListResponse";
import { CreateBatchRequest } from "./api/request/CreateBatchRequest";
import { Batch } from "@/domain/model/batch/Batch";
import { UpdateBatchRequest } from "@/domain/model/dto/UpdateBatchRequest";

export interface BatchDataSource {
  createBatch(request: CreateBatchRequest): Promise<BaseValueResponse<Batch>>;
  updateBatch(request: UpdateBatchRequest): Promise<BaseValueResponse<Batch>>;
  getAllBatches(): Promise<BaseListResponse<Batch>>;
  getBatchByID(batchID: string): Promise<BaseValueResponse<Batch>>;
  batchExists(batchID: string): Promise<BaseValueResponse<boolean>>;
}
