import { AuthRequest } from "@/data/datasource/mock/request/AuthRequest";
import { Organization } from "@/domain/model/organization/Organization";
import { BaseValueResponse } from "@/domain/model/response/BaseValueResponse";
import { AuthRepository } from "@/domain/repository/AuthRepository";
import { OrganizationRepository } from "@/domain/repository/OrganizationRepository";

interface LoginUseCase {
  invoke(request: AuthRequest): Promise<BaseValueResponse<Organization>>;
}

export class Login implements LoginUseCase {
  private repository: AuthRepository;
  private organizationRepository: OrganizationRepository;

  constructor(_repository: AuthRepository, _organizationRepository: OrganizationRepository) {
    this.repository = _repository;
    this.organizationRepository = _organizationRepository;
  }

  async invoke(request: AuthRequest): Promise<BaseValueResponse<Organization>> {
    const isSuccess = await this.repository.login(request);
    if (isSuccess) {
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
