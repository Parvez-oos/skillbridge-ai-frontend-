import { apiClient } from '@/lib/api';
import {
  DashboardData,
  DashboardStats,
  RecentActivity,
  LearningProgress,
  MonthlyActivity,
  CategoryDistribution,
} from '../types';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const dashboardApi = {
  async getDashboardData(): Promise<DashboardData> {
    const response = await apiClient.get<ApiResponse<DashboardData>>('/dashboard');
    return response.data;
  },

  async getStats(): Promise<DashboardStats> {
    const response = await apiClient.get<ApiResponse<DashboardStats>>('/dashboard/stats');
    return response.data;
  },

  async getRecentActivity(): Promise<RecentActivity[]> {
    const response = await apiClient.get<ApiResponse<RecentActivity[]>>('/dashboard/activity');
    return response.data;
  },

  async getLearningProgress(): Promise<LearningProgress[]> {
    const response = await apiClient.get<ApiResponse<LearningProgress[]>>('/dashboard/progress');
    return response.data;
  },

  async getMonthlyActivity(): Promise<MonthlyActivity[]> {
    const response = await apiClient.get<ApiResponse<MonthlyActivity[]>>('/dashboard/monthly-activity');
    return response.data;
  },

  async getCategoryDistribution(): Promise<CategoryDistribution[]> {
    const response = await apiClient.get<ApiResponse<CategoryDistribution[]>>('/dashboard/category-distribution');
    return response.data;
  },
};
