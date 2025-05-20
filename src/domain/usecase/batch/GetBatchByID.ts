import { BatchRepository } from "@/domain/repository/BatchRepository";
import { Batch } from "@/domain/model/batch/Batch";
import { BaseValueResponse } from "@/domain/model/response/BaseValueResponse";

export interface GetBatchByIDUseCase {
  execute(batchID: string): Promise<BaseValueResponse<Batch>>;
}

export class GetBatchByID implements GetBatchByIDUseCase {
  constructor(private readonly batchRepository: BatchRepository) {}

  async execute(batchID: string): Promise<BaseValueResponse<Batch>> {
    return this.batchRepository.getBatchByID(batchID);
  }
} 