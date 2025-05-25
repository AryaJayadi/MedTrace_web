import { BaseValueResponse } from "@/domain/model/response/BaseValueResponse";
import { AuthRequest } from "./mock/request/AuthRequest";

// Define the expected response type for login, matching AuthApiDataSource
interface LoginResponseData {
    token: string;
    orgId: string;
    message?: string;
}

export interface AuthDataSource {
    login(request: AuthRequest): Promise<BaseValueResponse<LoginResponseData>>;
    logout(): Promise<BaseValueResponse<boolean>>; // Assuming logout returns boolean
}
