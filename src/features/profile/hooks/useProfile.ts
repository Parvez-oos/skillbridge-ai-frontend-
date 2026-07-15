import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { profileApi } from '../services/profile.api';
import { UpdateProfileInput, ChangePasswordInput } from '../types';

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: profileApi.getProfile,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileInput) => profileApi.updateProfile(data),
    onSuccess: (data) => {
      queryClient.setQueryData(['profile'], data);
      toast.success('Profile updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update profile');
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: ChangePasswordInput) => profileApi.changePassword(data),
    onSuccess: () => {
      toast.success('Password changed successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to change password');
    },
  });
};

export const useUploadAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => profileApi.uploadAvatar(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success('Avatar uploaded successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to upload avatar');
    },
  });
};

export const useDeleteAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => profileApi.deleteAvatar(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success('Avatar deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete avatar');
    },
  });
};

export const useProfileStats = () => {
  return useQuery({
    queryKey: ['profile-stats'],
    queryFn: profileApi.getProfileStats,
  });
};

export const useProfileActivity = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ['profile-activity', page, limit],
    queryFn: () => profileApi.getProfileActivity(page, limit),
  });
};

export const useDeleteAccount = () => {
  return useMutation({
    mutationFn: () => profileApi.deleteAccount(),
    onSuccess: () => {
      toast.success('Account deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete account');
    },
  });
};
