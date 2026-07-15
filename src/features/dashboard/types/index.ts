export interface DashboardStats {
  totalLearningPaths: number;
  completedPaths: number;
  inProgressPaths: number;
  totalHoursLearned: number;
  learningStreak: number;
  averageRating: number;
}

export interface RecentActivity {
  _id: string;
  type: 'enrolled' | 'completed' | 'progress' | 'achievement';
  title: string;
  description: string;
  date: string;
  learningPath?: {
    _id: string;
    title: string;
    slug: string;
  };
}

export interface LearningProgress {
  _id: string;
  learningPath: {
    _id: string;
    title: string;
    slug: string;
    thumbnail: string;
    category: string;
  };
  progress: number;
  lastAccessed: string;
  enrolledAt: string;
}

export interface Recommendation {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  rating: number;
  thumbnail: string;
}

export interface MonthlyActivity {
  month: string;
  hours: number;
  courses: number;
}

export interface CategoryDistribution {
  category: string;
  count: number;
  percentage: number;
}

export interface DashboardData {
  stats: DashboardStats;
  recentActivity: RecentActivity[];
  learningProgress: LearningProgress[];
  recommendations: Recommendation[];
  monthlyActivity: MonthlyActivity[];
  categoryDistribution: CategoryDistribution[];
}
