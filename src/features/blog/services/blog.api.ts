import { apiClient } from '@/lib/api';
import {
  BlogPost,
  BlogPostQueryParams,
  BlogPostResponse,
  CreateBlogPostInput,
  UpdateBlogPostInput,
} from '../types';

export const blogApi = {
  async getBlogPosts(params?: BlogPostQueryParams): Promise<BlogPostResponse> {
    const searchParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          searchParams.append(key, String(value));
        }
      });
    }
    
    const queryString = searchParams.toString();
    const response = await apiClient.get<{ success: boolean; data: BlogPost[]; pagination: { page: number; limit: number; total: number; totalPages: number } }>(
      `/blog/posts${queryString ? `?${queryString}` : ''}`
    );
    
    return {
      posts: response.data || [],
      total: response.pagination?.total || 0,
      page: response.pagination?.page || 1,
      limit: response.pagination?.limit || 12,
      totalPages: response.pagination?.totalPages || 0,
    };
  },

  async getBlogPostBySlug(slug: string): Promise<BlogPost> {
    const response = await apiClient.get<{ success: boolean; data: BlogPost }>(`/blog/posts/${slug}`);
    return response.data;
  },

  async createBlogPost(data: CreateBlogPostInput): Promise<BlogPost> {
    const response = await apiClient.post<{ success: boolean; data: BlogPost }>('/blog/posts', data);
    return response.data;
  },

  async updateBlogPost(id: string, data: UpdateBlogPostInput): Promise<BlogPost> {
    const response = await apiClient.put<{ success: boolean; data: BlogPost }>(`/blog/posts/${id}`, data);
    return response.data;
  },

  async deleteBlogPost(id: string): Promise<void> {
    await apiClient.delete(`/blog/posts/${id}`);
  },

  async getBlogCategories(): Promise<string[]> {
    const response = await apiClient.get<{ success: boolean; data: string[] }>('/blog/categories');
    return response.data || [];
  },

  async getBlogTags(): Promise<string[]> {
    const response = await apiClient.get<{ success: boolean; data: string[] }>('/blog/tags');
    return response.data || [];
  },

  async getFeaturedPosts(limit?: number): Promise<BlogPost[]> {
    const params = limit ? `?limit=${limit}` : '';
    const response = await apiClient.get<{ success: boolean; data: BlogPost[] }>(`/blog/posts/featured${params}`);
    return response.data || [];
  },

  async getRelatedPosts(id: string, limit?: number): Promise<BlogPost[]> {
    const params = limit ? `?limit=${limit}` : '';
    const response = await apiClient.get<{ success: boolean; data: BlogPost[] }>(`/blog/posts/${id}/related${params}`);
    return response.data || [];
  },

  async getRecentPosts(limit?: number): Promise<BlogPost[]> {
    const params = limit ? `?limit=${limit}` : '';
    const response = await apiClient.get<{ success: boolean; data: BlogPost[] }>(`/blog/posts/recent${params}`);
    return response.data || [];
  },

  async getPopularPosts(limit?: number): Promise<BlogPost[]> {
    const params = limit ? `?limit=${limit}` : '';
    const response = await apiClient.get<{ success: boolean; data: BlogPost[] }>(`/blog/posts/popular${params}`);
    return response.data || [];
  },
};
