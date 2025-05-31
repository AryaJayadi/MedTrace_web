import { Organization } from "@/domain/model/organization/Organization";
import { BaseListResponse } from "@/domain/model/response/BaseListResponse";
import { OrganizationDataSource } from "../OrganizationDataSource";
import { BaseValueResponse } from "@/domain/model/response/BaseValueResponse";
import axiosInstance from "./axiosInstance";

const BASE_URL = import.meta.env.VITE_BACKEND_URL + "/organizations";

export class OrganizationApiDataSource implements OrganizationDataSource {

  async getOrganizations(): Promise<BaseListResponse<Organization>> {
    const response = await axiosInstance.get<BaseListResponse<Organization>>(BASE_URL);
    return response.data;
  }

  async getOrganizationById(id: string): Promise<BaseValueResponse<Organization>> {
    const response = await axiosInstance.get<BaseValueResponse<Organization>>(`${BASE_URL}/${id}`);
    return response.data;
  }
}
