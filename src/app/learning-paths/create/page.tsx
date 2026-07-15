'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';
import { useCreateLearningPath } from '@/features/learning-path/hooks/useLearningPath';
import {
  createLearningPathSchema,
  CreateLearningPathFormData,
} from '@/features/learning-path/validation';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';

function CreateLearningPathForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();
  const createMutation = useCreateLearningPath();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<CreateLearningPathFormData>({
    resolver: zodResolver(createLearningPathSchema),
    defaultValues: {
      tags: [],
      learningOutcomes: [],
      requiredSkills: [],
      isPublished: false,
    },
  });

  const tags = watch('tags');
  const learningOutcomes = watch('learningOutcomes');
  const requiredSkills = watch('requiredSkills');

  const [tagInput, setTagInput] = useState('');
  const [outcomeInput, setOutcomeInput] = useState('');
  const [skillInput, setSkillInput] = useState('');

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setValue('tags', [...tags, tagInput.trim()], { shouldValidate: true });
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setValue('tags', tags.filter((t) => t !== tag), { shouldValidate: true });
  };

  const addOutcome = () => {
    if (outcomeInput.trim() && !learningOutcomes.includes(outcomeInput.trim())) {
      setValue('learningOutcomes', [...learningOutcomes, outcomeInput.trim()], {
        shouldValidate: true,
      });
      setOutcomeInput('');
    }
  };

  const removeOutcome = (outcome: string) => {
    setValue(
      'learningOutcomes',
      learningOutcomes.filter((o) => o !== outcome),
      { shouldValidate: true }
    );
  };

  const addSkill = () => {
    if (skillInput.trim() && !requiredSkills.includes(skillInput.trim())) {
      setValue('requiredSkills', [...requiredSkills, skillInput.trim()], {
        shouldValidate: true,
      });
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setValue(
      'requiredSkills',
      requiredSkills.filter((s) => s !== skill),
      { shouldValidate: true }
    );
  };

  const onSubmit = async (data: CreateLearningPathFormData) => {
    try {
      setServerError(null);
      await createMutation.mutateAsync(data);
      router.push('/learning-paths');
    } catch (error) {
      setServerError(error instanceof Error ? error.message : 'Failed to create learning path');
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h2 className="text-2xl font-bold mb-6">Create Learning Path</h2>

      {serverError && (
        <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Title</label>
          <Input
            placeholder="e.g., Full Stack Web Development"
            className={errors.title ? 'border-destructive' : ''}
            {...register('title')}
          />
          {errors.title && (
            <p className="mt-1 text-xs text-destructive">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Short Description</label>
          <Input
            placeholder="Brief description (max 200 chars)"
            className={errors.shortDescription ? 'border-destructive' : ''}
            {...register('shortDescription')}
          />
          {errors.shortDescription && (
            <p className="mt-1 text-xs text-destructive">{errors.shortDescription.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Description</label>
          <Textarea
            placeholder="Detailed description of this learning path"
            className={`h-32 ${errors.description ? 'border-destructive' : ''}`}
            {...register('description')}
          />
          {errors.description && (
            <p className="mt-1 text-xs text-destructive">{errors.description.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Category</label>
            <Input
              placeholder="e.g., Web Development"
              className={errors.category ? 'border-destructive' : ''}
              {...register('category')}
            />
            {errors.category && (
              <p className="mt-1 text-xs text-destructive">{errors.category.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Difficulty</label>
            <select
              className={`w-full h-10 rounded-lg border border-border bg-muted/50 px-4 py-2 text-sm text-foreground shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${errors.difficulty ? 'border-destructive' : ''}`}
              {...register('difficulty')}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            {errors.difficulty && (
              <p className="mt-1 text-xs text-destructive">{errors.difficulty.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Duration (hours)</label>
          <Input
            type="number"
            placeholder="e.g., 40"
            className={errors.duration ? 'border-destructive' : ''}
            {...register('duration', { valueAsNumber: true })}
          />
          {errors.duration && (
            <p className="mt-1 text-xs text-destructive">{errors.duration.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Thumbnail URL (optional)</label>
          <Input type="url" placeholder="https://example.com/image.jpg" {...register('thumbnail')} />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Tags</label>
          <div className="flex gap-2">
            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTag();
                }
              }}
              placeholder="Add a tag"
              className="flex-1"
            />
            <Button type="button" onClick={addTag} size="icon">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          {errors.tags && (
            <p className="mt-1 text-xs text-destructive">{errors.tags.message}</p>
          )}
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="gap-1">
                {tag}
                <button type="button" onClick={() => removeTag(tag)}>
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Learning Outcomes</label>
          <div className="flex gap-2">
            <Input
              value={outcomeInput}
              onChange={(e) => setOutcomeInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addOutcome();
                }
              }}
              placeholder="Add a learning outcome"
              className="flex-1"
            />
            <Button type="button" onClick={addOutcome} size="icon">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          {errors.learningOutcomes && (
            <p className="mt-1 text-xs text-destructive">{errors.learningOutcomes.message}</p>
          )}
          <div className="space-y-2 mt-2">
            {learningOutcomes.map((outcome) => (
              <div key={outcome} className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
                <span className="flex-1 text-sm">{outcome}</span>
                <button type="button" onClick={() => removeOutcome(outcome)}>
                  <X className="w-4 h-4 text-destructive" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Required Skills</label>
          <div className="flex gap-2">
            <Input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addSkill();
                }
              }}
              placeholder="Add a required skill"
              className="flex-1"
            />
            <Button type="button" onClick={addSkill} size="icon">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          {errors.requiredSkills && (
            <p className="mt-1 text-xs text-destructive">{errors.requiredSkills.message}</p>
          )}
          <div className="flex flex-wrap gap-2 mt-2">
            {requiredSkills.map((skill) => (
              <Badge key={skill} variant="secondary" className="gap-1">
                {skill}
                <button type="button" onClick={() => removeSkill(skill)}>
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isPublished"
            className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
            {...register('isPublished')}
          />
          <label htmlFor="isPublished" className="text-sm font-medium text-foreground">
            Publish immediately
          </label>
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" loading={createMutation.isPending}>
            Create Learning Path
          </Button>
        </div>
      </form>
    </div>
  );
}

export default function CreateLearningPathPage() {
  return (
    <ProtectedRoute>
      <Section className="pt-24 md:pt-32">
        <Container>
          <CreateLearningPathForm />
        </Container>
      </Section>
    </ProtectedRoute>
  );
}
