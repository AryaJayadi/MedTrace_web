import { TransferRepository } from "@/domain/repository/TransferRepository";
import { Transfer } from "@/domain/model/transfer/Transfer";
import { BaseListResponse } from "@/domain/model/response/BaseListResponse";

export interface GetMyTransfersUseCase {
  execute(): Promise<BaseListResponse<Transfer>>;
}

export class GetMyTransfers implements GetMyTransfersUseCase {
  constructor(private readonly transferRepository: TransferRepository) {}

  async execute(): Promise<BaseListResponse<Transfer>> {
    return this.transferRepository.getMyTransfers();
  }
} 