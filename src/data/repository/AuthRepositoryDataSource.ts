import { AuthRepository } from "@/domain/repository/AuthRepository";
import { AuthRequest } from "../datasource/mock/request/AuthRequest";
import { AuthDataSource } from "../datasource/AuthDataSource";

export class AuthRepositoryDataSource implements AuthRepository {
  private datasource: AuthDataSource;

  constructor(_datasource: AuthDataSource) {
    this.datasource = _datasource;
  }

  login(request: AuthRequest): Promise<Boolean> {
    return this.datasource.login(request);
  }
}
