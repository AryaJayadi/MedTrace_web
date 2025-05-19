import { CreateBatchRequest } from "@/data/datasource/api/request/CreateBatchRequest";
import { Batch } from "../model/batch/Batch";
import { BaseValueResponse } from "../model/response/BaseValueResponse";

export interface BatchRepository {
  createBatch(request: CreateBatchRequest): Promise<BaseValueResponse<Batch>>
}
