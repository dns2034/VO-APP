import { useMutation } from "@tanstack/react-query";
import {
  deleteAvatar,
  updateAvatar,
  updateProfile,
  uploadAvatar,
} from "../../shared/services/profile-service";

export const useDeleteAvatarMutation = () =>
  useMutation({ mutationFn: deleteAvatar });

export const useUpdateAvatarMutation = () =>
  useMutation({ mutationFn: updateAvatar });

export const useUploadAvatarMutation = () =>
  useMutation({ mutationFn: uploadAvatar });

export const useUpdateProfileMutation = () =>
  useMutation({ mutationFn: updateProfile });
