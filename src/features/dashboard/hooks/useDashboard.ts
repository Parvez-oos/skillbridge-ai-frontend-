'use client';

import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '../services/dashboard.api';

export const useDashboardData = () => {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: () => dashboardApi.getDashboardData(),
  });
};

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboardStats'],
    queryFn: () => dashboardApi.getStats(),
  });
};

export const useRecentActivity = () => {
  return useQuery({
    queryKey: ['recentActivity'],
    queryFn: () => dashboardApi.getRecentActivity(),
  });
};

export const useLearningProgress = () => {
  return useQuery({
    queryKey: ['learningProgress'],
    queryFn: () => dashboardApi.getLearningProgress(),
  });
};

export const useMonthlyActivity = () => {
  return useQuery({
    queryKey: ['monthlyActivity'],
    queryFn: () => dashboardApi.getMonthlyActivity(),
  });
};

export const useCategoryDistribution = () => {
  return useQuery({
    queryKey: ['categoryDistribution'],
    queryFn: () => dashboardApi.getCategoryDistribution(),
  });
};
