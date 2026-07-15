export interface CareerRoadmapInput {
  careerGoal: string;
  currentSkills: string[];
  experience: 'entry' | 'mid' | 'senior';
  studyHoursPerWeek: number;
  preferredStyle: 'visual' | 'reading' | 'hands-on' | 'mixed';
  timeline: '3months' | '6months' | '1year' | '2years';
}

export interface RoadmapWeek {
  week: number;
  title: string;
  topics: string[];
  projects: string[];
  resources: string[];
}

export interface CareerRoadmap {
  id: string;
  careerGoal: string;
  timeline: string;
  weeklyPlan: RoadmapWeek[];
  monthlyPlan: {
    month: number;
    title: string;
    goals: string[];
    milestones: string[];
  }[];
  skillGapAnalysis: {
    currentSkills: string[];
    requiredSkills: string[];
    missingSkills: string[];
  };
  projectRecommendations: {
    title: string;
    description: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    estimatedHours: number;
  }[];
  interviewPreparation: {
    topics: string[];
    questions: string[];
    tips: string[];
  };
  createdAt: string;
}

export interface ResumeAnalysisInput {
  resumeText: string;
  targetRole?: string;
  industry?: string;
}

export interface ResumeAnalysis {
  id: string;
  atsScore: number;
  overallScore: number;
  missingSkills: string[];
  weakSections: {
    section: string;
    issue: string;
    suggestion: string;
  }[];
  grammarSuggestions: {
    original: string;
    corrected: string;
    explanation: string;
  }[];
  keywords: {
    found: string[];
    missing: string[];
    recommended: string[];
  };
  industryMatch: number;
  roleMatch: number;
  summary: string;
  createdAt: string;
}

export interface LearningRecommendationInput {
  goals: string[];
  currentSkills: string[];
  completedCourses: string[];
  preferredDifficulty: 'beginner' | 'intermediate' | 'advanced';
  learningStyle: 'visual' | 'reading' | 'hands-on' | 'mixed';
}

export interface LearningRecommendation {
  id: string;
  recommendedCourses: {
    title: string;
    category: string;
    difficulty: string;
    reason: string;
    estimatedHours: number;
  }[];
  recommendedProjects: {
    title: string;
    description: string;
    skills: string[];
    difficulty: string;
  }[];
  recommendedSkills: {
    skill: string;
    priority: 'high' | 'medium' | 'low';
    reason: string;
    learningResources: string[];
  }[];
  learningQueue: {
    order: number;
    item: string;
    type: 'course' | 'project' | 'skill';
    estimatedTime: string;
  }[];
  personalizedInsights: string;
  createdAt: string;
}

export interface AIErrorResponse {
  message: string;
  code: string;
  retryable: boolean;
}
