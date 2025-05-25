import axios from "axios";
import { AuthDataSource } from "../AuthDataSource";
import { AuthRequest } from "../mock/request/AuthRequest";
import { BaseValueResponse } from "@/domain/model/response/BaseValueResponse";

const BASE_URL = import.meta.env.VITE_BACKEND_URL + "/";

export class AuthApiDataSource implements AuthDataSource {
  private axiosInstance = axios.create({
    baseURL: BASE_URL,
    transformResponse: [function (response) {
      let resp;

      try {
        resp = JSON.parse(response);
      } catch (error) {
        throw Error(`[requestClient] Error parsing response JSON data - ${JSON.stringify(error)}`);
      }

      if (resp) {
        return resp;
      }
    }]
  })

  async login(request: AuthRequest): Promise<BaseValueResponse<Boolean>> {
    const response = await this.axiosInstance.post<BaseValueResponse<Boolean>>("login", request);
    return response.data;
  }

  async logout(): Promise<BaseValueResponse<Boolean>> {
    const response = await this.axiosInstance.post<BaseValueResponse<Boolean>>("logout");
    return response.data;
  }
}
