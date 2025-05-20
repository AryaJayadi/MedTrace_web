import { BatchRepository } from "@/domain/repository/BatchRepository";
import { BatchDataSource } from "../datasource/BatchDataSource";
import { CreateBatchRequest } from "../datasource/api/request/CreateBatchRequest";
import { UpdateBatchRequest } from "@/domain/model/dto/UpdateBatchRequest";
import { BaseValueResponse } from "@/domain/model/response/BaseValueResponse";
import { Batch } from "@/domain/model/batch/Batch";

export class BatchRepositoryDataSource implements BatchRepository {
  private datasource: BatchDataSource;

  constructor(_datasource: BatchDataSource) {
    this.datasource = _datasource;
  }

  createBatch(request: CreateBatchRequest): Promise<BaseValueResponse<Batch>> {
    return this.datasource.createBatch(request);
  }

  async updateBatch(request: UpdateBatchRequest): Promise<BaseValueResponse<Batch>> {
    return this.datasource.updateBatch(request);
  }
}
