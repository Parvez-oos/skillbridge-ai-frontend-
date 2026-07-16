export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalBlogPosts: number;
  publishedBlogPosts: number;
  totalLearningPaths: number;
  publishedLearningPaths: number;
  totalBlogViews: number;
  totalLikes: number;
  totalStudents: number;
}

export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
  provider: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminBlogPost {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  category: string;
  tags: string[];
  difficulty: string;
  views: number;
  likes: number;
  isPublished: boolean;
  publishDate: string;
  author: { _id: string; name: string; email: string };
}

export interface AdminLearningPath {
  _id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  difficulty: string;
  duration: number;
  rating: number;
  studentsCount: number;
  isPublished: boolean;
  creator: { _id: string; name: string; email: string };
  createdAt: string;
}

export interface MonthlyData {
  _id: { year: number; month: number };
  count?: number;
  views?: number;
}

export interface CategoryData {
  _id: string;
  count: number;
}

export interface DifficultyData {
  _id: string;
  count: number;
}

export interface AdminDashboardData {
  stats: AdminStats;
  recent: {
    users: AdminUser[];
    blogPosts: AdminBlogPost[];
    learningPaths: AdminLearningPath[];
  };
  charts: {
    usersByMonth: MonthlyData[];
    blogViewsByMonth: MonthlyData[];
    categoryDistribution: CategoryData[];
    difficultyDistribution: DifficultyData[];
  };
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  message?: string;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface AdminApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
