import { BatchRepository } from "@/domain/repository/BatchRepository";
import { Batch } from "@/domain/model/batch/Batch";
import { BaseListResponse } from "@/domain/model/response/BaseListResponse";

export interface GetAllBatchesUseCase {
  execute(): Promise<BaseListResponse<Batch>>;
}

export class GetAllBatches implements GetAllBatchesUseCase {
  constructor(private readonly batchRepository: BatchRepository) {}

  async execute(): Promise<BaseListResponse<Batch>> {
    return this.batchRepository.getAllBatches();
  }
} 