import { TransferRepository } from "@/domain/repository/TransferRepository";
import { Transfer } from "@/domain/model/transfer/Transfer";
import { BaseListResponse } from "@/domain/model/response/BaseListResponse";

export interface GetMyOutTransferUseCase {
  execute(): Promise<BaseListResponse<Transfer>>;
}

export class GetMyOutTransfer implements GetMyOutTransferUseCase {
  constructor(private readonly transferRepository: TransferRepository) {}

  async execute(): Promise<BaseListResponse<Transfer>> {
    return this.transferRepository.getMyOutTransfer();
  }
} 