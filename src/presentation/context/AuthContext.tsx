import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  token: string | null;
  orgId: string | null;
  login: (token: string, orgId: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('jwtToken'));
  const [orgId, setOrgId] = useState<string | null>(localStorage.getItem('orgId'));

  useEffect(() => {
    const storedToken = localStorage.getItem('jwtToken');
    const storedOrgId = localStorage.getItem('orgId');
    if (storedToken && storedOrgId) {
      setToken(storedToken);
      setOrgId(storedOrgId);
    }
  }, []);

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

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, orgId, login, logout, isAuthenticated }}>
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