import { AuthRepository } from "@/domain/repository/AuthRepository";
import { AuthRequest } from "../datasource/mock/request/AuthRequest";
import { AuthDataSource } from "../datasource/AuthDataSource";
import { BaseValueResponse } from "@/domain/model/response/BaseValueResponse";

export class AuthRepositoryDataSource implements AuthRepository {
  private datasource: AuthDataSource;

  constructor(_datasource: AuthDataSource) {
    this.datasource = _datasource;
  }

  login(request: AuthRequest): Promise<BaseValueResponse<Boolean>> {
    return this.datasource.login(request);
  }
}
