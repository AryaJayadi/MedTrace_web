import { TransferRepository } from "@/domain/repository/TransferRepository";
import { ProcessTransferRequest } from "@/domain/model/dto/ProcessTransferRequest";
import { Transfer } from "@/domain/model/transfer/Transfer";
import { BaseValueResponse } from "@/domain/model/response/BaseValueResponse";

export interface AcceptTransferUseCase {
  execute(request: ProcessTransferRequest): Promise<BaseValueResponse<Transfer>>;
}

export class AcceptTransfer implements AcceptTransferUseCase {
  constructor(private readonly transferRepository: TransferRepository) {}

  async execute(request: ProcessTransferRequest): Promise<BaseValueResponse<Transfer>> {
    return this.transferRepository.acceptTransfer(request);
  }
} 