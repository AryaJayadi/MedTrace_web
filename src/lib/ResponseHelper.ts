import { BaseListResponse } from "@/domain/model/response/BaseListResponse";
import { BaseValueResponse } from "@/domain/model/response/BaseValueResponse";

/**
 * Utility to mimic Go's fmt.Sprintf for basic %v replacements.
 */
function formatMessage(format: string, ...args: any[]): string {
  let i = 0;
  return format.replace(/%v/g, () => String(args[i++] ?? ""));
}

/**
 * Returns a successful BaseValueResponse
 */
export function successValueResponse<T>(value: T): BaseValueResponse<T> {
  return {
    success: true,
    value,
    error: undefined,
  };
}

/**
 * Returns an error BaseValueResponse
 */
export function errorValueResponse<T>(code: number, format: string, ...args: any[]): BaseValueResponse<T> {
  const message = formatMessage(format, ...args);
  return {
    success: false,
    value: undefined,
    error: {
      code,
      message,
    },
  };
}

/**
 * Returns a successful BaseListResponse
 */
export function successListResponse<T>(list: T[] | null | undefined): BaseListResponse<T> {
  return {
    success: true,
    list: list ?? [],
    error: undefined,
  };
}

/**
 * Returns an error BaseListResponse
 */
export function errorListResponse<T>(code: number, format: string, ...args: any[]): BaseListResponse<T> {
  const message = formatMessage(format, ...args);
  return {
    success: false,
    list: undefined,
    error: {
      code,
      message,
    },
  };
}
