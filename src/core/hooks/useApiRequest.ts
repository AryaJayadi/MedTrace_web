import { useState, useCallback } from 'react';
import { BaseListResponse } from '@/domain/model/response/BaseListResponse';
import { BaseValueResponse } from '@/domain/model/response/BaseValueResponse';
import { ErrorInfo } from '@/domain/model/response/ErrorInfo';

type ApiResponse<T> = BaseListResponse<T> | BaseValueResponse<T>;
type ApiFunction<T, P extends unknown[]> = (...args: P) => Promise<ApiResponse<T>>;

interface UseApiRequestState<T> {
  data: T | undefined;
  list: T[] | undefined;
  error: ErrorInfo | undefined;
  isLoading: boolean;
  success: boolean | undefined;
}

export function useApiRequest<T, P extends unknown[]>(
  apiFunc: ApiFunction<T, P>
) {
  const [state, setState] = useState<UseApiRequestState<T>>({
    data: undefined,
    list: undefined,
    error: undefined,
    isLoading: false,
    success: undefined,
  });

  const execute = useCallback(async (...args: P) => {
    setState(prevState => ({ ...prevState, isLoading: true, error: undefined, success: undefined }));
    try {
      const response = await apiFunc(...args);
      if (response.success) {
        let responseData: T | undefined = undefined;
        let responseList: T[] | undefined = undefined;

        if ('value' in response) {
          responseData = response.value;
        }
        if ('list' in response) {
          responseList = response.list;
        }

        setState({
          data: responseData,
          list: responseList,
          isLoading: false,
          error: undefined,
          success: true,
        });
        return { success: true, data: responseData, list: responseList };
      } else {
        setState({
          data: undefined,
          list: undefined,
          isLoading: false,
          error: response.error,
          success: false,
        });
        return { success: false, error: response.error };
      }
    } catch (err: any) {
      // Handle unexpected errors (e.g., network issues, non-standard API errors)
      const errorInfo: ErrorInfo = {
        code: err.code || 'UNKNOWN_ERROR',
        message: err.message || 'An unexpected error occurred.',
      };
      setState({
        data: undefined,
        list: undefined,
        isLoading: false,
        error: errorInfo,
        success: false,
      });
      return { success: false, error: errorInfo };
    }
  }, [apiFunc]);

  return { ...state, execute };
}
