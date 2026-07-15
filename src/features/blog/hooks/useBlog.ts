'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { blogApi } from '../services/blog.api';
import {
  BlogPostQueryParams,
  CreateBlogPostInput,
  UpdateBlogPostInput,
} from '../types';

export const useBlogPosts = (params?: BlogPostQueryParams) => {
  return useQuery({
    queryKey: ['blogPosts', params],
    queryFn: () => blogApi.getBlogPosts(params),
  });
};

export const useBlogPostBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['blogPost', slug],
    queryFn: () => blogApi.getBlogPostBySlug(slug),
    enabled: !!slug,
  });
};

export const useCreateBlogPost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateBlogPostInput) =>
      blogApi.createBlogPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
    },
  });
};

export const useUpdateBlogPost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBlogPostInput }) =>
      blogApi.updateBlogPost(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
      queryClient.invalidateQueries({ queryKey: ['blogPost', id] });
    },
  });
};

export const useDeleteBlogPost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => blogApi.deleteBlogPost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
    },
  });
};

export const useBlogCategories = () => {
  return useQuery({
    queryKey: ['blogCategories'],
    queryFn: () => blogApi.getBlogCategories(),
  });
};

export const useBlogTags = () => {
  return useQuery({
    queryKey: ['blogTags'],
    queryFn: () => blogApi.getBlogTags(),
  });
};

export const useFeaturedPosts = (limit?: number) => {
  return useQuery({
    queryKey: ['featuredPosts', limit],
    queryFn: () => blogApi.getFeaturedPosts(limit),
  });
};

export const useRelatedPosts = (id: string, limit?: number) => {
  return useQuery({
    queryKey: ['relatedPosts', id, limit],
    queryFn: () => blogApi.getRelatedPosts(id, limit),
    enabled: !!id,
  });
};

export const useRecentPosts = (limit?: number) => {
  return useQuery({
    queryKey: ['recentPosts', limit],
    queryFn: () => blogApi.getRecentPosts(limit),
  });
};

export const usePopularPosts = (limit?: number) => {
  return useQuery({
    queryKey: ['popularPosts', limit],
    queryFn: () => blogApi.getPopularPosts(limit),
  });
};
