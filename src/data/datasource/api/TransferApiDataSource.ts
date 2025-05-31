import { TransferDataSource } from "../TransferDataSource";
import { Transfer } from "@/domain/model/transfer/Transfer";
import { BaseValueResponse } from "@/domain/model/response/BaseValueResponse";
import { BaseListResponse } from "@/domain/model/response/BaseListResponse";
import { CreateTransferRequest } from "@/domain/model/transfer/CreateTransferRequest";
import { ProcessTransferRequest } from "@/domain/model/transfer/ProcessTransferRequest";
import apiClient from "./axiosInstance";

const BASE_URL = import.meta.env.VITE_BACKEND_URL + "/transfers";

export class TransferApiDataSource implements TransferDataSource {
  async createTransfer(request: CreateTransferRequest): Promise<BaseValueResponse<Transfer>> {
    const response = await apiClient.post<BaseValueResponse<Transfer>>(BASE_URL, request);
    return response.data;
  }

  async getMyTransfers(): Promise<BaseListResponse<Transfer>> {
    const response = await apiClient.get<BaseListResponse<Transfer>>(`${BASE_URL}/my`);
    return response.data;
  }

  async getMyOutTransfer(): Promise<BaseListResponse<Transfer>> {
    const response = await apiClient.get<BaseListResponse<Transfer>>(`${BASE_URL}/my/outgoing`);
    return response.data;
  }

  async getMyInTransfer(): Promise<BaseListResponse<Transfer>> {
    const response = await apiClient.get<BaseListResponse<Transfer>>(`${BASE_URL}/my/incoming`);
    return response.data;
  }

  async acceptTransfer(request: ProcessTransferRequest): Promise<BaseValueResponse<Transfer>> {
    const response = await apiClient.post<BaseValueResponse<Transfer>>(`${BASE_URL}/accept`, request);
    return response.data;
  }

  async rejectTransfer(request: ProcessTransferRequest): Promise<BaseValueResponse<Transfer>> {
    const response = await apiClient.post<BaseValueResponse<Transfer>>(`${BASE_URL}/reject`, request);
    return response.data;
  }

  async getTransfer(transferID: string): Promise<BaseValueResponse<Transfer>> {
    const response = await apiClient.get<BaseValueResponse<Transfer>>(`${BASE_URL}/${transferID}`);
    return response.data;
  }
} 
