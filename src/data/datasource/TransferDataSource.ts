import { Transfer } from "@/domain/model/transfer/Transfer";
import { CreateTransferRequest } from "@/domain/model/dto/CreateTransferRequest";
import { ProcessTransferRequest } from "@/domain/model/dto/ProcessTransferRequest";
import { BaseValueResponse } from "@/domain/model/response/BaseValueResponse";
import { BaseListResponse } from "@/domain/model/response/BaseListResponse";

export interface TransferDataSource {
  createTransfer(request: CreateTransferRequest): Promise<BaseValueResponse<Transfer>>; // Assuming returns created transfer
  getMyTransfers(): Promise<BaseListResponse<Transfer>>;
  getMyOutTransfer(): Promise<BaseListResponse<Transfer>>;
  getMyInTransfer(): Promise<BaseListResponse<Transfer>>;
  acceptTransfer(request: ProcessTransferRequest): Promise<BaseValueResponse<Transfer>>; // Assuming returns updated transfer
  rejectTransfer(request: ProcessTransferRequest): Promise<BaseValueResponse<Transfer>>; // Assuming returns updated transfer or simple status
  getTransfer(transferID: string): Promise<BaseValueResponse<Transfer>>;
} 