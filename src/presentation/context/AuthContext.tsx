import { ROUTES } from '@/core/Routes';
import { AuthApiDataSource } from '@/data/datasource/api/AuthApiDataSource';
import { AuthRepositoryDataSource } from '@/data/repository/AuthRepositoryDataSource';
import { LoginRequest } from '@/domain/model/auth/LoginRequest';
import { LoginResponse } from '@/domain/model/auth/LoginResponse';
import { BaseValueResponse } from '@/domain/model/response/BaseValueResponse';
import { Login } from '@/domain/usecase/auth/Login';
import { errorValueResponse } from '@/lib/ResponseHelper';
import { createContext, useContext, useState, ReactNode, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useLocalStorage } from 'usehooks-ts'

interface AuthContextType {
  token: string | null;
  orgId: string | null;
  handleLogin: (request: LoginRequest) => Promise<BaseValueResponse<LoginResponse>>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken, removeToken] = useLocalStorage<string | null>('jwtToken', null);
  const [orgId, setOrgId, removeOrgId] = useLocalStorage<string | null>('orgId', null);
  const navigate = useNavigate();

  const authDataSource = useMemo(() => new AuthApiDataSource(), []);
  const authRepository = useMemo(() => new AuthRepositoryDataSource(authDataSource), [authDataSource]);
  const loginUseCase = useMemo(() => new Login(authRepository), [authRepository]);
  const submitLogin = useCallback(async (request: LoginRequest) => {
    return await loginUseCase.execute(request);
  }, [loginUseCase]);

  const isAuthenticated = token !== null;

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.FULL_PATH_APP_BATCH);
    } else {
      navigate(ROUTES.FULL_PATH_AUTH_LOGIN);
    }
    console.log(token)
    console.log("Authentication state changed:", isAuthenticated);
  }, [isAuthenticated, navigate])

  async function handleLogin(request: LoginRequest): Promise<BaseValueResponse<LoginResponse>> {
    try {
      const result = await submitLogin(request);
      console.log("Login result:", result);
      if (result.success && result.value) {
        login(result.value.Token, result.value.OrgID);
        return result;
      } else {
        return result
      }
    } catch (error: any) {
      const errorMessage = error.message || "An unexpected error occurred during login.";
      return errorValueResponse<LoginResponse>(500, errorMessage);
    }
  }

  const login = (newToken: string, newOrgId: string) => {
    console.log("Login successful with token:", newToken, "and orgId:", newOrgId);
    setToken(newToken);
    setOrgId(newOrgId);
  };

  const logout = () => {
    setToken(null);
    setOrgId(null);
  };

  return (
    <AuthContext.Provider value={{ token, orgId, handleLogin, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 
