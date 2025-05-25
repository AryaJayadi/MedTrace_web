import { AuthDataSource } from "../AuthDataSource";
import { AuthRequest } from "../mock/request/AuthRequest";
import { BaseValueResponse } from "@/domain/model/response/BaseValueResponse";
import apiClient from "./axiosInstance"; // Import the global axios instance

interface LoginResponseData {
    token: string;
    orgId: string;
    message?: string;
}

export class AuthApiDataSource implements AuthDataSource {
  // private axiosInstance = axios.create({ ... }); // Removed old instance

  async login(request: AuthRequest): Promise<BaseValueResponse<LoginResponseData>> {
    const response = await apiClient.post<BaseValueResponse<LoginResponseData>>("login", request);
    return response.data; 
  }

  async logout(): Promise<BaseValueResponse<boolean>> { 
    // Logout might need to clear the token on the client, which is handled by AuthContext
    // This call could be to invalidate the token on the server if such a mechanism exists
    const response = await apiClient.post<BaseValueResponse<boolean>>("logout");
    return response.data;
  }
}
