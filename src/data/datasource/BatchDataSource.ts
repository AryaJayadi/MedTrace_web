import { BaseValueResponse } from "@/domain/model/response/BaseValueResponse";
import { CreateBatchRequest } from "./api/request/CreateBatchRequest";
import { Batch } from "@/domain/model/batch/Batch";

export interface BatchDataSource {
  createBatch(request: CreateBatchRequest): Promise<BaseValueResponse<Batch>>
}
