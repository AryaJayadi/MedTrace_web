import { AuthRepository } from "@/domain/repository/AuthRepository";
import { AuthDataSource } from "../datasource/AuthDataSource";
import { BaseValueResponse } from "@/domain/model/response/BaseValueResponse";
import { LoginRequest } from "@/domain/model/auth/LoginRequest";
import { LoginResponse } from "@/domain/model/auth/LoginResponse";
import { LogoutResponse } from "@/domain/model/auth/LogoutResponse";

export class AuthRepositoryDataSource implements AuthRepository {
  private datasource: AuthDataSource;

  constructor(_datasource: AuthDataSource) {
    this.datasource = _datasource;
  }

  login(request: LoginRequest): Promise<BaseValueResponse<LoginResponse>> {
    return this.datasource.login(request);
  }

  logout(): Promise<BaseValueResponse<LogoutResponse>> {
    return this.datasource.logout();
  }
}
