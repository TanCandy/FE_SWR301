import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { User, UserRole, AuthState, LoginCredentials, Permission, ROLE_PERMISSIONS, DEMO_ACCOUNTS } from '../types/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  loginAsRole: (role: UserRole) => void;
  logout: () => void;
  hasPermission: (permission: Permission) => boolean;
  hasAnyPermission: (permissions: Permission[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'seal_hackathon_auth';

interface StoredAuth {
  user: User;
  timestamp: number;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      try {
        const parsed: StoredAuth = JSON.parse(stored);
        const oneWeek = 7 * 24 * 60 * 60 * 1000;
        if (Date.now() - parsed.timestamp < oneWeek) {
          setState({ user: parsed.user, isAuthenticated: true, isLoading: false });
          return;
        }
        localStorage.removeItem(AUTH_STORAGE_KEY);
      } catch {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }
    setState((s) => ({ ...s, isLoading: false }));
  }, []);

  const login = useCallback(async (credentials: LoginCredentials): Promise<{ success: boolean; error?: string }> => {
    await new Promise((r) => setTimeout(r, 800));

    const account = DEMO_ACCOUNTS.find(
      (a) => a.email === credentials.email && a.password === credentials.password
    );

    if (!account) {
      return { success: false, error: 'Invalid email or password' };
    }

    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: account.email,
      name: account.name,
      role: account.role,
      organization: 'SEAL Hackathon',
    };

    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({ user, timestamp: Date.now() })
    );

    setState({ user, isAuthenticated: true, isLoading: false });
    return { success: true };
  }, []);

  const loginAsRole = useCallback((role: UserRole) => {
    const account = DEMO_ACCOUNTS.find((a) => a.role === role);
    if (!account) return;

    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: account.email,
      name: account.name,
      role: account.role,
      organization: 'SEAL Hackathon',
    };

    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({ user, timestamp: Date.now() })
    );

    setState({ user, isAuthenticated: true, isLoading: false });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setState({ user: null, isAuthenticated: false, isLoading: false });
  }, []);

  const hasPermission = useCallback(
    (permission: Permission): boolean => {
      if (!state.user) return false;
      const rolePermissions = ROLE_PERMISSIONS[state.user.role];
      return rolePermissions.includes(permission);
    },
    [state.user]
  );

  const hasAnyPermission = useCallback(
    (permissions: Permission[]): boolean => {
      return permissions.some((p) => hasPermission(p));
    },
    [hasPermission]
  );

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        loginAsRole,
        logout,
        hasPermission,
        hasAnyPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
