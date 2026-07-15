'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { aiApi } from '../services/ai.api';
import {
  CareerRoadmapInput,
  ResumeAnalysisInput,
  LearningRecommendationInput,
} from '../types';

export const useGenerateCareerRoadmap = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CareerRoadmapInput) => aiApi.generateCareerRoadmap(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roadmaps'] });
    },
  });
};

export const useCareerRoadmap = (id: string) => {
  return useQuery({
    queryKey: ['roadmap', id],
    queryFn: () => aiApi.getCareerRoadmap(id),
    enabled: !!id,
  });
};

export const useMyRoadmaps = () => {
  return useQuery({
    queryKey: ['roadmaps'],
    queryFn: () => aiApi.getMyRoadmaps(),
  });
};

export const useDeleteCareerRoadmap = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => aiApi.deleteCareerRoadmap(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roadmaps'] });
    },
  });
};

export const useAnalyzeResume = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: ResumeAnalysisInput) => aiApi.analyzeResume(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resumeAnalyses'] });
    },
  });
};

export const useResumeAnalysis = (id: string) => {
  return useQuery({
    queryKey: ['resumeAnalysis', id],
    queryFn: () => aiApi.getResumeAnalysis(id),
    enabled: !!id,
  });
};

export const useMyResumeAnalyses = () => {
  return useQuery({
    queryKey: ['resumeAnalyses'],
    queryFn: () => aiApi.getMyResumeAnalyses(),
  });
};

export const useDeleteResumeAnalysis = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => aiApi.deleteResumeAnalysis(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resumeAnalyses'] });
    },
  });
};

export const useGetLearningRecommendations = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: LearningRecommendationInput) => aiApi.getLearningRecommendations(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recommendations'] });
    },
  });
};

export const useMyRecommendations = () => {
  return useQuery({
    queryKey: ['recommendations'],
    queryFn: () => aiApi.getMyRecommendations(),
  });
};

export const useDeleteRecommendation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => aiApi.deleteRecommendation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recommendations'] });
    },
  });
};
