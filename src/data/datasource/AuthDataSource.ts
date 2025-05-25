import { BaseValueResponse } from "@/domain/model/response/BaseValueResponse";
import { AuthRequest } from "./mock/request/AuthRequest";

export interface AuthDataSource {
  login(request: AuthRequest): Promise<BaseValueResponse<Boolean>>;
}
