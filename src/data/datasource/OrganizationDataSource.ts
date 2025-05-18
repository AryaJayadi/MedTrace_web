import { Organization } from "@/domain/model/organization/Organization";
import { BaseListResponse } from "@/domain/model/response/BaseListResponse";
import { BaseValueResponse } from "@/domain/model/response/BaseValueResponse";

export interface OrganizationDataSource {
  getOrganizations(): Promise<BaseListResponse<Organization>>;
  getOrganizationById(id: string): Promise<BaseValueResponse<Organization>>;
}
