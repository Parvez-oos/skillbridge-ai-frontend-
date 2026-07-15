export interface UserProfile {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  bio?: string;
  skills: string[];
  socialLinks: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
  };
  preferences: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    learningReminders: boolean;
    weeklyDigest: boolean;
  };
  role: 'user' | 'admin';
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileStats {
  totalLearningPaths: number;
  completedPaths: number;
  inProgressPaths: number;
  totalHoursLearned: number;
  averageScore: number;
  currentStreak: number;
  longestStreak: number;
  certificatesEarned: number;
}

export interface UpdateProfileInput {
  firstName?: string;
  lastName?: string;
  bio?: string;
  skills?: string[];
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
  };
  preferences?: {
    emailNotifications?: boolean;
    pushNotifications?: boolean;
    learningReminders?: boolean;
    weeklyDigest?: boolean;
  };
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface AvatarUploadResponse {
  avatar: string;
  thumbnail: string;
}

export interface ProfileActivity {
  _id: string;
  type: 'enrollment' | 'completion' | 'achievement' | 'update';
  title: string;
  description: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}
