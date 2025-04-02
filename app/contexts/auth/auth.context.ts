import { createContext } from 'react';
import type { AuthUser } from '~/types/auth-user';

interface AuthContextType {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
  isAdmin: boolean;
  initialized: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);
