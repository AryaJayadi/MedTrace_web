import axios from "axios";
import { BatchDataSource } from "../BatchDataSource";
import { Batch } from "@/domain/model/batch/Batch";
import { BaseValueResponse } from "@/domain/model/response/BaseValueResponse";
import { CreateBatchRequest } from "./request/CreateBatchRequest";

const BASE_URL = import.meta.env.VITE_BACKEND_URL + "/batches";

export class BatchApiDataSource implements BatchDataSource {
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

  async createBatch(request: CreateBatchRequest): Promise<BaseValueResponse<Batch>> {
    const response = await this.axiosInstance({
      method: "POST",
      url: "",
      data: request,
    })
    return response.data as BaseValueResponse<Batch>;
  }
}
