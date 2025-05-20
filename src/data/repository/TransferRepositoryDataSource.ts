import { TransferRepository } from "@/domain/repository/TransferRepository";
import { Transfer } from "@/domain/model/transfer/Transfer";
import { CreateTransferRequest } from "@/domain/model/dto/CreateTransferRequest";
import { ProcessTransferRequest } from "@/domain/model/dto/ProcessTransferRequest";
import { BaseValueResponse } from "@/domain/model/response/BaseValueResponse";
import { BaseListResponse } from "@/domain/model/response/BaseListResponse";
import { TransferApiDataSource } from "../datasource/api/TransferApiDataSource"; // Adjust path if needed

export class TransferRepositoryDataSource implements TransferRepository {
  constructor(private readonly transferApiDataSource: TransferApiDataSource) {}

  async createTransfer(request: CreateTransferRequest): Promise<BaseValueResponse<Transfer>> {
    return this.transferApiDataSource.createTransfer(request);
  }

  async getMyTransfers(): Promise<BaseListResponse<Transfer>> {
    return this.transferApiDataSource.getMyTransfers();
  }

  async getMyOutTransfer(): Promise<BaseListResponse<Transfer>> {
    return this.transferApiDataSource.getMyOutTransfer();
  }

  async getMyInTransfer(): Promise<BaseListResponse<Transfer>> {
    return this.transferApiDataSource.getMyInTransfer();
  }

  async acceptTransfer(request: ProcessTransferRequest): Promise<BaseValueResponse<Transfer>> {
    return this.transferApiDataSource.acceptTransfer(request);
  }

  async rejectTransfer(request: ProcessTransferRequest): Promise<BaseValueResponse<Transfer>> {
    return this.transferApiDataSource.rejectTransfer(request);
  }

  async getTransfer(transferID: string): Promise<BaseValueResponse<Transfer>> {
    return this.transferApiDataSource.getTransfer(transferID);
  }
} 