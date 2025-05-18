import { ErrorInfo } from "./ErrorInfo";

export interface BaseValueResponse<T> {
  success: boolean;
  value?: T;
  error?: ErrorInfo;
}
