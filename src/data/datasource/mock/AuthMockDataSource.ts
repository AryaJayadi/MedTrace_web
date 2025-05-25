import { BaseValueResponse } from "@/domain/model/response/BaseValueResponse";
import { AuthDataSource } from "../AuthDataSource";
import { AuthRequest } from "./request/AuthRequest";

const organizations = [
  "Org1",
  "Org2",
  "Org3",
  "Org4"
]

const passwords = [
  "org1asdf",
  "org2asdf",
  "org3asdf",
  "org4asdf"
]

export class AuthMockDataSource implements AuthDataSource {
  login(request: AuthRequest): Promise<BaseValueResponse<Boolean>> {
    for (let i = 0; i < organizations.length; i++) {
      if (request.organization === organizations[i] && request.password === passwords[i]) {
        const res = {
          success: true,
          value: true,
          error: undefined,
        } as BaseValueResponse<Boolean>;
        return Promise.resolve(res);
      }
    }
    const res = {
      success: true,
      value: false,
      error: undefined
    } as BaseValueResponse<Boolean>;
    return Promise.resolve(res);
  }
}
