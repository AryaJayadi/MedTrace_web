import { ErrorInfo } from "./ErrorInfo";

export interface BaseListResponse<T> {
  success: boolean;
  list?: T[];
  error?: ErrorInfo;
}
