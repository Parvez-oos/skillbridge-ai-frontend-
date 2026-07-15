import { z } from 'zod';

export const createLearningPathSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title must be at most 100 characters'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(5000, 'Description must be at most 5000 characters'),
  shortDescription: z
    .string()
    .min(1, 'Short description is required')
    .max(200, 'Short description must be at most 200 characters'),
  category: z.string().min(1, 'Category is required'),
  tags: z.array(z.string()).min(1, 'At least one tag is required'),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  duration: z.number().min(1, 'Duration must be at least 1 hour'),
  thumbnail: z.string().optional(),
  learningOutcomes: z.array(z.string()).min(1, 'At least one learning outcome is required'),
  requiredSkills: z.array(z.string()).min(1, 'At least one required skill is required'),
  isPublished: z.boolean().optional(),
});

export type CreateLearningPathFormData = z.infer<typeof createLearningPathSchema>;
