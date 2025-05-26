import { LoginRequest } from "@/domain/model/auth/LoginRequest";
import { Organization } from "@/domain/model/organization/Organization";
import { BaseValueResponse } from "@/domain/model/response/BaseValueResponse";
import { AuthRepository } from "@/domain/repository/AuthRepository";
import { OrganizationRepository } from "@/domain/repository/OrganizationRepository";

interface LoginUseCase {
  invoke(request: LoginRequest): Promise<BaseValueResponse<Organization>>;
}

export class Login implements LoginUseCase {
  private repository: AuthRepository;
  private organizationRepository: OrganizationRepository;

  constructor(_repository: AuthRepository, _organizationRepository: OrganizationRepository) {
    this.repository = _repository;
    this.organizationRepository = _organizationRepository;
  }

  async invoke(request: LoginRequest): Promise<BaseValueResponse<Organization>> {
    const res = await this.repository.login(request);
    if (res.success) {
      return this.organizationRepository.getOrganizationById(request.organization);
    }
    const errorResponse: BaseValueResponse<Organization> = {
      success: false,
      error: {
        code: 401,
        message: "Invalid organization ID or password.",
      },
    };
    return Promise.resolve(errorResponse);
  }
}
