import axios from "axios";
import { LedgerDataSource } from "../LedgerDataSource";
import { BaseValueResponse } from "@/domain/model/response/BaseValueResponse";

const BASE_URL = import.meta.env.VITE_BACKEND_URL + "/ledger";

export class LedgerApiDataSource implements LedgerDataSource {
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

  async initLedger(): Promise<BaseValueResponse<string>> {
    const response = await this.axiosInstance.post<BaseValueResponse<string>>("/init");
    return response.data;
  }
} 