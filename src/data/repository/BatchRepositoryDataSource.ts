import { BatchRepository } from "@/domain/repository/BatchRepository";
import { BatchDataSource } from "../datasource/BatchDataSource";
import { CreateBatchRequest } from "../../domain/model/batch/CreateBatchRequest";
import { BaseValueResponse } from "@/domain/model/response/BaseValueResponse";
import { BaseListResponse } from "@/domain/model/response/BaseListResponse";
import { Batch } from "@/domain/model/batch/Batch";
import { UpdateBatchRequest } from "@/domain/model/batch/UpdateBatchRequest";

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

  async getAllBatches(): Promise<BaseListResponse<Batch>> {
    return this.datasource.getAllBatches();
  }

  async getBatchByID(batchID: string): Promise<BaseValueResponse<Batch>> {
    return this.datasource.getBatchByID(batchID);
  }

  async batchExists(batchID: string): Promise<BaseValueResponse<boolean>> {
    return this.datasource.batchExists(batchID);
  }
}
