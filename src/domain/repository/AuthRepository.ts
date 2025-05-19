import { AuthRequest } from "@/data/datasource/mock/request/AuthRequest";

export interface AuthRepository {
  login(request: AuthRequest): Promise<Boolean>
}
