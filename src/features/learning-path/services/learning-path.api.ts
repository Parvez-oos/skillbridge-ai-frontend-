import { apiClient } from '@/lib/api';
import {
  LearningPath,
  LearningPathQueryParams,
  LearningPathResponse,
  CreateLearningPathInput,
  UpdateLearningPathInput,
} from '../types';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const learningPathApi = {
  async getLearningPaths(params?: LearningPathQueryParams): Promise<LearningPathResponse> {
    const searchParams = new URLSearchParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          searchParams.append(key, String(value));
        }
      });
    }

    const queryString = searchParams.toString();
    const response = await apiClient.get<ApiResponse<LearningPathResponse>>(
      `/learning-paths${queryString ? `?${queryString}` : ''}`
    );
    return response.data;
  },

  async getLearningPathBySlug(slug: string): Promise<LearningPath> {
    const response = await apiClient.get<ApiResponse<LearningPath>>(`/learning-paths/slug/${slug}`);
    return response.data;
  },

  async getLearningPathById(id: string): Promise<LearningPath> {
    const response = await apiClient.get<ApiResponse<LearningPath>>(`/learning-paths/${id}`);
    return response.data;
  },

  async createLearningPath(data: CreateLearningPathInput): Promise<LearningPath> {
    const response = await apiClient.post<ApiResponse<LearningPath>>('/learning-paths', data);
    return response.data;
  },

  async updateLearningPath(id: string, data: UpdateLearningPathInput): Promise<LearningPath> {
    const response = await apiClient.put<ApiResponse<LearningPath>>(`/learning-paths/${id}`, data);
    return response.data;
  },

  async deleteLearningPath(id: string): Promise<void> {
    await apiClient.delete(`/learning-paths/${id}`);
  },

  async getMyLearningPaths(page?: number, limit?: number): Promise<LearningPathResponse> {
    const params = new URLSearchParams();
    if (page) params.append('page', String(page));
    if (limit) params.append('limit', String(limit));
    const queryString = params.toString();
    const response = await apiClient.get<ApiResponse<LearningPathResponse>>(
      `/learning-paths/my-paths${queryString ? `?${queryString}` : ''}`
    );
    return response.data;
  },

  async getCategories(): Promise<string[]> {
    const response = await apiClient.get<ApiResponse<string[]>>('/learning-paths/categories');
    return response.data;
  },
};
