import { Organization } from "@/domain/model/organization/Organization";
import { BaseListResponse } from "@/domain/model/response/BaseListResponse";
import { OrganizationRepository } from "@/domain/repository/OrganizationRepository";

interface GetOrganizationsUseCase {
  invoke(): Promise<BaseListResponse<Organization>>;
}

export class GetOrganizations implements GetOrganizationsUseCase {
  private repository: OrganizationRepository;

  constructor(_repository: OrganizationRepository) {
    this.repository = _repository;
  }

  invoke(): Promise<BaseListResponse<Organization>> {
    return this.repository.getOrganizations();
  }
}
