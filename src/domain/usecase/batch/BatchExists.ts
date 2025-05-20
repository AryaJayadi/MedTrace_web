import { BatchRepository } from "@/domain/repository/BatchRepository";
import { BaseValueResponse } from "@/domain/model/response/BaseValueResponse";

export interface BatchExistsUseCase {
  execute(batchID: string): Promise<BaseValueResponse<boolean>>;
}

export class BatchExists implements BatchExistsUseCase {
  constructor(private readonly batchRepository: BatchRepository) {}

  async execute(batchID: string): Promise<BaseValueResponse<boolean>> {
    return this.batchRepository.batchExists(batchID);
  }
} 