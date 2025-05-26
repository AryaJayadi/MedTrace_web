import { AuthRepository } from "@/domain/repository/AuthRepository";
import { LoginRequest } from "@/domain/model/auth/LoginRequest";
import { LoginResponse } from "@/domain/model/auth/LoginResponse";
import { BaseValueResponse } from "@/domain/model/response/BaseValueResponse";

export interface LoginUseCase {
  execute(request: LoginRequest): Promise<BaseValueResponse<LoginResponse>>;
}

export class Login implements LoginUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(request: LoginRequest): Promise<BaseValueResponse<LoginResponse>> {
    return this.authRepository.login(request);
  }
}
