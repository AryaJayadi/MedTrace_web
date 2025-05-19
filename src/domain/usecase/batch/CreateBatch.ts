import { CreateBatchRequest } from "@/data/datasource/api/request/CreateBatchRequest";
import { Batch } from "@/domain/model/batch/Batch";
import { BaseValueResponse } from "@/domain/model/response/BaseValueResponse";
import { BatchRepository } from "@/domain/repository/BatchRepository";

interface CreateBatchUseCase {
  invoke(request: CreateBatchRequest): Promise<BaseValueResponse<Batch>>;
}

export class CreateBatch implements CreateBatchUseCase {
  private repository: BatchRepository;

  constructor(_repository: BatchRepository) {
    this.repository = _repository;
  }

  invoke(request: CreateBatchRequest): Promise<BaseValueResponse<Batch>> {
    return this.repository.createBatch(request);
  }
}
