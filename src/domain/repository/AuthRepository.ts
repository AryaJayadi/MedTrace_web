import { LoginRequest } from "../model/auth/LoginRequest";
import { LoginResponse } from "../model/auth/LoginResponse";
import { LogoutResponse } from "../model/auth/LogoutResponse";
import { BaseValueResponse } from "../model/response/BaseValueResponse";

export interface AuthRepository {
  login(request: LoginRequest): Promise<BaseValueResponse<LoginResponse>>;
  logout(): Promise<BaseValueResponse<LogoutResponse>>;
}
