import { apiClient } from '@/lib/api';
import { UserProfile, ProfileStats, UpdateProfileInput, ChangePasswordInput, AvatarUploadResponse, ProfileActivity } from '../types';

interface ApiResponse<T> {
  data: T;
}

interface ActivityResponse {
  data: ProfileActivity[];
  total: number;
  page: number;
  totalPages: number;
}

export const profileApi = {
  getProfile: async (): Promise<UserProfile> => {
    const response = await apiClient.get<ApiResponse<UserProfile>>('/users/me');
    return response.data;
  },

  updateProfile: async (data: UpdateProfileInput): Promise<UserProfile> => {
    const response = await apiClient.put<ApiResponse<UserProfile>>('/users/me', data);
    return response.data;
  },

  changePassword: async (data: ChangePasswordInput): Promise<void> => {
    await apiClient.put('/users/me/password', data);
  },

  uploadAvatar: async (file: File): Promise<AvatarUploadResponse> => {
    const formData = new FormData();
    formData.append('avatar', file);
    const response = await fetch('/api/users/me/avatar', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });
    const result = await response.json();
    return result.data;
  },

  deleteAvatar: async (): Promise<void> => {
    await apiClient.delete('/users/me/avatar');
  },

  getProfileStats: async (): Promise<ProfileStats> => {
    const response = await apiClient.get<ApiResponse<ProfileStats>>('/users/me/stats');
    return response.data;
  },

  getProfileActivity: async (page = 1, limit = 10): Promise<ActivityResponse> => {
    const response = await apiClient.get<ActivityResponse>(`/users/me/activity?page=${page}&limit=${limit}`);
    return response;
  },

  deleteAccount: async (): Promise<void> => {
    await apiClient.delete('/users/me');
  },
};
