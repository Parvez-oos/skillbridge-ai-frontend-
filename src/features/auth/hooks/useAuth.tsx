'use client';

import React, { createContext, useContext, useEffect, useReducer, useCallback } from 'react';
import { User, AuthState, AuthAction } from '../types';
import { authApi } from '../services/auth.api';

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'AUTH_FAILURE':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  googleLogin: (token: string) => Promise<void>;
  githubLogin: (code: string) => Promise<void>;
  facebookLogin: (code: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const checkAuth = useCallback(async () => {
    try {
      dispatch({ type: 'AUTH_START' });
      const user = await authApi.getCurrentUser();
      dispatch({ type: 'AUTH_SUCCESS', payload: { user, token: localStorage.getItem('token') || '' } });
    } catch {
      dispatch({ type: 'AUTH_FAILURE' });
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (email: string, password: string) => {
    dispatch({ type: 'AUTH_START' });
    try {
      const response = await authApi.login({ email, password });
      localStorage.setItem('token', response.token);
      dispatch({ type: 'AUTH_SUCCESS', payload: response });
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE' });
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    dispatch({ type: 'AUTH_START' });
    try {
      const response = await authApi.register({ name, email, password, confirmPassword: password });
      localStorage.setItem('token', response.token);
      dispatch({ type: 'AUTH_SUCCESS', payload: response });
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE' });
      throw error;
    }
  };

  const googleLogin = async (token: string) => {
    dispatch({ type: 'AUTH_START' });
    try {
      const response = await authApi.googleLogin(token);
      localStorage.setItem('token', response.token);
      dispatch({ type: 'AUTH_SUCCESS', payload: response });
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE' });
      throw error;
    }
  };

  const githubLogin = async (code: string) => {
    dispatch({ type: 'AUTH_START' });
    try {
      const response = await authApi.githubLogin(code);
      localStorage.setItem('token', response.token);
      dispatch({ type: 'AUTH_SUCCESS', payload: response });
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE' });
      throw error;
    }
  };

  const facebookLogin = async (code: string) => {
    dispatch({ type: 'AUTH_START' });
    try {
      const response = await authApi.facebookLogin(code);
      localStorage.setItem('token', response.token);
      dispatch({ type: 'AUTH_SUCCESS', payload: response });
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE' });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } finally {
      localStorage.removeItem('token');
      dispatch({ type: 'LOGOUT' });
    }
  };

  const updateUser = (user: User) => {
    dispatch({ type: 'UPDATE_USER', payload: user });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        googleLogin,
        githubLogin,
        facebookLogin,
        logout,
        updateUser,
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
