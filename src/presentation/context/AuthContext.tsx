import { AuthApiDataSource } from '@/data/datasource/api/AuthApiDataSource';
import { AuthRepositoryDataSource } from '@/data/repository/AuthRepositoryDataSource';
import { LoginRequest } from '@/domain/model/auth/LoginRequest';
import { LoginResponse } from '@/domain/model/auth/LoginResponse';
import { BaseValueResponse } from '@/domain/model/response/BaseValueResponse';
import { Login } from '@/domain/usecase/auth/Login';
import { errorValueResponse } from '@/lib/ResponseHelper';
import { createContext, useContext, useState, ReactNode, useEffect, useCallback, useMemo } from 'react';

interface AuthContextType {
  token: string | null;
  orgId: string | null;
  handleLogin: (request: LoginRequest) => Promise<BaseValueResponse<LoginResponse>>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('jwtToken'));
  const [orgId, setOrgId] = useState<string | null>(localStorage.getItem('orgId'));

  const authDataSource = useMemo(() => new AuthApiDataSource(), []);
  const authRepository = useMemo(() => new AuthRepositoryDataSource(authDataSource), [authDataSource]);
  const loginUseCase = useMemo(() => new Login(authRepository), [authRepository]);
  const submitLogin = useCallback(async (request: LoginRequest) => {
    return await loginUseCase.execute(request);
  }, [loginUseCase]);

  const isAuthenticated = !!token;

  useEffect(() => {
    const storedToken = localStorage.getItem('jwtToken');
    const storedOrgId = localStorage.getItem('orgId');
    if (storedToken && storedOrgId) {
      setToken(storedToken);
      setOrgId(storedOrgId);
    }
  }, []);

  async function handleLogin(request: LoginRequest): Promise<BaseValueResponse<LoginResponse>> {
    try {
      const result = await submitLogin(request);
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
    localStorage.setItem('jwtToken', newToken);
    localStorage.setItem('orgId', newOrgId);
    setToken(newToken);
    setOrgId(newOrgId);
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('orgId');
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
