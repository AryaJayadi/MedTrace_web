import { AuthRequest } from "@/data/datasource/mock/request/AuthRequest";
import { BaseValueResponse } from "../model/response/BaseValueResponse";

export interface AuthRepository {
  login(request: AuthRequest): Promise<BaseValueResponse<Boolean>>;
}
