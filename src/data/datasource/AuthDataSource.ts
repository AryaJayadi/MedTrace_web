import { AuthRequest } from "./mock/request/AuthRequest";

export interface AuthDataSource {
  login(request: AuthRequest): Promise<Boolean>
}
