import { Organization } from "@/domain/model/organization/Organization";
import { BaseListResponse } from "@/domain/model/response/BaseListResponse";
import { OrganizationDataSource } from "../OrganizationDataSource";
import axios from "axios";
import { BaseValueResponse } from "@/domain/model/response/BaseValueResponse";

const BASE_URL = import.meta.env.VITE_BACKEND_URL + "/organizations";

export class OrganizationApiDataSource implements OrganizationDataSource {
  private axiosInstance = axios.create({
    baseURL: BASE_URL,
    transformResponse: [function (response) {
      let resp;

      try {
        resp = JSON.parse(response);
      } catch (error) {
        throw Error(`[requestClient] Error parsing response JSON data - ${JSON.stringify(error)}`);
      }

      if (resp) {
        return resp;
      }
    }]
  })

  async getOrganizations(): Promise<BaseListResponse<Organization>> {
    const response = await this.axiosInstance({
      method: "GET",
      url: "/",
    })

    console.log(response);
    return response.data as BaseListResponse<Organization>;
  }

  async getOrganizationById(id: string): Promise<BaseValueResponse<Organization>> {
    const response = await this.axiosInstance({
      method: "GET",
      url: `/${id}`,
    });
    return response.data as BaseValueResponse<Organization>;
  }
}
