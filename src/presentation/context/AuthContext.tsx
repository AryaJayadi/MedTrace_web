import { AuthApiDataSource } from '@/data/datasource/api/AuthApiDataSource';
import { AuthRepositoryDataSource } from '@/data/repository/AuthRepositoryDataSource';
import { LoginRequest } from '@/domain/model/auth/LoginRequest';
import { LoginResponse } from '@/domain/model/auth/LoginResponse';
import { BaseValueResponse } from '@/domain/model/response/BaseValueResponse';
import { Login } from '@/domain/usecase/auth/Login';
import { errorValueResponse } from '@/lib/ResponseHelper';
import { createContext, useContext, useState, ReactNode, useEffect, useCallback, useMemo } from 'react';
import { isLoggedIn, setAuthTokens, clearAuthTokens } from 'axios-jwt'
import { OrganizationApiDataSource } from '@/data/datasource/api/OrganizationApiDataSource';
import { OrganizationRepositoryDataSource } from '@/data/repository/OrganizationRepositoryDataSource';
import { GetOrganizations } from '@/domain/usecase/organization/GetOrganizations';
import { Organization } from '@/domain/model/organization/Organization';
import { useLocalStorage } from 'usehooks-ts';
import { useApiRequest } from '@/core/hooks/useApiRequest';
import { ErrorInfo } from '@/domain/model/response/ErrorInfo';

interface AuthContextType {
  handleLogin: (request: LoginRequest) => Promise<BaseValueResponse<LoginResponse>>;
  logout: () => void;
  isAuthenticated: boolean | null;
  user?: Organization | null;
  otherOrgs: Organization[];
  organizationsIsLoading: boolean;
  organizationsError: ErrorInfo | undefined;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [orgId, setOrgId, removeOrgId] = useLocalStorage<string | null>('orgId', null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState<Organization | null>(null);
  const [otherOrgs, setOtherOrgs] = useState<Organization[]>([])

  const authDataSource = useMemo(() => new AuthApiDataSource(), []);
  const authRepository = useMemo(() => new AuthRepositoryDataSource(authDataSource), [authDataSource]);
  const loginUseCase = useMemo(() => new Login(authRepository), [authRepository]);
  const submitLogin = useCallback(async (request: LoginRequest) => {
    return await loginUseCase.execute(request);
  }, [loginUseCase]);

  const organizationDataSource = useMemo(() => new OrganizationApiDataSource(), []);
  const orgRepo = useMemo(() => new OrganizationRepositoryDataSource(organizationDataSource), [organizationDataSource]);
  const getOrganizationsUseCase = useMemo(() => new GetOrganizations(orgRepo), [orgRepo]);
  const getOrganizations = useCallback(async () => {
    return await getOrganizationsUseCase.invoke();
  }, [getOrganizationsUseCase]);
  const { list: organizations, isLoading: organizationsIsLoading, error: organizationsError, execute: fetchOrganizations } = useApiRequest<Organization, []>(getOrganizations);

  useEffect(() => {
    isLoggedIn().then((loggedIn) => {
      setIsAuthenticated(loggedIn);
    });

  }, [])

  useEffect(() => {
    if (orgId) fetchOrganizations();

  }, [orgId])

  useEffect(() => {
    if (organizations && organizations.length > 0) {
      let currOrg;
      const tempOrgs = [];

      for (const org of organizations) {
        if (org.ID === orgId) currOrg = org;
        else tempOrgs.push(org);
      }

      setUser(currOrg || null);
      setOtherOrgs(tempOrgs);
    }

  }, [organizations])

  async function handleLogin(request: LoginRequest): Promise<BaseValueResponse<LoginResponse>> {
    try {
      const result = await submitLogin(request);
      if (result.success && result.value) {
        login(result.value);
        return result;
      } else {
        return result
      }
    } catch (error: any) {
      const err = error.response.data
      return err
    }
  }

  const login = (data: LoginResponse) => {
    setOrgId(data.OrgID);
    setAuthTokens({
      accessToken: data.AccessToken,
      refreshToken: data.RefreshToken
    })
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await clearAuthTokens();
    removeOrgId();
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ handleLogin, logout, isAuthenticated, user, otherOrgs, organizationsIsLoading, organizationsError }}>
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
