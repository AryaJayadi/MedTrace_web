import { TransferRepository } from "@/domain/repository/TransferRepository";
import { CreateTransferRequest } from "@/domain/model/dto/CreateTransferRequest";
import { Transfer } from "@/domain/model/transfer/Transfer";
import { BaseValueResponse } from "@/domain/model/response/BaseValueResponse";

export interface CreateTransferUseCase {
  execute(request: CreateTransferRequest): Promise<BaseValueResponse<Transfer>>;
}

export class CreateTransfer implements CreateTransferUseCase {
  constructor(private readonly transferRepository: TransferRepository) {}

  async execute(request: CreateTransferRequest): Promise<BaseValueResponse<Transfer>> {
    return this.transferRepository.createTransfer(request);
  }
} 