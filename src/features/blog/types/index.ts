export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  subtitle: string;
  summary: string;
  content: string;
  coverImage: string;
  thumbnail: string;
  author: {
    _id: string;
    name: string;
    avatar?: string;
    bio?: string;
  };
  publishDate: string;
  updatedDate: string;
  readingTime: number;
  category: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  featured: boolean;
  featuredImage: string;
  seoTitle: string;
  seoDescription: string;
  tableOfContents: {
    id: string;
    title: string;
    level: number;
  }[];
  views: number;
  likes: number;
  bookmarks: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPostQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  tag?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  featured?: boolean;
  sortBy?: 'publishDate' | 'views' | 'likes' | 'readingTime' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

export interface BlogPostResponse {
  posts: BlogPost[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateBlogPostInput {
  title: string;
  subtitle?: string;
  summary: string;
  content: string;
  coverImage?: string;
  thumbnail?: string;
  category: string;
  tags: string[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  featured?: boolean;
  featuredImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  tableOfContents?: {
    id: string;
    title: string;
    level: number;
  }[];
  isPublished?: boolean;
}

export interface UpdateBlogPostInput extends Partial<CreateBlogPostInput> {}
