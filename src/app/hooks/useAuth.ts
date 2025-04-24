import { create } from 'zustand';
import { AuthHelper } from '../helpers/auth/auth.helper';

interface AuthState {
  isAuthenticated: boolean;
  updateAuthStatus: () => void;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  isAuthenticated: AuthHelper.isAuthenticated(),
  updateAuthStatus: () => {
    set({ isAuthenticated: AuthHelper.isAuthenticated() });
  },
  login: (token: string) => {
    AuthHelper.setToken(token);
    set({ isAuthenticated: true });
  },
  logout: () => {
    AuthHelper.removeToken();
    set({ isAuthenticated: false });
  }
}));