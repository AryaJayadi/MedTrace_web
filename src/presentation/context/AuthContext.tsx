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
import { isLoggedIn, setAuthTokens, clearAuthTokens } from 'axios-jwt'

interface AuthContextType {
  handleLogin: (request: LoginRequest) => Promise<BaseValueResponse<LoginResponse>>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  const authDataSource = useMemo(() => new AuthApiDataSource(), []);
  const authRepository = useMemo(() => new AuthRepositoryDataSource(authDataSource), [authDataSource]);
  const loginUseCase = useMemo(() => new Login(authRepository), [authRepository]);
  const submitLogin = useCallback(async (request: LoginRequest) => {
    return await loginUseCase.execute(request);
  }, [loginUseCase]);

  useEffect(() => {
    isLoggedIn().then((loggedIn) => {
      setIsAuthenticated(loggedIn);
    });
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.FULL_PATH_APP_BATCH);
    } else {
      navigate(ROUTES.FULL_PATH_AUTH_LOGIN);
    }
  }, [isAuthenticated, navigate])

  async function handleLogin(request: LoginRequest): Promise<BaseValueResponse<LoginResponse>> {
    try {
      const result = await submitLogin(request);
      console.log("Login result:", result);
      if (result.success && result.value) {
        login(result.value);
        return result;
      } else {
        return result
      }
    } catch (error: any) {
      const errorMessage = error.message || "An unexpected error occurred during login.";
      return errorValueResponse<LoginResponse>(500, errorMessage);
    }
  }

  const login = (data: LoginResponse) => {
    setAuthTokens({
      accessToken: data.AccessToken,
      refreshToken: data.RefreshToken
    })
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await clearAuthTokens();
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ handleLogin, logout, isAuthenticated }}>
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
