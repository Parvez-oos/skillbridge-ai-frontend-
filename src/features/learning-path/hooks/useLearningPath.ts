'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { learningPathApi } from '../services/learning-path.api';
import {
  LearningPathQueryParams,
  CreateLearningPathInput,
  UpdateLearningPathInput,
} from '../types';

export const useLearningPaths = (params?: LearningPathQueryParams) => {
  return useQuery({
    queryKey: ['learningPaths', params],
    queryFn: () => learningPathApi.getLearningPaths(params),
  });
};

export const useLearningPathBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['learningPath', slug],
    queryFn: () => learningPathApi.getLearningPathBySlug(slug),
    enabled: !!slug,
  });
};

export const useLearningPathById = (id: string) => {
  return useQuery({
    queryKey: ['learningPath', id],
    queryFn: () => learningPathApi.getLearningPathById(id),
    enabled: !!id,
  });
};

export const useCreateLearningPath = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateLearningPathInput) =>
      learningPathApi.createLearningPath(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['learningPaths'] });
    },
  });
};

export const useUpdateLearningPath = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateLearningPathInput }) =>
      learningPathApi.updateLearningPath(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['learningPaths'] });
      queryClient.invalidateQueries({ queryKey: ['learningPath', id] });
    },
  });
};

export const useDeleteLearningPath = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => learningPathApi.deleteLearningPath(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['learningPaths'] });
    },
  });
};

export const useMyLearningPaths = (page?: number, limit?: number) => {
  return useQuery({
    queryKey: ['myLearningPaths', page, limit],
    queryFn: () => learningPathApi.getMyLearningPaths(page, limit),
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => learningPathApi.getCategories(),
  });
};
