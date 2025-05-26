import { AuthDataSource } from "../AuthDataSource";
import { BaseValueResponse } from "@/domain/model/response/BaseValueResponse";
import apiClient from "./axiosInstance";
import { LogoutResponse } from "@/domain/model/auth/LogoutResponse";
import { LoginResponse } from "@/domain/model/auth/LoginResponse";
import { LoginRequest } from "@/domain/model/auth/LoginRequest";

export class AuthApiDataSource implements AuthDataSource {

  async login(request: LoginRequest): Promise<BaseValueResponse<LoginResponse>> {
    const response = await apiClient.post<BaseValueResponse<LoginResponse>>("login", request);
    return response.data;
  }

  async logout(): Promise<BaseValueResponse<LogoutResponse>> {
    const response = await apiClient.post<BaseValueResponse<LogoutResponse>>("logout");
    return response.data;
  }
}
