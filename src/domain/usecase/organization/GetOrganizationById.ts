import { Organization } from "@/domain/model/organization/Organization";
import { BaseValueResponse } from "@/domain/model/response/BaseValueResponse";
import { OrganizationRepository } from "@/domain/repository/OrganizationRepository";

interface GetOrganizationByIdUseCase {
  invoke(id: string): Promise<BaseValueResponse<Organization>>;
}

export class GetOrganizationById implements GetOrganizationByIdUseCase {
  private repository: OrganizationRepository;

  constructor(_repository: OrganizationRepository) {
    this.repository = _repository;
  }

  invoke(id: string): Promise<BaseValueResponse<Organization>> {
    return this.repository.getOrganizationById(id);
  }
}
