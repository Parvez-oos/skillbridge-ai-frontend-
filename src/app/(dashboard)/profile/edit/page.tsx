'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useProfile, useUpdateProfile } from '@/features/profile/hooks/useProfile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Loader2, ArrowLeft, Save } from 'lucide-react';
import { useEffect } from 'react';
import Link from 'next/link';

const profileSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  bio: z.string().optional(),
  skills: z.string().optional(),
  socialLinks: z.object({
    linkedin: z.string().url('Must be a valid URL').optional().or(z.literal('')),
    github: z.string().url('Must be a valid URL').optional().or(z.literal('')),
    twitter: z.string().url('Must be a valid URL').optional().or(z.literal('')),
    website: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  }).optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function EditProfilePage() {
  const { data: profile, isLoading } = useProfile();
  const updateProfile = useUpdateProfile();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (profile) {
      reset({
        firstName: profile.firstName,
        lastName: profile.lastName,
        bio: profile.bio || '',
        skills: profile.skills?.join(', ') || '',
        socialLinks: {
          linkedin: profile.socialLinks?.linkedin || '',
          github: profile.socialLinks?.github || '',
          twitter: profile.socialLinks?.twitter || '',
          website: profile.socialLinks?.website || '',
        },
      });
    }
  }, [profile, reset]);

  const onSubmit = (data: ProfileFormData) => {
    const skills = data.skills
      ? data.skills.split(',').map((s) => s.trim()).filter(Boolean)
      : [];

    updateProfile.mutate({
      firstName: data.firstName,
      lastName: data.lastName,
      bio: data.bio || undefined,
      skills,
      socialLinks: data.socialLinks,
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-96 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6">
          <Link href="/profile" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Profile
          </Link>
        </div>

        <div className="rounded-2xl border border-border/50 bg-card/50 p-6 md:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight">Edit Profile</h2>
            <p className="text-muted-foreground mt-1">Update your personal information and social links.</p>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium mb-2">First Name</label>
                <Input {...register('firstName')} placeholder="First name" />
                {errors.firstName && (
                  <p className="text-sm text-destructive mt-1.5">{errors.firstName.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Last Name</label>
                <Input {...register('lastName')} placeholder="Last name" />
                {errors.lastName && (
                  <p className="text-sm text-destructive mt-1.5">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Bio</label>
              <Textarea {...register('bio')} placeholder="Tell us about yourself" rows={4} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Skills</label>
              <Input {...register('skills')} placeholder="e.g., React, TypeScript, Node.js" />
              <p className="text-xs text-muted-foreground mt-1.5">Separate skills with commas</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Social Links</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium mb-2">LinkedIn</label>
                  <Input {...register('socialLinks.linkedin')} placeholder="https://linkedin.com/in/..." />
                  {errors.socialLinks?.linkedin && (
                    <p className="text-sm text-destructive mt-1.5">{errors.socialLinks.linkedin.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">GitHub</label>
                  <Input {...register('socialLinks.github')} placeholder="https://github.com/..." />
                  {errors.socialLinks?.github && (
                    <p className="text-sm text-destructive mt-1.5">{errors.socialLinks.github.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Twitter</label>
                  <Input {...register('socialLinks.twitter')} placeholder="https://twitter.com/..." />
                  {errors.socialLinks?.twitter && (
                    <p className="text-sm text-destructive mt-1.5">{errors.socialLinks.twitter.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Website</label>
                  <Input {...register('socialLinks.website')} placeholder="https://..." />
                  {errors.socialLinks?.website && (
                    <p className="text-sm text-destructive mt-1.5">{errors.socialLinks.website.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-2">
              <Button type="submit" disabled={updateProfile.isPending}>
                {updateProfile.isPending ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Save Changes
              </Button>
              <Button type="button" variant="outline" onClick={() => reset()}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
