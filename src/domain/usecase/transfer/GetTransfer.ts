import { TransferRepository } from "@/domain/repository/TransferRepository";
import { Transfer } from "@/domain/model/transfer/Transfer";
import { BaseValueResponse } from "@/domain/model/response/BaseValueResponse";

export interface GetTransferUseCase {
  execute(transferID: string): Promise<BaseValueResponse<Transfer>>;
}

export class GetTransfer implements GetTransferUseCase {
  constructor(private readonly transferRepository: TransferRepository) {}

  async execute(transferID: string): Promise<BaseValueResponse<Transfer>> {
    return this.transferRepository.getTransfer(transferID);
  }
} 