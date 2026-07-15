import { apiClient } from '@/lib/api';
import { AuthResponse, LoginInput, RegisterInput, User } from '../types';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const authApi = {
  async register(data: RegisterInput): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/register', data);
    return response.data;
  },

  async login(data: LoginInput): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/login', data);
    return response.data;
  },

  async googleLogin(token: string): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/google', { token });
    return response.data;
  },

  async githubLogin(code: string): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/github', { code });
    return response.data;
  },

  async facebookLogin(code: string): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/facebook', { code });
    return response.data;
  },

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout');
  },

  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<ApiResponse<User>>('/auth/me');
    return response.data;
  },

  async updateProfile(data: { name?: string; avatar?: string }): Promise<User> {
    const response = await apiClient.put<ApiResponse<User>>('/auth/profile', data);
    return response.data;
  },

  async changePassword(data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }): Promise<void> {
    await apiClient.put('/auth/change-password', data);
  },
};
