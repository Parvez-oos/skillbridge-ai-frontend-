export interface LearningPath {
  _id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  rating: number;
  studentsCount: number;
  thumbnail: string;
  learningOutcomes: string[];
  requiredSkills: string[];
  creator: {
    _id: string;
    name: string;
    avatar?: string;
  };
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LearningPathQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  sortBy?: 'title' | 'createdAt' | 'rating' | 'studentsCount' | 'duration';
  sortOrder?: 'asc' | 'desc';
}

export interface LearningPathResponse {
  learningPaths: LearningPath[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateLearningPathInput {
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  thumbnail?: string;
  learningOutcomes: string[];
  requiredSkills: string[];
  isPublished?: boolean;
}

export interface UpdateLearningPathInput extends Partial<CreateLearningPathInput> {}
