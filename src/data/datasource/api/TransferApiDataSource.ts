import axios from "axios";
import { TransferDataSource } from "../TransferDataSource";
import { Transfer } from "@/domain/model/transfer/Transfer";
import { CreateTransferRequest } from "@/domain/model/dto/CreateTransferRequest";
import { ProcessTransferRequest } from "@/domain/model/dto/ProcessTransferRequest";
import { BaseValueResponse } from "@/domain/model/response/BaseValueResponse";
import { BaseListResponse } from "@/domain/model/response/BaseListResponse";

const BASE_URL = import.meta.env.VITE_BACKEND_URL + "/transfers";

export class TransferApiDataSource implements TransferDataSource {
  private axiosInstance = axios.create({
    baseURL: BASE_URL,
    transformResponse: [function (response) {
      try {
        const resp = JSON.parse(response);
        return resp;
      } catch (error) {
        return response; 
      }
    }]
  });

  async createTransfer(request: CreateTransferRequest): Promise<BaseValueResponse<Transfer>> {
    const response = await this.axiosInstance.post<BaseValueResponse<Transfer>>("", request);
    return response.data;
  }

  async getMyTransfers(): Promise<BaseListResponse<Transfer>> {
    const response = await this.axiosInstance.get<BaseListResponse<Transfer>>("/my");
    return response.data;
  }

  async getMyOutTransfer(): Promise<BaseListResponse<Transfer>> {
    const response = await this.axiosInstance.get<BaseListResponse<Transfer>>("/my/outgoing");
    return response.data;
  }

  async getMyInTransfer(): Promise<BaseListResponse<Transfer>> {
    const response = await this.axiosInstance.get<BaseListResponse<Transfer>>("/my/incoming");
    return response.data;
  }

  async acceptTransfer(request: ProcessTransferRequest): Promise<BaseValueResponse<Transfer>> {
    const response = await this.axiosInstance.post<BaseValueResponse<Transfer>>("/accept", request);
    return response.data;
  }

  async rejectTransfer(request: ProcessTransferRequest): Promise<BaseValueResponse<Transfer>> {
    const response = await this.axiosInstance.post<BaseValueResponse<Transfer>>("/reject", request);
    return response.data;
  }

  async getTransfer(transferID: string): Promise<BaseValueResponse<Transfer>> {
    const response = await this.axiosInstance.get<BaseValueResponse<Transfer>>(`/${transferID}`);
    return response.data;
  }
} 