import { Organization } from "../model/organization/Organization";
import { BaseListResponse } from "../model/response/BaseListResponse";
import { BaseValueResponse } from "../model/response/BaseValueResponse";

export interface OrganizationRepository {
  getOrganizations(): Promise<BaseListResponse<Organization>>;
  getOrganizationById(id: string): Promise<BaseValueResponse<Organization>>;
}
