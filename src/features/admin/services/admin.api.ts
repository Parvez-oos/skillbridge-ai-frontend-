import { apiClient } from '@/lib/api';
import { AdminDashboardData, AdminUser, PaginatedResponse, AdminApiResponse } from '../types';

export const adminApi = {
  async getDashboard(): Promise<AdminDashboardData> {
    const response = await apiClient.get<AdminApiResponse<AdminDashboardData>>('/admin/stats');
    return response.data;
  },

  async getUsers(params: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
    sortBy?: string;
    sortOrder?: string;
  }): Promise<PaginatedResponse<AdminUser>> {
    const searchParams = new URLSearchParams();
    if (params.page) searchParams.set('page', params.page.toString());
    if (params.limit) searchParams.set('limit', params.limit.toString());
    if (params.search) searchParams.set('search', params.search);
    if (params.role) searchParams.set('role', params.role);
    if (params.sortBy) searchParams.set('sortBy', params.sortBy);
    if (params.sortOrder) searchParams.set('sortOrder', params.sortOrder);

    const query = searchParams.toString();
    const response = await apiClient.get<PaginatedResponse<AdminUser>>(`/admin/users${query ? `?${query}` : ''}`);
    return response;
  },

  async updateUserRole(userId: string, role: string): Promise<AdminUser> {
    const response = await apiClient.put<AdminApiResponse<AdminUser>>(`/admin/users/${userId}/role`, { role });
    return response.data;
  },

  async deleteUser(userId: string): Promise<void> {
    await apiClient.delete(`/admin/users/${userId}`);
  },

  async getProfile(): Promise<AdminUser> {
    const response = await apiClient.get<AdminApiResponse<AdminUser>>('/admin/profile');
    return response.data;
  },
};
