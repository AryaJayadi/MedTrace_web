import { OrganizationRepository } from "@/domain/repository/OrganizationRepository";
import { OrganizationDataSource } from "../datasource/OrganizationDataSource";
import { Organization } from "@/domain/model/organization/Organization";
import { BaseListResponse } from "@/domain/model/response/BaseListResponse";
import { BaseValueResponse } from "@/domain/model/response/BaseValueResponse";

export class OrganizationRepositoryDataSource implements OrganizationRepository {
  constructor(private readonly datasource: OrganizationDataSource) { }

  getOrganizations(): Promise<BaseListResponse<Organization>> {
    return this.datasource.getOrganizations();
  }

  getOrganizationById(id: string): Promise<BaseValueResponse<Organization>> {
    return this.datasource.getOrganizationById(id);
  }
}
