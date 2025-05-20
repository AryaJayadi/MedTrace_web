import { Transfer } from "../model/transfer/Transfer";
import { CreateTransferRequest } from "../model/dto/CreateTransferRequest";
import { ProcessTransferRequest } from "../model/dto/ProcessTransferRequest";
import { BaseValueResponse } from "../model/response/BaseValueResponse";
import { BaseListResponse } from "../model/response/BaseListResponse";

export interface TransferRepository {
  createTransfer(request: CreateTransferRequest): Promise<BaseValueResponse<Transfer>>;
  getMyTransfers(): Promise<BaseListResponse<Transfer>>;
  getMyOutTransfer(): Promise<BaseListResponse<Transfer>>;
  getMyInTransfer(): Promise<BaseListResponse<Transfer>>;
  acceptTransfer(request: ProcessTransferRequest): Promise<BaseValueResponse<Transfer>>;
  rejectTransfer(request: ProcessTransferRequest): Promise<BaseValueResponse<Transfer>>;
  getTransfer(transferID: string): Promise<BaseValueResponse<Transfer>>;
} 