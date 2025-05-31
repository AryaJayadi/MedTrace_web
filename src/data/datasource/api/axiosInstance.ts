import { IAuthTokens, TokenRefreshRequest, applyAuthTokenInterceptor, getBrowserLocalStorage } from 'axios-jwt'
import axios, { AxiosInstance } from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL + "/";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Define token refresh function.
const requestRefresh: TokenRefreshRequest = async (refreshToken: string): Promise<IAuthTokens | string> => {

  const response = await axios.post(`${BASE_URL}/refresh`, { token: refreshToken })

  // If your backend supports rotating refresh tokens, you may also choose to return an object containing both tokens:
  // return {
  //  accessToken: response.data.access_token,
  //  refreshToken: response.data.refresh_token
  //}

  return response.data.access_token
}

// 3. Add interceptor to your axios instance
applyAuthTokenInterceptor(axiosInstance, { requestRefresh })

// New to 2.2.0+: initialize with storage: localStorage/sessionStorage/nativeStorage. Helpers: getBrowserLocalStorage, getBrowserSessionStorage
const getStorage = getBrowserLocalStorage

// You can create you own storage, it has to comply with type StorageType
applyAuthTokenInterceptor(axiosInstance, { requestRefresh, getStorage })

export default axiosInstance; 
