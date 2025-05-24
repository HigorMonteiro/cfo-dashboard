import { createContext, useContext, ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { LoginDTO, UserDTO } from '@/types/auth';

interface AuthContextType {
  login: (credentials: LoginDTO) => Promise<void>;
  logout: () => void;
  user: UserDTO | undefined;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Authentication Provider
 * 
 * @description Provides authentication context to the application
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();

  const handleLogin = async (credentials: LoginDTO) => {
    await auth.login.mutateAsync(credentials);
  };

  return (
    <AuthContext.Provider value={{ login: handleLogin, logout: auth.logout, user: auth.user.data ?? undefined, isAuthenticated: auth.isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}