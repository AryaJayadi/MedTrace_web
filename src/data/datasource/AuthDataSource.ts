import { LoginRequest } from "@/domain/model/auth/LoginRequest";
import { LoginResponse } from "@/domain/model/auth/LoginResponse";
import { LogoutResponse } from "@/domain/model/auth/LogoutResponse";
import { BaseValueResponse } from "@/domain/model/response/BaseValueResponse";

export interface AuthDataSource {
  login(request: LoginRequest): Promise<BaseValueResponse<LoginResponse>>;
  logout(): Promise<BaseValueResponse<LogoutResponse>>;
}
