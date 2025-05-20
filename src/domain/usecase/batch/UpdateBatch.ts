import { BatchRepository } from "@/domain/repository/BatchRepository";
import { UpdateBatchRequest } from "@/domain/model/dto/UpdateBatchRequest";
import { Batch } from "@/domain/model/batch/Batch";
import { BaseValueResponse } from "@/domain/model/response/BaseValueResponse";

export interface UpdateBatchUseCase {
  execute(request: UpdateBatchRequest): Promise<BaseValueResponse<Batch>>;
}

export class UpdateBatch implements UpdateBatchUseCase {
  constructor(private readonly batchRepository: BatchRepository) {}

  async execute(request: UpdateBatchRequest): Promise<BaseValueResponse<Batch>> {
    return this.batchRepository.updateBatch(request);
  }
} 