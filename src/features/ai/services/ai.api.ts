import { apiClient } from '@/lib/api';
import {
  CareerRoadmapInput,
  CareerRoadmap,
  ResumeAnalysisInput,
  ResumeAnalysis,
  LearningRecommendationInput,
  LearningRecommendation,
} from '../types';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const aiApi = {
  async generateCareerRoadmap(data: CareerRoadmapInput): Promise<CareerRoadmap> {
    const response = await apiClient.post<ApiResponse<CareerRoadmap>>('/ai/roadmap', data);
    return response.data;
  },

  async getCareerRoadmap(id: string): Promise<CareerRoadmap> {
    const response = await apiClient.get<ApiResponse<CareerRoadmap>>(`/ai/roadmap/${id}`);
    return response.data;
  },

  async getMyRoadmaps(): Promise<CareerRoadmap[]> {
    const response = await apiClient.get<ApiResponse<CareerRoadmap[]>>('/ai/roadmaps');
    return response.data;
  },

  async deleteCareerRoadmap(id: string): Promise<void> {
    await apiClient.delete(`/ai/roadmap/${id}`);
  },

  async analyzeResume(data: ResumeAnalysisInput): Promise<ResumeAnalysis> {
    const response = await apiClient.post<ApiResponse<ResumeAnalysis>>('/ai/resume/analyze', data);
    return response.data;
  },

  async getResumeAnalysis(id: string): Promise<ResumeAnalysis> {
    const response = await apiClient.get<ApiResponse<ResumeAnalysis>>(`/ai/resume/${id}`);
    return response.data;
  },

  async getMyResumeAnalyses(): Promise<ResumeAnalysis[]> {
    const response = await apiClient.get<ApiResponse<ResumeAnalysis[]>>('/ai/resume/history');
    return response.data;
  },

  async deleteResumeAnalysis(id: string): Promise<void> {
    await apiClient.delete(`/ai/resume/${id}`);
  },

  async getLearningRecommendations(
    data: LearningRecommendationInput
  ): Promise<LearningRecommendation> {
    const response = await apiClient.post<ApiResponse<LearningRecommendation>>('/ai/recommendations', data);
    return response.data;
  },

  async getMyRecommendations(): Promise<LearningRecommendation[]> {
    const response = await apiClient.get<ApiResponse<LearningRecommendation[]>>('/ai/recommendations/history');
    return response.data;
  },

  async deleteRecommendation(id: string): Promise<void> {
    await apiClient.delete(`/ai/recommendations/${id}`);
  },
};
