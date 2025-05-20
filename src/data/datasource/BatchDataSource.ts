import { BaseValueResponse } from "@/domain/model/response/BaseValueResponse";
import { CreateBatchRequest } from "./api/request/CreateBatchRequest";
import { Batch } from "@/domain/model/batch/Batch";
import { UpdateBatchRequest } from "@/domain/model/dto/UpdateBatchRequest";

export interface BatchDataSource {
  createBatch(request: CreateBatchRequest): Promise<BaseValueResponse<Batch>>;
  updateBatch(request: UpdateBatchRequest): Promise<BaseValueResponse<Batch>>;
}
